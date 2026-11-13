import type {
  Category,
  ContactContent,
  FeaturedCourseContent,
  FinalCtaContent,
  FooterContent,
  HeroContent,
  NavigationContent,
  SectionIntro,
  Step,
  TestimonialContent,
} from "@/types/content";

/**
 * Local mock content for the landing page (the challenge does not require a CMS for copy).
 * Images come from Prismic; see src/lib/prismic/getLandingImages.ts.
 * Links point to in-page sections; "#" marks pages that are out of scope.
 */

export const navigation: NavigationContent = {
  links: [
    { label: "Courses", href: "#courses" },
    { label: "For Teams", href: "#contact" },
    { label: "Community", href: "#community" },
    { label: "About", href: "#how-it-works" },
  ],
  login: { label: "Log in", href: "#" },
  cta: { label: "Start learning", href: "#courses" },
};

export const hero: HeroContent = {
  eyebrow: "Learn at your own pace",
  title: "Build skills that actually move you forward.",
  description:
    "Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.",
  primaryCta: { label: "Explore courses", href: "#courses" },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
  socialProof: { highlight: "Trusted by 24,000+", text: "learners" },
  coursesBadge: { value: "120+", label: "expert-led courses" },
  ratingBadge: { label: "4.9 avg rating" },
};

export const categoriesIntro: SectionIntro = {
  eyebrow: "Find your next skill",
  title: "Learn something worth knowing.",
  description: "Short, practical courses designed around skills you can put to work immediately.",
};

export const categories: Category[] = [
  {
    number: "01",
    title: "Product Design",
    description: "Turn complex problems into clear, useful experiences.",
    href: "#featured",
  },
  {
    number: "02",
    title: "Technology",
    description: "Build a stronger understanding of the tools shaping digital products.",
    href: "#",
  },
  {
    number: "03",
    title: "Business",
    description: "Develop practical skills for better decisions and stronger teams.",
    href: "#",
  },
  {
    number: "04",
    title: "Creative",
    description: "Explore new ways to communicate, create and tell stories.",
    href: "#",
  },
];

export const featuredCourse: FeaturedCourseContent = {
  tag: "Featured course",
  eyebrow: "Most popular this month",
  title: "Designing products people understand.",
  description:
    "Learn how to turn complex workflows into simple, intentional product experiences through research, structure and thoughtful interaction design.",
  instructor: "with Maya Chen · Senior Product Designer",
  details: ["8 lessons", "2h 40min", "Intermediate"],
  primaryCta: { label: "View course", href: "#" },
  secondaryCta: { label: "Browse all courses", href: "#courses" },
};

export const howItWorksIntro: SectionIntro = {
  eyebrow: "How Luma works",
  title: "Less browsing. More learning.",
};

export const steps: Step[] = [
  {
    label: "Step 01",
    title: "Choose your focus",
    description: "Find courses based on the skill you want to build, not endless content categories.",
    icon: "focus",
  },
  {
    label: "Step 02",
    title: "Learn from experience",
    description: "Follow concise lessons created by professionals who use these skills.",
    icon: "experience",
  },
  {
    label: "Step 03",
    title: "Put it into practice",
    description: "Every course includes practical exercises designed to turn knowledge into action.",
    icon: "practice",
  },
];

export const testimonial: TestimonialContent = {
  quote:
    "The lessons are short enough to fit into my week, but detailed enough that I actually leave with something I can use.",
  author: { name: "Alex Morgan", role: "Product Manager" },
  stats: [
    { value: "24K+", label: "active learners" },
    { value: "120+", label: "expert-led courses" },
    { value: "92%", label: "complete their first course" },
  ],
};

export const peopleIntro: SectionIntro & { cta: { label: string; href: string } } = {
  eyebrow: "The people",
  title: "Meet international students & teachers",
  description:
    "Morbi sit egestas dignissim pharetra, sed amet. Tempus justo senectus risus ac vel, velit, nunc. Eget commodo eget in aliquam facilisi facilisi nec magna hendrerit. Placerat ipsum sit tellus urna, faucibus aenean lorem faucibus integer.",
  cta: { label: "Explore teachers and students", href: "#" },
};

export const contact: ContactContent = {
  eyebrow: "Contact",
  title: "Get in touch",
  description:
    "Have a question? We’re here to help. Whether you’re looking for the right course, learning with your team or interested in teaching with Luma, we’d love to hear from you.",
  channels: [
    { label: "Email", value: "contact@luma.com", href: "mailto:contact@luma.com", icon: "icon-chat" },
    { label: "Response Time", value: "Up to 24 hours on business days", icon: "icon-clock" },
  ],
  form: {
    title: "Contact us",
    description: "Fill out the fields and we will get in touch.",
    fields: {
      name: { label: "Full name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "youremail@example.com" },
      question: { label: "Your question", placeholder: "Tell us how we can help..." },
    },
    submit: { label: "Send message", pendingLabel: "Sending…" },
    toast: {
      success: { title: "Message sent!", description: "We’ll get back to you within 24 hours." },
      error: {
        title: "Your message wasn’t sent.",
        description: "Please try again in a moment or email us at contact@luma.com.",
      },
    },
  },
};

export const finalCta: FinalCtaContent = {
  title: "What will you learn next?",
  description: "Start with one course. Build from there.",
  primaryCta: { label: "Explore all courses", href: "#courses" },
  secondaryCta: { label: "Join Luma", href: "#contact" },
};

export const footer: FooterContent = {
  tagline: "Practical learning for curious people.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Courses", href: "#courses" },
        { label: "Categories", href: "#courses" },
        { label: "Instructors", href: "#community" },
        { label: "For Teams", href: "#contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#how-it-works" },
        { label: "Careers", href: "#" },
        { label: "Journal", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#contact" },
        { label: "Contact", href: "#contact" },
        { label: "Terms", href: "#" },
        { label: "Privacy", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 Luma Learning",
};
