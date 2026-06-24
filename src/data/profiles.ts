export type CreatorProfile = {
  id: string;
  type: "Creator";
  name: string;
  location: string;
  niche: string;
  rate: string;
  image: string;
  bio: string;
  followers: {
    instagram: string;
    tiktok: string;
    youtube: string;
  };
  engagement: string;
  audience: string;
  platforms: string[];
  interests: string[];
  pastPartnerships: string[];
  email: string;
};

export type BusinessProfile = {
  id: string;
  type: "Business";
  name: string;
  location: string;
  niche: string;
  rate: string;
  image: string;
  bio: string;
  website: string;
  campaignType: string;
  targetAudience: string;
  preferredPlatforms: string[];
  activeCampaigns: number;
  contact: string;
};

export type Profile = CreatorProfile | BusinessProfile;

export const profiles: Profile[] = [
  {
    id: "nia-creates",
    type: "Creator",
    name: "Nia Creates",
    location: "White Plains, NY",
    niche: "Beauty & Lifestyle",
    rate: "$250 - $500",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    bio: "Lifestyle creator focused on beauty, wellness, and everyday routines.",
    followers: {
      instagram: "24.8K",
      tiktok: "48.1K",
      youtube: "12.2K",
    },
    engagement: "6.8%",
    audience: "82% Female • 18-34",
    platforms: ["Instagram", "TikTok", "YouTube"],
    interests: ["Beauty", "Skincare", "Wellness", "Lifestyle"],
    pastPartnerships: ["Glow Cosmetics", "Bloom Wellness", "SkinLab"],
    email: "nia@moonshotdemo.com",
  },
  {
    id: "kai-visuals",
    type: "Creator",
    name: "Kai Visuals",
    location: "New York City, NY",
    niche: "Photography & Video",
    rate: "$400 - $1200",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    bio: "Cinematic storyteller specializing in launch videos, restaurant content, and event coverage.",
    followers: {
      instagram: "61K",
      tiktok: "87K",
      youtube: "19K",
    },
    engagement: "5.2%",
    audience: "60% Male • 20-40",
    platforms: ["Instagram", "TikTok"],
    interests: ["Videography", "Travel", "Food", "Luxury"],
    pastPartnerships: ["Vero Hotels", "Drive Motors", "Urban Loft"],
    email: "kai@moonshotdemo.com",
  },
  {
    id: "local-eats-co",
    type: "Business",
    name: "Local Eats Co.",
    location: "White Plains, NY",
    niche: "Restaurant",
    rate: "$500 Campaign Budget",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    bio: "Family-owned restaurant focused on seasonal ingredients and community events.",
    website: "www.localeatsco.com",
    campaignType: "Food Reviews & Social Content",
    targetAudience: "Local residents 18-45",
    preferredPlatforms: ["Instagram", "TikTok"],
    activeCampaigns: 2,
    contact: "marketing@localeatsco.com",
  },
  {
    id: "glow-market",
    type: "Business",
    name: "Glow Market",
    location: "Brooklyn, NY",
    niche: "Beauty Retail",
    rate: "$1000 Monthly Budget",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    bio: "Independent beauty retailer featuring emerging skincare and cosmetic brands.",
    website: "www.glowmarket.com",
    campaignType: "UGC + Product Reviews",
    targetAudience: "Women 18-34",
    preferredPlatforms: ["Instagram", "TikTok", "YouTube"],
    activeCampaigns: 4,
    contact: "partnerships@glowmarket.com",
  },
];