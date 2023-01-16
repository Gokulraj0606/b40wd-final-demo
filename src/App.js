import logo from './logo.svg';
import './App.css';
import { Children, useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Home } from './Home';
import { Phone } from './Phone';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobiles" element={
          <ProtectedRoute>
            <Phonelist />
          </ProtectedRoute>
        }
        />
      </Routes>

    </div>
  );
}


function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("token");
  console.log(isAuth)
  return isAuth ? children : <Navigate replace to="/" />
}


function CheckAuth(data) {
  if (data.status === 401) {
    console.log("unauthorized");
    throw Error("unauthorized");
  }
  else {
    return data.json()

  }

}

function logout() {
  localStorage.removeItem("token")
  window.location.href = "/"

}


function Phonelist() {
  const [mobiles, setMobiles] = useState([]);

  useEffect(() => {
    // protected APIS
    fetch("http://localhost:4000/mobiles", {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token")
      },
    })
      .then((data) => CheckAuth(data))
      .then((mbs) => setMobiles(mbs))
      .catch((err) => logout())

  }, [])



  return (
    <div className='phone-list-container'>
      {mobiles.map((mb, index) => (
        <Phone key={index} mobile={mb} />
      ))}

    </div>
  )
}

export default App;
