import React from 'react';

/**
 * Top navigation bar.
 * Props: lang, setLang, typingEnabled, setTypingEnabled, t, onHome, activeStory
 */
export default function TopBar({ lang, setLang, typingEnabled, setTypingEnabled, t, onHome, activeStory }) {
  return (
    <header className="topbar" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <button className="topbar__logo" onClick={onHome} aria-label="Home">
        <span className="topbar__logo-icon">◈</span>
        <span className="topbar__logo-text">{t.appName}</span>
      </button>

      <div className="topbar__controls">
        {/* Typing effect toggle */}
        <button
          className={`topbar__btn ${typingEnabled ? 'topbar__btn--active' : ''}`}
          onClick={() => setTypingEnabled(v => !v)}
          aria-label={t.typingEffect}
          title={t.typingEffect}
        >
          <span className="topbar__btn-icon">⌨</span>
          <span className="topbar__btn-label">{typingEnabled ? t.on : t.off}</span>
        </button>

        {/* Language toggle */}
        <button
          className="topbar__btn topbar__btn--lang"
          onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
          aria-label="Toggle language"
        >
          {t.language}
        </button>
      </div>
    </header>
  );
}
