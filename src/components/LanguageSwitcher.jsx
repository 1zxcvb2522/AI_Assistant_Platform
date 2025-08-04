import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css'; // для стилизации

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="language-switcher">
      <button onClick={() => i18n.changeLanguage('en')}>🇬🇧 English</button>
      <button onClick={() => i18n.changeLanguage('ru')}>🇷🇺 Русский</button>
    </div>
  );
};

export default LanguageSwitcher;
