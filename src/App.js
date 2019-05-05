import React from 'react';
import './App.css';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import Dashboard from './components/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false
    };
  }
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
  return (
    <Router>
      {console.log(this.state.isAuthenticated)};
       <Route path="/login"
        render={(props) => (
        <SignIn {...props} props={childProps}  />
        )}
        />
         <Route path="/dashboard" exact component={Dashboard} />
    </Router>
  );
}
}

export default App;
