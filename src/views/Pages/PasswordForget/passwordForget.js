import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../../containers/Firebase';
import * as ROUTES from '../../../routes';
import { Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
        <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
                <Card className="p-4">
                  <CardBody>
                    <form onSubmit={this.onSubmit}>
                      <h1>Reset Password</h1>
                      <p className="text-muted">Reset Your Password</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" name="email" placeholder="Email Address" id ="email" autoComplete="email" onChange={this.onChange} value={this.state.email} />
                      </InputGroup>
                      <Row className="align-items-center">
                        <Col xs="12">
                          <Button color="primary" className="px-4" type ="submit" disabled={isInvalid}> Reset My Password</Button>
                        </Col>
                        {error && <p>{error.message}</p>}
                      </Row>
                    </form>
                  </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };