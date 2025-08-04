import './i18n'; // важно, чтобы i18n инициализировался до всего остального
import React from 'react';
import ChatHeader from './components/ChatHeader';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <ChatHeader />
      <LanguageSwitcher />
      <button>{t('send')}</button>
    </div>
  );
}

export default App;
