
export enum Stage {
  SITEMAP = 'SITEMAP',
  WIREFRAME = 'WIREFRAME',
  STYLE_GUIDE = 'STYLE_GUIDE',
  PRESENTATION = 'PRESENTATION', // New Step 4
  PROGRESS = 'PROGRESS',
}

export interface SitemapNode {
  id: string;
  label: string;
  children?: SitemapNode[];
}

export interface WireframeSection {
  type: 'navbar' | 'hero' | 'features' | 'cta' | 'footer' | 'content' | 'form' | 'header';
  content: string;
  details?: string;
}

export interface WireframePage {
  id: string;
  title: string;
  sections: WireframeSection[];
}

// Full Design System Interface
export interface DesignSystem {
  brand: {
    name: string;
    description: string;
    logoType: 'icon' | 'wordmark' | 'combined';
  };
  colors: {
    primary: string; // Navy
    secondary: string; // Orange
    surface: string; // Backgrounds
    text: {
      primary: string;
      secondary: string;
      light: string;
    };
    semantic: {
      success: string;
      error: string;
      warning: string;
    };
  };
  typography: {
    fontHeading: string;
    fontBody: string;
    scale: {
      h1: string;
      h2: string;
      h3: string;
      body: string;
      caption: string;
    }
  };
  components: {
    borderRadius: string; // e.g., '0.5rem' or '16px'
    buttonStyle: 'rounded' | 'pill' | 'sharp';
    cardStyle: 'flat' | 'elevated' | 'bordered';
  };
  assets: {
    iconStyle: 'outline' | 'solid' | 'duotone';
    imageStyle: 'natural' | 'filtered' | 'collage';
  };
}

export type PaymentStatus = 'Paid' | 'Pending';

export interface PaymentInfo {
  amount: number;
  status: PaymentStatus;
}

export interface Task {
  id: string;
  name: string;
  status: string;
  date: string;
  payment?: PaymentInfo;
}

export interface ProjectData {
  name: string;
  description: string;
  sitemap: SitemapNode;
  wireframes: WireframePage[];
  designSystem: DesignSystem; // Renamed from styleGuide
}