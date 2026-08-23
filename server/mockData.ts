import type { RedditPostsResponse } from '../src/types/reddit';

export function createMockPosts(subreddit: string): RedditPostsResponse {
  const normalizedSubreddit = subreddit.trim();

  return {
    kind: 'Listing',
    data: {
      after: null,
      before: null,
      children: [
        {
          kind: 't3',
          data: {
            id: `mock-${normalizedSubreddit}-1`,
            title: `Welcome to r/${normalizedSubreddit}`,
            author: 'mock_user',
            subreddit: normalizedSubreddit,
            score: 128,
            num_comments: 24,
            url: 'https://www.reddit.com/',
            permalink: `/r/${normalizedSubreddit}/comments/mock1/`,
            thumbnail: '',
            selftext: 'This is local mock data used while Reddit API access is unavailable.',
            created_utc: Math.floor(Date.now() / 1000),
          },
        },
        {
          kind: 't3',
          data: {
            id: `mock-${normalizedSubreddit}-2`,
            title: `Example post from r/${normalizedSubreddit}`,
            author: 'mock_author',
            subreddit: normalizedSubreddit,
            score: 76,
            num_comments: 11,
            url: 'https://www.reddit.com/',
            permalink: `/r/${normalizedSubreddit}/comments/mock2/`,
            thumbnail: '',
            selftext:
              'Mock subreddit data allows the client and proxy architecture to be developed independently of Reddit API access.',
            created_utc: Math.floor(Date.now() / 1000) - 3600,
          },
        },
      ],
    },
  };
}
