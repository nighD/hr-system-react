import React, { Component } from 'react';
import { Badge,Label, Card, CardBody, CardHeader, Col, CardText,CardFooter, Row, Table,Button} from 'reactstrap';
// import * as actionService from '../../../services/actionService';
import { MDBDataTable,MDBBtn,MDBTableHead,MDBTableBody,MDBTable } from 'mdbreact';
import * as actionService from '../../../../services/actionService';
var data = {
    columns:[
        {
            label: 'Employee',
            field: 'emp_name',
            sort: 'asc',
            width: 150
        },
        {
            label: ' Regular Hours',
            field: 'rh',
            sort: 'asc',
            width: 300
        },
        {
          label: 'OverTime',
          field: 'ot',
          sort: 'asc',
          width: 300
        },
        {
            label: 'Additional Earnings',
            field: 'add_earnings',
            sort: 'asc',
            width: 200
        },
        {
            label: 'Gross Pay',
            field: 'gp',
            sort: 'asc',
            width: 100
        },
        {
          label: 'Reimbusement',
          field: 'r',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Payment Method',
          field: 'pm',
          sort: 'asc',
          width: 100
        },
    ],
    rows: [

    ]
}
export default class StepOne extends Component {
  constructor(props){
    super(props);
    this.state = {data};
    // this.getUsers = this.getUsers.bind(this);
  }
  componentDidMount(){
    // const team_id = JSON.parse(localStorage.getItem('userInfo')).teamid;
    // this.getUsers();
    actionService.getUserList().then(res => {
      const data = res.data.data;
      const payment_method = (
            <label><i className="fa fa-money"/>Direct deposit</label>
      );
      data.map((element,index)=>{
        var newArray = this.state.data.rows.slice();
        newArray.push( {
          emp_name: element.emp_fname + " "+ element.emp_lname,
          pm: payment_method
        })
        this.setState( prevState => ({
          data: {
           ...prevState.data,
           rows : newArray
          }
        }))
        console.log(this.state.data.rows);
      })

      // members = this.state.data[0].User_Infos;
    })
  }

  // async getUsers(){
  //   await actionService.getUserList().then(res => {
  //     const data = res.data.data;
  //     // this.setState({data});
  //     console.log(data);
  //     data.map((element,index)=>{
  //       const a = {
  //         emp_name: element.emp_fname
  //       }
  //       this.setState( prevState => ({
  //         data: {
  //          ...prevState.data,
  //          rows : a
  //         }
  //       }))
  //     })
  //     // members = this.state.data[0].User_Infos;
  //   })
  // }
  render() {
    return (
        <div className="animated fadeIn">
        <Card>
        <CardBody>
        <div>
          <h3> Hours & Additional Earnings</h3>
        </div>
        <Label>update your employees's hours, reimbursements, abd additional earnings below.</Label>
        <Label>To pay your employees with direct deposit on . You'll need to run payroll by on. If you miss this deadline, your employees's direct deposit will be delayed.</Label>
        <MDBDataTable
            data={this.state.data}
            striped
            borderless
            small
            
        />
        </CardBody>
          <this.props.Stats step={1} {...this.props} />
        </Card>
        </div>
       );
     }
   }
