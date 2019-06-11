import React, { Component,useState } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import {DateTimePicker} from 'react-widgets';
import momentLocalizer from 'react-widgets-moment';
import CreatableSelect from 'react-select/creatable';
import { 
    Badge,
    Card, 
    CardBody, 
    CardHeader, 
    Col, 
    Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader, 
    Button, 
    Row, 
    CardText,
    Table,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label } from 'reactstrap';
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as actionService from "../../../services/actionService"
import 'date-fns';
// import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { isNull } from "util";

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(inputValue);
    }, 1000);
  });
const localizer = Calendar.momentLocalizer(moment);
// moment.locale('en')
momentLocalizer(moment)

var data = {
  culture: 'en',
  events: [],
  detail : {
      status: false,
      dataModal:[]
  },
  add:{
      status: false,
      dataAdd: []
  },
  inputValue: ''
}
let selectOptions = [];
actionService.getUserlist().then(res=>{
    let users = res.data;
    users.map(user => {
        const a = {
            value: user.id,
            label: user.emp_fname+ " " + user.emp_lname
        };
        selectOptions.push(a);
    })
})
function AsyncMulti(props) {
    let [inputValue,setInputValue] = useState(props.inputValue);
    const handleInputChange = (newValue, actionMeta) => {
        const inputValue = newValue;
        setInputValue({...inputValue,inputValue });
        console.log(inputValue);
        props.selector(inputValue);
        console.log(`action: ${actionMeta.action}`);
        return inputValue;
    };
    return (
        <CreatableSelect
          isMulti
          isClearable
          onChange = {handleInputChange}
          options={selectOptions}
        />
      );
  }
function AddEvents(props){

    // console.log(props);
    if (!props.data.status){
        return null;
    }
    let [form, setValues] = useState({
        title: 'Event',
        date: {
            startDate: new Date(props.data.dataModal.start),
            endDate : new Date(props.data.dataModal.end)
        },
        start: new Date(props.data.dataModal.start),
        end: new Date(props.data.dataModal.end),
        notification: 5,
        inputValue: ''
    });
    function setStartTime(date) {
        
        setValues({
            ...form,
            start: date
        });
    }
    function setEndTime(date) {
        let a = new moment(form.start)
        let b = new moment(date)
        if (a.isSame(b,'day')){
            if (a > b){
                console.log("aaaaaaa")
                alert(" Please choose again: Start time > End time")
            }
            else {
                setValues({
                    ...form,
                    end: date
                });
            }
        }  
    }
    const selector = e => {
        console.log("selector voo r nha");
        setValues({
            ...form,
            inputValue: e
        });
    }
    const updateField = e => {
        setValues({
          ...form,
          [e.target.name]: e.target.value
        });
      };
    const sendValues = e => {
        e.preventDefault();
        // console.log(form)
        let idArray = [];
        let arrayList = form.inputValue;
        if(arrayList ===''){
            idArray.push('-1')
        }
        else {
        arrayList.map((value,index)=> {
            // console.log(value.id)
            idArray.push(value.value);
        })
        }

        let data = {
          members: idArray,
          date_att: [new moment(form.date.startDate).format("YYYY-MM-DD hh:mm:ss"),new moment(form.date.endDate).format("YYYY-MM-DD hh:mm:ss")],
          title: form.title,
          start: new moment(form.start).format("YYYY-MM-DD hh:mm:ss"),
          end: new moment(form.end).format("YYYY-MM-DD hh:mm:ss"),
          notification: form.notification  
        }
        actionService.addEvent(data);
        console.log(form.title);

      };
      function ButtonSave(props){
        let aa = {
            start: new moment(form.start).format("YYYY-MM-DD hh:mm:ss"),
            end: new moment(form.end).format("YYYY-MM-DD hh:mm:ss")
        };
          return (
            <Button color="primary" onClick = {(e) => {sendValues(e); props.openAdd(aa); props.regetEvent()}} >Save</Button>
          )
      }
    return (
        <Modal id= "test" isOpen={props.data.status} toggle={props.openAdd}
                className={'modal-add'}>
        <ModalHeader toggle={props.openAdd}>Event Add</ModalHeader>
        <ModalBody>
                <Form  className="form-horizontal col-md-12">
                    <FormGroup row style={{marginTop:'5px',marginBottom:'5px'}}>
                        <InputGroup > 
                            <Col md="4">                                 
                            <InputGroupAddon addonType="prepend" >
                                <InputGroupText className="col-md-12">
                                    Title
                                </InputGroupText>
                            </InputGroupAddon>   
                            </Col> 
                            <Col md="8">     
                            <Input type="text" id="title" name="title" onChange={updateField} value={form.title}/>                                  
                            </Col> 
                        </InputGroup>
                    </FormGroup>
                    <FormGroup row style={{marginTop:'5px',marginBottom:'5px'}}>
                        <InputGroup > 
                            <Col md="4">                                 
                            <InputGroupAddon addonType="prepend" >
                                <InputGroupText className="col-md-12">
                                    Date
                                </InputGroupText>
                            </InputGroupAddon>   
                            </Col> 
                            <Col md="8">   
                                <InputGroupText className="col-md-12">{props.data.dataModal.start.toString().slice(0,15) +
                                    " - " + 
                                    props.data.dataModal.end.toString().slice(0,15)}</InputGroupText>
                            </Col> 
                        </InputGroup>
                    </FormGroup>
                    <FormGroup row style={{marginTop:'5px',marginBottom:'5px'}}>
                        <InputGroup>
                        <Col md="4">
                            <InputGroupAddon addonType="prepend" >
                                <InputGroupText className="col-md-12">
                                    Start Time
                                </InputGroupText>
                            </InputGroupAddon>
                        </Col>
                        <Col md="8">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="mui-pickers-time"
                                    label="Time picker"
                                    name = "start"
                                    // minDate ={form.date.startDate}
                                    // maxDate = {form.date.endDate}
                                    value={form.start}
                                    // disableFuture = {true}
                                    // disablePast = {true}
                                    // minutesStep ={120}
                                    onChange={setStartTime}
                                    KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                    }}
                                />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Col>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup row style={{marginTop:'5px',marginBottom:'5px'}}>
                        <InputGroup>
                        <Col md="4">
                        <InputGroupAddon addonType="prepend" >
                            <InputGroupText className="col-md-12">
                                End Time
                            </InputGroupText>
                        </InputGroupAddon>
                        </Col>
                        <Col md="8">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="mui-pickers-time"
                                    label="Time picker"
                                    name ="end"
                                    // disableFuture = {true}
                                    // disablePast = {true}
                                    value={form.end}
                                    onChange={setEndTime}
                                    KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                    }}
                                />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Col>
                        </InputGroup>
                        
                    </FormGroup>
                    <FormGroup row style={{marginTop:'5px',marginBottom:'5px'}}>
                        <InputGroup>
                        <Col md="4">
                        <InputGroupAddon addonType="prepend" >
                            <InputGroupText className="col-md-12">
                                Notification
                            </InputGroupText>
                        </InputGroupAddon>
                        </Col>
                        <Col md="8">
                            <Input type="select" id="notification" name="notification" value = {form.notification} onChange ={updateField}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </Input>        
                        </Col> 
                        </InputGroup>
                    </FormGroup>
                    <FormGroup row style={{marginTop:'5px',marginBottom:'5px'}}>
                            <InputGroup>
                                <Col md="4">
                                    <InputGroupAddon addonType="prepend" >
                                        <InputGroupText className="col-md-12">
                                            Duration
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </Col>
                                <Col md="8">
                                    <AsyncMulti inputValue = {form.inputValue} selector = {selector}/>
                                </Col> 
                            </InputGroup>
                        </FormGroup>
                    </Form>
        </ModalBody>
        <ModalFooter>
            <ButtonSave openAdd = {props.openAdd} regetEvent = {props.regetEvent}/>{' '}
            <Button color="danger" onClick={props.openAdd}>Cancel</Button>
        </ModalFooter>
        </Modal>
    )
}
function ShowAttDetail(props){
    // console.log(props);
    if(!props.data.status){
        return null;
    }
    // console.log(props);
    return (
        <Modal id="yeah" isOpen={props.data.status} toggle={props.toggleDetail}
                        className={'modal-detail'}>
            <ModalHeader toggle={props.toggleDetail}>Event Title</ModalHeader>
            <ModalBody>
                    <Form action="" method="post" className="form-horizontal col-md-12">
                        <FormGroup row style={{marginTop:'5px',marginBottom:'5px'}}>
                            <InputGroup > 
                                <Col md="4">                                 
                                    <InputGroupAddon addonType="prepend" >
                                        <InputGroupText className="col-md-12">
                                            Title
                                        </InputGroupText>
                                    </InputGroupAddon>   
                                </Col> 
                                <Col md="8">                                         
                                    <InputGroupText className="col-md-12">{props.data.dataModal.title}</InputGroupText> 
                                </Col> 
                            </InputGroup>
                        </FormGroup>
                        <FormGroup row style={{marginTop:'5px',marginBottom:'5px'}}>
                            <InputGroup > 
                                <Col md="4">                                 
                                    <InputGroupAddon addonType="prepend" >
                                        <InputGroupText className="col-md-12">
                                            Date
                                        </InputGroupText>
                                    </InputGroupAddon>   
                                </Col> 
                                <Col md="8">                               
                                    <InputGroupText className="col-md-12">{props.data.dataModal.date}</InputGroupText> 
                                </Col> 
                            </InputGroup>
                        </FormGroup>
                        <FormGroup row style={{marginTop:'5px',marginBottom:'5px'}}>
                            <InputGroup>
                                <Col md="4">
                                    <InputGroupAddon addonType="prepend" >
                                        <InputGroupText className="col-md-12">
                                            Start Time
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </Col>
                                <Col md="8">
                                    <InputGroupText className="col-md-12">{props.data.dataModal.start}</InputGroupText>
                                </Col>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup row style={{marginTop:'5px',marginBottom:'5px'}}>
                            <InputGroup>
                                <Col md="4">
                                    <InputGroupAddon addonType="prepend" >
                                        <InputGroupText className="col-md-12">
                                            End Time
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </Col>
                                <Col md="8">
                                    <InputGroupText className="col-md-12">{props.data.dataModal.end}</InputGroupText>
                                </Col>
                            </InputGroup>        
                        </FormGroup>
                        <FormGroup row style={{marginTop:'5px',marginBottom:'5px'}}>
                            <InputGroup>
                                <Col md="4">
                                    <InputGroupAddon addonType="prepend" >
                                        <InputGroupText className="col-md-12">
                                            Duration
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </Col>
                                <Col md="8">
                                    <InputGroupText className="col-md-12">{props.data.dataModal.desc}</InputGroupText>
                                </Col> 
                            </InputGroup>
                        </FormGroup>

                    </Form>
            </ModalBody>
            <ModalFooter>
                {/* <Button color="danger" onClick={props.toggleDetail}>Do Something</Button>{' '} */}
                <Button color="secondary" onClick={props.toggleDetail}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
} 
class AdminCalendar extends Component {
  constructor(props){
    super(props);
    this.state = {data};
    this.toggleDetail = this.toggleDetail.bind(this);
    this.openAdd = this.openAdd.bind(this);
    this.regetEvent = this.regetEvent.bind(this);
  }

  getAttendance(){
    actionService.getEvent().then(res => {
        const events = res.data;
        let eventPromises = new Promise((resolve) => {
            let eventArray = []
            events.map((event,index)=>{
                const start_time = new moment(event.start_time).format()
                const end_time =  new moment(event.end_time).format()
                const a = new moment(event.start_time)
                const b = new moment(event.end_time)
                const duration = b.diff(a,'minutes',true)
                eventArray.push({
                    id: index,
                    title: event.title,
                    start: new Date(start_time),
                    end: new Date(end_time),
                    desc: duration
                });
            })
            resolve(eventArray)
        });
        eventPromises.then((results) => {
            // console.log(results);
            this.setState( prevState => ({
                data: {
                ...prevState.data,
                events: results
                //  [name] : value
                }
            }))
        })
    });
  }
  getEvent(uid){
    actionService.getAttdetail(uid).then(res => {
        const events = res.data;
        let attendancePromises = new Promise((resolve) => {
            let attendanceArray = []
            events.map((event,index)=>{
                // console.log(event.start_time)
                const start_time = new moment(event.start_time).format()
                const end_time =  new moment(event.end_time).format()
                const a = new moment(event.start_time)
                const b = new moment(event.end_time)``
                const duration = a.diff(b,'hours',true)
                attendanceArray.push({
                    id: index,
                    title: event.title,
                    start: new Date(start_time),
                    end: new Date(end_time),
                    desc: duration
                });
            })
            resolve(attendanceArray)
        });
        attendancePromises.then((results) => {
            // console.log(results);
            let a =this.state.data.events;
            results.map((item,index)=>{
                a.push(item);
            })
            this.setState( prevState => ({
                data: {
                ...prevState.data,
                events: a
                //  [name] : value
                }
            }))
        })
    });
  }
  componentDidMount(){
    const uid =JSON.parse(localStorage.getItem('authUser')).uid;
    this.getAttendance();
    this.getEvent(uid);
  }
componentDidUpdate(prevProps, prevState){
    if(prevState.data.events !== this.state.data.events){
        console.log("update");
    }
}
  toggleDetail(event) {
    // console.log(event);
    let b = new Promise((resolve) => {
        let a = {
        status: !this.state.data.detail.status,
        dataModal: event
        }
        resolve(a)
    })
    b.then((result) => {
        let c,d,e;
        // let d;
        if ((typeof result.dataModal.start) === 'object'){
            c = result.dataModal.start.toString().slice(15,24)
            d = result.dataModal.end.toString().slice(15,24)
            e = result.dataModal.start.toString().slice(0,15)
        }
        // console.log(result.dataModal.start)
        this.setState( prevState => ({
            data: {
            ...prevState.data,
            detail: {
                status: result.status,
                dataModal: {
                    id: result.dataModal.id,
                    start: c,
                    date: e,
                    end: d,
                    title: result.dataModal.title,
                    desc: result.dataModal.desc

                }
            }
            }
        }))
    }) 
  }
  openAdd(times,event){
    //   console.log(times.end);
    if (times !== undefined){
        this.setState( prevState => ({
            data: {
            ...prevState.data,
            add: {
                status: !this.state.data.add.status,
                dataModal:{
                    start: times.start,
                    end: times.end
                }
            }
            }
        }));
    }
    this.getEvent();
    this.getAttendance();
  }
  saveEvent(event){
    this.setState( prevState => ({
        data: {
        ...prevState.data,
        add: {
            status: !this.state.data.add.status,
            dataModal:{
                start: '',
                end: ''
            }
        }
        }
    }));
  }
  regetEvent(){
      this.getEvent();
      this.getAttendance();
  }
  render() {
    let rtl = this.state.culture === 'en'
    return (
        <div className="animated fadeIn">
        <Card>
            <CardBody>
                <ShowAttDetail data = { this.state.data.detail} toggleDetail = {this.toggleDetail}/>
                <AddEvents data = {this.state.data.add} openAdd = {this.openAdd} regetEvent = {this.regetEvent}/>
                <Calendar
                    selectable
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView={Calendar.Views.MONTH}
                    timeslots={8}
                    step={15}
                    rtl = {rtl}
                    culture = {this.state.data.culture}
                    events={this.state.data.events}
                    style={{ height: "100vh" }}
                    onSelectEvent={event => {this.toggleDetail(event)}}
                    onSelectSlot={times => {this.openAdd(times)}}
                />
                
            </CardBody>
        </Card>
      </div>
    );
  }
}

export default AdminCalendar;




// export default AdminCalendar;