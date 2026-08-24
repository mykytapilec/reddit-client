import type { RedditPostsResponse } from '../src/types/reddit';

export function createMockPosts(subreddit: string): RedditPostsResponse {
  return {
    kind: 'Listing',
    data: {
      after: null,
      before: null,
      children: [
        {
          kind: 't3',
          data: {
            id: 'mock-post-1',
            title: 'Welcome to the Reddit Client mock data',
            author: 'mock_user',
            subreddit,
            score: 128,
            num_comments: 24,
            url: 'https://example.com/mock-post-1',
            permalink: `/r/${subreddit}/comments/mock-post-1/`,
            thumbnail: '',
            selftext: 'This is a mock Reddit post used for local development and testing.',
            created_utc: 1750000000,
          },
        },
        {
          kind: 't3',
          data: {
            id: 'mock-post-2',
            title: 'Building a Reddit client with React and TypeScript',
            author: 'typescript_dev',
            subreddit,
            score: 96,
            num_comments: 17,
            url: 'https://example.com/mock-post-2',
            permalink: `/r/${subreddit}/comments/mock-post-2/`,
            thumbnail: '',
            selftext: 'This post demonstrates how the local Reddit API fallback works.',
            created_utc: 1750001000,
          },
        },
        {
          kind: 't3',
          data: {
            id: 'mock-post-3',
            title: 'Local API proxy is working',
            author: 'reddit_client',
            subreddit,
            score: 74,
            num_comments: 9,
            url: 'https://example.com/mock-post-3',
            permalink: `/r/${subreddit}/comments/mock-post-3/`,
            thumbnail: '',
            selftext:
              'The frontend can now communicate with the local server without direct Reddit API access.',
            created_utc: 1750002000,
          },
        },
      ],
    },
  };
}
