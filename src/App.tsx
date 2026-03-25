import { useState } from 'react';
import SubredditManager from './components/SubredditManager/SubredditManager';
import SubredditLane from './components/SubredditLane/SubredditLane';
import './App.css';

function App() {
  const [subreddits, setSubreddits] = useState<string[]>(['javascript']);

  function addSubreddit(subreddit: string) {
    const normalizedSubreddit = subreddit.toLowerCase();

    if (subreddits.some((item) => item.toLowerCase() === normalizedSubreddit)) {
      return false;
    }

    setSubreddits((current) => [...current, subreddit]);
    return true;
  }

  function removeSubreddit(subreddit: string) {
    setSubreddits((current) => current.filter((item) => item !== subreddit));
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Reddit Client</h1>
        <p>Browse Reddit posts from your favorite communities.</p>
      </header>

      <SubredditManager onAdd={addSubreddit} />

      <section className="lanes" aria-label="Subreddit feeds">
        {subreddits.map((subreddit) => (
          <SubredditLane key={subreddit} subreddit={subreddit} onRemove={removeSubreddit} />
        ))}
      </section>
    </main>
  );
}

export default App;
