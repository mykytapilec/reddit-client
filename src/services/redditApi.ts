import type { RedditPostsResponse } from '../types/reddit';

const API_URL = 'http://localhost:3001';

export async function fetchSubredditPosts(subreddit: string): Promise<RedditPostsResponse> {
  const normalizedSubreddit = subreddit.trim();

  if (!normalizedSubreddit) {
    throw new Error('Subreddit name cannot be empty.');
  }

  const response = await fetch(`${API_URL}/api/reddit/${encodeURIComponent(normalizedSubreddit)}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch subreddit: ${response.status}`);
  }

  return response.json() as Promise<RedditPostsResponse>;
}
