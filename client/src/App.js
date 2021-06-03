import './components/styles/style.css';
import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { BrowserRouter as Router,
  Switch,
  Route } from "react-router-dom";

function App() {
  return (
      <div className="App">
        <Router>
          {/* Header 고정 */}
          <Header />
          {/* Main Contents */}
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/projects/:content" component={Main} />
            <Route path="/projects/:content/:title" component={Main} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
