import {
    Code2,
    GraduationCap,
    Briefcase,
    Award,
    Rocket,
    Heart,
    Coffee,
    BookOpen,
    Zap,
    Database,
    Server,
    Cloud,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

export const SKILLS_CATEGORY = [
   {
    title: 'Frontend',
    icon: Code2,
    description: 'Crafting beautiful, responsive user interface',
    skills: [
        { name: 'React', level: 95, color: 'bg-blue-500' },
        { name: 'TypeScript', level: 90, color: 'bg-blue-600' },
        { name: 'Next.js', level: 88, color: 'bg-gray-500' },
        { name: 'Tailwind CSS', level: 92, color: 'bg-cyan-500' },
        { name: 'Framer Motion', level: 85, color: 'bg-pink-500' },
    ],
  },
   {
    title: 'Backend',
    icon: Server,
    description: 'Building robust server side solutions',
    skills: [
        { name: 'Node.js', level: 90, color: 'bg-blue-500' },
        { name: 'Express.js', level: 88, color: 'bg-gray-700' },
        { name: 'Python', level: 85, color: 'bg-yellow-500' },
        { name: 'GraphQL', level: 80, color: 'bg-pink-600' },
        { name: 'REST APIs ', level: 92, color: 'bg-orange-500' },
    ],
  },
   {
    title: 'Database',
    icon: Database,
    description: 'Managing and optimising data storage',
    skills: [
        { name: 'MongoDB', level: 88, color: 'bg-green-700' },
        { name: 'MongoDb', level: 85, color: 'bg-blue-700' },
        { name: 'Redis', level: 80, color: 'bg-red-500' },
        { name: 'Prisma', level: 82, color: 'bg-indigo-600' },
        { name: 'Firebase', level: 78, color: 'bg-yellow-700' },
    ],
  },
   {
    title: 'DevOps',
    icon: Cloud,
    description: 'Deploying and scaling applications',
    skills: [
        { name: 'Docker', level: 82, color: 'bg-blue-600' },
        { name: 'AWS', level: 78, color: 'bg-orange-600' },
        { name: 'Vercel', level: 90, color: 'bg-gray-900' },
        { name: 'Git', level: 95, color: 'bg-orange-700' },
        { name: 'CI/CD', level: 75, color: 'bg-purple-600' },
    ],
  },
];

export const TECH_STACK = [
    'JavaScript',
    'HTML5',
    'CSS3',
    'Sass',
    'Webpack',
    'Vite',
    'Jest',
    'Cypress',
    'Figma',
    'Adobe XD',
    'Notion',
    'Slack',
]

export const STATS = [
    { number: '50+', label: 'Projects Completed' },
    { number: '3+', label: 'Years Experienced' },
    { number: '20+', label: 'Technologies' },
    { number: '100%', label: 'Client Satisfaction' },
];

export const PROJECTS = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with advanced filtering, payment integration',
        image: '/images/projects/project1.jpg',
        tags: ['React', 'Tailwind', 'Framer motion'],
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        category: 'Full Stack',
    },
    {
        id: 2,
        title: 'Blog App with AI Post Generator',
        description: 'A full-stack blog app using the MERN stack - with full Markdown support, tags and AI post generation' ,
        image: '/images/projects/project2.jpg',
        tags: ['React', 'Node.js', 'MongoDb', 'Tailwind'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true,
        category: 'Full Stack',
    },
    {
        id: 3,
        title: 'Task Management App',
        description: 'A collaborative tool with real time updates, team chat' ,
        image: '/images/projects/project3.jpg',
        tags: ['Next.js', 'TypeScript', 'Node.js', 'MongoDb'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true,
        category: 'Web App',
    },
    {
        id: 4,
        title: 'AI powered interview prep app',
        description: 'A smart AI powered interview preparation app using the MERN stack -along with other technologies ',
        image: '/images/projects/project4.jpg',
        tags: ['Next.js', 'TypeScript', 'Node.js', 'MongoDb'],
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        category: 'Web App',
    },
    {
        id: 5,
        title: 'Resume Builder App',
        description: 'A fully functional resume builder App, built using the MERN stack along with Tailwind css ',
        image: '/images/projects/project5.jpg',
        tags: ['Next.js', 'TypeScript', 'Node.js', 'MongoDb', 'Tailwind'],
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        category: 'Web App',
    },
    {
        id: 6,
        title: 'Expense Tracker App',
        description: 'This app includes user authentication with JWT, income and expense tracking, and statement collation',
        image: '/images/projects/project6.jpg',
        tags: ['Next.js', 'TypeScript', 'Node.js', 'MongoDb', 'Tailwind', 'JWT'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true,
        category: 'Web App',
    },
];

export const JOURNEY_STEPS = [
    {
        year: '2021',
        title: 'Started Coding Journey',
        company: 'Self-Taught',
        description: 'Began learning web development with HTL CSS and JavaScript. Built my first ',
        icon: Code2,
        color: 'bg-indigo-500',
    },
    {
        year: '2022',
        title: 'First Internship',
        company: 'TechStart Inc.',
        description: 'Joined as a front end intern , working with React and learning modern development ',
        icon: Briefcase,
        color: 'bg-green-500',
    },
    {
        year: '2022',
        title: 'Computer Science Degree',
        company: 'University of Technology.',
        description: 'Joined as a front end intern , working with React and learning modern development ',
        icon: GraduationCap,
        color: 'bg-purple-500',
    },
    {
        year: '2023',
        title: 'Full Stack Developer',
        company: 'Digital Solutions Ltd.',
        description: 'Promoted to full-time developer role ',
        icon: Rocket,
        color: 'bg-orange-500',
    },
    {
        year: '2024',
        title: 'Freelance and Open Source',
        company: 'Independent',
        description: 'Started freelancing and contributing to open source projects.',
        icon: Award,
        color: 'bg-pink-500',
    },
    {
        year: '2025',
        title: 'Senior Develper',
        company: 'Present',
        description: 'Currently building innovative solutions and exploring innovative solutions and exploring new technologies.',
        icon: Zap,
        color: 'bg-cyan-500',
    },
];

export const PASSIONS = [
    {
        icon: Heart,
        title: 'User Experience',
        description: 'Crafting intuitive interfaces that users love.',
    },
    {
        icon: Coffee,
        title: 'Problem Solving',
        description: 'Turning complex challenges into elegant solutions.',
    },
    {
        icon: BookOpen,
        title: 'Continuous Learning',
        description: 'Always exploring new technologies and best practices.',
    },
];

export const SOCIAL_LINKS = [
    {
        name: 'GitHub',
        icon: FiGithub,
        url: 'https://github.com',
        color: 'hover:text-gray-400',
        bgColor: 'hover:bg-gray-800',
    },
    {
        name: 'LinkedIn',
        icon: FiLinkedin,
        url: 'https://linkedin.com',
        color: 'hover:text-blue-400',
        bgColor: 'hover:bg-blue-500/10',
    },
    {
        name: 'Twitter',
        icon: FiTwitter,
        url: 'https://twitter.com',
        color: 'hover:text-sky-400',
        bgColor: 'hover:bg-sky-500/10',
    },
    {
        name: 'Email',
        icon: Mail,
        url: 'mailto:acetaiwo8@gmail.com',
        color: 'hover:text-green-400',
        bgColor: 'hover:bg-green-500/10',
    },
]

export const CONTACT_INFO = [
    {
        icon: MapPin,
        label: 'Location',
        value: 'Jos, Plateau State Nigeria.',
    },
    {
        icon: Phone,
        label: 'Phone',
        value: '+234 813 6546 116',
    },
    {
        icon: Mail,
        label: 'Email',
        value: 'acetaiwo8@gmail.com',
    },
];