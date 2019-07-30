import React, { Component,useState } from 'react';
import {Card, 
  CardBody,
  Col,
  Row,
  Label,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import * as actionService from '../../../services/actionService';
import {Button} from 'reactstrap';
import AsyncSelect from 'react-select/async';
let selectOptionsEmployee = [];
async function optionsForEmployee(search) {
  console.log(search);
 
    let response = await actionService.find_unseen_data(search);
    let data = await [response.data];
    selectOptionsEmployee = []
    console.log(typeof(data[0]) == 'string');
    if(typeof(data[0]) == 'string'){
      return selectOptionsEmployee;
    }
    else {
      data.map((element) => {
        let dropDownEle = { label: "Employee Example: " + search, value: search };
        selectOptionsEmployee.push(dropDownEle);
      });
      return selectOptionsEmployee;
    }

}
function AsyncMultiEmployee(props) {
    let [inputEmployee,setInputEmployee] = useState(props.inputEmployee);
    const handleInputChange = async (newValue) => {
        await optionsForEmployee();
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
          loadOptions={optionsForEmployee}
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
class Model_Test extends Component {
  constructor(props){
    super(props);
    this.state = { employee:{},searchResult, inputEmployee:[],predict:"",actual: "",bgColor:"secondary",colors,area};
    this.predict = this.predict.bind(this);
    this.loadData = this.loadData.bind(this);
    this.selectorEmployee = this.selectorEmployee.bind(this);
    this.checkTable = this.checkTable.bind(this);
  }

  async selectorEmployee(e) {
    await this.setState({inputEmployee:e});
    const input = this.state.inputEmployee;
    if(input != null){
      this.loadData(input.value);
    }
    else {
      this.setState( prevState => ({
        searchResult: {
         ...prevState.searchResult,
         attrition: false,
         fraud: false
        }
      }));
    }
    
  }
  componentDidMount(){
    // this.loadData();
    this.checkTable(0);
  }
  async loadData(id){
    await actionService.find_unseen_data(id).then(res=>{
      let employee_predict = res.data;
      this.setState({employee:employee_predict})
      this.setState({number: id})
    }).then(()=>{
      this.setState( prevState => ({
        searchResult: {
         ...prevState.searchResult,
         attrition:true,
         fraud: false
        }
      }));
    })
  }
  async predict (id) {
    await actionService.predictAttritionID(id).then((res)=>{
      const result = res.data;
      if (result["Actual Result"] != result["Predict Result"]){
        console.log("khac")
        this.setState({bgColor:'danger'})
      }
      else {
        console.log("giong")
        this.setState({bgColor:"success"})
      }
      
      this.setState({actual:result["Actual Result"],predict:result["Predict Result"]})
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
          }
        }));
        break;
      case 1:
        colors.attrition = 'danger';
        this.setState( prevState => ({
          area: {
           ...prevState.area,
           report:false,
           attrition:true,
           fraud: false
          }
        }));
        break;
      case 2:
        colors.fraud = 'danger';
        this.setState( prevState => ({
          area: {
           ...prevState.area,
           report:false,
           attrition:false,
           fraud: true
          }
        }));
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
          <Row >
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
          : null}
            { this.state.searchResult.attrition ? 
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                          <Label>Employee Example</Label>
                          <Input type="text" id="exam_num" placeholder="Enter your first name" disabled value = {this.state.number}/>
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
                        <Label>Gender</Label>
                        <Input type="text" id="gender" name="gender" placeholder="Enter Email" disabled value = {this.state.employee.gender}/>
                      </FormGroup>
                    </Col> 
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                      <Label>Job Role</Label>
                      <Input type="text" id="jobrole" name="jobrole" placeholder="Job Role" disabled value = {this.state.employee.JobRole} />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                          <Label> Marital Status</Label>
                          <Input type="text" id="maritalstatus" name="marital-status" disabled value = {this.state.employee.MaritalStatus} />
                      </FormGroup>
                    </Col>      
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <Label>Age</Label>
                        <Input type="number" id="age" placeholder="Enter Age" disabled value = {this.state.employee.Age}/>
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
                      <Button size="md" color="primary" onClick={e=>{this.predict(this.state.number)}}><i className="fa fa-pencil " ></i> Predict</Button>
                    </Col>
                    <Col md = "4"/>
                  </Row>
                </Form> : null }
        </CardBody>
        </Card>
        </div>
       );
     }
   }
   
   export default Model_Test;
