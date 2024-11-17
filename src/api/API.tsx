import { Candidate } from "../interfaces/Candidate.interface";

const defaultCandidate: Candidate = {
  login: "",
  avatar_url: "",
  location: null,
  email: null,
  company: null,
  bio: null,
};

const searchGithub = async (): Promise<Candidate[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid API response, check the network tab");
    }

    const data: Candidate[] = await response.json();
    return data.map((user) => ({
      login: user.login || "",
      avatar_url: user.avatar_url || "",
      location: user.location || null,
      email: user.email || null,
      company: user.company || null,
      bio: user.bio || null,
    }));
  } catch (err) {
    console.error("An error occurred:", err);
    return [];
  }
};

const searchGithubUser = async (username: string): Promise<Candidate> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid API response, check the network tab");
    }

    const data: any = await response.json();

    return {
      login: data.login || "",
      avatar_url: data.avatar_url || "",
      location: data.location || null,
      email: data.email || null,
      company: data.company || null,
      bio: data.bio || null,
    };
  } catch (err) {
    console.error("An error occurred:", err);

    // Return a default Candidate object on error
    return defaultCandidate;
  }
};

export { searchGithub, searchGithubUser };
