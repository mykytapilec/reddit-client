import type { RedditPost } from '../../types/reddit';
import './PostCard.css';

interface PostCardProps {
  post: RedditPost;
}

function PostCard({ post }: PostCardProps) {
  const { data } = post;

  return (
    <article className="post-card">
      <div className="post-card__meta">
        <span>r/{data.subreddit}</span>
        <span>by u/{data.author}</span>
      </div>

      <h3 className="post-card__title">{data.title}</h3>

      {data.selftext && <p className="post-card__text">{data.selftext}</p>}

      <div className="post-card__footer">
        <span>{data.score} points</span>
        <span>{data.num_comments} comments</span>

        <a href={`https://www.reddit.com${data.permalink}`} target="_blank" rel="noreferrer">
          Open on Reddit
        </a>
      </div>
    </article>
  );
}

export default PostCard;
