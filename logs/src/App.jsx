import './App.css'
import { PoopStatistics } from './components/logger';
import StatsPage from './pages/stats';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
            <Route index element={<StatsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
