// import React, { Component } from 'react';
// import { withFirebase } from '../../../containers/Firebase';
// // import * as ROUTES from '../../../routes';
// const INITIAL_STATE = {
//   passwordOne: '',
//   passwordTwo: '',
//   error: null,
// };

// class PasswordChangeForm extends Component {
//   constructor(props) {
//     super(props);

//     this.state = { ...INITIAL_STATE };
//   }

//   onSubmit = event => {
//     const { passwordOne } = this.state;

//     this.props.firebase
//       .doPasswordUpdate(passwordOne)
//       .then(() => {
//         this.setState({ ...INITIAL_STATE });
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
//     const { passwordOne, passwordTwo, error } = this.state;

//     const isInvalid =
//       passwordOne !== passwordTwo || passwordOne === '';

//     return (
//       <form onSubmit={this.onSubmit}>
//         <input
//           name="passwordOne"
//           value={passwordOne}
//           onChange={this.onChange}
//           type="password"
//           placeholder="New Password"
//         />
//         <input
//           name="passwordTwo"
//           value={passwordTwo}
//           onChange={this.onChange}
//           type="password"
//           placeholder="Confirm New Password"
//         />
//         <button disabled={isInvalid} type="submit">
//           Reset My Password
//         </button>

//         {error && <p>{error.message}</p>}
//       </form>
//     );
//   }
// }

// export default withFirebase(PasswordChangeForm);
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import { withFirebase } from '../../../containers/Firebase';
// import * as ROUTES from '../../../routes';
import { Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
const PasswordChangePage = () => (
  <div>
    <PasswordChangeForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordChangeFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

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
                        <Input name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                        placeholder="New Password" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="passwordTwo"
                          value={passwordTwo}
                          onChange={this.onChange}
                          type="password"
                          placeholder="Confirm New Password" />
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

export default PasswordChangePage;

const PasswordChangeForm = withFirebase(PasswordChangeFormBase);

export { PasswordChangeForm };