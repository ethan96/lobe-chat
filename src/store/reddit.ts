import { create } from 'zustand';

import { fetchArticles, fetchMessages, fetchSubs, sendChat } from '../services/redditApi';

interface Sub {
  displayName: string;
  fullName: string;
  subId: number;
}

interface Article {
  articleId: string;
  title: string;
}

interface Message {
  content: string;
  messageId: string;
  messageRole: 'user' | 'system' | 'assistant';
}

interface RedditState {
  articles: Article[];
  loadSubs: () => Promise<void>;
  loading: boolean;
  messages: Message[];
  selectArticle: (articleId: string) => Promise<void>;
  selectSub: (subId: number) => Promise<void>;
  selectedArticle: string | null;
  selectedSub: number | null;
  sendMessage: (content: string) => Promise<void>;
  subs: Sub[];
}

export const useRedditStore = create<RedditState>((set: any, get: any) => ({
  articles: [],
  loadSubs: async () => {
    set({ loading: true });
    const subs = await fetchSubs();
    set({ loading: false, subs });
  },
  loading: false,
  messages: [],
  selectArticle: async (articleId: string) => {
    set({ loading: true, messages: [], selectedArticle: articleId });
    const messages = await fetchMessages(articleId);
    set({ loading: false, messages });
  },
  selectSub: async (subId: number) => {
    set({ articles: [], loading: true, messages: [], selectedArticle: null, selectedSub: subId });
    const articles = await fetchArticles(subId);
    set({ articles, loading: false });
  },
  selectedArticle: null,
  selectedSub: null,
  sendMessage: async (content: string) => {
    const { selectedArticle } = get();
    if (!selectedArticle) return;
    set({ loading: true });
    await sendChat(selectedArticle, content);
    // 重新載入訊息
    const messages = await fetchMessages(selectedArticle);
    set({ loading: false, messages });
  },
  subs: [],
}));
