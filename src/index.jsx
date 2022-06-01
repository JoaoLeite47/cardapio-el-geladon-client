import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import Home from "./views/Home/Home.jsx";

// ReactDOM.render(
//   <React.StrictMode>
//     <>
//       {" "}
//       <Home />{" "}
//     </>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);