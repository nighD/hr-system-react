import React, { Component } from 'react';
import { Label,
  Card, 
  CardBody, 
  Col,  
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,} from 'reactstrap';
// import * as actionService from '../../../services/actionService';
import { MDBDataTable} from 'mdbreact';
// import * as actionService from '../../../../services/actionService';
// import { elementType } from 'prop-types';

var data = {
    columns:[
        {
            label: 'Employee',
            field: 'emp_name',
            sort: 'asc',
            width: "40%"
        },
        {
            label: "Paid Time Off Hours (PTO)",
            field: 'ptoh',
            sort: 'asc',
            width: "10%"
        },
        {
            label: 'Sick Hours (S)',
            field: 'sick_hours',
            sort: 'asc',
            width: "50%"
        }
    ],
    rows: [

    ]
    
}
const trigger = false;
const dataHour = {
  data:[],
  trigger: false
};

export default class StepTwo extends Component {
  constructor(props){
    super(props);
    this.state = {data:data,dataPayroll : this.props.data,trigger,dataHour};
    this.createTable = this.createTable.bind(this);
    this.prepareHour = this.prepareHour.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  async componentDidMount(){
    // console.log(this.state.dataPayroll);
    await this.prepareHour().then(res=>{
      this.setState({
        dataHour:{
          data:res,
          trigger: !this.state.dataHour.trigger
        }
      },()=>{
        this.props.updateDataOff(this.state.dataHour);
      });
    }).catch(error => {
      console.log(error);
    });


  }
  componentDidUpdate(prevProps,prevState){
    if (prevState.dataHour.trigger !== this.state.dataHour.trigger){
      this.createTable().then(async res=>{
        await this.setState({
          data:{
            columns: this.state.data.columns,
            rows: res
          }
        },()=>{
          
        });
      });
    }
  }
  async prepareHour(){
    const data = this.state.dataPayroll.data;
    var a = [];
    data.map(async (element,index)=>{
      await a.push({
        emp_uid:element[0].emp_uid,
        emp_name : element[0].emp_fname + " "+element[0].emp_lname,
        over_time: element[0].OverTime,
        hours_worked: element[0].hours_worked,
        type: element[0].type,
        holiday:0,
        pod:0,
        sod:0,
        pod_limit:element[0].pod,
        sod_limit:element[0].sod
      })
    })
    return a;
  }
  async handleChange  (event)  {
    let {name,value} = event.target;
    const a = name.toString();
    const number = a.charAt(a.length - 1);
    const label = a.slice(0,a.length-1);
    var dataHours = this.state.dataHour.data.slice();
    var limit = dataHours[number][label+"_limit"];
    console.log(limit - value);
    if (value < limit){
      dataHours[number][label] = Math.round(value);
    } else {
      console.log("out limit");
    }
    await this.setState({
        dataHour:{
          data: dataHours,
          trigger: !this.state.dataHour.trigger
        }
    },()=>{
      console.log(this.state.dataHour);
      this.props.updateDataOff(this.state.dataHour);
     });

  };
  async createTable(){
      var b = [];
      const data = this.state.dataPayroll.data;

      data.map(async (element,index)=>{       
        const employee = (
          <div>
            <span style ={{marginTop:20,marginBottom:20, fontWeight: 'bold'}}>{element[0].emp_fname + " "+ element[0].emp_lname}</span>
          </div>
        )  
        const paid_off_time = (
          <div>
            <InputGroup style={{padding:2,width:"80%"}}>
              <InputGroupAddon addonType="prepend">
              <InputGroupText>
              <i className="fa fa-money"></i>
              </InputGroupText>
              </InputGroupAddon>
              <Input type="number" id="pod" name={"pod"+index} placeholder="Paid Off Time" value = {this.state.dataHour.data[index].pod} onChange = {this.handleChange} />
            </InputGroup>
            <Label className = "text-secondary">{this.state.dataPayroll.data[index][0].pod + " hours remaining"}</Label>
          </div>
        )
        const sick_off_time = (
          <div>
            <InputGroup style={{padding:2,width:"80%"}}>
              <InputGroupAddon addonType="prepend">
              <InputGroupText>
              <i className="fa fa-money"></i>
              </InputGroupText>
              </InputGroupAddon>
              <Input type="number" id="sod" name={"sod"+index} placeholder="Sick Off Time"  value = {this.state.dataHour.data[index].sod} onChange ={this.handleChange}/>
            </InputGroup>
            <Label className = "text-secondary">{this.state.dataPayroll.data[index][0].sod + " hours remaining"}</Label>
          </div>
        )
        await b.push( {
          emp_name: employee,
          ptoh:paid_off_time,
          sick_hours:sick_off_time,
        })
      });
    return b;
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
                <MDBDataTable
                data={this.state.data}
                striped
                borderless
                small
                
            />
            </CardBody>
              <this.props.Stats step={2} {...this.props} />
            </Card>
            
        </div>
       );
     }
   }
