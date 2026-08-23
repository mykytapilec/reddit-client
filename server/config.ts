import 'dotenv/config';
import process from 'process';

interface ServerConfig {
  redditClientId: string;
  redditClientSecret: string;
  redditUserAgent: string;
}

export const config: ServerConfig = {
  redditClientId: process.env.REDDIT_CLIENT_ID ?? '',
  redditClientSecret: process.env.REDDIT_CLIENT_SECRET ?? '',
  redditUserAgent: process.env.REDDIT_USER_AGENT ?? 'reddit-client/1.0 local-development',
};

export const hasRedditCredentials =
  Boolean(config.redditClientId) && Boolean(config.redditClientSecret);
