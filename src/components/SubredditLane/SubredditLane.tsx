import { useEffect, useState } from 'react';
import PostCard from '../PostCard/PostCard';
import { fetchSubredditPosts } from '../../services/redditApi';
import type { RedditPost } from '../../types/reddit';
import './SubredditLane.css';

interface SubredditLaneProps {
  subreddit: string;
  onRemove: (subreddit: string) => void;
}

type LaneStatus = 'loading' | 'success' | 'error';

function SubredditLane({ subreddit, onRemove }: SubredditLaneProps) {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [status, setStatus] = useState<LaneStatus>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPosts = async () => {
      try {
        const response = await fetchSubredditPosts(subreddit);

        if (cancelled) {
          return;
        }

        setPosts(response.data.children);
        setError(null);
        setStatus('success');
      } catch {
        if (cancelled) {
          return;
        }

        setPosts([]);
        setError(`Failed to load r/${subreddit}.`);
        setStatus('error');
      }
    };

    void loadPosts();

    return () => {
      cancelled = true;
    };
  }, [subreddit]);

  const handleRetry = async () => {
    setStatus('loading');
    setError(null);

    try {
      const response = await fetchSubredditPosts(subreddit);
      setPosts(response.data.children);
      setStatus('success');
    } catch {
      setPosts([]);
      setError(`Failed to load r/${subreddit}.`);
      setStatus('error');
    }
  };

  return (
    <article className="subreddit-lane">
      <header className="subreddit-lane__header">
        <h2>r/{subreddit}</h2>

        <button
          type="button"
          className="subreddit-lane__remove"
          onClick={() => onRemove(subreddit)}
          aria-label={`Remove r/${subreddit}`}
        >
          Remove
        </button>
      </header>

      {status === 'loading' && (
        <div className="subreddit-lane__state" role="status">
          <p>Loading posts...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="subreddit-lane__state subreddit-lane__state--error" role="alert">
          <p>{error}</p>

          <button type="button" onClick={() => void handleRetry()}>
            Retry
          </button>
        </div>
      )}

      {status === 'success' && posts.length === 0 && (
        <div className="subreddit-lane__state">
          <p>No posts found.</p>
        </div>
      )}

      {status === 'success' && posts.length > 0 && (
        <div className="subreddit-lane__posts">
          {posts.map((post) => (
            <PostCard key={post.data.id} post={post} />
          ))}
        </div>
      )}
    </article>
  );
}

export default SubredditLane;
