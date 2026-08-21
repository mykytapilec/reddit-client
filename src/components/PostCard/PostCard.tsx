import type { RedditPost } from '../../types/reddit';
import './PostCard.css';

interface PostCardProps {
  post: RedditPost;
}

function PostCard({ post }: PostCardProps) {
  const { data } = post;

  return (
    <article className="post-card">
      <a className="post-card__title" href={data.url} target="_blank" rel="noopener noreferrer">
        <h3>{data.title}</h3>
      </a>

      <div className="post-card__meta">
        <span>u/{data.author}</span>
        <span>{data.score} points</span>
        <span>{data.num_comments} comments</span>
      </div>
    </article>
  );
}

export default PostCard;
