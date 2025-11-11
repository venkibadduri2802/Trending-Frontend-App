import axios, { GenericAbortSignal } from "axios";
export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:7010",
  headers: { "Content-Type": "application/json" },
});

export type SearchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: any[];
};

function computeDateMinusDays(currentDateStr?: string, days = 10): string {
  const base = currentDateStr ? new Date(currentDateStr) : new Date();
  const d = new Date(base.getTime());
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

type SearchParams = {
  currentDate?: string;
  page?: number;
  per_page?: number;
  signal?: GenericAbortSignal;
};

export async function searchRepos({
  currentDate,
  page = 1,
  per_page = 30,
  signal,
}: SearchParams): Promise<SearchResponse> {
  const cutoff = computeDateMinusDays(currentDate, 10);

  const res = await API.get<SearchResponse>("/api/Github/search", {
    params: { date: cutoff, page, per_page },
    signal,
  });

  return res.data;
}
