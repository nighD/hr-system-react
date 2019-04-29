import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { withFirebase } from '../../../containers/Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../../routes';
const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    {/* <PasswordForgetLink />
    <SignInGoogle />
    <SignInFacebook />
    <SignInTwitter />
    <SignUpLink /> */}
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DASHBOARD);
        console.log("go to Dashboard");
      })
      .catch(error => {
        this.setState({ error });
        console.log(email);
        console.log(password);
        console.log("cant go to Dashboard");
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    // const { email, password, error } = this.state;
    // const isInvalid = password === '' || email === '';
    return (
      
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <form onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" name="email" placeholder="email" id ="email" autoComplete="email" onChange={this.onChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" placeholder="password" id =" password" autoComplete="current-password" onChange={this.onChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" type ="submit">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>

    );
  }
}
// class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.state = { ...INITIAL_STATE };
//   }

//   onSubmit = event => {
//     const { email, password } = this.state;

//     this.props.firebase
//       .doSignInWithEmailAndPassword(email, password)
//       .then(() => {
//         this.setState({ ...INITIAL_STATE });
//         this.props.history.push(ROUTES.DASHBOARD);
//       })
//       .catch(error => {
//         this.setState({ error });
//       });

//     event.preventDefault();
//   };

//   onChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   render() {
//     const { email, password, error } = this.state;
//     const CSSStyle= {
//       textAlign: 'center'
//     };
//     const CSSStyle1= {
//       width: '30%',
//       margin: '25px auto'
//     };
//     const isInvalid = password === '' || email === '';

//     return (
//       <form onSubmit={this.onSubmit}>
           
//            <h1 style={CSSStyle}>Login</h1>
//         <div style={CSSStyle1}>
//             <form action="/login" method="post">
//                 <div class="form-group">
//                     <input class="form-control" type="email" name="email" placeholder="email" id = "email" onChange={this.onChange}/>
//                 </div>
//                 <div class="form-group">
//                     <input class="form-control" type="password" name="password" placeholder="password" id =" password" onChange={this.onChange}/>
//                 </div>
//                 <div class="form-group">
//                     <button class="btn btn-lg btn-primary btn-block btn-default" disabled={isInvalid} type="submit">Login</button>
//                 </div>
//             </form>
//             {/* <a href="/">Go Back</a>  */}
//             <button>
//             <withRouter to={ROUTES.DASHBOARD}>Forgot Password?</withRouter>
//             </button>
            
//              {/* <a href="/forgotPassword">Forgot password</a> */}
//         </div>
//           {/* <input class="form-control" type="email" name="email" placeholder="email" id = "email" onChange={this.onChange}/>
                
                
//           <input class="form-control" type="password" name="password" placeholder="password" id =" password" onChange={this.onChange}/> */}
               
                
                    
                
//         {/* <input
//           name="email"
//           value={email}
//           onChange={this.onChange}
//           type="text"
//           placeholder="Email Address"
//         />
//         <input
//           name="password"
//           value={password}
//           onChange={this.onChange}
//           type="password"
//           placeholder="Password"
//         /> 
//          <button disabled={isInvalid} type="submit">
//           Sign In
//         </button> */}
//         {error && <p>{error.message}</p>}
//       </form>
//     );
//   }
// }
const SignInForm = compose(
  withRouter,
  withFirebase,
)(Login);
export default SignInPage;
export {SignInForm};
