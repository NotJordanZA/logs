import './App.css'
import Log from './pages/logger'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
            <Route index element={<Log />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
