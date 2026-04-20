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

          {/* Dummy Cards */}
          {[1, 2, 3].map((i) => (
            <button
              key={`dummy-${i}`}
              className="story-card story-card--psychological"
              style={{ opacity: 0.5, cursor: 'not-allowed', filter: 'grayscale(0.5)' }}
              disabled
            >
              <div className="story-card__glow" aria-hidden="true" />
              <div className="story-card__icon">🚧</div>
              <span className="story-card__badge">{lang === 'ar' ? 'قريباً' : 'Soon'}</span>
              <h3 className="story-card__title">{lang === 'ar' ? 'قيد الإنشاء' : 'Under Construction'}</h3>
              <p className="story-card__desc">
                {lang === 'ar' 
                  ? 'هذه القصة تحت الصيانة والإنشاء حالياً، يرجى العودة لاحقاً.' 
                  : 'This story is currently under construction, please check back later.'}
              </p>
            </button>
          ))}
        </div>

        {/* Contact Us */}
        <section className="home__contact" style={{ marginTop: '80px', textAlign: 'center', padding: '40px 20px', background: 'var(--surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '24px', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', fontWeight: '700' }}>
            {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'var(--text-primary)', fontSize: '1.15rem' }}>
            <a href="mailto:isma3il97ibrahim53@gmail.com" style={{ color: 'var(--accent-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface-2)', padding: '12px 24px', borderRadius: '99px' }}>
              <span>✉️</span> isma3il97ibrahim53@gmail.com
            </a>
            <a href="tel:+923480908929" style={{ color: 'var(--accent-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface-2)', padding: '12px 24px', borderRadius: '99px', direction: 'ltr' }}>
              <span>📞</span> +92 348 0908 929
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
