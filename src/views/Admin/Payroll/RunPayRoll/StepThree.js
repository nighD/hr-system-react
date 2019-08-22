import React, { Component } from 'react';
import { 
  Label, 
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Row, 
  Button,
  Collapse
} from 'reactstrap';
// import * as actionService from '../../../services/actionService';
import { MDBDataTable } from 'mdbreact';
// import * as actionService from '../../../../services/actionService';
var dataHour = {
  columns: [
    {
      label:'Employee',
      field: 'emp_name',
      sort: 'asc',
      width:'10%'
    },
    {
      label:'Compensation Type',
      field: 'type',
      sort: 'asc',
      width:'10%'
    },
    {
      label:'Regular Hours',
      field: 'rh',
      sort: 'asc',
      width:'10%'
    },
    {
      label:'OverTime',
      field: 'ot',
      sort: 'asc',
      width:'10%'
    },
    {
      label:'Vacation',
      field: 'vacation',
      sort: 'asc',
      width:'10%'
    },
    {
      label:'Sick',
      field: 'sick',
      sort: 'asc',
      width:'10%'
    },
    {
      label:'Holiday',
      field: 'holiday',
      sort: 'asc',
      width:'10%'
    },
    {
      label:'Total Hours',
      field: 'total',
      sort: 'asc',
      width:'10%'
    },
  ],
  rows:[]
}
var data = {
    columns:[
        {
            label: 'Employee',
            field: 'emp_name',
            sort: 'asc',
            width: "30%"
        },
        {
            label: "Gross Pay",
            field: 'gp',
            sort: 'asc',
            width: "20%"
        },
        {
            label: 'Refund',
            field: 're',
            sort: 'asc',
            width: "10%"
        },
        {
            label: 'Taxes',
            field: 'tax',
            sort: 'asc',
            width: "20%"
        },
        {
          label: 'Sub Total',
          field: 'st',
          sort: 'asc',
          width: "20%"
      },
    ],
    rows: [

    ]
    
}
const trigger = false;

export default class StepThree extends Component {
  constructor(props){
    super(props);
    this.state = {data:data,dataPayroll : this.props.data,trigger, accordion: [true, false, false],dataOff: this.props.dataOff,dataHour:dataHour};
    this.createTable = this.createTable.bind(this);
    this.createTableHours = this.createTableHours.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
  }
  async componentDidMount(){
    
    await this.createTableHours().then(async(res)=>{
      this.setState({
        dataHour:{
          columns: this.state.dataHour.columns,
          rows: res
        }
      })
    });
    await this.createTable().then(async(res) => {
    //   console.log(res);
      this.setState({
        data:{
          columns : this.state.data.columns,
          rows: res
        }, trigger: true
      },()=>{
      })
    }).catch(error => {
      console.log(error);
    })

  }
  async createTable(){
    const data = this.state.dataPayroll.data;
    var a = [];
    data.map(async (element,index)=>{
      if (element[0].gp === undefined){
        
        element[0].gp = 0;
      }
      const tax = Math.round(element[0].gp*0.1);
      const sub = Math.round(element[0].gp*0.9);
      
      await a.push({
        emp_name: element[0].emp_fname + " " + element[0].emp_lname,
        gp: "$"+element[0].gp,
        reimbursements : "$"+element[0].reimbursement+0,
        tax:"$"+tax,
        st:"$"+sub
      })


    })
    return a;
  }
  async createTableHours(){
    const data = this.state.dataOff.data;
    console.log(data);
    var a = [];
    data.map(async (element,index)=>{
      const total = element.sod + element.pod + element.over_time + element.hours_worked + element.holiday;
      var type;
      console.log(element.type);
      if ( element.type === "monthly"){
        type = " Permanent"
      }
      else {
        type = "Temporary"
      }
      await a.push({
        emp_name: element.emp_name,
        type:type,
        rh: element.hours_worked + " hrs",
        over_time:element.over_time + " hrs",
        pod: element.pod + " hrs",
        sod: element.sod + " hrs",
        holiday:0 + " hrs",
        total:total + " hrs"

      })
    })
    console.log(a);
    return a;
    // return a;
  }
  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);
    this.setState({
      accordion: state,
    });
  }
  render() {
    return (
        <div className="animated fadeIn">
            <Card style={{height:'100%',width:'100%'}}>
                
                <CardBody>
                    <Row >
                        <Col md="1">
                            <i className="fa fa-list fa-4x" aria-hidden="true"></i>
                        </Col>
                        <Col md="11">
                            <h3> A Quick Review Before You Submit</h3>
                            <Label>Please spend a brief moment reviewing these numbers before you submit payroll. As a reminder, if you run payroll by 4:00pm on <b>Tuesday, August 27th</b>, your employees
                            will be paid on <b>Monday, September 2nd</b>. Your changes have also been saved so you can submit payroll later.
                            </Label>
                        </Col>
                    </Row>
                <div id="accordion">
                  <Card className="mb-0">
                    <CardHeader id="headingOne">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                        <h5 className="m-0 p-0">Payroll Summary</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                      <CardBody>
                        {this.state.trigger ? (
                            <MDBDataTable
                                data={this.state.data}
                                striped
                                borderless
                                small
                            />

                        ):(
                            <h5>Waiting</h5>
                        )}
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="mb-0">
                    <CardHeader id="headingTwo">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                        <h5 className="m-0 p-0">Time Off Paid</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
                      <CardBody>
                        <MDBDataTable
                                data={this.state.dataHour}
                                striped
                                borderless
                                small
                            />
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
              </CardBody>
              <this.props.Stats step={3} {...this.props} />
            </Card>
        </div>
       );
     }
   }
