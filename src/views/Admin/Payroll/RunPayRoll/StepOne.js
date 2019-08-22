import React, { Component } from 'react';
import {
  Label, 
  Card, 
  CardBody,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText} from 'reactstrap';
// import * as actionService from '../../../services/actionService';
import { MDBDataTable} from 'mdbreact';
import * as actionService from '../../../../services/actionService';
const labelLast = (
  <div>
    <span>
      Gross Pay (GP)
    </span>
    <br/>
    <span>
      Reimbursements (R)
    </span>
    <br/>
    <span>
      Payment Method
    </span>
    <br/>
  </div>
);
const hour_types = (
  <div>
    <span>
      Regular Hours (RH)
    </span>
    <br/>
    <span>
      Overtime (OT/DOT)
    </span>
    <br/>
  </div>
)
var data = {
    columns:[
        {
            label: 'Employee',
            field: 'emp_name',
            sort: 'asc',
            width: "30%"
        },
        {
            label: hour_types,
            field: 'wh',
            sort: 'asc',
            width: "10%"
        },
        {
            label: 'Additional Earnings',
            field: 'add_earnings',
            sort: 'asc',
            width: "10%"
        },
        {
            label: labelLast,
            field: 'gp',
            sort: 'asc',
            width: "10%"
        },
    ],
    rows: [

    ]
    
}
const add_earnings_button = {
  bonus:true,
  commission : false,
  other:false
}
const trigger = false;
// const moneyTrigger = false;
var money={
  data:[],
  moneyTrigger : false,
};
export default class StepOne extends Component {
  constructor(props){
    super(props);
    this.state = {data,add_earnings_button,money,trigger};
    this.createTable = this.createTable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getInitialData = this.getInitialData.bind(this);
  }
  async componentDidMount(){
    await this.getInitialData().then(async(res) => {
      // console.log("what");
      const dataFill = res.filter(Boolean);
      await this.setState({
        money:{
          data: dataFill,
          moneyTrigger: !this.state.money.moneyTrigger
        }
      },()=>{
        this.props.updateData(this.state.money);
      });
      

    }).catch(error => {
      console.log(error);
    })

  
  }
  componentDidUpdate(prevProps,prevState){
    if (prevState.money.moneyTrigger !== this.state.money.moneyTrigger){
        this.createTable().then(async (res) => {
          // console.log("this.setstate")
          await this.setState( {
            data: {
            columns:[...this.state.data.columns],
            rows: res,
            dataTrigger: true
            },
          },()=>{

          });
        })
    }
    if ( prevState.data.dataTrigger !== this.state.data.dataTrigger ){
      this.setState({trigger:true});
    }
  }
  async handleChange  (event)  {
    let {name,value} = event.target;
    
    const a = name.toString();
    const number = a.charAt(a.length - 1);
    const label = a.slice(0,a.length-1);
    var moneyArray = this.state.money.data.slice();
    if (label === 'hours_worked'){
      let gp = this.state.money.data[number][0].salary*value;
      moneyArray[number][0][label] = value;
      moneyArray[number][0].gp = gp;
      await this.setState({
          money :{
            data: moneyArray,
            moneyTrigger: !this.state.money.moneyTrigger
          }
      },()=>{
        this.props.updateData(this.state.money);
         console.log(this.state.money);
       });
    } else if (label === 'OverTime') {

      let gp = this.state.money.data[number][0].salary*value*1.2;
      moneyArray[number][0][label] = value;
      moneyArray[number][0].gp = gp;
      await this.setState({
          money :{
            data: moneyArray,
            moneyTrigger: !this.state.money.moneyTrigger
          }
      },()=>{
        this.props.updateData(this.state.money);
       });
    }
    else{
      let gp = 0;
      let hours_worked = parseInt(moneyArray[number][0].hours_worked);
      let overtime = parseInt(moneyArray[number][0].OverTime);
      let salary = parseInt(moneyArray[number][0].salary);
      let type = moneyArray[number][0].type;
      value = parseInt(value);
      if(isNaN(value)){
        value = "";
      }
      if (type === 'hourly'){
        gp = (hours_worked*salary + (overtime*salary*0.2)) + value;
      }
      else {
        gp = salary + value;
      }
      moneyArray[number][0][label] = value;
      moneyArray[number][0].gp = gp;
      await this.setState({
          money :{
            data: moneyArray,
            moneyTrigger: !this.state.money.moneyTrigger
          }
      },()=>{
        this.props.updateData(this.state.money);
       });
    }


  };
  async getInitialData(){
    // console.log("yeah yeah")
    let res = await actionService.getUserList();
    const data = res.data.data;
    // var a = [];
    return Promise.all(data.map(async (element,index)=>{
      // console.log(element);
      if(element.emp_role !== 'admin'){
        var data_Sent = {
          "id":element.emp_uid,
          "month":6
        };
        
        let data_response = await actionService.getEmp_Worked_Hours(data_Sent);
        let hour = data_response.data.data[0][0].count*4+0;
        console.log("hour :" + hour);
        let OverTime =0;
        // let hours_worked = hour;
        var Payroll_Type = element.Payroll_Type;
        var salary=0;

        let gp = 0;
        if (hour > 80){
          OverTime = hour - 80;
          hour = 80;
        }
        else {
          OverTime = 0;
        }
        if (Payroll_Type.type === 'hourly'){
          salary = " "+ Payroll_Type.salary+"/hr";
          gp = (hour*Payroll_Type.salary + (OverTime*Payroll_Type.salary*0.2));
        }
        else {
          salary = " " + Payroll_Type.salary *12 +"/yr";
          gp = Payroll_Type.salary;
        }
        var moneyArray = this.state.money.data.slice();
        // console.log("array Push");
        moneyArray.push({
          emp_uid: element.emp_uid,
          hours_worked: hour,
          OverTime:OverTime,
          salary:Payroll_Type.salary,
          aweek: salary,
          type:Payroll_Type.type,
          payment_method : Payroll_Type.payment_method,
          bonus:"",
          commission:"",
          others:"",
          reimbursement:"",
          gp : gp,
          emp_fname:element.emp_fname,
          emp_lname:element.emp_lname,
          emp_role : element.emp_role,
          pod: Payroll_Type.paid_off_day,
          sod: Payroll_Type.sick_off_day
        });
        
        return moneyArray;
    }
  }));
  }
  async createTable(){
    //  console.log("getUser");
      // let res = await actionService.getUserList();
      // const data = res.data.data;
      var b = [];
      const data = this.state.money.data;
      // const dataFill = data.filter(Boolean);
      data.map(async (element,index)=>{    
        if(element[0] !== undefined){
            if(element[0].emp_role !== 'admin'){        
              let hours;
              if (element[0].type === 'hourly'){
                hours = (
                  <div>
                    <div>            
                      <InputGroup style={{paddingTop:2,paddingBottom:0,width:"80%"}}>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              RH
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="number" id="rh" name={"hours_worked"+index} value={this.state.money.data[index][0].hours_worked} onChange={this.handleChange.bind(this)} placeholder=" Regular Hours" index = {index}/>
                      </InputGroup>
                    </div>
                    <div>            
                      <InputGroup style={{paddingTop:2,paddingBottom:0,width:"80%"}}>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <i className="fa fa-plus"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="number" id="ot" name={"OverTime"+index} value={this.state.money.data[index][0].OverTime} onChange={this.handleChange.bind(this)} placeholder="OverTime" index = {index}/>
                      </InputGroup>
                    </div>
                  </div>
                )
              }
              else {
                hours = (
                  <div>
                    <span>
                      <i className ="fa fa-pencil"/> 68.00 hrs
      
                    </span>
                  </div>
                )
              }
              const payment_method = (
                <div style={{  justifyContent:'center', alignItems:'center'}}>
        
                  <div>
                  <InputGroup style={{padding:2,width:"80%"}}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fa fa-money"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="number" id="gp" name={"gp"+index} placeholder= "Gross Pay" value={this.state.money.data[index][0].gp} onChange={this.handleChange.bind(this)} disabled/>
                      </InputGroup>
                    </div>
                  <div>            
                    <InputGroup style={{paddingTop:2,paddingLeft:2,paddingBottom:0,width:"80%"}}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fa fa-money"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="number" id="re" name={"reimbursement"+index} placeholder="Reimbursement" value = {this.state.money.data[index][0].reimbursement} onChange = {this.handleChange.bind(this)} />
                      </InputGroup></div>
                  <div>            
                    <InputGroup style={{paddingTop:2,paddingLeft:2,paddingBottom:0,width:"80%"}}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fa fa-money"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="pm" name="payment_method" defaultValue={this.state.money.data[index][0].payment_method} disabled/>
                      </InputGroup></div>
                </div>
              );
              const employee = (
                <div>
                  <span style ={{marginTop:20,marginBottom:20, fontWeight: 'bold'}}>{element[0].emp_fname + " "+ element[0].emp_lname}</span>
                  <br/>
                  <span style ={{marginTop:20,marginBottom:20}}><i className="fa fa-usd"></i>{this.state.money.data[index][0].aweek+" "}</span>
                  <br/>
                  <span style ={{marginTop:20,marginBottom:20}}>{element[0].emp_role.toString().charAt(0).toUpperCase() + element[0].emp_role.toString().slice(1)}</span>
                  <br/>
                </div>
              )
              
              const add_earnings = (
                <div>
                <div>
                  {/* <span style ={{marginTop:20,marginBottom:20}}> */}
                    <InputGroup style={{padding:2,width:"80%"}}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <i className="fa fa-money"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" id="bonus" name={"bonus"+index} placeholder="Bonus" value={this.state.money.data[index][0].bonus}  onChange={this.handleChange.bind(this)}/>
                    </InputGroup>
                  {/* </span> */}
                  {/* <br/> */}
                  </div>
                  <div>
                  <InputGroup style={{padding:2,width:"80%"}}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <i className="fa fa-money"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" id="commision" name={"commission"+index} placeholder="Commision" value={this.state.money.data[index][0].commission} onChange={this.handleChange.bind(this)} />
                    </InputGroup>
                    </div>
                    <div>
                    <InputGroup style={{padding:2,width:"80%"}}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <i className="fa fa-money"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" id="others" name={"others"+index} placeholder="Other Earnings" value={this.state.money.data[index][0].others} onChange={this.handleChange.bind(this)} />
                    </InputGroup>
                </div>
                </div>
              )
              // var newArray = this.state.data.rows.slice();
              // var moneyArray = this.state.money.data.slice();
              await b.push( {
                emp_name: employee,
                wh:hours,
                add_earnings:add_earnings,
                pm: payment_method,
              })
          }
        } 
        });
         
       
    
    return b;
  }
  render() {
    return (
      
        <div className="animated fadeIn">
        {this.state.trigger ? (
          <Card style={{height:'100%',width:'100%'}}>
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
            <this.props.Stats step={1} {...this.props} data = {this.state.money}/>
          </Card>
        ):(
          <h1>Hello</h1>
        )}

        </div>
       );
     }
   }
