'use client';

import React from 'react';

import RedditArticleDetail from '../../components/RedditArticleDetail';
import RedditChatInput from '../../components/RedditChatInput';
import RedditSubTree from '../../components/RedditSubTree';

const RedditPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <RedditSubTree />
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100vh' }}>
        <RedditArticleDetail />
        <RedditChatInput />
      </div>
    </div>
  );
};

export default RedditPage;
