
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import ReactDOM from 'react-dom';
import { BrowserRouter, useRoutes } from 'react-router-dom';

const App = () => {
  <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
};

export default App;

/*

<Routes>
      <Route path="/login" element={<Login />} ></Route> 
      <Route path="/main"></Route> 
    </Routes> 
import React, {Fragment} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login/Login.jsx"

function App() {

return (
    <BrowserRouter>
      <Fragment>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;*/
