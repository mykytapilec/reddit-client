# Reddit Client

A responsive web-based Reddit client with customizable subreddit lanes.

The application allows users to add multiple subreddit feeds, browse posts from each community, remove feeds, and persist their configured subreddit list between sessions.

## Features

- Browse posts from multiple subreddits in separate feed lanes.
- Add new subreddit feeds dynamically.
- Remove subreddit feeds.
- Persist configured subreddit feeds in `localStorage`.
- Display post titles, authors, scores, and comment counts.
- Open posts through their original Reddit links.
- Handle loading states while fetching subreddit data.
- Handle API and invalid subreddit errors.
- Retry failed subreddit requests.
- Use a local Node.js API proxy to isolate Reddit API requests from the browser.
- Provide mock Reddit data for local development when Reddit API credentials are unavailable.
- Support CORS between the local frontend and API server.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- CSS
- Browser `localStorage`

### Backend

- Node.js
- TypeScript
- Native Node.js HTTP server
- Fetch API
- dotenv

### External API

- Reddit JSON/API endpoints

## Project Structure

```text
reddit-client/
├── server/
│   ├── config.ts
│   ├── index.ts
│   ├── mockData.ts
│   └── redditApi.ts
├── src/
│   ├── components/
│   │   ├── PostCard/
│   │   ├── SubredditLane/
│   │   └── SubredditManager/
│   ├── services/
│   │   └── redditApi.ts
│   ├── types/
│   │   └── reddit.ts
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.server.json
└── vite.config.ts
```

## Requirements

- Node.js 20+
- npm

## Installation

Install the project dependencies:

```bash
npm install
```

## Environment Variables

The server can use Reddit API credentials through environment variables.

Create a local `.env` file from the provided example:

```bash
cp .env.example .env
```

Fill in the required values in `.env`.

Example:

```env
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_USER_AGENT=your_user_agent
```

Do not commit `.env` to the repository.

The `.env.example` file contains the required variable names without exposing private credentials.

If Reddit API credentials are unavailable, the local server automatically uses mock data.

## Development

The project consists of two development processes:

- Vite frontend
- Node.js API proxy

### Start the Frontend

Run:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

### Start the API Server

In a separate terminal, run:

```bash
npm run server
```

The API server will be available at:

```text
http://localhost:3001
```

Both processes must be running during local development.

## API Proxy

The frontend does not communicate with Reddit directly.

Instead, requests are sent to the local Node.js API proxy.

### Endpoint

```text
GET /api/reddit/:subreddit
```

Example:

```text
http://localhost:3001/api/reddit/javascript
```

The server receives the subreddit name, requests the corresponding Reddit data, and returns the response to the frontend.

This architecture keeps the Reddit API communication outside the browser and provides a single place for API configuration and error handling.

## Mock Data

Reddit API access may not be available during local development.

When Reddit credentials are not configured, the server automatically falls back to local mock data.

This allows the application to remain fully testable without live Reddit API access.

Example:

```bash
curl http://localhost:3001/api/reddit/javascript
```

The mock response follows the Reddit listing structure expected by the frontend.

## Application Flow

1. The user enters a subreddit name.
2. The application validates the input.
3. The subreddit is added as a separate feed lane.
4. The frontend requests posts from the local API proxy.
5. The server requests data from Reddit when credentials are available.
6. If Reddit credentials are unavailable, the server returns mock data.
7. The frontend renders the returned posts.
8. The configured subreddit list is persisted in `localStorage`.
9. Users can remove individual subreddit lanes.
10. Failed requests can be retried from the corresponding lane.

## Error Handling

The application handles the following failure scenarios:

- Empty subreddit names.
- Invalid or unavailable subreddits.
- Reddit API errors.
- Local API server errors.
- Failed frontend requests.

When a request fails, the corresponding subreddit lane displays an error state and provides a retry action.

## Post Information

Each post card displays:

- Post title
- Author
- Score
- Comment count
- Link to the original post

Posts are displayed inside their corresponding subreddit lane.

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run server
```

Starts the local Node.js API proxy.

### Formatting

```bash
npm run format
```

Formats the project using Prettier.

### Validation

```bash
npm run check
```

Runs TypeScript type checking and ESLint.

### Production Build

```bash
npm run build
```

Creates a production build of the frontend.

### Preview

```bash
npm run preview
```

Serves the production frontend build locally.

## Validation

Before committing changes, run:

```bash
npm run format
npm run check
npm run build
```

All commands should complete successfully before creating a pull request.

## Git Workflow

The project uses a feature-branch workflow:

```text
main
└── dev
    ├── feature/...
    ├── feature/...
    └── feature/...
```

Feature branches are created from `dev` and merged back into `dev` through pull requests.

## Reddit API Access

The application uses Reddit's JSON/API endpoint format:

```text
https://www.reddit.com/r/{subreddit}.json
```

Reddit API access policies and availability may change over time.

For this reason, the project includes a local mock fallback so the application remains usable during development even when live Reddit API access is unavailable.

## Roadmap.sh

This project is based on the intermediate Reddit Client project from roadmap.sh.

The project focuses on building a Reddit client that supports:

- Multiple subreddit feeds
- Adding and removing subreddit lanes
- Subreddit validation
- Reddit API integration
- Post loading states
- Error handling and retry functionality
- Persistent subreddit configuration

Project reference:

https://roadmap.sh/projects/reddit-client
