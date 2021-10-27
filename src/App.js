import React from "react";
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import Header from './components/header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LeaderboardPage from "./pages/Leaderboard";
import AddUser from "./pages/AddUser";

function App() {
  return (<Router>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LeaderboardPage} exact></Route>
        <Route path="/add-user" component={AddUser} exact></Route>
      </Switch>
    </div>
    <ToastContainer />
  </Router>
  );
}

export default App;
