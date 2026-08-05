export type ProfileType = "Creator" | "Business";

export interface Socials {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
}

export interface ProfileRequest {
  id: string;
  account_email: string;
  profile_type: ProfileType;
  name: string;
  location: string | null;
  niche: string | null;
  email: string | null;
  bio: string | null;
  availability: string[] | null;
  image_url: string | null;
  socials: Socials | null;
  status: "pending" | "approved" | "closed";
  created_at: string;
}

export interface PublicProfile {
  id: string;
  owner_email: string | null;
  profile_type: ProfileType;
  name: string;
  location: string | null;
  niche: string | null;
  bio: string | null;
  rate: string | null;
  image_url: string | null;
  availability: string[] | null;
  socials: Socials | null;
  years_in_business: string | null;
  business_type: string | null;
  owners_count: string | null;
  expected_posts: string | null;
  content_deadlines: string | null;
  business_images: string[] | null;
  is_active: boolean;
  created_at: string;
}
