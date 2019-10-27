import React from 'react';

import './App.css'
import NavBar from "./Components/navBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Main from "./Components/main";
import Upload from "./Components/upload"
import imageshomepage from "./Components/imageloading";


function App() {
  return (
    <React.Fragment >
      <NavBar />
      <Router>
        {/* <div>
          <Main />
        </div> */}
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/" component={imageshomepage} />
      </Router>
    </React.Fragment>
  );
}

export default App;
