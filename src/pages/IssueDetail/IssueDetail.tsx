import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getIssue } from '../../services/apiInstance';
import { Issue } from '../../types/Issue';
import formatDate from '../../hooks/formatDate';
import './IssueDetail.css';

function IssueDetail() {
  const { issueNumber } = useParams();
  const [issue, setIssue] = useState<Issue>();

  useEffect(() => {
    getIssue(Number(issueNumber)).then(response => {
      setIssue(response);
    });
  }, [issueNumber]);

  if (!issue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="issue-detail">
      <div className="issue-header">
        <div className="issue-avatar">
          <img className="author-avatar" src={issue.user.avatar_url} alt={issue.user.login} />
        </div>
        <div className="issue-info">
          <h2 className="issue-title">
            #{issue.number} {issue.title}
          </h2>
          <p className="issue-owner">
            작성자: {issue.user.login}, 작성일: {formatDate(issue.created_at)}
          </p>
        </div>
        <div className="issue-comment">
          <p className="issue-property">코멘트: {issue.comments}</p>
        </div>
      </div>
      <div className="issue-body">
        <p>{issue.body}</p>
      </div>
    </div>
  );
}

export default IssueDetail;
