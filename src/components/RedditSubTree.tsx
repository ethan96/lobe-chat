'use client';

import { Collapse, Spin } from 'antd';
import React, { useEffect } from 'react';

import { useRedditStore } from '../store/reddit';

const RedditSubTree: React.FC = () => {
  const { subs, articles, selectedSub, loadSubs, selectSub, selectArticle, loading } =
    useRedditStore();

  useEffect(() => {
    loadSubs();
  }, [loadSubs]);

  const items = subs.map((sub) => ({
    children: (
      <ul style={{ paddingLeft: 16 }}>
        {selectedSub === sub.subId && articles.length === 0 && <li>（無文章）</li>}
        {selectedSub === sub.subId &&
          articles.map((article) => (
            <li
              key={article.articleId}
              onClick={() => selectArticle(article.articleId)}
              style={{ cursor: 'pointer', marginBottom: 8 }}
            >
              {article.title}
            </li>
          ))}
      </ul>
    ),
    key: sub.subId,
    label: sub.displayName || sub.fullName,
  }));

  return (
    <div style={{ borderRight: '1px solid #eee', height: '100vh', overflow: 'auto', width: 320 }}>
      {loading && <Spin />}
      <Collapse
        accordion
        activeKey={selectedSub ?? undefined}
        items={items}
        onChange={(key) => selectSub(Number(key))}
      />
    </div>
  );
};

export default RedditSubTree;
