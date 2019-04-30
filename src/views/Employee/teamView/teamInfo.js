import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, CardText,CardFooter, Row, Table } from 'reactstrap';
import * as actionService from '../../../services/actionService';
import captain from '../../../assets/img/captain.png';
import iron from '../../../assets/img/iron.png';
import hulk from '../../../assets/img/hulk.png';
import thor from '../../../assets/img/thor.png';
import spider from '../../../assets/img/spider.png';
import ant from '../../../assets/img/ant.png';
function MemberList(props){
  const members = props.members;
  const listMember = members.map((member)=>
    <tr>
      <td>Avram Tarasios</td>
      <td>2012/02/01</td>
      <td>Staff</td>
      <td>
        <Badge color="danger">Banned</Badge>
      </td>
    </tr>
  );
  return listMember;
}
// function teamView (props) {
//   return ()
// }
class TeamDetail extends Component {
  constructor(props){
    super(props);
    this.state = { data: []};
  }
  componentDidMount(){
    const team_id = JSON.parse(localStorage.getItem('userInfo')).teamid;
    actionService.getTeamdetail(team_id).then(res => {
      const data = res.data;
      console.log(this.props);
      this.setState({data});
      console.log(this.state.data.User_Infos.map(user => (
        console.log(user)
      )));
      // console.lof(this.props)
      
    })
  }
  render() {
    const members = this.state.data.User_Infos;
    // console.log(this.state.data.User_Infos.)
    // console.log("hi :)");
    
    return (
      <div className="animated fadeIn">
      <Row>
          <Col xs="12" lg="6" md = "6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Team Members
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {members && members.map(member=>(
                    <tr>
                      <td>{member.emp_lname} {member.emp_fname}</td>
                      <td>{member.emp_email}</td>
                      <td>{member.emp_role}</td>
                      <td>
                      {(() => {
                        console.log(member.emp_status);
                        switch(member.emp_status){
                          case 'active':
                            return <Badge color="success">Active</Badge>;
                          case 'inactive':
                            return <Badge color ="danger">Inactive</Badge>;
                          default:
                            return null;
                      }} )()}
                      </td>
                    </tr>                    
                  ))}
                  </tbody>
                </Table>
                {/* <div>
                {this.state.User_Infos.map(member =>(
                    <h1 key = {member}>{member}</h1>                 
                  ))}
                </div> */}
                {/* <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
              <Card className="card-user card bg-dark">
                <CardBody>
                  <CardText />
                  {members && members.map(member=>(
                    <div>
                      {(() => {
                        console.log(member.emp_status);
                        switch(member.emp_status){
                          case 'active':
                            return (<div className="author">
                            {/* <div className="block block-one" />
                            <div className="block block-two" />
                            <div className="block block-three" />
                            <div className="block block-four" /> */}
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              <img
                                alt="..."
                                className="avatar"
                                src={iron}
                              />
                              {/* <h5 className="title" value = {this.state.person.emp_lname + ' '+ this.state.person.emp_fname}>{this.state.person.emp_lname + ' '+ this.state.person.emp_fname}</h5> */}
                            </a>
                            
                            
                            {/* <p className="description">{this.state.person.emp_role}</p> */}
                          </div>)
                          case 'inactive':
                            return (<div className="author">
                            {/* <div className="block block-one" />
                            <div className="block block-two" />
                            <div className="block block-three" />
                            <div className="block block-four" /> */}
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              <img
                                alt="..."
                                className="avatarmember"
                                src={ant}
                              />
                              {/* <h5 className="title" value = {this.state.person.emp_lname + ' '+ this.state.person.emp_fname}>{this.state.person.emp_lname + ' '+ this.state.person.emp_fname}</h5> */}
                            </a>
                            </div>)
                          default:
                            return null;
                      }} )()}
                    </div>                    
                  ))}
                  
                    {/* <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatarmember"
                        src={captain}
                      /> */}
                      {/* <h5 className="title" value = {this.state.person.emp_lname + ' '+ this.state.person.emp_fname}>{this.state.person.emp_lname + ' '+ this.state.person.emp_fname}</h5> */}
                    {/* </a> */}
                   
                    {/* <p className="description">{this.state.person.emp_role}</p> */}
                  
                  {/* <div className="author">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="avatarmember"
                          src={hulk}
                        /> */}
                        {/* <h5 className="title" value = {this.state.person.emp_lname + ' '+ this.state.person.emp_fname}>{this.state.person.emp_lname + ' '+ this.state.person.emp_fname}</h5> */}
                    {/* </a>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="avatarmember"
                          src={spider}
                        /> */}
                        {/* <h5 className="title" value = {this.state.person.emp_lname + ' '+ this.state.person.emp_fname}>{this.state.person.emp_lname + ' '+ this.state.person.emp_fname}</h5> */}
                    {/* </a> */}
                  {/* </div> */}
                  {/* <div className="card-description">
                    “Doesn't matter what the press says. Doesn't matter what the politicians or the mobs say. 
                    Doesn't matter if the whole country decides that something wrong is something right. 
                    This nation was founded on one principle above all else: The requirement that we stand up for what we believe, 
                    no matter the odds or the consequences. When the mob and the press and the whole world tell you to move, 
                    your job is to plant yourself like a tree beside the river of truth, and tell the whole world -- "No, YOU move.” 
                  </div> */}
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

       );
     }
   }
   
   export default TeamDetail;
   