import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
// import Dashboard from '../../views/Dashboard/Dashboard';
import SignInPage from '../../views/Pages/Login';
// import Detail from '../../views/Employee/personalInfoView/employeeDetailView'
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROLES from '../../constants/roles';
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import emp_navigation from '../../Navigation/_navEmp';
import ad_navigation from '../../Navigation/_navAdm';
import man_navigation from '../../Navigation/_navMan';
// routes config
// import * as ROUTES from '../../routes'
import routes from '../../routes';
// import { auth } from 'firebase';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
// const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

// export default DefaultLayout;
class DefaultLayout extends Component {
  // constructor(props) {
    // super(props);
  // }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    this.props.firebase.doSignOut().then(() =>{
      this.props.history.push('/singin');
    }).catch(error => {
      this.setState({ error });
    });
    
  }
  
  render(){
      var isLoggedIn = false;
      if (localStorage.getItem('authUser')){
        isLoggedIn = true;
        const authUser0 = JSON.parse(localStorage.getItem('authUser'));
        var condition = '';
        if (authUser0.roles.ADMIN === ROLES.ADMIN){
          condition = 'admin';
        }
        else if (authUser0.roles.ADMIN === ROLES.MANAGER) {
          condition = 'manager';
        }
        else {
          condition = 'employee';
        }
      }
      else {
        isLoggedIn = false;
      }
    
    return(
      <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
            <div className="app">
                <AppHeader fixed className="bg-gray-400">
                  <Suspense  fallback={this.loading()}>
                    <DefaultHeader onLogout={e=>this.signOut(e)}/>
                  </Suspense>
                </AppHeader>
                <div className="app-body">
                  <AppSidebar fixed display="lg">
                    <AppSidebarHeader />
                    <AppSidebarForm />
                    <Suspense>
                      {/* {
                        isLoggedIn && 
                          (() => {
                            switch(state==) {
                              case 'info':
                                return <Info text={text} />;
                              case 'warning':
                                return <Warning text={text} />;
                              case 'error':
                                return <Error text={text} />;
                              default:
                                return null;
                            }
                          })()
                      
                      } */}
                      {
                        isLoggedIn ? (() => {
                          switch(condition) {
                            case 'admin':
                              return <AppSidebarNav navConfig={ad_navigation} {...this.props}  />;
                            case 'manager':
                              return <AppSidebarNav navConfig={man_navigation} {...this.props}  />;
                            case 'employee':
                              console.log("EMPLOYEE");
                              return <AppSidebarNav navConfig={emp_navigation} {...this.props}  />;
                            default:
                              return null;
                          }
                        })() : (
                          <AppSidebarNav navConfig={emp_navigation} {...this.props}  />
                        )
                         
                      }
                    </Suspense>
                    <AppSidebarFooter />
                    <AppSidebarMinimizer />
                  </AppSidebar>
                  <main className="main bg-gray-400">
                    <AppBreadcrumb appRoutes={routes}/>
                    <Container fluid>
                      <Suspense fallback={this.loading()}>
                        <Switch>
                          {routes.map((route, idx) => {
                            return route.component ? (
                              <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={props => (
                                  // console.log(props),
                                  <route.component {...props} />
                                )} />
                            ) : (null);
                          })}
                          {/* {!!authUser.roles[ROLES.ADMIN] && (
                            console.log("admin"),
                            routes.map((route, idx) => {
                              return route.component ? (
                                <Route
                                  key={idx}
                                  path={route.path}
                                  exact={route.exact}
                                  name={route.name}
                                  render={props => (
                                    <route.component {...props} />
                                  )} />
                              ) : (null);
                            })
                          )} */}
                          {/* <Route exact path={routes.DETAIL} component={Detail} /> */}
                          {/* <Route exact path={routes.DASHBOARD} component={Dashboard} /> */}
                          <Redirect from="/" to="/detail" />
                        </Switch>
                      </Suspense>
                    </Container>
                  </main>
                  <AppAside fixed>
                    <Suspense fallback={this.loading()}>
                      <DefaultAside />
                    </Suspense>
                  </AppAside>
                </div>
                <AppFooter>
                  <Suspense fallback={this.loading()}>
                    <DefaultFooter />
                  </Suspense>
                </AppFooter>
              </div>
              
            ) : (
              <Route exact path={routes.LOGIN} component={SignInPage} />
            )
          }
        </AuthUserContext.Consumer>
        
    );
  }
  };

  

export default withFirebase(DefaultLayout);
