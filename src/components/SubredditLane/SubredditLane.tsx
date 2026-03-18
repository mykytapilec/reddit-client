import { useEffect, useState } from 'react';
import { fetchSubredditPosts } from '../../services/redditApi';
import type { RedditPost } from '../../types/reddit';
import PostCard from '../PostCard/PostCard';
import './SubredditLane.css';

interface SubredditLaneProps {
  subreddit: string;
}

function SubredditLane({ subreddit }: SubredditLaneProps) {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadPosts() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchSubredditPosts(subreddit);

        if (isActive) {
          setPosts(response.data.children);
        }
      } catch {
        if (isActive) {
          setError('Failed to load subreddit posts.');
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadPosts();

    return () => {
      isActive = false;
    };
  }, [subreddit]);

  return (
    <section className="subreddit-lane">
      <header className="subreddit-lane__header">
        <h2>r/{subreddit}</h2>
      </header>

      {isLoading && <p className="subreddit-lane__state">Loading posts...</p>}

      {!isLoading && error && (
        <p className="subreddit-lane__state subreddit-lane__state--error">{error}</p>
      )}

      {!isLoading && !error && posts.length === 0 && (
        <p className="subreddit-lane__state">No posts found.</p>
      )}

      {!isLoading && !error && posts.length > 0 && (
        <div className="subreddit-lane__posts">
          {posts.map((post) => (
            <PostCard key={post.data.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}

export default SubredditLane;
