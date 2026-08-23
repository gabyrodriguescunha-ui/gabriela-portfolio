export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  status: 'completed' | 'in-progress' | 'planned';
}
