import React, { useEffect, useRef } from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';

/**
 * A single narrative node rendered in the chat feed.
 * Props: text, typingEnabled, isLatest, onTypingDone
 */
function NarrativeNode({ text, typingEnabled, isLatest, onTypingDone }) {
  const { displayed, done, skip } = useTypingEffect(
    text,
    typingEnabled && isLatest,
    14
  );

  useEffect(() => {
    if (done && onTypingDone) onTypingDone();
  }, [done, onTypingDone]);

  const content = (typingEnabled && isLatest) ? displayed : text;

  return (
    <div className={`narrative-node ${isLatest ? 'narrative-node--latest' : ''}`}>
      <div className="narrative-node__text">
        {content.split('\n').map((line, i) => (
          <p key={i}>{line || <>&nbsp;</>}</p>
        ))}
        {typingEnabled && isLatest && !done && (
          <span className="narrative-node__cursor" aria-hidden="true" />
        )}
      </div>
      {typingEnabled && isLatest && !done && (
        <button className="narrative-node__skip" onClick={skip} aria-label="Skip typing">
          ▶▶
        </button>
      )}
    </div>
  );
}

/**
 * A choice the user made (shown in history).
 */
function ChoiceEcho({ text, t }) {
  return (
    <div className="choice-echo">
      <span className="choice-echo__label">{t.yourChoice}</span>
      <span className="choice-echo__text">{text}</span>
    </div>
  );
}

/**
 * Choice buttons shown at current node.
 * Props: choices, lang, t, getChoiceText, onChoice, typingDone
 */
function ChoicePanel({ choices, lang, t, getChoiceText, onChoice, typingDone }) {
  const isRtl = lang === 'ar';

  return (
    <div className={`choice-panel ${typingDone ? 'choice-panel--visible' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {choices.map((choice) => {
        const label = getChoiceText(choice);
        const locked = !choice.available;
        const lockedMsg = lang === 'ar' ? choice.lockedAr : choice.lockedEn;

        return (
          <button
            key={choice.id}
            className={`choice-btn ${locked ? 'choice-btn--locked' : ''}`}
            onClick={() => !locked && onChoice(choice)}
            disabled={locked}
            title={locked ? (lockedMsg ?? t.lockedHint) : undefined}
            aria-label={locked ? `${t.locked}: ${label}` : label}
          >
            <span className="choice-btn__icon">{locked ? '🔒' : '◆'}</span>
            <span className="choice-btn__text">{label}</span>
            {locked && lockedMsg && (
              <span className="choice-btn__locked-hint">{lockedMsg}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Main reading view — the scrolling chat feed.
 * Props: story, engine (from useStoryEngine), lang, t, typingEnabled, onHome
 */
export default function StoryReader({ story, engine, lang, t, typingEnabled, onHome }) {
  const {
    currentNode,
    history,
    ended,
    makeChoice,
    getAvailableChoices,
    getNodeText,
    getChoiceText,
  } = engine;

  const feedRef = useRef(null);
  const [typingDone, setTypingDone] = React.useState(!typingEnabled);

  // Reset typing state when node changes
  useEffect(() => {
    setTypingDone(!typingEnabled);
  }, [currentNode?.id, typingEnabled]);

  // Auto-scroll to bottom on updates
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [history.length, typingDone]);

  const choices = getAvailableChoices();
  const isRtl = lang === 'ar';
  const storyTitle = t.stories?.[story.theme]?.title ?? story.id;

  if (!currentNode) return null;

  return (
    <div className={`reader reader--${story.theme}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Animated background */}
      <div className="reader__bg" aria-hidden="true">
        <div className="reader__bg-layer reader__bg-layer--1" />
        <div className="reader__bg-layer reader__bg-layer--2" />
      </div>

      {/* Header: back + story title */}
      <div className="reader__header">
        <button className="reader__back" onClick={onHome} aria-label={t.backToHome}>
          {isRtl ? '→' : '←'} {t.backToHome}
        </button>
        <span className="reader__story-title">{storyTitle}</span>
      </div>

      {/* Chat feed */}
      <div className="reader__feed" ref={feedRef} role="log" aria-live="polite">
        {/* History */}
        {history.map((entry, i) => (
          <React.Fragment key={i}>
            <NarrativeNode
              text={entry.nodeText}
              typingEnabled={false}
              isLatest={false}
            />
            <ChoiceEcho text={entry.choiceText} t={t} />
          </React.Fragment>
        ))}

        {/* Current node */}
        {!ended && (
          <NarrativeNode
            text={getNodeText(currentNode)}
            typingEnabled={typingEnabled}
            isLatest={true}
            onTypingDone={() => setTypingDone(true)}
          />
        )}
      </div>

      {/* Choices */}
      {!ended && (
        <ChoicePanel
          choices={choices}
          lang={lang}
          t={t}
          getChoiceText={getChoiceText}
          onChoice={makeChoice}
          typingDone={typingDone}
        />
      )}
    </div>
  );
}
