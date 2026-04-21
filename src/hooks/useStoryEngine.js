import { useState, useCallback, useRef } from 'react';
import {
  buildNodeMap,
  applyEffects,
  isChoiceAvailable,
  resolveText,
} from '../engine/StoryEngine';

/**
 * useStoryEngine
 * Central hook managing all runtime story state.
 *
 * @param {Object} story  - the full story definition object
 * @param {string} lang   - 'en' | 'ar'
 */
export function useStoryEngine(story, lang) {
  const nodeMap = useRef(buildNodeMap(story.nodes)).current;

  const [vars, setVars] = useState(() => ({ ...story.initialVars, visits: {}, names: {} }));
  const [history, setHistory] = useState([]); // [{node, choiceText}]
  const [currentNodeId, setCurrentNodeId] = useState(story.startNode);
  const [ended, setEnded] = useState(false);
  const [namingModal, setNamingModal] = useState(null); // {key, promptEn, promptAr, pendingChoice}

  const currentNode = nodeMap[currentNodeId] ?? null;

  // Replace all {{name_key}} in text with actual name from vars.names
  const injectNames = useCallback((text) => {
    if (!text) return '';
    return text.replace(/\{\{(\w+)\}\}/g, (_, key) => vars.names[key] ?? `[${key}]`);
  }, [vars.names]);

  const getNodeText = useCallback((node, v = vars) => {
    const visitCount = v.visits?.[node.id] || 0;
    const isRevisit = visitCount > 1;
    
    const raw = node[lang] ?? node['en'] ?? '';
    let resolved = typeof raw === 'function' ? raw(v) : raw;

    if (isRevisit) {
        const revisitMsg = lang === 'ar' ? 'لقد عدت إلى هنا مجددًا. ' : 'You have returned here again. ';
        resolved = revisitMsg + resolved;
    }

    return injectNames(resolved);
  }, [lang, injectNames, vars]);

  const getChoiceText = useCallback((choice, v = vars) => {
    const raw = choice[lang] ?? choice['en'] ?? '';
    const resolved = typeof raw === 'function' ? raw(v) : raw;
    return injectNames(resolved);
  }, [lang, injectNames, vars]);

  // Navigate to next node, applying effects, recording history
  const commitChoice = useCallback((choice, v) => {
    const newVars = applyEffects(v, choice.effects || {});
    newVars.visits = newVars.visits || {};
    newVars.visits[choice.next] = (newVars.visits[choice.next] || 0) + 1;
    const nextNode = nodeMap[choice.next];

    const historyEntry = {
      nodeId: currentNodeId,
      nodeText: getNodeText(nodeMap[currentNodeId], v),
      choiceText: getChoiceText(choice, v),
      choiceId: choice.id,
    };

    setVars(newVars);
    setHistory(prev => [...prev, historyEntry]);
    setCurrentNodeId(choice.next);

    if (nextNode?.isEnding) {
      setEnded(true);
    }
  }, [currentNodeId, getNodeText, getChoiceText, nodeMap]);

  // Called when user clicks a choice button
  const makeChoice = useCallback((choice) => {
    // Check if any character name is needed before proceeding
    if (choice.requiresNameBefore) {
      const key = choice.requiresNameBefore;
      if (!vars.names[key]) {
        const node = nodeMap[currentNodeId];
        const nameRequest = node.nameRequests?.[key] ?? story.nameRequests?.[key] ?? {};
        setNamingModal({
          key,
          promptEn: nameRequest.promptEn ?? `Enter a name:`,
          promptAr: nameRequest.promptAr ?? `أدخل اسمًا:`,
          pendingChoice: choice,
        });
        return;
      }
    }

    // Check next node for character naming requirements
    const nextNode = nodeMap[choice.next];
    if (nextNode?.requiresName && !vars.names[nextNode.requiresName]) {
      const nameRequest = story.nameRequests?.[nextNode.requiresName] ?? {};
      setNamingModal({
        key: nextNode.requiresName,
        promptEn: nameRequest.promptEn ?? `Enter a name:`,
        promptAr: nameRequest.promptAr ?? `أدخل اسمًا:`,
        pendingChoice: choice,
      });
      return;
    }

    commitChoice(choice, vars);
  }, [vars, currentNodeId, nodeMap, story, commitChoice]);

  // Called when user submits name from the modal
  const submitName = useCallback((name) => {
    if (!namingModal) return;
    const { key, pendingChoice } = namingModal;
    const newVars = { ...vars, names: { ...vars.names, [key]: name } };
    setVars(newVars);
    setNamingModal(null);
    commitChoice(pendingChoice, newVars);
  }, [namingModal, vars, commitChoice]);

  const dismissNaming = useCallback(() => setNamingModal(null), []);

  const restart = useCallback(() => {
    setVars({ ...story.initialVars, visits: {}, names: {} });
    setHistory([]);
    setCurrentNodeId(story.startNode);
    setEnded(false);
    setNamingModal(null);
  }, [story]);

  const getAvailableChoices = useCallback(() => {
    if (!currentNode || currentNode.isEnding) return [];
    
    let renderedChoices = (currentNode.choices || []).map(c => {
      let available = isChoiceAvailable(c, vars);
      let disabled = !available;
      let disabledReason = '';
      
      if (c.isBacktrack && available) {
        const limits = c.maxVisits || 1;
        const targetVisits = vars.visits?.[c.next] || 0;
        if (targetVisits >= limits) {
           disabled = true;
           disabledReason = 'backtrack';
        }
      }
      
      return {
        ...c,
        available,
        disabled,
        disabledReason
      };
    });
    
    // Check if ALL choices are disabled specifically because of backtracking
    const allBacktracksDisabled = renderedChoices.length > 0 && 
      renderedChoices.every(c => c.disabled && (c.disabledReason === 'backtrack' || !c.available));
      
    // Additional constraint: we only inject if there are NO valid forward paths. 
    // If a node was purely backwards and we blocked it, or blocked by items AND backwards, we jump forward.
    if (allBacktracksDisabled && currentNode.fallbackNext) {
      renderedChoices.push({
        id: 'fallback_progress_' + currentNode.id,
        en: () => 'Move forward',
        ar: () => 'متابعة التقدم',
        next: currentNode.fallbackNext,
        available: true,
        disabled: false
      });
    }

    return renderedChoices;
  }, [currentNode, vars]);

  return {
    currentNode,
    vars,
    history,
    ended,
    namingModal,
    makeChoice,
    submitName,
    dismissNaming,
    restart,
    getAvailableChoices,
    getNodeText,
    getChoiceText,
    injectNames,
  };
}
