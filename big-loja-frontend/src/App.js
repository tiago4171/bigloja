/* eslint-disable no-unused-vars */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Login } from './components/Login';
import { EditRegister } from './components/EditRegister';
import { RegisterUser } from './components/RegisterUser';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Route, Switch, useHistory } from 'react-router-dom';
import { UploadScreenshot } from './components/UploadScreenshot';
import authService from './_services/auth.service';

export const App = (props) => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);

  const logout = useCallback(() => {
    authService.logout();
    setCurrentUser(null);
    history.push('login');
  }, [history, setCurrentUser]);

  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());
  }, [setCurrentUser]);

  return (
    <Container className="App">
      <Navbar>
        {currentUser && (
          <Button onClick={() => logout()}>Logout</Button>
        )}
        {!currentUser && (
          <Button onClick={() => history.push('login')}>Login</Button>
        )}
      </Navbar>
      <Container>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/register' component={RegisterUser} />
          <Route path='/editor' component={EditRegister} />
          <Route path='/upload' component={UploadScreenshot} />
        </Switch>
      </Container>
    </Container>
  );
}

export default App;
