import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { withFirebase } from '../../../containers/Firebase';
import * as ROUTES from '../../../routes.js';
import { withRouter} from 'react-router-dom';
import { compose } from 'recompose';
import { AuthUserContext } from '../../../containers/Session';
// const INITIAL_STATE = {
//   email: '',
//   password: '',
//   role: '',
//   error: null,
// };
// const RegisterPage = () => (
//   <div>
//     {/* <h1>Sign In</h1> */}
//     <Register />
//     {/* <PasswordForgetLink />
//     <SignInGoogle />
//     <SignInFacebook />
//     <SignInTwitter />
//     <SignUpLink /> */}
//   </div>
// );
// class Register extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log(this.props);
//     this.state = { ...INITIAL_STATE };
//   }
//   loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
//   onSubmit = event => {
//     const { email, password, role } = this.state;
//     console.log(email);
//     this.props.firebase
//       .doCreateUserWithEmailAndPassword(email, password)
//       .then(() => {
//         this.props.firebase.save(role);
//         this.setState({ ...INITIAL_STATE });
//         this.props.history.push(ROUTES.DETAIL);
//         console.log("go to Dashboard");
//       })
//       .catch(error => {
//         this.setState({ error });
//         console.log(email);
//         console.log(password);
//         console.log("cant go to Dashboard");
//       });

//     event.preventDefault();
//   };
//   onChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//     // console.log(this.props);
//     event.preventDefault();

//   };
//   handleSubmit(event) {
//     console.log('A name was submitted: ' + this.state.value);
//     // **event.preventDefault();**
//   }

//   render() {
//     console.log(this.props);
    
//     const { email, password,role, error } = this.state;
//     // this.props.firebase.save('admin');
//     // console.log(this.props);
//     return (
//     <AuthUserContext.Consumer>
//       {authUser =>
//       <div className="app flex-row align-items-center">
//         <Container>
//           <Row className="justify-content-center">
//             <Col md="9" lg="7" xl="6">
//               <Card className="mx-4">
//                 <CardBody className="p-4">
//                 <Form>
//                   {/* <form onSubmit={this.handleSubmit}> */}
//                     <h1>Register</h1>
//                     <p className="text-muted">Create your account</p>

//                     <InputGroup className="mb-3">
//                       <InputGroupAddon addonType="prepend">
//                         <InputGroupText>@</InputGroupText>
//                       </InputGroupAddon>
//                       <Input 
//                         type="text" 
//                         name = "email"
//                         placeholder="Email" 
//                         autoComplete="email" 
//                         onChange = {this.onChange}
//                       />
//                     </InputGroup>
//                       <InputGroup className="mb-3">
//                         <InputGroupAddon addonType="prepend">
//                           <InputGroupText>
//                             <i className="icon-user"></i>
//                           </InputGroupText>
//                         </InputGroupAddon>
//                         <Input type="select" name="role" id="select" required onChange ={this.onChange} >
//                           <option value="0" >Role</option>
//                           <option value="EMPLOYEE" >Employee</option>
//                           <option value="MANAGER">MANAGER</option>
//                         </Input>
//                       </InputGroup>                   
//                     <InputGroup className="mb-3">
//                       <InputGroupAddon addonType="prepend">
//                         <InputGroupText>
//                           <i className="icon-lock"></i>
//                         </InputGroupText>
//                       </InputGroupAddon>
//                       <Input type="password" name = "password" placeholder="Password" autoComplete="new-password" />
//                     </InputGroup>
//                     <InputGroup className="mb-4">
//                       <InputGroupAddon addonType="prepend">
//                         <InputGroupText>
//                           <i className="icon-lock"></i>
//                         </InputGroupText>
//                       </InputGroupAddon>
//                       <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
//                     </InputGroup>
//                     <Button color="success" name="name" block  onClick = {this.onSubmit}>Create Account</Button>
//                       {/* <Button color="primary" className="px-4" type ="submit" >Login</Button> */}
//                   </Form>
//                 </CardBody>
//                 <CardFooter className="p-4">
//                   {/* <Row>
//                     <Col xs="12" sm="6">
//                       <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
//                     </Col>
//                     <Col xs="12" sm="6">
//                       <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
//                     </Col>
//                   </Row> */}
//                 </CardFooter>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//             }
//       </AuthUserContext.Consumer>
//     );
//   }
// }
// const RegisterForm = compose(
//     withRouter,
//     withFirebase,
//   )(Register);

// export default RegisterPage;
// export {RegisterForm};

const RegisterPage = () => (
  <div>
    <h1>Register</h1>
    <RegisterForm />
  </div>
);

 const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  role: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class RegisterFormBase extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, passwordOne, role } = this.state;
    

    // if (isAdmin) {
    //   roles[ROLES.ADMIN] = ROLES.ADMIN;
    // }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne,role)
      // .then(authUser => {
      //   // Create a user in your Firebase realtime database
      //   return this.props.firebase.user(authUser.user.uid).set({
      //     // username,
      //     email,
      //     role,
      //   });
      // })
      // .then(() => {
      //   return this.props.firebase.save(role);
      // })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DETAIL);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    console.log(this.props);
    const {
      email,
      passwordOne,
      passwordTwo,
      role,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';

    return (
        <AuthUserContext.Consumer>
       {authUser =>

       
      <div className="app flex-row align-items-center">
        {console.log(this.props)}
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                <Form>
                  {/* <form onSubmit={this.onSubmit}> */}
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input 
                        type="text" 
                        name = "email"
                        placeholder="Email" 
                        autoComplete="email" 
                        value = {email}
                        onChange = {this.onChange}
                      />
                    </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" name="role" id="select" required onChange ={this.onChange} value = {role} >
                          <option value="0" >Role</option>
                          <option value="EMPLOYEE" >Employee</option>
                          <option value="MANAGER">MANAGER</option>
                        </Input>
                      </InputGroup>                   
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name = "passwordOne" placeholder="Password" autoComplete="new-password" value = {passwordOne} onChange={this.onChange} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name = "passwordTwo" placeholder="Repeat password" autoComplete="new-password" value = {passwordTwo} onChange={this.onChange}/>
                    </InputGroup>
                    <Button disabled={isInvalid} color="success" name="name" block onClick={this.onSubmit}>Create Account</Button>
                      {/* <Button color="primary" className="px-4" type ="submit" >Login</Button> */}
                      {error && <p>{error.message}</p>}
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  {/* <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row> */}
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
            }
      </AuthUserContext.Consumer>
    );
  }
}

// const SignUpLink = () => (
//   <p>
//     Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
//   </p>
// );

const RegisterForm = compose(
  withRouter,
  withFirebase,
)(RegisterFormBase);

export default RegisterPage;

export { RegisterForm};

