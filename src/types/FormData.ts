
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  github: string;
  portfolio: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
}

export interface TechnicalSkills {
  programmingLanguages: string[];
  frameworks: string[];
  tools: string[];
  databases: string[];
  cloudPlatforms: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  achievements: string[];
}

export interface TargetRole {
  position: string;
  company: string;
  jobDescription: string;
}

export interface FormData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  technicalSkills: TechnicalSkills;
  softSkills: string[];
  projects: Project[];
  targetRole: TargetRole;
}
