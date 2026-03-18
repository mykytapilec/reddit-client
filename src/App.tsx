import SubredditLane from './components/SubredditLane/SubredditLane';
import './App.css';

function App() {
  return (
    <main className="app">
      <header className="app-header">
        <h1>Reddit Client</h1>
        <p>Browse Reddit posts from your favorite communities.</p>
      </header>

      <section className="lanes" aria-label="Subreddit feeds">
        <SubredditLane subreddit="javascript" />
      </section>
    </main>
  );
}

export default App;
