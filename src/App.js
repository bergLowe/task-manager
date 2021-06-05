import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import Home from './Components/Home/Home';
import Main from './Components/Main/Main';
import Welcome from './Components/Welcome/WelcomeComponent';
import LoginFormComponent from "./Components/LoginForm/LoginFormComponent";
import RegisterFormComponent from "./Components/RegisterForm/RegisterFormComponent";

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        {/* <Route exact path="/" component={Home}></Route> */}
        <Route exact path="/" component={Welcome}></Route>
        <Route exact path="/login" component={LoginFormComponent}></Route>
        <Route exact path="/register" component={RegisterFormComponent}></Route>
        <Route exact path="/create-task" component={Main}></Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
