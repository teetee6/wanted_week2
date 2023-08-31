import React, { useEffect, useState } from 'react';
import { getIssues } from '../../services/apiInstance';
import { Issue } from '../../types/Issue';
import { Link } from 'react-router-dom';
import './IssueLists.css';
import formatDate from '../../hooks/formatDate';

function IssueLists() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await getIssues(currentPage, perPage);
        if (response.length === 0) {
          setHasMore(false);
        } else {
          setIssues(prevIssues => [...prevIssues, ...response]);
          setCurrentPage(prevPage => prevPage + 1);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching issues:', error);
        setLoading(false);
      }
    }
    if (hasMore && loading) {
      fetchIssues();
    }
  }, [currentPage, loading, hasMore]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        if (!loading && hasMore) {
          setLoading(true);
        }
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="content">
      {issues.map((issue, index) => (
        <React.Fragment key={issue.id}>
          <div className="issue">
            <Link to={`/issue/${issue.number}`} className="issue-link">
              <div className="issue-header">
                <strong>#{issue.number}</strong>
                <p>{issue.title}</p>
              </div>
            </Link>
            <div className="issue-content">
              <div className="issue-title">
                <span>작성자: {issue.user.login}</span>
              </div>
              <div className="issue-date">
                <span>, 작성일: {formatDate(issue.created_at)}</span>
              </div>
            </div>
            <div className="issue-comment-wrapper">
              <div className="issue-comment">코멘트: {issue.comments}</div>
            </div>
            <hr />
          </div>
          {(index + 1) % 4 === 0 && (
            <div key={`advertisement-${index}`} className="advertisement">
              <a href="https://www.wanted.co.kr/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
                  alt="Advertisement"
                />
              </a>
            </div>
          )}
        </React.Fragment>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default IssueLists;
