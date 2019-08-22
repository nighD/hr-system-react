import React, { Component } from 'react';
import {  Card, CardBody} from 'reactstrap';
import * as actionService from '../../../services/actionService';

import { MDBDataTable,MDBBtn} from 'mdbreact';
var data = {
    columns:[
        {
            label: 'Team Name',
            field: 'team_name',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Discription',
            field: 'dis',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Status',
            field: 'status',
            sort: 'asc',
            width: 100
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
            width: 50
        }

    ],
    rows: [

    ]
}
class TeamList extends Component {
  constructor(props){
    super(props);
    this.state = { teams: [],data};
  }
  componentDidMount(){
    
    // const team_id = JSON.parse(localStorage.getItem('userInfo')).teamid;
    actionService.getTeamlist().then(res => {
        // console.log(res.data.data);
        const teams = res.data.data;
        
        // console.log(teams);
        teams.map((team,index)=>{
            var newArray = this.state.data.rows.slice();
            // console.log(team.team_id);
            const ButtonTable = (
              <div>
              {/* <MDBBtn size="sm" color="primary" className="fa fa-pencil "   onClick = {this.editClick.bind(this,team.id)}   style={{marginLeft:'20px',}}></MDBBtn> */}
              <MDBBtn size="sm" color="success" className="fa fa-search-plus "   onClick = {this.viewClick.bind(this,team.id)} ></MDBBtn>
              </div>
            );
            newArray.push({
              team_name: team.team_name,
              dis: team.team_dis,
              status: team.team_status,
              created: team.createdAt.substring(0,10),
              action:  ButtonTable
  
            });
          this.setState( prevState => ({
            data: {
             ...prevState.data,
             rows: newArray
            //  [name] : value
            }
          }))
          return true;
      })
      this.setState({teams});
      // console.log(this.state);
    });
  }
  viewClick = id => {
    console.log(id)
    this.props.history.push({
      pathname: '/teamlist/detail',
      state: {team_id: id}
    })
  }
  editClick = id => {
    // console.log(id)
    this.props.history.push({
      pathname:  '/teamlist/edit_detail',
      state: {team_id: id}
    })
  }
  viewTeamDetail = (param,event) => {
    // console.log(param);
  };
  render() {
    // const avengers = [captain,hulk,thor,spider,ant]
    return (
        <div className="animated fadeIn">
        <Card>
        <CardBody>
        <MDBDataTable
            data={this.state.data}
            striped
            borderless
            small
            
        />
        </CardBody>
        </Card>
        </div>
       );
     }
   }
   
   export default TeamList;
