/**
 * StoryEngine.js
 * Core logic for traversing story nodes, managing variables, and producing
 * resolved text for the UI. Completely decoupled from React.
 */

/**
 * Given a node and the current variables map, resolve the displayed text.
 * Node text can be a string or a function (vars) => string.
 */
export function resolveText(raw, vars, lang = 'en') {
  if (!raw) return '';
  const source = typeof raw === 'object' ? (raw[lang] ?? raw['en'] ?? '') : raw;
  if (typeof source === 'function') return source(vars);
  if (typeof source === 'string') return source;
  return String(source);
}

/**
 * Apply a choice's effects to the variable map and return a new copy.
 */
export function applyEffects(vars, effects = {}) {
  const next = { ...vars, names: { ...(vars.names || {}) } };
  for (const [key, val] of Object.entries(effects)) {
    if (typeof val === 'number') {
      next[key] = (next[key] ?? 0) + val;
    } else {
      next[key] = val;
    }
  }
  return next;
}

/**
 * Check if a choice is available given the current vars.
 */
export function isChoiceAvailable(choice, vars) {
  if (!choice.condition) return true;
  try {
    return !!choice.condition(vars);
  } catch {
    return false;
  }
}

/**
 * Build a node map (id → node) from a flat story node array.
 */
export function buildNodeMap(nodes) {
  const map = {};
  for (const node of nodes) {
    if (map[node.id]) {
      console.warn(`[StoryEngine] Duplicate node id: ${node.id}`);
    }
    map[node.id] = node;
  }
  return map;
}

/**
 * Validate an entire story's node graph.
 * Returns { valid: boolean, errors: string[] }
 */
export function validateStory(story) {
  const errors = [];
  const map = buildNodeMap(story.nodes);

  // Check start node exists
  if (!map[story.startNode]) {
    errors.push(`Start node "${story.startNode}" not found`);
  }

  // BFS from start
  const visited = new Set();
  const queue = [story.startNode];
  while (queue.length > 0) {
    const id = queue.shift();
    if (visited.has(id)) continue;
    visited.add(id);

    const node = map[id];
    if (!node) {
      errors.push(`Node "${id}" is referenced but does not exist`);
      continue;
    }

    if (!node.isEnding) {
      if (!node.choices || node.choices.length === 0) {
        errors.push(`Node "${id}" has no choices and is not marked as an ending`);
      } else {
        for (const choice of node.choices) {
          if (!choice.next) {
            errors.push(`Choice "${choice.id ?? '?'}" in node "${id}" has no next`);
          } else if (!map[choice.next]) {
            errors.push(`Choice "${choice.id ?? '?'}" in node "${id}" points to missing node "${choice.next}"`);
          } else {
            queue.push(choice.next);
          }
        }
      }
    }
  }

  // Check for unreachable nodes
  for (const id of Object.keys(map)) {
    if (!visited.has(id)) {
      errors.push(`Node "${id}" is unreachable from start`);
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Run a random simulation of a story to catch runtime issues.
 * Returns { runs: number, errors: string[] }
 */
export function simulateStory(story, runs = 50) {
  const map = buildNodeMap(story.nodes);
  const simErrors = [];

  for (let i = 0; i < runs; i++) {
    let vars = { ...story.initialVars, names: {} };
    let nodeId = story.startNode;
    let steps = 0;
    const maxSteps = 300;

    while (steps < maxSteps) {
      steps++;
      const node = map[nodeId];
      if (!node) {
        simErrors.push(`Run ${i}: missing node "${nodeId}" after ${steps} steps`);
        break;
      }
      if (node.isEnding) break;

      const available = (node.choices || []).filter(c => isChoiceAvailable(c, vars));
      if (available.length === 0) {
        // try all choices ignoring locks
        const all = node.choices || [];
        if (all.length === 0) {
          simErrors.push(`Run ${i}: node "${nodeId}" has no choices`);
          break;
        }
        const choice = all[Math.floor(Math.random() * all.length)];
        vars = applyEffects(vars, choice.effects || {});
        nodeId = choice.next;
      } else {
        const choice = available[Math.floor(Math.random() * available.length)];
        vars = applyEffects(vars, choice.effects || {});
        nodeId = choice.next;
      }
    }

    if (steps >= maxSteps) {
      simErrors.push(`Run ${i}: possible infinite loop detected`);
    }
  }

  return { runs, errors: simErrors };
}
