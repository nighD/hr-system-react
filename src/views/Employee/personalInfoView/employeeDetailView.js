import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { CardGroup, Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../../containers/Firebase';
import { AuthUserContext } from '../../../containers/Session';
import * as actionService from '../../../services/actionService';
// import { Line } from 'react-chartjs-2';
import captain from '../../../assets/img/captain.png';
// import captain from '../../../assets/img/captain.png';
// import * as ROUTES from '../../../routes';
// import Widget03 from '../../Widgets/Widget03';
// import Avatar from 'react-avatar';
// import * as ROUTES from '../../../routes.js';
import {
    // Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardText,
    Col,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Row,
  } from 'reactstrap';
// const UserPage = () => (
//   <div>
//     <UserDetail />
//   </div>
// );
// var parseDate = require('postgres-date');

const state = {
  person : {
    id:'',
    emp_lname: '',
    emp_fname: '',
    emp_gender: '',
    emp_email: '',
    emp_role: '',
    emp_status: '',
    emp_dob: '',
    emp_pass:'',
    emp_street: '',
    emp_phone: '',
    emp_city: '',
    emp_postal: '',
    emp_country:'',
    emp_uid:'',
  }
}
const ButtonEdit = withRouter(({ history }) => (
  <Button type="button" 
  size="lg" 
  color="primary"  
  onClick={() => { history.push('/edit_detail') }}>
  <i className="fa fa-pencil"></i> 
  Edit</Button>
))
class Detail extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.gender_male = React.createRef();
    this.gender_female = React.createRef();
    this.gender_other = React.createRef();
    this.state = { ...state };
    // console.log(this.state);

  }

componentDidMount() {
    const uid =JSON.parse(localStorage.getItem('authUser')).uid;
    actionService.getUserdetail(uid).then(res => {
      const person = res.data.data;
      // console.log(res.data.data);
      person.emp_dob = person.emp_dob.substring(0,10);
      this.setState( {person} ); 
        if (this.state.person.emp_gender === 'male'){
          this.gender_male.current.selected = true;
        }
        else if (this.state.person.emp_gender === 'female'){
          this.gender_female.current.selected = true;
        }
        else if (this.state.person.emp_gender === 'other') {
          this.gender_other.current.selected = true;
        }
        else {
          
        }
        localStorage.setItem('userInfo',JSON.stringify(person));
    })
}
  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser =>
        <div>
        {/* { */}
         
          {/* {!!(authUser.uid==1)} */}
        <div className="content">
          
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <strong>Profile</strong>
                </CardHeader>
                <CardBody>
                  <Form  encType="multipart/form-data">
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                            <Label>Employee First Name</Label>
                            <Input type="text" id="fname" placeholder="Enter your first name" disabled value = {this.state.person.emp_fname}/>
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <label>Employee Last Name</label>
                          <Input type="text" id="lname" placeholder="Enter your last name" disabled value = {this.state.person.emp_lname}/>
                        </FormGroup>
                      </Col>      
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <Label htmlFor="email-input">Email</Label>
                          <Input type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email" disabled value = {this.state.person.emp_email}/>
                          <FormText className="help-block">Please enter your email</FormText>
                        </FormGroup>
                      </Col> 
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                        <Label htmlFor="date-input">Date of Birth</Label>
                        <Input type="date" id="date-input" name="date-input" placeholder="date" disabled value = {this.state.person.emp_dob} />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                            <Label htmlFor="disabled-input">Status</Label>
                            <Input type="text" id="disabled-input1" name="disabled-input" disabled value = {this.state.person.emp_status} />
                        </FormGroup>
                      </Col>      
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input type="number" id="phoneNumber" placeholder="Enter phone number" disabled value = {this.state.person.emp_phone}/>
                        </FormGroup>
                      </Col> 
                    </Row>     
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="select">Gender</Label>
                          <Input type="select" name="select" id="select" required disabled>
                          <option value="0" >Please select</option>
                          <option value="1" ref ={this.gender_male}>Male</option>
                          <option value="2" ref ={this.gender_female}>Female</option>
                          <option value="3" ref = {this.gender_other}>Other</option>
                        </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="disabled-input">Role</Label>
                          <Input type="text" id="disabled-input" name="disabled-input" disabled value = {this.state.person.emp_role} />
                        </FormGroup>
                      </Col>
                    </Row>            
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <Label htmlFor="street">Street</Label>
                          <Input type="text" id="street" placeholder="Enter street name"  disabled value = {this.state.person.emp_street}/>
                        </FormGroup>
                      </Col>
                    </Row>                    
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <Label htmlFor="city">City</Label>
                          <Input type="text" id="city" placeholder="Enter your city" disabled value = {this.state.person.emp_city}/>
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <Label htmlFor="country">Country</Label>
                          <Input type="text" id="country" placeholder="Country name" disabled value = {this.state.person.emp_country}/>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <Label htmlFor="postal-code">Postal Code</Label>
                          <Input type="text" id="postal-code" placeholder="Postal Code" disabled value = {this.state.person.emp_postal}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="file-input">Avatar</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="file" id="file-input" name="file-input" />
                      </Col>
                    </FormGroup> */}
                    {/* <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="password-input">Password</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password"  disabled value = {this.state.person.emp_pass}/>
                        <FormText className="help-block">Please enter a complex password</FormText>
                      </Col>
                    </FormGroup> */}
                  </Form>
                </CardBody>
                <CardFooter>
                 
                    <Row>
                      <Col md = "4"/>
                      <Col md = "4" className = "text-center">
                       <ButtonEdit/>
                      </Col>
                      <Col md = "4"/>
                    </Row>                  
                  {/* <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button> */}
                </CardFooter>
              </Card>
              </Col>
              <Col md="4">
              <Card className="card-user card bg-dark">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={captain}
                      />
                      <h5 className="title" value = {this.state.person.emp_lname + ' '+ this.state.person.emp_fname}>{this.state.person.emp_lname + ' '+ this.state.person.emp_fname}</h5>
                    </a>
                    
                  </div>
                  {/* <div className="card-description">
                    “Doesn't matter what the press says. Doesn't matter what the politicians or the mobs say. 
                    Doesn't matter if the whole country decides that something wrong is something right. 
                    This nation was founded on one principle above all else: The requirement that we stand up for what we believe, 
                    no matter the odds or the consequences. When the mob and the press and the whole world tell you to move, 
                    your job is to plant yourself like a tree beside the river of truth, and tell the whole world -- "No, YOU move.” 
                  </div> */}
                </CardBody>
                {/* <CardFooter> */}
                  {/* <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fa fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fa fa-google-plus" />
                    </Button>
                  </div> */}
                {/* </CardFooter> */}
              </Card>
            </Col>
          </Row>     
        
      </div>
      </div>
    }
    </AuthUserContext.Consumer>
    );
  }
}
const UserForm = compose(
    withRouter,
    withFirebase,
  )(Detail);
export default withFirebase(Detail);
export {UserForm};
