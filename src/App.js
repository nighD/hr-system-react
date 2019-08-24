import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import { withAuthentication } from './containers/Session';
// import Detail from './views/Employee/personalInfoView/employeeDetailView';
import Login from './views/Pages/Login';
import PasswordForgetPage from './views/Pages/PasswordForget/passwordForget';
// import PasswordChange from './views/Pages/PasswordChange/passwordChange';
// import * as ROUTES from './routes';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/password_forget" name="Password Forget" render={props => <PasswordForgetPage {...props}/>} />
              {/* <Route exact path="/password_change" name="Password Change" render={props => <PasswordChange {...props}/>} /> */}
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>}  />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default withAuthentication(App);
