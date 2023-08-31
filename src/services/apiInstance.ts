import axios from 'axios';

const token = process.env.REACT_APP_GITHUB_TOKEN;

const apiInstance = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
});

export function getIssues(page: number, perPage: number) {
  return apiInstance
    .get('/issues', {
      params: {
        state: 'open',
        sort: 'comments',
        per_page: perPage,
        page: page,
      },
    })
    .then(res => res.data)
    .catch(() => {
      return [];
    });
}

export function getIssue(issueNumber: number) {
  return apiInstance
    .get(`/issues/${issueNumber}`)
    .then(res => res.data)
    .catch(() => {
      return {};
    });
}
