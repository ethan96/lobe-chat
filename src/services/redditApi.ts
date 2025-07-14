// Reddit 相關 API 封裝

export const fetchSubs = async () => {
  return fetch('http://127.0.0.1/api/reddit/subs').then((res) => res.json());
};

export const fetchArticles = async (subId: number) => {
  return fetch(`http://127.0.0.1/api/reddit/articles/${subId}`).then((res) => res.json());
};

export const fetchMessages = async (articleId: string) => {
  return fetch(`http://127.0.0.1/api/reddit/messages/${articleId}`).then((res) => res.json());
};

export const sendChat = async (articleId: string, content: string) => {
  return fetch('http://127.0.0.1/api/reddit/chat', {
    body: JSON.stringify({ articleId, content }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  }).then((res) => res.json());
};
