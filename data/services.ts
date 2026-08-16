export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  iconName: string;
  image?: string | null;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "software-dev",
    number: "01",
    title: "Software Development",
    description: "Custom software solutions built with modern technologies for web, mobile, and desktop applications.",
    tags: ["Web", "API", "SaaS"],
    iconName: "Code2",
  },
  {
    id: "cloud-solutions",
    number: "02",
    title: "Cloud Solutions",
    description: "Scalable, secure and cost-effective cloud solutions that drive agility and business continuity.",
    tags: ["AWS", "Azure", "GCP"],
    iconName: "Cloud",
  },
  {
    id: "cybersecurity",
    number: "03",
    title: "Cybersecurity",
    description: "Protecting your digital assets with advanced security strategies and 24/7 threat monitoring.",
    tags: ["Security", "IAM", "SOC"],
    iconName: "ShieldCheck",
  },
  {
    id: "data-ai",
    number: "04",
    title: "Data & AI Solutions",
    description: "Transform data into intelligence with AI, machine learning, and advanced analytics.",
    tags: ["AI", "ML", "Analytics"],
    iconName: "BarChart3",
  },
  {
    id: "mobile-app",
    number: "05",
    title: "Mobile App Development",
    description: "User-centric mobile applications that deliver seamless experiences across platforms.",
    tags: ["iOS", "Android", "Flutter"],
    iconName: "Smartphone",
  },
  {
    id: "it-consulting",
    number: "06",
    title: "IT Consulting",
    description: "Strategic technology consulting to optimize processes and accelerate digital transformation.",
    tags: ["Strategy", "IT", "DX"],
    iconName: "Settings2",
  },
  {
    id: "uiux-design",
    number: "07",
    title: "UI/UX Design",
    description: "Beautiful, intuitive and impactful designs that create memorable user experiences.",
    tags: ["UI/UX", "Design", "Prototyping"],
    iconName: "Infinity",
  },
  {
    id: "project-management",
    number: "08",
    title: "Project Management",
    description: "End-to-end project management ensuring delivery on time, within scope and budget.",
    tags: ["Agile", "Scrum", "PMP"],
    iconName: "Briefcase",
  },
  {
    id: "iot-solutions",
    number: "09",
    title: "IoT Solutions",
    description: "Smart IoT solutions that connect devices, collect data and improve operational efficiency.",
    tags: ["IoT", "Sensors", "Edge"],
    iconName: "Wifi",
  },
  {
    id: "cctv-camera",
    number: "10",
    title: "CCTV & Camera Installation",
    description: "Professional CCTV and surveillance systems for homes, businesses and enterprises.",
    tags: ["CCTV", "IP Camera", "Security"],
    iconName: "Camera",
  },
  {
    id: "devops-engineering",
    number: "11",
    title: "DevOps Engineering",
    description: "Streamline development and operations with CI/CD, automation and infrastructure as code.",
    tags: ["CI/CD", "Docker", "K8s"],
    iconName: "GitBranch",
  },
  {
    id: "data-engineering",
    number: "12",
    title: "Data Engineering",
    description: "Build robust data pipelines, warehouses and ETL processes for reliable data infrastructure.",
    tags: ["ETL", "Warehouse", "Big Data"],
    iconName: "Database",
  },
  {
    id: "digital-marketing",
    number: "13",
    title: "Digital Marketing",
    description: "Data-driven marketing strategies that boost brand visibility and drive growth.",
    tags: ["SEO", "Ads", "Analytics"],
    iconName: "Megaphone",
  },
  {
    id: "system-integration",
    number: "14",
    title: "System Integration",
    description: "Integrate systems and technologies to ensure seamless workflows and maximum productivity.",
    tags: ["API", "Middleware", "ERP"],
    iconName: "Monitor",
  },
  {
    id: "blockchain-solutions",
    number: "15",
    title: "Blockchain Solutions",
    description: "Secure and transparent blockchain applications for modern business use cases.",
    tags: ["Blockchain", "DeFi", "Smart Contract"],
    iconName: "Boxes",
  },
  {
    id: "support-maintenance",
    number: "16",
    title: "Support & Maintenance",
    description: "Reliable support and maintenance services to keep your systems running smoothly.",
    tags: ["Support", "Monitoring", "SLA"],
    iconName: "Headphones",
  },
];
