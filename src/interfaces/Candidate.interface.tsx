// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
  login: string; // GitHub username
  id: number; // Unique ID
  avatar_url: string; // URL of the avatar image
  html_url: string; // Link to the GitHub profile
  name: string | null; // Full name (nullable)
  company: string | null; // Company (nullable)
  blog: string | null; // Blog or website URL (nullable)
  location: string | null; // Location (nullable)
  email: string | null; // Email (nullable)
  bio: string | null; // Short bio (nullable)
  public_repos: number; // Number of public repositories
  followers: number; // Number of followers
  following: number; // Number of users followed
}