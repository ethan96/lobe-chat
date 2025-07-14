
export interface CustomTopic {
  createdAt: string;
  description?: string;
  id: string;
  messageCount: number;
  title: string;
  updatedAt: string;
}

export interface CustomMessage {
  content: string;
  id: string;
  metadata?: any;
  role: 'user' | 'assistant';
  timestamp: string;
  topicId: string;
}

export class CustomTopicsService {
  private apiBaseUrl: string;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  // 获取预定义话题列表
  async getTopicsList(): Promise<CustomTopic[]> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/topics`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch topics: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching topics:', error);
      throw error;
    }
  }

  // 获取指定话题的对话记录
  async getTopicMessages(topicId: string): Promise<CustomMessage[]> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/topics/${topicId}/messages`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  // 保存新的消息到话题
  async saveMessage(
    topicId: string,
    message: Omit<CustomMessage, 'id' | 'timestamp'>,
  ): Promise<CustomMessage> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/topics/${topicId}/messages`, {
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Failed to save message: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  }
}
