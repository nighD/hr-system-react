import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { CardGroup, Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../../containers/Firebase';
import * as actionService from '../../../services/actionService';
import captain from '../../../assets/img/captain.png';
import * as ROUTES from '../../../routes';
import { AuthUserContext } from '../../../containers/Session';
import {
    // Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardText,
    Col,
    // Collapse,
    // DropdownItem,
    // DropdownMenu,
    // DropdownToggle,
    // Fade,
    Form,
    FormGroup,
    FormText,
    // FormFeedback,
    Input,
    // InputGroup,
    // InputGroupAddon,
    // InputGroupButtonDropdown,
    // InputGroupText,
    Label,
    Row,
  } from 'reactstrap';
// const EditUserPage = () => (
//   <div>
//     <EditUserDetail />
//   </div>
// );

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
// const ButtonSubmit = withRouter(({ history }) => (
//   <Button type="button" 
//   size="lg" 
//   color="primary"  
//   onClick={() => { 
//     console.log(this.state);
//     history.push('/dashboard') 
//   }}>
//   <i className="fa fa-pencil"></i> 
//   Submit</Button>
// ))
class EditDetail extends Component {
  constructor(props) {
      super(props);
      this.gender_male = React.createRef();
      this.gender_female = React.createRef();
      this.gender_other = React.createRef();
      this.handleChange = this.handleChange.bind(this);
      this.state = { ...state };

  }
  componentDidMount() {
    const uid =JSON.parse(localStorage.getItem('authUser')).uid;
    //console.log(uid);
    actionService.getUserdetail(uid).then(res => {
      const person = res.data.data;
      //console.log(person);
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
      //console.log(this.state);
      localStorage.setItem('userInfo',JSON.stringify(person));
    })

  }
  onSubmit = event => {
    event.preventDefault();
    //console.log(this.state.person);
    const uid =JSON.parse(localStorage.getItem('authUser')).uid;
    //console.log(this.state.person);
    actionService.updateUserdetail(uid,this.state.person);
    this.props.history.push(ROUTES.DETAIL);
  };

  handleChange = (event) => {
    const {name, value} = event.target
    // let data = {...this.state.person}
    // data. = value
    // console.log(data.(name))
    //console.log(value);
     this.setState( prevState => ({
        ...prevState.person,
        [name] : value
     }),()=>{
      //  console.log(this.state.)
     });
  };

  render() {

    return (
    <AuthUserContext.Consumer>
      {authUser =>
        <div>
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
                            <Input 
                              type="text" 
                              id="emp_fname" 
                              name ="emp_fname" 
                              autoComplete
                              placeholder="Enter your first name"  
                              defaultValue = {this.state.person.emp_fname}
                              onChange={this.handleChange}
                            />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <label>Employee Last Name</label>
                          <Input 
                            type="text" 
                            id="emp_lname" 
                            name="emp_lname" 
                            placeholder="Enter your last name"  
                            autoComplete
                            defaultValue = {this.state.person.emp_lname}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>      
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <Label htmlFor="email-input">Email</Label>
                          <Input 
                            type="email" 
                            id="email-input" 
                            name="emp_email" 
                            placeholder="Enter Email" 
                            autoComplete="email"  
                            defaultValue = {this.state.person.emp_email}
                            onChange={this.handleChange}
                          />
                          <FormText className="help-block">Please enter your email</FormText>
                        </FormGroup>
                      </Col> 
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                        <Label htmlFor="date-input">Date of Birth</Label>
                        <Input 
                          type="date" 
                          id="date-input" 
                          name="emp_dob" 
                          placeholder="date"
                          autoComplete  
                          defaultValue = {this.state.person.emp_dob}
                          onChange={this.handleChange} 
                        />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                            <Label htmlFor="-input">Status</Label>
                            <Input 
                              type="text" 
                              id="-input1" 
                              name="emp_status"  
                              autoComplete
                              defaultValue = {this.state.person.emp_status}
                              onChange={this.handleChange} 
                            />
                        </FormGroup>
                      </Col>      
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            type="number" 
                            id="phoneNumber" 
                            name = "emp_phone" 
                            placeholder="Enter phone number" 
                            autoComplete 
                            defaultValue = {this.state.person.emp_phone}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col> 
                    </Row>     
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="select">Gender</Label>
                          <Input autoComplete type="select" name="emp_gender" id="select" required  onChange = {this.handleChange}>
                          <option value="0" >Please select</option>
                          <option value="1" ref ={this.gender_male}>Male</option>
                          <option value="2" ref ={this.gender_female}>Female</option>
                          <option value="3" ref = {this.gender_other}>Other</option>
                        </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="-input">Role</Label>
                          <Input 
                            type="text" 
                            id="-input" 
                            name="emp_role"  
                            autoComplete
                            defaultValue = {this.state.person.emp_role}
                            onChange={this.handleChange} 
                          />
                        </FormGroup>
                      </Col>
                    </Row>            
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <Label htmlFor="street">Street</Label>
                          <Input 
                            type="text" 
                            id="street" 
                            name = "emp_street" 
                            autoComplete
                            placeholder="Enter street name"   
                            defaultValue = {this.state.person.emp_street}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>                    
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <Label htmlFor="city">City</Label>
                          <Input 
                            type="text" 
                            id="city" 
                            name = "emp_city" 
                            placeholder="Enter your city"
                            autoComplete  
                            defaultValue = {this.state.person.emp_city}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <Label htmlFor="country">Country</Label>
                          <Input 
                            type="text" 
                            id="country" 
                            name = "emp_country" 
                            placeholder="Country name" 
                            autoComplete 
                            defaultValue = {this.state.person.emp_country}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <Label htmlFor="postal-code">Postal Code</Label>
                          <Input 
                            type="text" 
                            id="postal-code" 
                            name = "emp_postal" 
                            placeholder="Postal Code"  
                            autoComplete
                            defaultValue = {this.state.person.emp_postal}
                            onChange={this.handleChange}
                          />
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
                        <Input type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password"   value = {this.state.person.person.emp_pass}/>
                        <FormText className="help-block">Please enter a complex password</FormText>
                      </Col>
                    </FormGroup> */}
                  </Form>
                </CardBody>
                <CardFooter>
                  {/* <ButtonEdit/> */}
                  <Row>
                  <Col md = "4"/>
                  <Col md = "4" className = "text-center">
                  {/* <ButtonSubmit/> */}
                  <Button size="lg" color="primary" onClick = {this.onSubmit}><i className="fa fa-pencil " ></i> Submit</Button>
                  <Button type="reset" size="lg" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                  </Col>
                  <Col md = "4"/>
                  </Row>
                </CardFooter>
              </Card>
              </Col>
              <Col md="4">
              <Card className="card-user bg-dark">
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
                      <h5 className="title">{this.state.person.emp_lname + ' ' + this.state.person.emp_fname}</h5>
                    </a>

                  </div>

                </CardBody>
                <CardFooter>
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
                </CardFooter>
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
const EditUserForm = compose(
    withRouter,
    withFirebase,
  )(EditDetail);
export default EditDetail;
export {EditUserForm};
