'use client';

import { Card, Empty, List, Spin, Typography } from 'antd';
import React from 'react';

import { useRedditStore } from '../store/reddit';

const RedditArticleDetail: React.FC = () => {
  const { articles, selectedArticle, messages, loading } = useRedditStore();
  const article = articles.find((a) => a.articleId === selectedArticle);

  if (!selectedArticle) return <Empty description="請選擇文章" />;
  if (loading) return <Spin />;

  return (
    <div style={{ flex: 1, height: '100vh', overflow: 'auto', padding: 24 }}>
      {article && (
        <Card style={{ marginBottom: 24 }} title={article.title}>
          <Typography.Text type="secondary">ID: {article.articleId}</Typography.Text>
        </Card>
      )}
      <List
        dataSource={messages}
        header={<div>歷史訊息</div>}
        locale={{ emptyText: '無歷史訊息' }}
        renderItem={(msg) => (
          <List.Item>
            <List.Item.Meta
              description={msg.content}
              title={
                <span>
                  {msg.messageRole === 'user'
                    ? 'User'
                    : msg.messageRole === 'system'
                      ? 'System'
                      : 'AI'}
                </span>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default RedditArticleDetail;
