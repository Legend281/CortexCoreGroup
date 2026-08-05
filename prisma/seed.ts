import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const ROLES = [
  { name: "OWNER", description: "System Owner with full access" },
  { name: "SUPER_ADMIN", description: "Super Administrator" },
  { name: "DEVELOPER", description: "Software Developer" },
  { name: "HR", description: "Human Resources Manager" },
  { name: "FINANCE", description: "Finance and Billing Manager" },
  { name: "MARKETING", description: "Marketing Manager" },
  { name: "CONTENT_WRITER", description: "Blog and Content Writer" },
  { name: "SUPPORT", description: "Support Representative" },
  { name: "GUEST", description: "Guest User" },
  { name: "READ_ONLY", description: "Read Only Access" }
];

const SERVICES = [
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

const PROJECTS = [
  {
    id: "foodops-dashboard",
    number: "01",
    category: "Web Applications",
    categoryLabel: "WEB APPLICATION",
    title: "FoodOps Dashboard",
    description: "An intelligent restaurant management platform that streamlines orders, tracks sales, manages menu and provides real-time analytics for smarter business decisions.",
    image: "/images/projects/foodops-dashboard.png",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    likeCount: 124,
    rating: 5,
    testimonialQuote: "FoodOps has transformed the way we run our restaurant operations.",
    testimonialAuthor: "Sarah M.",
    testimonialRole: "Restaurant Owner",
    link: "/our-work/foodops-dashboard",
  },
  {
    id: "smartmeal-ai",
    number: "02",
    category: "Mobile Apps",
    categoryLabel: "MOBILE APPLICATION",
    title: "SmartMeal AI",
    description: "A smart meal recommendation app that suggests personalized recipes based on budget, nutrition, preferences and available ingredients using AI.",
    image: "/images/projects/smartmeal-ai.png",
    techStack: ["Flutter", "Firebase", "Dart", "TensorFlow Lite"],
    likeCount: 98,
    rating: 5,
    testimonialQuote: "SmartMeal AI helped me eat better and save more. Highly recommend!",
    testimonialAuthor: "Praise F.",
    testimonialRole: "App User",
    link: "/our-work/smartmeal-ai",
  },
  {
    id: "payswift",
    number: "03",
    category: "Systems",
    categoryLabel: "FINTECH PLATFORM",
    title: "PaySwift",
    description: "A secure fintech solution for effortless digital payments, transfers, bill payments and financial analytics for individuals and businesses.",
    image: "/images/projects/payswift.png",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Chart.js"],
    likeCount: 156,
    rating: 5,
    testimonialQuote: "PaySwift made our transactions faster, safer and more reliable.",
    testimonialAuthor: "Daniel K.",
    testimonialRole: "Business Owner",
    link: "/our-work/payswift",
  },
  {
    id: "stylehub",
    number: "04",
    category: "E-Commerce",
    categoryLabel: "E-COMMERCE PLATFORM",
    title: "StyleHub",
    description: "A modern e-commerce platform offering a seamless shopping experience with advanced product filtering, secure payments and real-time order tracking.",
    image: "/images/projects/stylehub.png",
    techStack: ["React", "MongoDB", "Stripe", "Tailwind CSS"],
    likeCount: 87,
    rating: 5,
    testimonialQuote: "Our customers love the smooth experience and modern design.",
    testimonialAuthor: "James T.",
    testimonialRole: "CEO StyleHub",
    link: "/our-work/stylehub",
  },
  {
    id: "smarthome-iot",
    number: "05",
    category: "IoT Solutions",
    categoryLabel: "IOT SOLUTION",
    title: "SmartHome IoT",
    description: "An IoT platform for smart home automation, device monitoring, energy management and real-time alerts and notifications.",
    image: "/images/projects/smarthome-iot.png",
    techStack: ["Flutter", "Firebase", "IoT", "MQTT"],
    likeCount: 72,
    rating: 5,
    testimonialQuote: "SmartHome IoT gave us full control and peace of mind.",
    testimonialAuthor: "Homeowner",
    testimonialRole: "Verified Client",
    link: "/our-work/smarthome-iot",
  },
  {
    id: "edulearn-lms",
    number: "06",
    category: "Dashboards",
    categoryLabel: "WEB APPLICATION",
    title: "EduLearn LMS",
    description: "A comprehensive learning management system for schools and institutions to manage courses, students, exams and results efficiently.",
    image: "/images/projects/edulearn-lms.png",
    techStack: ["Laravel", "MySQL", "Vue.js", "Tailwind CSS"],
    likeCount: 65,
    rating: 5,
    testimonialQuote: "EduLearn LMS has simplified our school operations greatly.",
    testimonialAuthor: "Admin",
    testimonialRole: "Greenfield College",
    link: "/our-work/edulearn-lms",
  },
];

const TEAM_MEMBERS = [
  {
    id: "1",
    name: "Randy Ojong",
    role: "Founder & CEO / Lead Full Stack Dev",
    category: "Leadership",
    bio: "Visionary technology leader with 10+ years of experience architecting enterprise digital solutions and leading high-impact engineering teams.",
    image: "/images/team/randy-ojong.jpg",
    techStack: ["Next.js", "TypeScript", "Node.js", "System Architecture", "Cloud Strategy"],
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "randy@cortexcoregroup.com",
    whatsapp: "+237612345678",
  },
  {
    id: "2",
    name: "Brenda Ngang",
    role: "CTO",
    category: "Leadership",
    bio: "Expert cloud architect and infrastructure strategist specializing in high-scalability platforms, DevOps pipelines, and AI integration.",
    image: "/images/team/brenda-ngang.jpg",
    techStack: ["AWS", "Kubernetes", "Docker", "Python", "DevOps"],
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "brenda@cortexcoregroup.com",
  },
  {
    id: "3",
    name: "David Takor",
    role: "Head of Design",
    category: "Design",
    bio: "Passionate product designer focused on creating intuitive, human-centered UI/UX design systems and sleek modern digital aesthetics.",
    image: "/images/team/david-takor.jpg",
    techStack: ["Figma", "UI/UX Design", "Design Systems", "Prototyping", "Motion Design"],
    linkedin: "https://linkedin.com",
    portfolio: "https://dribbble.com",
    email: "david@cortexcoregroup.com",
  },
  {
    id: "4",
    name: "Linda Ngono",
    role: "Project Manager",
    category: "Management",
    bio: "Agile project delivery leader ensuring seamless cross-functional team execution, on-time project milestones, and client satisfaction.",
    image: "/images/team/linda-ngono.jpg",
    techStack: ["Agile/Scrum", "Jira", "Risk Management", "Client Relations"],
    linkedin: "https://linkedin.com",
    email: "linda@cortexcoregroup.com",
  },
  {
    id: "5",
    name: "Martin Ndifon",
    role: "AI Engineer",
    category: "Engineering",
    bio: "Machine learning researcher and data engineer crafting predictive models, LLM integrations, and custom AI analytics engines.",
    image: "/images/team/martin-ndifon.jpg",
    techStack: ["PyTorch", "TensorFlow", "Python", "LLMs", "Data Pipelines"],
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "martin@cortexcoregroup.com",
  },
  {
    id: "6",
    name: "Jason Mbi",
    role: "Backend Developer",
    category: "Engineering",
    bio: "High-performance backend engineer specialized in RESTful & GraphQL APIs, distributed database management, and microservice architectures.",
    image: "/images/team/jason-mbi.jpg",
    techStack: ["Node.js", "PostgreSQL", "Go", "Redis", "GraphQL"],
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "jason@cortexcoregroup.com",
  },
];

const TESTIMONIALS = [
  {
    quote: "Cortex Core Group delivered beyond our expectations. Their innovative approach and professionalism are unmatched.",
    author: "CEO, TechNova Solutions",
    initial: "T",
    rating: 5,
  },
  {
    quote: "Their team transformed our idea into a powerful digital solution. We've seen real growth since launch!",
    author: "Product Manager, FinEdge",
    initial: "F",
    rating: 5,
  },
  {
    quote: "Reliable, creative and results-driven. Cortex Core Group is our go-to technology partner.",
    author: "CTO, Nexora Systems",
    initial: "N",
    rating: 5,
  },
];

async function main() {
  console.log("Seed started...");

  // Seed Roles
  console.log("Seeding roles...");
  for (const role of ROLES) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: {
        name: role.name,
        description: role.description,
      },
    });
  }

  // Seed Services
  console.log("Seeding services...");
  for (const service of SERVICES) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {
        number: service.number,
        title: service.title,
        description: service.description,
        tags: service.tags,
        iconName: service.iconName,
      },
      create: service,
    });
  }

  // Seed Projects
  console.log("Seeding projects...");
  for (const project of PROJECTS) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: {
        number: project.number,
        category: project.category,
        categoryLabel: project.categoryLabel,
        title: project.title,
        description: project.description,
        image: project.image,
        techStack: project.techStack,
        likeCount: project.likeCount,
        rating: project.rating,
        testimonialQuote: project.testimonialQuote,
        testimonialAuthor: project.testimonialAuthor,
        testimonialRole: project.testimonialRole,
        link: project.link,
      },
      create: project,
    });
  }

  // Seed Team Members
  console.log("Seeding team members...");
  for (const member of TEAM_MEMBERS) {
    await prisma.teamMember.upsert({
      where: { id: member.id },
      update: {
        name: member.name,
        role: member.role,
        category: member.category,
        bio: member.bio,
        image: member.image,
        techStack: member.techStack,
        linkedin: member.linkedin,
        github: member.github,
        email: member.email,
        whatsapp: member.whatsapp,
      },
      create: member,
    });
  }

  // Seed Testimonials
  console.log("Seeding testimonials...");
  // Clear testimonials first to avoid duplicates (they don't have unique natural IDs)
  await prisma.testimonial.deleteMany({});
  for (const testimonial of TESTIMONIALS) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
