export interface Post {
  id: string;
  title: string;
  content: string;
  category: 'notice' | 'success' | 'guide';
  date: string;
  imageUrl?: string;
}

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  contactPhone: string;
  address: string;
  kakaoUrl: string;
}

export type ViewMode = 'user' | 'admin';
