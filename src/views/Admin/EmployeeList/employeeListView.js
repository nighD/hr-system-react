import React, { Component } from 'react';
import { Card, CardBody} from 'reactstrap';
import * as actionService from '../../../services/actionService';
import captain from '../../../assets/img/captain.png';
import hulk from '../../../assets/img/hulk.png';
import thor from '../../../assets/img/thor.png';
import spider from '../../../assets/img/spider.png';
import ant from '../../../assets/img/ant.png';
import { MDBDataTable,MDBBtn,MDBTableHead,MDBTableBody,MDBTable,MDBCard, MDBCardHeader, MDBCardBody, MDBTableEditable } from 'mdbreact';

var data = {
    columns:[
        {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Role',
            field: 'role',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Email',
            field: 'email',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Team',
            field: 'team',
            sort: 'asc',
            width: 200
        },
        {
            label: 'Status',
            field: 'status',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Created At',
            field: 'created',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Actions',
            field: 'action',
            sort: 'asc',
            width: 0
        }

    ],
    rows: [

    ],
    uidArray:[]
}
class TeamList extends Component {
  constructor(props){
    super(props);
    this.state = {data};
    // this.editClick = this.editClick.bind(this);
  }
  viewClick = uid => {
    console.log(uid)
    this.props.history.push({
      pathname: '/employeelist/detail',
      state: {uid: uid}
    })
  }
  editClick = uid => {
    console.log(uid)
    this.props.history.push({
      pathname:  '/employeelist/edit_detail',
      state: {uid: uid}
    })
  }
  componentDidMount(){
   
    // const team_id = JSON.parse(localStorage.getItem('userInfo')).teamid;
    actionService.getUserList().then(res => {

      const users = res.data.data;
      // console.log(users);
      var uidArray = [];
      users.map((user,index)=>{
        // const Edit =  <td><MDBBtn size="sm" color="primary"  onClick = {this.editClick.bind(this,user.emp_uid)} ><i className="fa fa-pencil " ></i></MDBBtn></td>;
        // const View =  <td><MDBBtn key = {index} size="sm" color="success"  onClick = {this.viewClick.bind(this,user.emp_uid)} ><i className="fa fa-search-plus " ></i></MDBBtn></td>;
        const ButtonTable = (
         
              <div>
                {/* <td><MDBBtn size="sm" color="primary"  onClick = {this.editClick.bind(this,user.emp_uid)} ><i className="fa fa-pencil " ></i></MDBBtn></td>
                <td><MDBBtn key = {index} size="sm" color="success"  onClick = {this.viewClick.bind(this,user.emp_uid)} ><i className="fa fa-search-plus " ></i></MDBBtn></td> */}
                <MDBBtn size="sm" color="primary" className="fa fa-pencil "  onClick = {this.editClick.bind(this,user.emp_uid)} style={{marginRight:'10px',marginLeft:'0px'}}>
				        </MDBBtn>
				        <MDBBtn key = {index} size="sm" color="success" className="fa fa-search-plus "  onClick = {this.viewClick.bind(this,user.emp_uid)} style={{marginRight:'0px',marginLeft:'0px'}} >
				        </MDBBtn>
                </div>

        );
        var newArray = this.state.data.rows.slice();
        newArray.push({
            name: user.emp_lname+ " "+ user.emp_fname,
            role: user.emp_role,
            email: user.emp_email,
            team: user.teamid,
            status: user.emp_status,
            created: user.createdAt.substring(0,10),
            action:  ButtonTable

        });
        // console.log(user.emp_uid)
        uidArray.push(user.emp_uid);
        
        this.setState( prevState => ({
          data: {
           ...prevState.data,
           rows: newArray
          //  [name] : value
          }
        }))
    })
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          ...prevState.rows,
          uidArray: uidArray
        }
      }))
      // this.setState({uidArray})
      console.log(this.state);
      // this.setState({users});
    })
  }
  render() {
    const avengers = [captain,hulk,thor,spider,ant]
    return (
        <div className="animated fadeIn">
        <Card  >
        <CardBody>
        <MDBDataTable 
            // dark
            // rows
            // autoWidth
            btn
            // tbodyTextWhite
            // theadColor ='#FFFFFF'
            // theadTextWhite
            striped
            borderless
            small
            data={this.state.data}
            // hover
            
        />
        </CardBody>
        </Card>
        </div>
       );
     }
   }
   
   export default TeamList;
