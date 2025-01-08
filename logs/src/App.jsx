import './App.css'
import StatsPage from './pages/stats.jsx';
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
