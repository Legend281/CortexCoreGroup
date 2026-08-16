export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  category: "Leadership" | "Engineering" | "Design" | "Management";
  techStack: string[];
  socials: {
    linkedin?: string;
    github?: string;
    email?: string;
    whatsapp?: string;
    portfolio?: string;
  };
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Randy Ojong",
    role: "Founder & CEO / Lead Full Stack Dev",
    category: "Leadership",
    bio: "Visionary technology leader with 10+ years of experience architecting enterprise digital solutions and leading high-impact engineering teams.",
    image: "/images/team/randy-ojong.jpg",
    techStack: ["Next.js", "TypeScript", "Node.js", "System Architecture", "Cloud Strategy"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "randy@cortexcoregroup.com",
      whatsapp: "+237612345678",
    },
  },
  {
    id: "2",
    name: "Precious Acha",
    role: "CTO",
    category: "Leadership",
    bio: "Expert cloud architect and infrastructure strategist specializing in high-scalability platforms, DevOps pipelines, and AI integration.",
    image: "/images/team/precious-acha.jpeg",
    techStack: ["AWS", "Kubernetes", "Docker", "Python", "DevOps"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "precious@cortexcoregroup.com",
    },
  },
  {
    id: "3",
    name: "Mai Randy",
    role: "Head of Design",
    category: "Design",
    bio: "Passionate product designer focused on creating intuitive, human-centered UI/UX design systems and sleek modern digital aesthetics.",
    image: "/images/team/mai-randy.jpeg",
    techStack: ["Figma", "UI/UX Design", "Design Systems", "Prototyping", "Motion Design"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      portfolio: "https://dribbble.com",
      email: "mai@cortexcoregroup.com",
    },
  },
  {
    id: "4",
    name: "Ngum Caleb",
    role: "Project Manager",
    category: "Management",
    bio: "Agile project delivery leader ensuring seamless cross-functional team execution, on-time project milestones, and client satisfaction.",
    image: "/images/team/ngum-caleb.jpeg",
    techStack: ["Agile/Scrum", "Jira", "Risk Management", "Client Relations"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "ngum@cortexcoregroup.com",
    },
  },
  {
    id: "5",
    name: "Ayamelack Fotsa",
    role: "AI Engineer",
    category: "Engineering",
    bio: "Machine learning researcher and data engineer crafting predictive models, LLM integrations, and custom AI analytics engines.",
    image: "/images/team/ayamelack-fotsa.jpeg",
    techStack: ["PyTorch", "TensorFlow", "Python", "LLMs", "Data Pipelines"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "ayamelack@cortexcoregroup.com",
    },
  },
  {
    id: "6",
    name: "Jason Mbi",
    role: "Backend Developer",
    category: "Engineering",
    bio: "High-performance backend engineer specialized in RESTful & GraphQL APIs, distributed database management, and microservice architectures.",
    image: "",
    techStack: ["Node.js", "PostgreSQL", "Go", "Redis", "GraphQL"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "jason@cortexcoregroup.com",
    },
  },
];
