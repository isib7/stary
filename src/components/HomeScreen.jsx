import React from 'react';

const THEME_ICONS = {
  horror: '🕯',
  mystery: '🔍',
  psychological: '🪞',
};

const THEME_BADGES = {
  horror: { en: 'Horror', ar: 'رعب' },
  mystery: { en: 'Mystery', ar: 'غموض' },
  psychological: { en: 'Psychological', ar: 'نفسي' },
};

/**
 * Home screen — story selection cards.
 * Props: stories, lang, t, onSelect
 */
export default function HomeScreen({ stories, lang, t, onSelect }) {
  return (
    <main className="home" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Parallax orbs in background */}
      <div className="home__bg" aria-hidden="true">
        <div className="home__orb home__orb--1" />
        <div className="home__orb home__orb--2" />
        <div className="home__orb home__orb--3" />
      </div>

      <div className="home__content">
        <div className="home__hero">
          <div className="home__hero-icon">◈</div>
          <h1 className="home__title">
            <span className="home__title-main">{t.appName}</span>
          </h1>
          <p className="home__tagline">{t.tagline}</p>
        </div>

        <h2 className="home__section-title">{t.chooseStory}</h2>

        <div className="home__cards">
          {stories.map((story) => {
            const info = t.stories[story.theme] ?? {};
            const badge = THEME_BADGES[story.theme] ?? {};
            return (
              <button
                key={story.id}
                className={`story-card story-card--${story.theme}`}
                onClick={() => onSelect(story)}
                aria-label={info.title}
              >
                <div className="story-card__glow" aria-hidden="true" />
                <div className="story-card__icon">{THEME_ICONS[story.theme] ?? '📖'}</div>
                <span className="story-card__badge">{badge[lang] ?? badge.en}</span>
                <h3 className="story-card__title">{info.title}</h3>
                <p className="story-card__desc">{info.description}</p>
                <div className="story-card__cta">{lang === 'ar' ? 'ابدأ القصة ←' : 'Begin →'}</div>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
