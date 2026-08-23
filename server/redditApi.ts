import type { RedditPostsResponse } from '../src/types/reddit';

import { config, hasRedditCredentials } from './config';
import { createMockPosts } from './mockData';

const REDDIT_API_URL = 'https://www.reddit.com';

async function fetchFromReddit(subreddit: string): Promise<RedditPostsResponse> {
  const response = await fetch(`${REDDIT_API_URL}/r/${encodeURIComponent(subreddit)}.json`, {
    headers: {
      'User-Agent': config.redditUserAgent,
    },
  });

  const body = await response.text();

  console.log('Reddit response:', response.status, response.statusText);

  if (!response.ok) {
    console.log('Reddit response body:', body.slice(0, 500));
    throw new Error(`Reddit API request failed: ${response.status}`);
  }

  return JSON.parse(body) as RedditPostsResponse;
}

export async function fetchSubredditPosts(subreddit: string): Promise<RedditPostsResponse> {
  const normalizedSubreddit = subreddit.trim();

  if (!normalizedSubreddit) {
    throw new Error('Subreddit name cannot be empty.');
  }

  if (!hasRedditCredentials) {
    console.log(
      `Reddit credentials are not configured. Using mock data for r/${normalizedSubreddit}.`,
    );

    return createMockPosts(normalizedSubreddit);
  }

  return fetchFromReddit(normalizedSubreddit);
}
