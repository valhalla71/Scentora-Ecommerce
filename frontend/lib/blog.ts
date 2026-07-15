// Blog and marketing content mock data

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  image: string;
  readingTime: number;
  relatedPostIds: string[];
}

export interface PromotionalBanner {
  id: string;
  title: string;
  description: string;
  callToAction: string;
  link: string;
  position: "top" | "middle" | "bottom";
  type: "seasonal" | "featured" | "sale" | "new_collection";
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: "blog-001",
    slug: "best-fragrances-summer-2026",
    title: "The Best Fragrances for Summer 2026",
    excerpt: "Discover the perfect light and fresh fragrances to keep you cool and confident through the hot months.",
    content: "Summer calls for fragrances that are fresh, light, and energizing. Our collection features the best warm-weather scents that won't overpower. From citrus blends to aquatic notes, find your perfect summer signature scent.",
    author: "Sarah Mitchell",
    publishDate: "2026-07-15",
    category: "Fragrance Guide",
    tags: ["summer", "fresh", "citrus", "aquatic"],
    image: "blog-summer",
    readingTime: 5,
    relatedPostIds: ["blog-002", "blog-003"],
  },
  {
    id: "blog-002",
    slug: "fragrance-notes-explained",
    title: "Understanding Fragrance Notes: A Beginner's Guide",
    excerpt: "Learn about top, heart, and base notes and how they work together to create the perfect scent experience.",
    content: "Every fragrance tells a story through its notes. Top notes create the first impression, heart notes develop the character, and base notes provide the lasting foundation. Understanding these layers helps you find fragrances you'll love.",
    author: "James Chen",
    publishDate: "2026-07-12",
    category: "Education",
    tags: ["fragrance", "notes", "beginner", "guide"],
    image: "blog-notes",
    readingTime: 8,
    relatedPostIds: ["blog-001", "blog-004"],
  },
  {
    id: "blog-003",
    slug: "how-to-make-perfume-last-longer",
    title: "How to Make Your Fragrance Last Longer",
    excerpt: "Expert tips and tricks to maximize the longevity of your favorite scents throughout the day.",
    content: "Want your fragrance to last all day? Apply to pulse points, moisturize your skin, and layer with complementary products. Discover professional techniques to extend fragrance wear time and get more from every spray.",
    author: "Emma Rodriguez",
    publishDate: "2026-07-10",
    category: "Tips & Tricks",
    tags: ["longevity", "application", "tips", "fragrance-care"],
    image: "blog-longevity",
    readingTime: 4,
    relatedPostIds: ["blog-002", "blog-005"],
  },
  {
    id: "blog-004",
    slug: "luxury-fragrances-investment",
    title: "Are Luxury Fragrances Worth the Investment?",
    excerpt: "Explore the value proposition of premium fragrances and what makes them different from mass-market options.",
    content: "Luxury fragrances offer superior ingredients, unique compositions, and exceptional longevity. We break down the quality factors that justify the premium price and help you decide if luxury is right for you.",
    author: "David Sterling",
    publishDate: "2026-07-08",
    category: "Lifestyle",
    tags: ["luxury", "investment", "quality", "fragrance-industry"],
    image: "blog-luxury",
    readingTime: 6,
    relatedPostIds: ["blog-001", "blog-003"],
  },
  {
    id: "blog-005",
    slug: "fragrance-collection-organization",
    title: "How to Organize Your Fragrance Collection",
    excerpt: "Tips for storing, displaying, and cataloging your precious fragrances to keep them in pristine condition.",
    content: "Proper storage is key to maintaining fragrance quality. Store away from heat and direct sunlight, keep in a cool dark place, and organize by category. Learn the best practices for collecting and preserving your favorite scents.",
    author: "Lisa Wang",
    publishDate: "2026-07-05",
    category: "Lifestyle",
    tags: ["storage", "organization", "collection", "fragrance-care"],
    image: "blog-organization",
    readingTime: 5,
    relatedPostIds: ["blog-002", "blog-004"],
  },
];

export const mockPromotionalBanners: PromotionalBanner[] = [
  {
    id: "banner-001",
    title: "Summer Collection Sale",
    description: "Get up to 30% off our entire summer collection",
    callToAction: "Shop Now",
    link: "/catalog",
    position: "top",
    type: "sale",
  },
  {
    id: "banner-002",
    title: "New Arrivals",
    description: "Discover our latest luxury fragrance releases",
    callToAction: "Explore New",
    link: "/catalog?filter=new",
    position: "middle",
    type: "new_collection",
  },
  {
    id: "banner-003",
    title: "Exclusive Member Benefits",
    description: "Join our loyalty program and get exclusive rewards",
    callToAction: "Learn More",
    link: "/account/settings",
    position: "bottom",
    type: "featured",
  },
];

export const mockBlogCategories = [
  "All",
  "Fragrance Guide",
  "Education",
  "Tips & Tricks",
  "Lifestyle",
  "New Releases",
  "Collections",
];

export const mockBlogTags = [
  "fragrance",
  "summer",
  "luxury",
  "tips",
  "beginner",
  "fresh",
  "oriental",
  "woody",
  "floral",
  "care",
];
