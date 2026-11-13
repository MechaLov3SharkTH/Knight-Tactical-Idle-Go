import { useEffect, useState } from 'react';

export default function App() {
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/health', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`API returned ${response.status}`);
        return response.json();
      })
      .then(() => setApiStatus('connected'))
      .catch((error) => {
        if (error.name !== 'AbortError') setApiStatus('unavailable');
      });

    return () => controller.abort();
  }, []);

  const statusClass = {
    checking: 'badge-warning',
    connected: 'badge-success',
    unavailable: 'badge-error',
  }[apiStatus];

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Knight Tactical Idle Go home">
          <span className="brand-mark" aria-hidden="true">K</span>
          <span>Knight Tactical Idle Go!</span>
        </a>
        <span className={`badge ${statusClass}`} role="status" aria-live="polite">
          API {apiStatus}
        </span>
      </header>

      <section className="hero-panel card bg-base-200">
        <div className="card-body">
          <p className="eyebrow">TACTICAL IDLE RPG</p>
          <h1>Build your squad. Conquer the multiverse.</h1>
          <p className="intro">
            The project foundation is ready. The first playable systems will grow from here.
          </p>
          <div className="foundation-grid" aria-label="Project foundation status">
            <article className="foundation-card">
              <span className="foundation-icon" aria-hidden="true">01</span>
              <h2>Four-role squad</h2>
              <p>Breaker, damage, support, and healer.</p>
            </article>
            <article className="foundation-card">
              <span className="foundation-icon" aria-hidden="true">02</span>
              <h2>Automatic battles</h2>
              <p>Stage progression and rewards are next.</p>
            </article>
            <article className="foundation-card">
              <span className="foundation-icon" aria-hidden="true">03</span>
              <h2>Persistent growth</h2>
              <p>Characters, equipment, and affinity.</p>
            </article>
          </div>
        </div>
      </section>
      <footer>Foundation build · Gameplay systems coming soon</footer>
    </main>
  );
}
