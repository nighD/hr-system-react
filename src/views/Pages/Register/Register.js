import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { withFirebase } from '../../../containers/Firebase';
import * as ROUTES from '../../../routes.js';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { AuthUserContext } from '../../../containers/Session';
const INITIAL_STATE = {
  email: '',
  password: '',
  role: '',
  error: null,
};
const RegisterPage = () => (
  <div>
    {/* <h1>Sign In</h1> */}
    <Register />
    {/* <PasswordForgetLink />
    <SignInGoogle />
    <SignInFacebook />
    <SignInTwitter />
    <SignUpLink /> */}
  </div>
);
class Register extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = { ...INITIAL_STATE };
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  onSubmit = event => {
    const { email, password, role } = this.state;
    console.log("here you are");
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(() => {
        this.props.firebase.save(role);
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DETAIL);
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
    // console.log(this.props);
    event.preventDefault();

  };

  render() {
    // console.log(this.props);
    
    const { email, password,role, error } = this.state;
    // this.props.firebase.save('admin');
    console.log(this.props);
    return (
    <AuthUserContext.Consumer>
      {authUser =>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                {/* <Form> */}
                  <form onSubmit={this.props.onSubmit}>
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
                        onChange = {this.onChange}
                      />
                    </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" name="role" id="select" required onChange ={this.onChange} >
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
                      <Input type="password" name = "password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <Button color="success" block  type = "submit">Create Account</Button>
                      {/* <Button color="primary" className="px-4" type ="submit" >Login</Button> */}
                  </form>
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
const RegisterForm = compose(
    withRouter,
    withFirebase,
  )(Register);
export default RegisterPage;
export {RegisterForm};

