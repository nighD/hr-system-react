import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, CardText,CardFooter, Row, Table,Button} from 'reactstrap';
// import * as actionService from '../../../services/actionService';
import { MDBDataTable,MDBBtn,MDBTableHead,MDBTableBody,MDBTable } from 'mdbreact';
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
export class StepOne extends Component {
  constructor(props){
    super(props);
    this.state = {data};
    // this.getTeamDetail = this.getTeamDetail.bind(this);
  }
  componentDidMount(){
    // const team_id = JSON.parse(localStorage.getItem('userInfo')).teamid;
    // this.getTeamDetail();
  }

//   async getTeamDetail(){
//     const team_id =this.props.location.state.team_id;
//     console.log(team_id);
//     await actionService.getTeamdetail(team_id).then(res => {
//       const data = res.data.data;
//       this.setState({data});
//       members = this.state.data[0].User_Infos;
//     })
//   }
  render() {
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
   