import React, { Component } from 'react';
import {  Card, CardBody, Col, Row,Label} from 'reactstrap';
import * as actionService from '../../../services/actionService';
import { MDBDataTable } from 'mdbreact';
import {Button} from 'reactstrap';
var data = {
    columns:[
        {
            label: 'Employee Name',
            field: 'emp_name',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Request Date',
            field: 'reqdate',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Start Date',
            field: 'startdate',
            sort: 'asc',
            width: 100
        },
        {
            label: 'No of Days',
            field: 'nodays',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Status',
            field: 'Status',
            width: 50,
        }

    ],
    rows: [

    ]
}
var colors = {
  
    
    all: 'light',
    pending:'light',
    approved: 'light',
    rejected: 'light',
    draft: 'light'
    
}
class LeaveList extends Component {
  constructor(props){
    super(props);
    this.state = { teams: [],data,colors};
    this.checkTable = this.checkTable.bind(this);
    this.getAllLeaves = this.getAllLeaves.bind(this);
    this.viewClick = this.viewClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.viewTeamDetail = this.viewTeamDetail.bind(this);
    this.getLeavesStatus = this.getLeavesStatus.bind(this);
    // this.handleRowClick = this.handleRowClick.bind(this);
    this.tempCheckTable = this.tempCheckTable.bind(this);
  }
  componentDidMount(){
    this.getAllLeaves();
    this.checkTable(0);
    
  }
  viewClick = id => {
    // console.log(id)
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
//   handleLeaveList = (e) => {
//     // let a = this.state.le
//   }
  getAllLeaves = () => {
    actionService.getLeaveList().then(res => {
      const leaves = res.data.data;
      // console.log(leaves);
      var leaveArray = [];
      // var leaveStatus = [];
      let statusColor;
      leaves.map((leave,index) => {
        switch(leave.status){
          case 'Pending':
            statusColor = (
              <Label className="text-warning" onClick ={this.getLeavesStatus.bind(this,'pending')}><b>{leave.status}</b></Label>
            );
            break;
          case 'Approved':
            statusColor = (
              <Label className="text-success" onClick ={this.getLeavesStatus.bind(this,'approved')}><b>{leave.status}</b></Label>
            );
            break;
          case 'Rejected':
            statusColor = (
              <Label className="text-danger" onClick ={this.getLeavesStatus.bind(this,'rejected')}><b>{leave.status}</b></Label>
            );
            break;
          case 'Draft':
            statusColor = (
              <Label className="text-dark" onClick ={this.getLeavesStatus.bind(this,'draft')}><b>{leave.status}</b></Label>
            );
            break;
          default:
        }
        leaveArray.push({
          emp_name: leave.emp_name,
          reqdate: leave.requested_date.substring(0,10),
          startdate: leave.start_date.substring(0,10),
          nodays: leave.duration,
          status: statusColor,
        })
        return true;
        })
      this.setState({leaveList: leaves});
      this.setState(prevState => ({
        data: {
         ...prevState.data,
         rows: leaveArray
        }
      })
      )
    })
  };
  getLeavesStatus =(status) =>{
      let empleaveList = this.state.leaveList;
      let leaveStatus = [];
      let statusColor;
      switch(status){
        case 'Pending':
          statusColor = (
            <Label className="text-warning" ><b>{status}</b></Label>
          );
          break;
        case 'Approved':
          statusColor = (
            <Label className="text-success" ><b>{status}</b></Label>
          );
          break;
        case 'Rejected':
          statusColor = (
            <Label className="text-danger" ><b>{status}</b></Label>
          );
          break;
        case 'Draft':
          statusColor = (
            <Label className="text-dark" ><b>{status}</b></Label>
          );
          break;
        default:
          return true;
      }
      empleaveList.map((leave,index)=>{
        if(leave.status === status){
            leaveStatus.push({
                emp_name: leave.emp_name,
                reqdate: leave.requested_date.substring(0,10),
                startdate: leave.start_date.substring(0,10),
                nodays: leave.duration,
                status: statusColor,
              })
        }
        return true;
      });
      this.setState(prevState => ({
        data: {
         ...prevState.data,
         rows: leaveStatus
        }
      })
      )

  }
  tempCheckTable(a){
    let colors = {
      all: 'light',
      pending:'light',
      approved: 'light',
      rejected: 'light',
      draft: 'light'
    }
    switch(a){
      case 0:
        colors.all = 'danger';
        break;
      case 1:
        colors.draft = 'danger';
        break;
      case 2:
        colors.pending = 'danger';
        break;
      case 3:
        colors.approved = 'danger';
        break;
      case 4:
        colors.rejected = 'danger';
        break;
      default:
    }
    this.setState({colors: colors});
  }
  checkTable(a){
    let colors = {
      all: 'light',
      pending:'light',
      approved: 'light',
      rejected: 'light',
      draft: 'light'
    }
    switch(a){
      case 0:
        colors.all = 'danger';
        this.getAllLeaves();
        break;
      case 1:
        colors.draft = 'danger';
        this.getLeavesStatus('Draft');
        break;
      case 2:
        colors.pending = 'danger';
        this.getLeavesStatus('Pending');
        break;
      case 3:
        colors.approved = 'danger';
        this.getLeavesStatus('Approved');
        break;
      case 4:
        colors.rejected = 'danger';
        this.getLeavesStatus('Rejected');
        break;
      default:
    }
    this.setState({colors: colors});
    // console.log(this.state.colors.all);
  }
  render() {
    return (
        <div className="animated fadeIn">
        <Card>
        <CardBody>
        <Row className="align-items-center mt-3">
            <Col col="2" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color={this.state.colors.all} className ="btn-pill" onClick ={this.checkTable.bind(this,0)} >All</Button>
            </Col>
            <Col col="2" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color={this.state.colors.draft} className ="btn-pill" onClick ={this.checkTable.bind(this,1)} >Draft</Button>
            </Col>
            <Col col="2" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color={this.state.colors.pending} className ="btn-pill" onClick ={this.checkTable.bind(this,2)} >Pending</Button>
            </Col>
            <Col col="2" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color={this.state.colors.approved} className ="btn-pill" onClick ={this.checkTable.bind(this,3)} >Approved</Button>
            </Col>
            <Col col="2" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color={this.state.colors.rejected}className ="btn-pill" onClick ={this.checkTable.bind(this,4)} >Rejected</Button>
            </Col>
        </Row>
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
   
   export default LeaveList;
