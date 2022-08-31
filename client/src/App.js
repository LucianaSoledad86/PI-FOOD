import "./App.css";
import { Route, Routes } from "react-router-dom";

import LandingPage from './components/LandingPage'
import Home from './components/Home'
import Details from './components/Details'
import Create from './components/Create'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipes/:id" element={<Details />} />
        <Route path="/create" element={<Create />} />
        <Route></Route>
      </Routes>
    </div>
  );
}

export default App;
 
