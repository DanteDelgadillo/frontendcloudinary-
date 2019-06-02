import React from 'react';

import './App.css'
import NavBar from "./Components/navBar";
import { BrowserRouter } from "react-router-dom";
import Main from "./Components/main";

function App() {
  return (
    <React.Fragment >
      <NavBar />
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
