import React from "react";
import type { Repo } from "../types/github.ts";

export default function RepoItem({ repo }: { repo: Repo }) {
  return (
    <article className="repo-card" aria-label={`Repository ${repo.full_name}`}>
      <a
        className="avatar-link"
        href={repo.owner?.html_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${repo.owner?.login} profile`}
      >
        <img
          src={repo.owner?.avatar_url}
          alt={`${repo.owner?.login ?? "owner"} avatar`}
          className="avatar"
          loading="lazy"
          decoding="async"
          width={40}
          height={40}
        />
      </a>

      <div className="repo-content">
        <div className="repo-top-row">
          <a
            className="repo-name"
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repo.full_name}
          </a>
          <div className="repo-stars" aria-hidden>
            {repo.stargazers_count ?? 0} ★
          </div>
        </div>

        <p className="repo-desc">{repo.description ?? "No description"}</p>

        <div className="repo-footer">
          <img
            src="/images/icon-user-placeholder.svg"
            alt=""
            className="owner-icon"
          />
          <a
            className="owner-link"
            href={repo.owner?.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repo.owner?.login}
          </a>
        </div>
      </div>
    </article>
  );
}
