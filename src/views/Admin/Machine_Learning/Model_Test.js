import React, { Component,useState } from 'react';
import {Card, 
  CardHeader,
  CardBody,
  CardFooter,
  Col,
  Row,
  Label,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText, 
} from 'reactstrap';
import * as actionService from '../../../services/actionService';
// import {FullsizePicture} from 'react-responsive-picture';
import a from '../../../assets/img/aaaa.png'
import { MDBDataTable} from 'mdbreact';
import {Button} from 'reactstrap';
import AsyncSelect from 'react-select/async';
let selectOptionsEmployee = [];
async function optionsForPrediction(search) {
    let response = await actionService.find_unseen_data(search);
    let data = await [response.data];
    selectOptionsEmployee = []
    if(typeof(data[0]) === 'string'){
      return selectOptionsEmployee;
    }
    else {
      data.map((element) => {
        let dropDownEle = { label: "Employee Example: " + search, value: search };
        selectOptionsEmployee.push(dropDownEle);
        return true;
      });
      return selectOptionsEmployee;
    }

}
function AsyncMultiEmployee(props) {
    let [inputEmployee,setInputEmployee] = useState(props.inputEmployee);
    const handleInputChange = async (newValue) => {
        await optionsForPrediction();
        inputEmployee = newValue;
        setInputEmployee({...inputEmployee,inputEmployee });
        props.selectorEmployee(inputEmployee);

        return inputEmployee;
    };
    return (
        <AsyncSelect
          isClearable
          onChange = {handleInputChange}
          defaultOptions
          value={inputEmployee}
          loadOptions={optionsForPrediction}
          cacheOptions
        />
      );
}
var colors = {
  all: 'light',
  attrition: 'light',
  fraud: 'light'
}
var area ={
  report : false,
  attrition: false,
  fraud: false
}
var searchResult = {
  attrition:false,
  fraud:false
}
var accuracy_report = {
  attrition:"",
  fraud:""
}
var data_fraud = {
  columns:[
      {
          label: 'Type',
          field: 'type',
          sort: 'asc'
      },
      {
          label: 'Large Steal',
          field: 'large',
          sort: 'asc'
      },
      {
          label: 'Medium Steal',
          field: 'medium',
          sort: 'asc'
      },
      {
          label: 'Small Steal',
          field: 'small',
          sort: 'asc'
      },
      {
          label: 'No Steal',
          field: 'nosteal',
          sort: 'asc'
      }
  ],
  rows: [


  ],
}
var data_attrition = {
  columns:[
      {
          label: 'Type',
          field: 'type',
          sort: 'asc'
      },
      {
          label: 'Yes',
          field: 'yes',
          sort: 'asc'
      },
      {
          label: 'No',
          field: 'no',
          sort: 'asc'
      }
  ],
  rows: [
  ],
}
class Model_Test extends Component {
  constructor(props){
    super(props);
    this.state = { employee:{},searchResult, inputEmployee:[],predict:"",actual: "",bgColor:"secondary",colors,area,data_fraud,data_attrition,accuracy_report};
    this.predict_attrition = this.predict_attrition.bind(this);
    this.predict_fraud = this.predict_fraud.bind(this);
    this.loadData = this.loadData.bind(this);
    this.selectorEmployee = this.selectorEmployee.bind(this);
    this.checkTable = this.checkTable.bind(this);
    this.getAttritionComparison = this.getAttritionComparison.bind(this);
    this.getFraudComparison = this.getFraudComparison.bind(this);
    this.getAccuracyReport = this.getAccuracyReport.bind(this);
  }

  componentDidMount(){
    // this.loadData();
    this.getAccuracyReport();
    this.getAttritionComparison();
    this.getFraudComparison();
    this.checkTable(0);
  }
  async getAccuracyReport(){
    let attrition_result;
    let fraud_result;
    await actionService.resultAttrition().then((res)=>{
      attrition_result = res.data;
    })
    await actionService.resultFraud().then((res)=>{
      fraud_result = res.data;
    })
    this.setState({
      accuracy_report:{
        attrition: attrition_result,
        fraud : fraud_result
      }
    });

  }
  async getAttritionComparison(){
    // let target_attrition;
    let frequency_attrition;
    // let predict_attrition;
    let frequency_predict_attrition;
    await actionService.comparison_attrition().then((res)=>{
      // target_attrition = res.data.target;
      frequency_attrition = res.data.frequency;
    })
    await actionService.comparison_predict_attrition().then((res)=>{
      // predict_attrition = res.data.target;
      frequency_predict_attrition = res.data.frequency;
    })
    this.setState( prevState => ({
      data_attrition: {
       ...prevState.data_attrition,
       rows : [{
        "type":"Actual Result",
        "no":frequency_attrition[1],
        "yes":frequency_attrition[0],
       },{
        "type":"Predict Result",
        "no":frequency_predict_attrition[1],
        "yes":frequency_predict_attrition[0],
       }]
      }
    }));
  }
  async getFraudComparison(){
    // let target_fraud;
    let frequency_fraud;
    // let predict_fraud;
    let frequency_predict_fraud;
    await actionService.comparison_fraud().then((res)=>{
      // target_fraud = res.data.target;
      frequency_fraud = res.data.frequency;

    })
    await actionService.comparison_predict_fraud().then((res)=>{
      // predict_fraud = res.data.target;
      frequency_predict_fraud = res.data.frequency;

    })
    this.setState( prevState => ({
      data_fraud: {
       ...prevState.data_fraud,
       rows : [{
         "type": "Actual Result",
         "large":frequency_fraud[3],
         "medium":frequency_fraud[0],
         "small":frequency_fraud[2],
         "nosteal":frequency_fraud[1]
       },
       {
        "type": "Predict Result",
        "large":frequency_predict_fraud[3],
        "medium":frequency_predict_fraud[0],
        "small":frequency_predict_fraud[2],
        "nosteal":frequency_predict_fraud[1]
      }]
      }
    }));
  }
  async selectorEmployee(e) {
    // console.log(e);
    await this.setState({inputEmployee:e});
    // console.log(this.state.inputEmployee)
    const input = this.state.inputEmployee;
    if(input != null){
      this.loadData(input.value);
    }
    else {
      // console.log("set null");
      this.setState( prevState => ({
        searchResult: {
         ...prevState.searchResult,
         attrition: false,
         fraud: false
        }
      }));
    }
    
  }
  async loadData(id){
    await actionService.find_unseen_data(id).then(res=>{
      let employee_predict = res.data;
      this.setState({employee:employee_predict})
      this.setState({number: id})
    }).then(()=>{
      if(this.state.area.attrition){
        this.setState( prevState => ({
          searchResult: {
          ...prevState.searchResult,
          attrition:true,
          fraud: false
          }
        }));
      }
      else if (this.state.area.fraud){
        this.setState( prevState => ({
          searchResult: {
          ...prevState.searchResult,
          attrition:false,
          fraud: true
          }
        }));
      }
    })
  }
  async predict_attrition (id) {
    await actionService.predictAttritionID(id).then((res)=>{
      const result = res.data;
      if (result["Actual Result"] !== result["Predict Result"]){
        this.setState({bgColor:'danger'})
      }
      else {
        this.setState({bgColor:"success"})
      }
      if (result["Actual Result"] === 1){
        this.setState({actual:"Yes"})
      }
      else {
        this.setState({actual:"No"})
      }
      if (result["Predict Result"] === 1){
        this.setState({predict:"Yes"})
      }
      else {
        this.setState({predict:"No"})
      }
      // this.setState({actual:result["Actual Result"],predict:result["Predict Result"]})
    })
  }
  async predict_fraud (id) {
    await actionService.predictFraudID(id).then((res)=>{
      const result = res.data;
      if (result["Actual Result"] !== result["Predict Result"]){
        this.setState({bgColor:'danger'})
      }
      else {
        this.setState({bgColor:"success"})
      }
      let actual;
      let predict;
      switch(result['Actual Result']){
        case 0:
          actual = 'No Steal';
          break;
        case 1:
          actual = "Small Steal";
          break;
        case 2:
          actual = "Medium Steal";
          break;
        case 3:
          actual = "Large Steal";
          break;
        default :
        return true;
      }
      switch(result['Predict Result']){
        case 0:
          predict = 'No Steal';
          break;
        case 1:
          predict = "Small Steal";
          break;
        case 2:
          predict = "Medium Steal";
          break;
        case 3:
          predict = "Large Steal";
          break;
        default :
          return true;
      }
      this.setState({actual:actual,predict:predict})
    })
  }
  checkTable(a){
    let colors = {
      all: 'light',
      attrition:'light',
      fraud: 'light',
    }
    switch(a){
      case 0:
        colors.all = 'danger';
        this.setState( prevState => ({
          area: {
           ...prevState.area,
           report:true,
           attrition: false,
           fraud:false
          },
          searchResult:{
            ...prevState.searchResult,
            attrition : false,
            fraud: false
          },inputEmployee:[]
        }));
        selectOptionsEmployee = []
        this.selectorEmployee(null);
        this.setState({predict:"",actual: "",bgColor:"secondary"});
        break;
      case 1:
        colors.attrition = 'danger';
        this.setState( prevState => ({
          area: {
           ...prevState.area,
           report:false,
           attrition:true,
           fraud: false
          },
          searchResult:{
            ...prevState.searchResult,
            attrition : false,
            fraud: false
          },inputEmployee:[]
        }));
        selectOptionsEmployee = []
        this.selectorEmployee(null);
        this.setState({predict:"",actual: "",bgColor:"secondary"});
        break;
      case 2:
        colors.fraud = 'danger';
        this.setState( prevState => ({
          area: {
           ...prevState.area,
           report:false,
           attrition:false,
           fraud: true
          },
          searchResult:{
            ...prevState.searchResult,
            attrition : false,
            fraud: false
          },
          inputEmployee:[]
        }));
        selectOptionsEmployee = []
        this.selectorEmployee(null);
        this.setState({predict:"",actual: "",bgColor:"secondary"});
        break;
      default:
    }
    this.setState({colors: colors});
  }
  render() {
    return (
        <div className="animated fadeIn">
        <Card>
        <CardBody>
          <Row className="align-items-center mt-3">
              <Col sm="2" md="4" xl className="mb-3 mb-xl-0 col-3">
                  <Button block color={this.state.colors.all} className ="btn-pill" onClick ={this.checkTable.bind(this,0)} >Prediction Report</Button>
              </Col>
              <Col sm="2" md="4" xl className="mb-3 mb-xl-0 col-3">
                  <Button block color={this.state.colors.attrition} className ="btn-pill" onClick ={this.checkTable.bind(this,1)} >Attrition</Button>
              </Col>
              <Col sm="2" md="4" xl className="mb-3 mb-xl-0 col-3">
                  <Button block color={this.state.colors.fraud} className ="btn-pill" onClick ={this.checkTable.bind(this,2)} >Fraud</Button>
              </Col>
          </Row>
          { !this.state.area.report ? 
          <Card style={{marginTop: 20}}>
          <Row  style={{marginTop: 20,marginLeft:10}}>
            <Col className = "col-1" style={{marginRight: 5}}>
              <Label>Employee</Label>    
            </Col>
            <Col className = "col-4">
              <AsyncMultiEmployee inputEmployee = {this.state.inputEmployee} selectorEmployee = {this.selectorEmployee}/>
            </Col>
            <Col className = "col-1">
              <Label>Actual Result</Label>
            </Col>
            <Col className = "col-2">
              <Input className={"bg-"+this.state.bgColor} type="text" id="actual Result" disabled value = {this.state.actual}/>
            </Col>
            <Col className = "col-1">
              <Label>Prediction Result</Label>
            </Col>
            <Col className = "col-2" style={{marginLeft: 8}}>
              <Input className={"bg-"+this.state.bgColor} type="text" id="predict Result" disabled value = {this.state.predict}/>
            </Col>
          </Row>
          </Card>
          :
          <div style={{marginTop:20}}>
          <Row>
            <Col xs="12" sm="8">
              <Card  >
                <CardHeader> Fraud Comparison Report</CardHeader>
                    <CardBody>
                        <MDBDataTable 
                            btn
                            striped
                            borderless
                            small
                            pagination="false"
                            sorting="false"
                            searching="false"
                            data={this.state.data_fraud}
                        />
                    </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="4">
                <Card  >
                  <CardHeader>Confusion Matrix</CardHeader>
                  <img src={a} style={{width:'100%',height:'100%'}} alt="Confusion Matrix Fraud"/>
                  <CardFooter>
                    Accuracy : {this.state.accuracy_report.fraud.toString().substring(0,5)}
                  </CardFooter>
                </Card>
            </Col>
          </Row>
          <Row>
          <Col xs="12" sm="8">
            <Card  >
              <CardHeader> Attrition Comparison Report</CardHeader>
                  <CardBody>
                      <MDBDataTable 
                          btn
                          striped
                          borderless
                          small
                          pagination="false"
                          sorting="false"
                          searching="false"
                          data={this.state.data_attrition}
                      />
                  </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="4">
              <Card  >
                <CardHeader>Confusion Matrix</CardHeader>
                <img src={a} style={{width:'100%',height:'100%'}}  alt="Confusion Matrix Attrition"/>
                <CardFooter>
                  Accuracy : {this.state.accuracy_report.attrition.toString().substring(0,5)}
                </CardFooter>
              </Card>
          </Col>
        </Row>
        </div>          
          }
            { this.state.searchResult.attrition ? 
            <Row>
              <Col xs="12" sm="4">
                <Card>
                  <CardHeader>
                    <strong>Employee Information</strong>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit = {this.handleSubmit}>
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Employee</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" id="name" name="name" disabled value = {"Example number "+this.state.number}    />
                          <InputGroupAddon addonType="append">
                            <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Gender</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" id="gender" name="gender" disabled value = {this.state.employee.Gender} >
                          </Input>
                          <InputGroupAddon addonType="append">
                            <InputGroupText><i className="fa fa-transgender"></i></InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                          <InputGroupText>Age</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" id="age" name="age" disabled value = {this.state.employee.Age} >
                          </Input>
                          <InputGroupAddon addonType="append">
                            <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Marital Status</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" id="marital" name="marital" disabled value = {this.state.employee.MaritalStatus}  />
                          <InputGroupAddon addonType="append">
                            <InputGroupText><i className="fa fa-address-card"></i></InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            <Col xs="12" sm="8">
              <Card>
                <CardHeader>
                  <strong>Features Target</strong>
                </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="pr-md-1" md="4">
                          <FormGroup>
                              <Label>Job Role</Label>
                              <Input type="text" id="JobRole" placeholder="JobRole" disabled value = {this.state.employee.JobRole}/>
                          </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="4">
                          <FormGroup>
                            <Label>Department</Label>
                            <Input type="text" id="department" placeholder="Enter your last name" disabled value = {this.state.employee.Department}/>
                          </FormGroup>
                        </Col>      
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <Label>Distance From Home</Label>
                            <Input type="text" id="DistanceFromHome" name="gender" placeholder="DistanceFromHome" disabled value = {this.state.employee.DistanceFromHome}/>
                          </FormGroup>
                        </Col> 
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="4">
                          <FormGroup>
                          <Label>Daily Rate</Label>
                          <Input type="text" id="DailyRate" name="DailyRate" placeholder="Daily Rate" disabled value = {this.state.employee.DailyRate} />
                          </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="4">
                          <FormGroup>
                            <Label>Hourly Rate</Label>
                            <Input type="text" id="HourlyRate" placeholder="Hourly Rate" disabled value = {this.state.employee.HourlyRate}/>
                          </FormGroup>
                        </Col>    
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <Label>OverTime</Label>
                            <Input type="text" id="OverTime" placeholder="OverTime" disabled value = {this.state.employee.OverTime}/>
                          </FormGroup>
                        </Col> 
                      </Row>     
                      <Row>
                        <Col className="pr-md-1" md="4">
                          <FormGroup>
                            <Label>Monthly rate</Label>
                            <Input type="number" id="monthlyRate" placeholder="Enter Monthly Rate" disabled value = {this.state.employee.MonthlyRate}/>
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <Label>Monthly Income</Label>
                            <Input type="number" id="monthlyIncome" placeholder="Enter Monthly Income" disabled value = {this.state.employee.MonthlyIncome}/>
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <Label>Total Working Years</Label>
                            <Input type="number" id="working_years" placeholder="Enter Total Working Years"  disabled value = {this.state.employee.TotalWorkingYears}/>
                          </FormGroup>
                        </Col>
                      </Row>                               
                      <Row>
                        <Col className="pr-md-1" md="4">
                          <FormGroup>
                            <Label >Years At Company</Label>
                            <Input type="number" id="years_at_company" placeholder="Enter your years" disabled value = {this.state.employee.YearsAtCompany}/>
                          </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="4">
                          <FormGroup>
                            <Label >Years In Current Role</Label>
                            <Input type="number" id="years_curr_role" placeholder="Enter your years" disabled value = {this.state.employee.YearsInCurrentRole}/>
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="4">
                        <FormGroup>
                            <Label >Years With Current Manager</Label>
                            <Input type="number" id="years_curr_manager" placeholder="Enter your years" disabled value = {this.state.employee.YearsWithCurrManager}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md = "4"/>
                        <Col md = "4" className = "text-center">
                          <Button size="md" color="primary" onClick={e=>{this.predict_attrition(this.state.number)}}><i className="fa fa-pencil " ></i> Predict</Button>
                        </Col>
                        <Col md = "4"/>
                      </Row>
                    </Form>
                </CardBody>
              </Card>
              </Col>
              </Row>      
                : null}
              {this.state.searchResult.fraud ? 
                <Row>
                <Col xs="12" sm="4">
                  <Card>
                    <CardHeader>
                      <strong>Fraud</strong>
                    </CardHeader>
                    <CardBody>
                      <Form onSubmit = {this.handleSubmit}>
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Employee</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="name" name="name" disabled value = {"Example number "+this.state.number}    />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Gender</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="gender" name="gender" disabled value = {this.state.employee.Gender} >
                            </Input>
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-transgender"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>Age</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="age" name="age" disabled value = {this.state.employee.Age} >
                            </Input>
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Marital Status</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="marital" name="marital" disabled value = {this.state.employee.MaritalStatus}  />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-address-card"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              <Col xs="12" sm="8">
                <Card>
                  <CardHeader>
                    <strong>Features Target</strong>
                  </CardHeader>
                    <CardBody>
                      <Form>
                        <Row>
                          <Col className="pr-md-1" md="4">
                            <FormGroup>
                                <Label>Job Role</Label>
                                <Input type="text" id="JobRole" placeholder="JobRole" disabled value = {this.state.employee.JobRole}/>
                            </FormGroup>
                          </Col>
                          <Col className="px-md-1" md="4">
                            <FormGroup>
                              <Label>Department</Label>
                              <Input type="text" id="department" placeholder="Enter your last name" disabled value = {this.state.employee.Department}/>
                            </FormGroup>
                          </Col>      
                          <Col className="pl-md-1" md="4">
                            <FormGroup>
                              <Label>Distance From Home</Label>
                              <Input type="text" id="DistanceFromHome" name="gender" placeholder="DistanceFromHome" disabled value = {this.state.employee.DistanceFromHome}/>
                            </FormGroup>
                          </Col> 
                        </Row>
                        <Row>
                          <Col className="pr-md-1" md="4">
                            <FormGroup>
                            <Label>Daily Rate</Label>
                            <Input type="text" id="DailyRate" name="DailyRate" placeholder="Daily Rate" disabled value = {this.state.employee.DailyRate} />
                            </FormGroup>
                          </Col>
                          <Col className="px-md-1" md="4">
                            <FormGroup>
                              <Label>Hourly Rate</Label>
                              <Input type="text" id="HourlyRate" placeholder="Hourly Rate" disabled value = {this.state.employee.HourlyRate}/>
                            </FormGroup>
                          </Col>    
                          <Col className="pl-md-1" md="4">
                            <FormGroup>
                              <Label>OverTime</Label>
                              <Input type="text" id="OverTime" placeholder="OverTime" disabled value = {this.state.employee.OverTime}/>
                            </FormGroup>
                          </Col> 
                        </Row>     
                        <Row>
                          <Col className="pr-md-1" md="4">
                            <FormGroup>
                              <Label>Monthly rate</Label>
                              <Input type="number" id="monthlyRate" placeholder="Enter Monthly Rate" disabled value = {this.state.employee.MonthlyRate}/>
                            </FormGroup>
                          </Col>
                          <Col className="pl-md-1" md="4">
                            <FormGroup>
                              <Label>Monthly Income</Label>
                              <Input type="number" id="monthlyIncome" placeholder="Enter Monthly Income" disabled value = {this.state.employee.MonthlyIncome}/>
                            </FormGroup>
                          </Col>
                          <Col className="pl-md-1" md="4">
                            <FormGroup>
                              <Label>Total Working Years</Label>
                              <Input type="number" id="working_years" placeholder="Enter Total Working Years"  disabled value = {this.state.employee.TotalWorkingYears}/>
                            </FormGroup>
                          </Col>
                        </Row>                               
                        <Row>
                          <Col className="pr-md-1" md="4">
                            <FormGroup>
                              <Label >Years At Company</Label>
                              <Input type="number" id="years_at_company" placeholder="Enter your years" disabled value = {this.state.employee.YearsAtCompany}/>
                            </FormGroup>
                          </Col>
                          <Col className="px-md-1" md="4">
                            <FormGroup>
                              <Label >Years In Current Role</Label>
                              <Input type="number" id="years_curr_role" placeholder="Enter your years" disabled value = {this.state.employee.YearsInCurrentRole}/>
                            </FormGroup>
                          </Col>
                          <Col className="pl-md-1" md="4">
                          <FormGroup>
                              <Label >Years With Current Manager</Label>
                              <Input type="number" id="years_curr_manager" placeholder="Enter your years" disabled value = {this.state.employee.YearsWithCurrManager}/>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md = "4"/>
                          <Col md = "4" className = "text-center">
                            <Button size="md" color="primary" onClick={e=>{this.predict_fraud(this.state.number)}}><i className="fa fa-pencil " ></i> Predict</Button>
                          </Col>
                          <Col md = "4"/>
                        </Row>
                      </Form>
                  </CardBody>
                </Card>
                </Col>
                </Row>      
              : null}
        </CardBody>
        </Card>
        </div>
       );
     }
   }
   
   export default Model_Test;
