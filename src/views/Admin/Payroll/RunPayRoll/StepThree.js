import React, { Component } from 'react';
import { Badge,Label, Card, CardBody, CardHeader, Col, CardText,CardFooter, Row, Table,Button,Input,
Collapse,
InputGroup,
InputGroupAddon,
InputGroupButtonDropdown,
InputGroupText,} from 'reactstrap';
// import * as actionService from '../../../services/actionService';
import { MDBDataTable,MDBBtn,MDBTableHead,MDBTableBody,MDBTable } from 'mdbreact';
import * as actionService from '../../../../services/actionService';

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
            label: 'Reimbursements',
            field: 'reimbursements',
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
    this.state = {data:data,dataPayroll : this.props.data,trigger, accordion: [true, false, false],dataOff: this.props.dataOff};
    this.createTable = this.createTable.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
  }
  async componentDidMount(){
    // this.createTable();
    console.log(this.state.dataHour);
    await this.createTable().then(async(res) => {
    //   console.log(res);
      this.setState({
        data:{
          columns : this.state.data.columns,
          rows: res
        }, trigger: true
      },()=>{
        // console.log(this.state.data);
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
        gp:element[0].gp,
        reimbursements : element[0].reimbursement+0,
        tax:tax,
        st:sub
      })


    })
    return a;
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
                        <h5 className="m-0 p-0">Collapsible Group Item #1</h5>
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
                        <h5 className="m-0 p-0">Collapsible Group Item #2</h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
                      <CardBody>
                        2. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                        cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                        on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                        nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
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
