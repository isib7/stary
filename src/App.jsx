import { useState, useCallback } from 'react';
import stories from './data/stories/index.js';
import en from './i18n/en.js';
import ar from './i18n/ar.js';
import { useMouseParallax } from './hooks/useMouseParallax.js';
import { useStoryEngine } from './hooks/useStoryEngine.js';
import { validateStory } from './engine/StoryEngine.js';
import TopBar from './components/TopBar.jsx';
import HomeScreen from './components/HomeScreen.jsx';
import StoryReader from './components/StoryReader.jsx';
import EndingScreen from './components/EndingScreen.jsx';
import NamingModal from './components/NamingModal.jsx';
import InteractiveBackground from './components/InteractiveBackground.jsx';
import ReportButton from './components/ReportButton.jsx';
import './index.css';

// Validate all stories in dev mode
if (import.meta.env.DEV) {
  stories.forEach((s) => {
    const result = validateStory(s);
    if (!result.valid) {
      console.error(`[Stary] Story "${s.id}" has validation errors:`, result.errors);
    } else {
      console.log(`[Stary] Story "${s.id}" validated OK (${s.nodes.length} nodes)`);
    }
  });
}

// Inner component that sets up the engine for a selected story
function ActiveStory({ story, lang, t, typingEnabled, onHome, onEnding }) {
  const engine = useStoryEngine(story, lang);
  const { currentNode, ended, namingModal, submitName, dismissNaming, restart, getNodeText } = engine;

  const handleRestart = useCallback(() => {
    restart();
  }, [restart]);

  return (
    <>
      <StoryReader
        story={story}
        engine={engine}
        lang={lang}
        t={t}
        typingEnabled={typingEnabled}
        onHome={onHome}
      />

      {ended && currentNode && (
        <EndingScreen
          node={currentNode}
          lang={lang}
          t={t}
          getNodeText={getNodeText}
          onRestart={handleRestart}
          onHome={onHome}
        />
      )}

      {namingModal && (
        <NamingModal
          modal={namingModal}
          lang={lang}
          t={t}
          onSubmit={submitName}
          onDismiss={dismissNaming}
        />
      )}
    </>
  );
}

export default function App() {
  const [lang, setLang] = useState('en');
  const [typingEnabled, setTypingEnabled] = useState(true);
  const [activeStory, setActiveStory] = useState(null);

  useMouseParallax();

  const t = lang === 'ar' ? ar : en;

  const handleSelect = useCallback((story) => {
    setActiveStory(story);
  }, []);

  const handleHome = useCallback(() => {
    setActiveStory(null);
  }, []);

  return (
    <div
      className={`app ${activeStory ? `app--story app--${activeStory.theme}` : 'app--home'}`}
      lang={lang}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <TopBar
        lang={lang}
        setLang={setLang}
        typingEnabled={typingEnabled}
        setTypingEnabled={setTypingEnabled}
        t={t}
        onHome={handleHome}
        activeStory={activeStory}
      />

      <InteractiveBackground theme={activeStory?.theme} />

      {activeStory ? (
        // Key forces full remount when story changes → clean engine state
        <ActiveStory
          key={activeStory.id + lang}
          story={activeStory}
          lang={lang}
          t={t}
          typingEnabled={typingEnabled}
          onHome={handleHome}
        />
      ) : (
        <HomeScreen
          stories={stories}
          lang={lang}
          t={t}
          onSelect={handleSelect}
        />
      )}

      <ReportButton lang={lang} />
    </div>
  );
}
