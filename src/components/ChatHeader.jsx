import React from 'react';
import { useTranslation } from 'react-i18next';

const ChatHeader = () => {
  const { t } = useTranslation();

  return (
    <header>
      <h1>{t('welcome_message')}</h1>
      <p>{t('ask_question')}</p>
    </header>
  );
};

export default ChatHeader;
