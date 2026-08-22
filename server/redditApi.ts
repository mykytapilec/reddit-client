const REDDIT_API_URL = 'https://old.reddit.com';

export async function fetchSubredditPosts(subreddit: string): Promise<unknown> {
  const normalizedSubreddit = subreddit.trim();

  if (!normalizedSubreddit) {
    throw new Error('Subreddit name cannot be empty.');
  }

  const response = await fetch(
    `${REDDIT_API_URL}/r/${encodeURIComponent(normalizedSubreddit)}.json`,
    {
      headers: {
        'User-Agent': 'reddit-client/1.0 by reddit-client',
        Accept: 'application/json',
      },
    },
  );

  console.log('Reddit response:', response.status, response.statusText);

  const body = await response.text();

  if (!response.ok) {
    console.log('Reddit response body:', body.slice(0, 500));
    throw new Error(`Reddit API request failed: ${response.status}`);
  }

  return JSON.parse(body);
}
