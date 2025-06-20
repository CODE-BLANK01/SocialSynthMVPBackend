export type LinkedInPostType = "text" | "article" | "image";

export interface LinkedInPostPayload {
  type: LinkedInPostType;
  text: string;
  url?: string;
  imagePath?: string;
  title?: string;
  description?: string;
}
