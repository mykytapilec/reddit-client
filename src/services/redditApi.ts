import type { RedditPostsResponse } from '../types/reddit';

const REDDIT_API_URL = 'https://www.reddit.com';

export async function fetchSubredditPosts(subreddit: string): Promise<RedditPostsResponse> {
  const normalizedSubreddit = subreddit.trim();

  if (!normalizedSubreddit) {
    throw new Error('Subreddit name cannot be empty.');
  }

  const response = await fetch(
    `${REDDIT_API_URL}/r/${encodeURIComponent(normalizedSubreddit)}.json`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch subreddit: ${response.status}`);
  }

  return response.json() as Promise<RedditPostsResponse>;
}
