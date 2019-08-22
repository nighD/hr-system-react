import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, CardText,CardFooter, Row, Table,Button} from 'reactstrap';
import * as actionService from '../../../services/actionService';
import captain from '../../../assets/img/captain.png';
import iron from '../../../assets/img/iron.png';
import hulk from '../../../assets/img/hulk.png';
import thor from '../../../assets/img/thor.png';
import spider from '../../../assets/img/spider.png';
import ant from '../../../assets/img/ant.png';

// function teamView (props) {
//   return ()
// }
let members;
class TeamListDetail extends Component {
  constructor(props){
    super(props);
    this.state = { data: []};
    this.getTeamDetail = this.getTeamDetail.bind(this);
  }
  async componentDidMount(){
    // const team_id = JSON.parse(localStorage.getItem('userInfo')).teamid;
    await this.getTeamDetail();
  }

  async getTeamDetail(){
    const team_id =this.props.location.state.team_id;
    // console.log(team_id);
    await actionService.getTeamdetail(team_id).then(res => {
      // console.log(team_id);

      const data = res.data.data[0];
      this.setState({data},()=>{
        // console.log(data);
        
      });


    })
  }
  render() {
    const avengers = [thor,hulk,iron,spider,ant]
    members = this.state.data.User_Infos;
    return (
      <div className="animated fadeIn">
      <Row>
          <Col xs="12" lg="6" md = "6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Team Members
                  <div className="card-header-actions">
                    {/*eslint-disable-next-line*/}
                    <a href="#" className="card-header-action "><i className="icon-settings"></i></a>
                  </div>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {members && members.map((member,index)=>(
                    <tr key={index}>
                      <td key={"name"+index}>{member.emp_lname} {member.emp_fname}</td>
                      <td key={"email"+index}>{member.emp_email}</td>
                      <td key={"role"+index}>{member.emp_role}</td>
                      <td key={"status"+index}>
                      {(() => {
                        // console.log(index);
                        switch(member.emp_status){
                          case 'active':
                            return <Badge color="success">Active</Badge>;
                          case 'inactive':
                            return <Badge color ="danger">Inactive</Badge>;
                          default:
                            return null;
                      }} )()}
                      </td>
                      <td key={"button"+index}><Button size="sm" color="danger" className="fa fa-remove "    style={{marginLeft:'10px'}}></Button></td>
                    </tr>                    
                  ))}
                  {/* <td></td> */}
                  {/* <td><Button color="link" size="lg" style={{margin:'auto'}} block>Block level button</Button></td> */}
                  {/* <td></td> */}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
              <Card className="card-user card bg-dark">
              <CardHeader className = "text-center">
                {this.state.data.team_name}
              </CardHeader>
                <CardBody>
                  <CardText />
                  <div className="author">
                            <div className="block block-one" />
                            <div className="block block-two" />
                            <div className="block block-three" />
                            <div className="block block-four" />
                            {members && members.map((member,index)=>(
                    
                     
                    (() => {
                      // console.log(member.emp_role);
                      switch(member.emp_role){
                        case 'manager':
                          return (
                          <a key={"a"} href="#pablo" onClick={e => e.preventDefault()}>
                            <img
                              alt="..."
                              className="avatar"
                              src={captain}
                            />
                            <h5 className="title" >{member.emp_lname} {member.emp_fname}</h5>
                          </a>)
                        default:
                          return null;
                    }} )()
                    
                                     
                ))}
                </div> 
                <div className="author text-auto">
                            <div className="block block-one" />
                            <div className="block block-two" />
                            <div className="block block-three" />
                            <div className="block block-four" /> 
                  <Row>      
                  {members && members.map((member,index)=>(
                    
                     
                      (() => {
                        // console.log(member);
                        switch(member.emp_role){
                          case 'employee':
                            return (
                            <Col key={index} md ="3">
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              <img
                                alt="..."
                                className="avatarmember"
                                src={avengers[index]}
                              />
                              <p className="text" >{member.emp_lname} {member.emp_fname}</p>
                            </a>
                            </Col>)
                          default:
                            return null;
                      }} )()
                      
                                       
                  ))}
                  </Row> 
                  </div>
                  <p className='description'>
                    {this.state.data.team_dis }
                  </p> 
                </CardBody>
                <CardFooter>
                </CardFooter>
              </Card>
            </Col>
        </Row>
      </div>

       );
     }
   }
   
   export default TeamListDetail;
   