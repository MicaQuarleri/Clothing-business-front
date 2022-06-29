import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import mainReducer from "./redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./reset.css";
import HomePage from "./Components/HomePage";
import Customers from "./Components/Customers";
import Sales from "./Components/Sales";
import Products from "./Components/Products";
import Header from "./Components/Header";
const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Provider>
    </Router>
  </React.StrictMode>
);
