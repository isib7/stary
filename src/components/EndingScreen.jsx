import React from 'react';

const ENDING_GLYPHS = {
  success: '✦',
  death: '✝',
  failure: '✗',
  secret: '◈',
};

/**
 * Full-screen ending overlay shown when a story node has isEnding=true.
 * Props: node, lang, t, getNodeText, endingType, onRestart, onHome, story
 */
export default function EndingScreen({ node, lang, t, getNodeText, onRestart, onHome }) {
  const endingType = node.endingType ?? 'success';
  const label = t.endingType?.[endingType] ?? endingType;
  const text = getNodeText(node);
  const isRtl = lang === 'ar';

  return (
    <div className={`ending ending--${endingType}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="ending__bg" aria-hidden="true" />

      <div className="ending__content">
        <div className="ending__glyph">{ENDING_GLYPHS[endingType] ?? '✦'}</div>
        <p className="ending__label">{label}</p>

        <div className="ending__text">
          {text.split('\n').map((line, i) => (
            <p key={i}>{line || <br />}</p>
          ))}
        </div>

        <div className="ending__actions">
          <button className="ending__btn ending__btn--primary" onClick={onRestart}>
            {t.playAgain}
          </button>
          <button className="ending__btn ending__btn--secondary" onClick={onHome}>
            {t.chooseAnother}
          </button>
        </div>
      </div>
    </div>
  );
}
