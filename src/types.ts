export type View = 'dashboard' | 'identity' | 'password' | 'assistant' | 'news';

export interface SecurityEvent {
  id: string;
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  description: string;
  timestamp: string;
}

export interface PasswordScore {
  score: number;
  suggestions: string[];
  crackTime: string;
}
