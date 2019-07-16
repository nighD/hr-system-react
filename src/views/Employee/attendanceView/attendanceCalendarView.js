import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import { Badge, Card, CardBody, CardHeader, Col, CardText,CardFooter, Row, Table } from 'reactstrap';
// import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import logo from "./logo.svg";
import * as actionService from "../../../services/actionService"
// import createSlot from 'react-tackle-box/Slot'
// require('globalize/lib/cultures/globalize.culture.en-GB')
const localizer = Calendar.momentLocalizer(moment);

var data = {
  culture: 'en',
  events: []
}
class CalendarView extends Component {
  constructor(props){
    super(props);
    this.state = {data};
  }
  getAttendance(){
    actionService.getEvent().then(res => {
        const events = res.data.data;
        let eventPromises = new Promise((resolve) => {
            let eventArray = []
            events.map((event,index)=>{
                // console.log(event.start_time)
                const start_time = new moment(event.start_time).format()
                const end_time =  new moment(event.end_time).format()
                const a = new moment(event.start_time)
                const b = new moment(event.end_time)
                const duration = a.diff(b,'hours',true)
                eventArray.push({
                    id: index,
                    title: event.note,
                    start: new Date(start_time),
                    end: new Date(end_time),
                    desc: duration
                });
            })
            resolve(eventArray)
        });
        eventPromises.then((results) => {
            console.log(results);
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
        const events = res.data.data;
        let attendancePromises = new Promise((resolve) => {
            let attendanceArray = []
            events.map((event,index)=>{
                // console.log(event.start_time)
                const start_time = new moment(event.start_time).format()
                const end_time =  new moment(event.end_time).format()
                const a = new moment(event.start_time)
                const b = new moment(event.end_time)
                const duration = a.diff(b,'hours',true)
                attendanceArray.push({
                    id: index,
                    title: event.note,
                    start: new Date(start_time),
                    end: new Date(end_time),
                    desc: duration
                });
            })
            resolve(attendanceArray)
        });
        attendancePromises.then((results) => {
            console.log(results);
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
    // this.getAttendance();
    // this.getEvent(uid);
    // console.log(newArray)
  }

  render() {
    // console.log(this.state.data.events)
    let rtl = this.state.culture === 'en'
    return (
      <div >
        <Card>
            <CardBody>
                <Calendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView={Calendar.Views.WEEK}
                    timeslots={8}
                    step={15}
                    rtl = {rtl}
                    culture = {this.state.data.culture}
                    events={this.state.data.events}
                    // startAccessor={(event) => { return moment(event.start_end) }}
                    // endAccessor={(event) => { return moment(event.end_start) }}
                    style={{ height: "100vh" }}
                    />
            </CardBody>
        </Card>
      </div>
    );
  }
}

export default CalendarView;