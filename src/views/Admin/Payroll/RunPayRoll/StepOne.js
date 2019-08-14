import React, { Component } from 'react';
import { Badge,Label, Card, CardBody, CardHeader, Col, CardText,CardFooter, Row, Table,Button,Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,} from 'reactstrap';
// import * as actionService from '../../../services/actionService';
import { MDBDataTable,MDBBtn,MDBTableHead,MDBTableBody,MDBTable } from 'mdbreact';
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

    ],money:[]
    
}
const add_earnings_button = {
  bonus:true,
  commission : false,
  other:false
}
const money=[];
export default class StepOne extends Component {
  constructor(props){
    super(props);
    this.state = {data,add_earnings_button,money};
    this.getUsers = this.getUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.yeahYeah = this.yeahYeah.bind(this);
  }
  async componentDidMount(){
    // await this.yeahYeah();
    await this.getUsers();
    // const team_id = JSON.parse(localStorage.getItem('userInfo')).teamid;

  
  }
  handleChange  (event)  {
    const {name,value} = event.target;
    const a = name.toString();

    console.log(a.charAt(a.length-1));
    console.log("name: "+name + " value: "+value);
    var moneyArray = this.state.data.money.slice();
    this.setState( prevState => ({
       money: {
        ...prevState.money,
        [name] : value
       }
     }));
     console.log(this.state.data.money);
  };
  async yeahYeah(){
    let res = await actionService.getUserList();
    const data = res.data.data;
    await data.map(async (element,index)=>{
      if(element.emp_role !== 'admin'){
        var data_Sent = {
          "id":element.emp_uid,
          "month":6
        };
        let data_response = await actionService.getEmp_Worked_Hours(data_Sent);
        let hour = data_response.data.data[0][0].count*4;
        let OverTime ;
        let hours_worked = hour;
        var Payroll_Type = element.Payroll_Type;
        var salary;

        let gp;
        if (hour > 80){
          OverTime = hour - 80;
          hour = 80;
        }
        else {
          OverTime = 0;
        }
        if (Payroll_Type.type == 'hourly'){
          salary = " "+ Payroll_Type.salary+"/hr";
          gp = (hour*Payroll_Type.salary + (OverTime*Payroll_Type.salary*0.2));
          // console.log((hour*salary + (OverTime*salary*0.2)));
        }
        else {
          salary = " " + Payroll_Type.salary *12 +"/yr";
          gp = Payroll_Type.salary;
        }
        var moneyArray = this.state.data.money.slice();
        await moneyArray.push({
          emp_uid: element.emp_uid,
          hours_worked: hours_worked,
          OverTime:OverTime,
          salary:Payroll_Type.salary,
          aweek: salary,
          type:Payroll_Type.type,
          payment_method : Payroll_Type.payment_method,
          bonus:"",
          commission:"",
          others:"",
          gp : gp,

        })
        await this.setState( prevState => ({
           ...prevState.money,
           money: moneyArray
        }))
        
      }
    })


  }
  async getUsers(){
      let res = await actionService.getUserList();
      const data = res.data.data;
      data.map(async (element,index)=>{        
        if(element.emp_role !== 'admin'){
          
          var data_Sent = {
            "id":element.emp_uid,
            "month":6
          };
          let data_response = await actionService.getEmp_Worked_Hours(data_Sent);
          let hour = data_response.data.data[0][0].count*4;
          let OverTime ;
          let hours_worked = hour;
          var Payroll_Type = element.Payroll_Type;
          var salary;
  
          let gp;
          if (hour > 80){
            OverTime = hour - 80;
            hour = 80;
          }
          else {
            OverTime = 0;
          }
          if (Payroll_Type.type == 'hourly'){
            salary = " "+ Payroll_Type.salary+"/hr";
            gp = (hour*Payroll_Type.salary + (OverTime*Payroll_Type.salary*0.2));
            // console.log((hour*salary + (OverTime*salary*0.2)));
          }
          else {
            salary = " " + Payroll_Type.salary *12 +"/yr";
            gp = Payroll_Type.salary;
          }
          
         
          let hours;
          if (Payroll_Type.type == 'hourly'){
            hours = (
              <div>
                <div>            
                  <InputGroup style={{paddingTop:2,paddingBottom:0,width:"80%"}}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          RH
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" id="rh" name={"hours_worked"+index} value={this.state.data.money[index].hours_worked} onChange={this.handleChange} placeholder=" Regular Hours" index = {index}/>
                  </InputGroup>
                </div>
                <div>            
                  <InputGroup style={{paddingTop:2,paddingBottom:0,width:"80%"}}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <i className="fa fa-plus"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" id="ot" name={"OverTime"+index} value={this.state.data.money[index].OverTime} onChange={this.handleChange} placeholder="OverTime" index = {index}/>
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
                    <Input type="number" id="gp" name={"gp"+index} placeholder= "Gross Pay" value={this.state.data.money[index].gp} onChange={this.handleChange} disabled/>
                  </InputGroup>
                </div>
              <div>            
                <InputGroup style={{paddingTop:2,paddingLeft:2,paddingBottom:0,width:"80%"}}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="fa fa-money"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="number" id="re" name="re" placeholder="Reimbursement" />
                  </InputGroup></div>
              <div>            
                <InputGroup style={{paddingTop:2,paddingLeft:2,paddingBottom:0,width:"80%"}}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="fa fa-money"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" id="pm" name="payment_method" defaultValue={this.state.data.money[index].payment_method} disabled/>
                  </InputGroup></div>
            </div>
          );
          const employee = (
            <div>
              <span style ={{marginTop:20,marginBottom:20, fontWeight: 'bold'}}>{element.emp_fname + " "+ element.emp_lname}</span>
              <br/>
              <span style ={{marginTop:20,marginBottom:20}}><i className="fa fa-usd"></i>{this.state.data.money[index].aweek+" "}</span>
              <br/>
              <span style ={{marginTop:20,marginBottom:20}}>{element.emp_role.toString().charAt(0).toUpperCase() + element.emp_role.toString().slice(1)}</span>
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
                  <Input type="number" id="bonus" name={"bonus"+index} placeholder="Bonus" value={this.state.data.money[index].bonus}  onChange={this.handleChange} index = {index}/>
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
                  <Input type="number" id="commision" name={"commission"+index} placeholder="Commision" value={this.state.data.money[index].commision} onChange={this.handleChange} index = {index}/>
                </InputGroup>
                </div>
                <div>
                <InputGroup style={{padding:2,width:"80%"}}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="fa fa-money"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="number" id="others" name={"others"+index} placeholder="Other Earnings" value={this.state.data.money[index].others} onChange={this.handleChange} index = {index}/>
                </InputGroup>
            </div>
            </div>
          )
          var newArray = this.state.data.rows.slice();

          newArray.push( {
            emp_name: employee,
            wh:hours,
            add_earnings:add_earnings,
            pm: payment_method,
          })
        //   await this.setState( prevState => ({
        //     ...prevState.money,
        //     money: moneyArray
        //  }))
        var moneyArray = this.state.data.money.slice();
          moneyArray.push({
            emp_uid: element.emp_uid,
            hours_worked: hours_worked,
            OverTime:OverTime,
            salary:Payroll_Type.salary,
            aweek: salary,
            type:Payroll_Type.type,
            payment_method : Payroll_Type.payment_method,
            bonus:"",
            commission:"",
            others:"",
            gp : gp,
  
          })
          await this.setState(prevState => ({
            ...prevState.money,
            money:moneyArray
          }))
          await this.setState( prevState => ({
            data: {
             ...prevState.data,
             rows : newArray
            }
          }))
      }

      

      // members = this.state.data[0].User_Infos;
    })
  }
  render() {
    return (
        <div className="animated fadeIn">
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
          <this.props.Stats step={1} {...this.props} />
        </Card>
        </div>
       );
     }
   }
