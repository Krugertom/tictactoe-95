export interface AboutContent {
  title: string;
  introduction: string;
  background: string;
  experience: {
    title: string;
    items: string[];
  };
  interests: {
    title: string;
    items: string[];
  };
  contact: {
    email: string;
    github: string;
  };
}

export interface SiteSettings {
  siteName: string;
  description: string;
  startupImage: string;
  backgroundImage: string;
  features: {
    enableSounds: boolean;
    enableAnimations: boolean;
    maxStoredGames: number;
  };
}

class ContentService {
  private cache: Map<string, any> = new Map();

  async getAboutContent(): Promise<AboutContent> {
    return this.fetchContent<AboutContent>('/content/about.json');
  }

  async getSiteSettings(): Promise<SiteSettings> {
    return this.fetchContent<SiteSettings>('/content/settings.json');
  }

  private async fetchContent<T>(path: string): Promise<T> {
    if (this.cache.has(path)) {
      return this.cache.get(path) as T;
    }

    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
      }
      const data = await response.json();
      this.cache.set(path, data);
      return data as T;
    } catch (error) {
      console.error(`Error loading content from ${path}:`, error);
      throw error;
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const contentService = new ContentService();
