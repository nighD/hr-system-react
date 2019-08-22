import React, { Component } from 'react';
import { Label, 
  Card, 
  CardBody, 
  Col,  
  Row } from 'reactstrap';
// import * as actionService from '../../../services/actionService';
// import { MDBDataTable,MDBBtn,MDBTableHead,MDBTableBody,MDBTable } from 'mdbreact';
// import * as actionService from '../../../../services/actionService';
// import { elementType } from 'prop-types';

// var data = {
//     columns:[
//         {
//             label: 'Employee',
//             field: 'emp_name',
//             sort: 'asc',
//             width: "40%"
//         },
//         {
//             label: "Paid Time Off Hours (PTO)",
//             field: 'ptoh',
//             sort: 'asc',
//             width: "10%"
//         },
//         {
//             label: 'Sick Hours (S)',
//             field: 'sick_hours',
//             sort: 'asc',
//             width: "50%"
//         }
//     ],
//     rows: [

//     ]
    
// }
// const trigger = false;
// const dataHour = {
//   data:[],
//   trigger: false
// };

export default class StepFour extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {data:data,dataPayroll : this.props.data,trigger,dataHour};
  //   this.createTable = this.createTable.bind(this);
  //   this.prepareHour = this.prepareHour.bind(this);
  //   this.handleChange = this.handleChange.bind(this);

  // }
  async componentDidMount(){

  }


  render() {
    return (
      
        <div className="animated fadeIn">
        
          <Card style={{height:'100%',width:'100%'}}>
          <CardBody>
          <Row >
            <Col md="1">
              <i className="fa fa-plane fa-4x" aria-hidden="true"></i>
            </Col>
            <Col md="11">
              <h3> Time Off</h3>
              <Label>With your time off policies set up, you can track the Paid Time Off, and Holiday Hours for this pay period below.</Label>
            </Col>
          </Row>
                {/* <MDBDataTable
                data={this.state.data}
                striped
                borderless
                small
                
            /> */}
            </CardBody>
              <this.props.Stats step={4} {...this.props} />
            </Card>
            
        </div>
       );
     }
   }
