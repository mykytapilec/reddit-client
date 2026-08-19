import { useState } from 'react';
import type { FormEvent } from 'react';
import './SubredditManager.css';

interface SubredditManagerProps {
  onAdd: (subreddit: string) => boolean;
}

function SubredditManager({ onAdd }: SubredditManagerProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subreddit = value.trim().replace(/^r\//, '');

    if (!subreddit) {
      setError('Enter a subreddit name.');
      return;
    }

    const wasAdded = onAdd(subreddit);

    if (!wasAdded) {
      setError('This subreddit is already added.');
      return;
    }

    setValue('');
    setError(null);
  }

  return (
    <form className="subreddit-manager" onSubmit={handleSubmit}>
      <label className="subreddit-manager__label" htmlFor="subreddit">
        Add a subreddit
      </label>

      <div className="subreddit-manager__controls">
        <input
          id="subreddit"
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError(null);
          }}
          placeholder="javascript"
          aria-describedby={error ? 'subreddit-error' : undefined}
        />

        <button type="submit">Add</button>
      </div>

      {error && (
        <p className="subreddit-manager__error" id="subreddit-error">
          {error}
        </p>
      )}
    </form>
  );
}

export default SubredditManager;
