export type Owner = { login: string; avatar_url: string; html_url: string };
export type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  owner: Owner;
};
