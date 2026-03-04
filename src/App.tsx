import './App.css';

function App() {
  return (
    <main className="app">
      <header className="app-header">
        <h1>Reddit Client</h1>
        <p>Browse Reddit posts from your favorite communities.</p>
      </header>

      <section className="lanes" aria-label="Subreddit feeds">
        <p className="lanes-empty">No subreddit feeds configured yet.</p>
      </section>
    </main>
  );
}

export default App;
