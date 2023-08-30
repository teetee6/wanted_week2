import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import IssueLists from './pages/IssueLists/IssueLists';
import IssueDetail from './pages/IssueDetail/IssueDetail';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="title">facebook / react</div>
        <Routes>
          <Route path="/" element={<IssueLists />} />
          <Route path="/issue/:issueNumber" element={<IssueDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
