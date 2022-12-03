import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          {/* <Home/> */}
          <div className="container">
            <Routes>
              {/* <Route exact path='/' element={Home}/>
          <Route exact path='/about' element={About}/> */}
              <Route exact path='/about' element={<About />} />
              <Route exact path='/' element={<Home />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
