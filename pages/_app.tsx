import "../app/globals.css";
import type { AppProps } from "next/app";
import React from "react";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="layout-root">
      <header className="app-header">
        <div className="app-header-inner">
          <h1>Trending Repos</h1>
        </div>
      </header>
      <main className="app-main">
        <div className="container">
          <Component {...pageProps} />
        </div>
      </main>
      <footer className="app-footer" role="contentinfo">
        <nav className="footer-nav" aria-label="Primary">
          <button className="footer-btn active">
            <span className="icon">★</span>
            <span className="label">Trending</span>
          </button>
          <button className="footer-btn">
            <span className="icon">⚙️</span>
            <span className="label">Settings</span>
          </button>
        </nav>
      </footer>
    </div>
  );
}
