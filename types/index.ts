export interface StatItem {
  value: string;
  label: string;
}

export interface SolutionItem {
  type: string;
  title: string;
  description: string;
  features: string[];
}

export interface CaseItem {
  title: string;
  company: string;
  tag: string;
  problem: string;
  solution: string;
  description: string;
  metricsShort: string;
  link?: string;
  gradient: string;
  tech: string[];
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  avatar: string;
  avatarColor: string;
  rating: number;
  text: string;
  project: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  duration: string;
}

export interface Guarantee {
  title: string;
  desc: string;
}

export interface TechStackItem {
  title: string;
  content: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export type Locale = 'es' | 'en';
