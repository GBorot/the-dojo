import { BrowserRouter, Route, Switch } from 'react-router-dom';

// styles
import './App.css'

// PAGES & COMPONENTS
import Dashboard from './pages/dashboard/Dashboard'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Project from './pages/project/Project'
import Create from './pages/create/Create'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Dashboard/>
            </Route>
            <Route path="/signup">
              <Signup/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/create">
              <Create/>
            </Route>
            <Route path="/projects/:id">
              <Project/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
