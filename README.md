## 원티드 프리온보딩 2주차 과제 - 개인

- 본 repository는 [원티드 프리온보딩 프론트엔드 2주차 과제](https://lean-mahogany-686.notion.site/Week-2-a28eb717312a434498ea431d2ff8fc17)입니다.

### 기술 스택

<div>
  <img src="https://img.shields.io/badge/react-61DAFB?style=flat&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=flat&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/react router-CA4245?style=flat&logo=react router&logoColor=white">
</div>
<br />

## 📌 프로젝트 실행 방법

1. Clone the repo

```javascript
$ git clone https://github.com/teetee6/wanted_week2.git
```

2. Install NPM packages and getting start!

```javascript
$ npm install && npm start
```

<br/>

### 🗂️ 폴더 구조

```
📦src
 ┣ 📂components
 ┣ 📂hooks
 ┃ ┗ 📜formatDate.ts
 ┣ 📂pages
 ┃ ┣ 📂IssueDetail
 ┃ ┣ 📂IssueLists
 ┃ ┣ ┣ 📜IssueLists.css
 ┃ ┣ ┗ 📜IssueLists.tsx
 ┃ ┗ 📂NotFoundPage
 ┣ 📂services
 ┃ ┗ 📜apiInstance.ts
 ┣ 📂styles
 ┣ 📂types
 ┣ 📜App.tsx
 ┣ 📜index.tsx
```

## 💡 상세 기능

### 1. 이슈 목록 가져오기 및 인피니트 스크롤링

<details>
  <summary>설명</summary>
  <div>
  
```jsx
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
```

이슈 목록들을 현재 페이지(page)에서부터 페이지 갯수(perPage=10개)만큼 가져옵니다.

```jsx
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
```

가져온 이슈들을 issues state에 넣고 loading state를 false로 하여 loading UI가 안보이도록 설정합니다. 만약 읽어온 데이터가 0개라면 더 읽어온 데이터가 없다는 의미로서 hasMore state 를 false로 설정합니다.

```jsx
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
```

스크롤이 화면 아래에 적정수준 이하까지 내려가있을때 더 읽을 데이터가 있다면, loading state를 true로 설정하고 다시 위의 로직(fetchIssues함수)가 호출됩니다.

  </div>
</details>

### 2. 이슈 상세 화면

<details>
  <summary>설명</summary>
  <div>

```js
export function getIssue(issueNumber: number) {
  return apiInstance
    .get(`/issues/${issueNumber}`)
    .then(res => res.data)
    .catch(() => {
      return {};
    });
}
```

이슈 상세정보를 가져옵니다

```js
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}년 ${month}월 ${day}일`;
}
```

"2023-08-30T00:11:59Z" 구조를 "2023년 08월 30일"구조로 바꿔 반환하는 구조입니다.

```js
import ReactMarkdown from 'react-markdown';
...(코드생략)
<ReactMarkdown>{issue.body}</ReactMarkdown>
```

마크다운 라이브러리를 사용하였습니다.

### 3. 배포

<details>
  <summary>설명</summary>
  <div>
AWS S3 배포 및 Github Action을 통해 Repository Push(merge) 시 main 브랜치에 배포 자동화를 하였습니다.

```yaml
name: CI/CD-12th

on:
  push:
    branches:
      - main

jobs:
  cicd:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          ref: 'main'
      - run: npm ci
      - run: npm run test
      - run: echo "REACT_APP_GITHUB_TOKEN=${{ secrets.REACT_APP_GITHUB_TOKEN }}" >> .env.local
      - run: npm run build
      - name: deploy to s3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: 'ap-northeast-2'
          SOURCE_DIR: 'build'
```

  </div>

<details>
<div>
빌드하기전 react-create-app은 .env.local에 process.env로 환경변수를 설정하므로 해당 파일에 echo명령어로 출력해줍니다.
</div>
