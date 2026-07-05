/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProgramDetail {
  id: string;
  num: string;
  title: string;
  imageUrl: string;
  bullets: string[];
  description: string;
}

export interface TargetAudience {
  id: string;
  title: string;
  iconName: string;
  description: string;
}

export interface Advantage {
  id: string;
  title: string;
  iconName: string;
  description: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: "공지사항" | "블로그" | "언론보도" | "교육소식";
  imageUrl?: string;
  isPinned?: boolean;
  views: number;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  program: string;
  message: string;
  status: "접수대기" | "상담완료" | "보류";
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: "AI피부진단" | "피부·헤드스파" | "화장품" | "기타장비";
  price: string;
  imageUrl: string;
  description: string;
  isPopular?: boolean;
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  author: string;
}

export interface WebSiteData {
  siteName: string;
  siteSubtitle: string;
  heroTitle: string;
  heroSub: string;
  heroBadge: string;
  visionTitle: string;
  visionDesc: string;
  visionFormula: {
    part1: string;
    part2: string;
    part3: string;
    part4: string;
    result: string;
  };
  contactPhone: string;
  contactEmail: string;
  representative: string;
  businessNumber: string;
  officeAddress: string;
  instagramUrl: string;
  youtubeUrl: string;
  blogUrl: string;
  
  // Theme and Styling
  primaryColor: string; // purple hex
  secondaryColor: string; // gold hex or silver hex
  backgroundColor: string; // black or slate hex
  fontFamily: "font-sans" | "font-serif" | "font-mono";
  cardStyle: "glow" | "minimal" | "bordered";
}
