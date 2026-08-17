export interface RedditListing<T> {
  kind: 'Listing';
  data: {
    after: string | null;
    before: string | null;
    children: T[];
  };
}

export interface RedditPost {
  kind: 't3';
  data: {
    id: string;
    title: string;
    author: string;
    subreddit: string;
    score: number;
    num_comments: number;
    url: string;
    permalink: string;
    thumbnail: string;
    selftext: string;
    created_utc: number;
  };
}

export type RedditPostsResponse = RedditListing<RedditPost>;
