export interface ProjectItem {
  id: string;
  number: string;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  likeCount: number;
  rating: number;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  link: string;
}

export const PROJECTS: ProjectItem[] = [
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
    testimonial: {
      quote: "FoodOps has transformed the way we run our restaurant operations.",
      author: "Sarah M.",
      role: "Restaurant Owner",
    },
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
    testimonial: {
      quote: "SmartMeal AI helped me eat better and save more. Highly recommend!",
      author: "Praise F.",
      role: "App User",
    },
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
    testimonial: {
      quote: "PaySwift made our transactions faster, safer and more reliable.",
      author: "Daniel K.",
      role: "Business Owner",
    },
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
    testimonial: {
      quote: "Our customers love the smooth experience and modern design.",
      author: "James T.",
      role: "CEO StyleHub",
    },
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
    testimonial: {
      quote: "SmartHome IoT gave us full control and peace of mind.",
      author: "Homeowner",
      role: "Verified Client",
    },
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
    testimonial: {
      quote: "EduLearn LMS has simplified our school operations greatly.",
      author: "Admin",
      role: "Greenfield College",
    },
    link: "/our-work/edulearn-lms",
  },
];
