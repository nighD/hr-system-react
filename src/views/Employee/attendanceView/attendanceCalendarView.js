import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import { Badge, Card, CardBody, CardHeader, Col, CardText,CardFooter, Row, Table } from 'reactstrap';
// import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import logo from "./logo.svg";
import * as actionService from "../../../services/actionService"
const localizer = Calendar.momentLocalizer(moment);

var data = {
  culture: 'fr',
  events: []
}
class CalendarView extends Component {
  // state = {
  //   events: [
  //     {
  //       start: new Date("2019-06-24"),
  //       end: new Date("2019-06-24"),
  //       title: "Example Calendar"
  //     }
  //   ]
  // };
  constructor(props){
    super(props);
    this.state = {data};
  }
  componentDidMount(){
    const uid =JSON.parse(localStorage.getItem('authUser')).uid;
    actionService.getAttdetail(uid).then(res => {
      // console.log(res)
      const events = res.data;
      // console.log(events)
      events.map((event,index)=>{
        // console.log(event.start_time)
        const start_time = new moment(event.start_time).format('h:mm:ss a')
        const end_time =  new moment(event.end_time).format('h:mm:ss a')
        const a = new moment(event.start_time)
        const b = new moment(event.end_time)
        const duration = a.diff(b,'hours',true)
        var newArray = this.state.data.events.slice();
        newArray.push({
            start: event.date_att.substring(0,10),
            end: event.date_att.substring(0,10),
            title: start_time

        });
        this.setState( prevState => ({
          data: {
           ...prevState.data,
           events: newArray
          //  [name] : value
          }
        }))
      });
    });
    // console.log(newArray)
  }

  render() {
    // console.log(this.state.data.events)
    return (
      <div >
        <Card>
            <CardBody>
                <Calendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    events={this.state.data.events}
                    style={{ height: "100vh" }}
                    />
            </CardBody>
        </Card>
      </div>
    );
  }
}

export default CalendarView;