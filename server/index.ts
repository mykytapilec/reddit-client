import { createServer } from 'node:http';

import { fetchSubredditPosts } from './redditApi';

const PORT = 3001;

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host}`);

  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === 'GET' && url.pathname.startsWith('/api/reddit/')) {
    const subreddit = decodeURIComponent(url.pathname.slice('/api/reddit/'.length));

    try {
      const data = await fetchSubredditPosts(subreddit);

      response.writeHead(200, {
        'Content-Type': 'application/json',
      });

      response.end(JSON.stringify(data));
    } catch {
      response.writeHead(502, {
        'Content-Type': 'application/json',
      });

      response.end(JSON.stringify({ message: 'Failed to fetch Reddit posts.' }));
    }

    return;
  }

  response.writeHead(404, {
    'Content-Type': 'application/json',
  });

  response.end(JSON.stringify({ message: 'Not found.' }));
});

server.listen(PORT, () => {
  console.log(`Reddit API proxy is running on http://localhost:${PORT}`);
});
