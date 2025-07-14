'use client';

import { Button, Input } from 'antd';
import React, { useState } from 'react';

import { useRedditStore } from '../store/reddit';

const RedditChatInput: React.FC = () => {
  const { selectedArticle, sendMessage, loading } = useRedditStore();
  const [value, setValue] = useState('');

  const handleSend = async () => {
    if (!value.trim()) return;
    if (!selectedArticle) return;
    await sendMessage(value);
    setValue('');
  };

  return (
    <div
      style={{
        alignItems: 'center',
        background: '#fff',
        borderTop: '1px solid #eee',
        bottom: 0,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        gap: 12,
        left: 0,
        padding: '16px 24px',
        position: 'sticky',
        width: '100%',
        zIndex: 10,
      }}
    >
      <Input.TextArea
        disabled={loading || !selectedArticle}
        onChange={(e) => setValue(e.target.value)}
        onPressEnter={(e) => {
          if (!e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="輸入訊息..."
        rows={1}
        style={{
          alignItems: 'center',
          background: '#fafbfc',
          border: '1px solid #e5e6eb',
          borderRadius: 8,
          boxShadow: 'none',
          display: 'flex',
          flex: 1,
          fontSize: 16,
          height: 44,
          lineHeight: '24px',
          marginRight: 8,
          maxHeight: 44,
          minHeight: 44,
          padding: '10px 14px',
          resize: 'none',
          transition: 'border-color 0.2s',
        }}
        value={value}
      />
      <Button
        disabled={!value.trim() || !selectedArticle}
        loading={loading}
        onClick={handleSend}
        style={{
          alignItems: 'center',
          borderRadius: 8,
          display: 'flex',
          fontSize: 16,
          fontWeight: 600,
          height: 44,
          padding: '0 24px',
        }}
        type="primary"
      >
        發送
      </Button>
    </div>
  );
};

export default RedditChatInput;
