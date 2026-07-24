export interface Skill {
  name: string;
  logo: string;
  category: string;
  proficiency: number;
  experience: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  techStack: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudy?: string;
  timeline: string;
  challenges: string[];
  futureImprovements: string[];
  achievements: string[];
  status: 'completed' | 'in-progress' | 'planned';
  tags: string[];
  featured: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  type: 'internship' | 'freelance' | 'open-source' | 'leadership' | 'volunteer' | 'teaching' | 'research';
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
  certificateUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  cgpa?: string;
  coursework: string[];
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
  skills: string[];
  proofUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: 'hackathon' | 'competition' | 'coding-contest' | 'award' | 'scholarship' | 'public-speaking' | 'leadership' | 'research';
  date: string;
  description: string;
  image?: string;
}

export interface CodingProfile {
  platform: string;
  username: string;
  url: string;
  stats: {
    problemsSolved?: number;
    rating?: number;
    badges?: string[];
    streak?: number;
    contributions?: number;
    followers?: number;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
  url?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  taglines: string[];
  email: string;
  phone: string;
  location: string;
  availability: string;
  about: {
    photo: string;
    introduction: string;
    careerObjective: string;
    passion: string;
    interests: string[];
    strengths: string[];
    languages: string[];
  };
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  codingProfiles: CodingProfile[];
  services: Service[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  socialLinks: SocialLink[];
  resumeUrl: string;
  stats: {
    projects: number;
    internships: number;
    certificates: number;
    problemsSolved: number;
    githubCommits: number;
    technologies: number;
    experienceYears: number;
  };
}
