import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import { compose } from 'recompose';
import { withFirebase } from '../../../containers/Firebase';
// import { AuthUserContext } from '../../../containers/Session';
import * as actionService from '../../../services/actionService';
// import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import RGL, { WidthProvider } from "react-grid-layout";
// import { Resizable, ResizableBox } from 'react-resizable';
import { SortablePane, Pane } from 'react-sortable-pane';
// import React from "react";
// import Plot from "react-plotly.js";
import Plotly from "plotly.js-basic-dist";
import {paneStyle} from './style';
import createPlotlyComponent from "react-plotly.js/factory";
import axios from 'axios';
import { MDBDataTable} from 'mdbreact';
import {
    Container,
    Card,

  } from 'reactstrap';
const Plot = createPlotlyComponent(Plotly);
let columns = [];
let data = [];
// function dataTable(props){
//     return (
//         <Card>
//         <MDBDataTable 
//             scrollX 
//             // scrollY 
//             btn
//             striped
//             borderless
//             small
//             data={props.data}
//             // hover
            
//         />
//      </Card>
//     )
// }
class DataReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
        persons: []
      }
  }

componentDidMount() {
    axios.get(`http://127.0.0.1:5000/age_distribution`)
      .then(res => {
        const persons = res.data;
        // console.log(persons)
        this.setState({ persons });
    });
    let columns_info = [];
    actionService.getColumnsName().then((res) => {
        columns_info = res.data;
        columns_info.map((column,index)=> {
            columns.push({
                label: column,
                field: column,
                sort: 'asc',
                width: 150
            })
        });
    });
    // data = {columns};
    // this.setState({data:data})
    actionService.getData().then((res)=>{
        return res;
    }).then(result => {
        result = result.data;
        data= {
            columns: columns,
            rows: result
        }
        this.setState({data:data});
    console.log(data);

    })
    // data= {
    //     columns,
    //     rows
    // }
    // console.log(rows);
    // this.setState({data: data})
    // console.log(rows);

}
  render() {
    const panes = [0, 1].map((key) => {
        if (key === 1){
            return (
                <Pane key={key} defaultSize={{ width: 300, height: 300 }} resizable = {false} >
                    <Card>
                    <MDBDataTable 
                        scrollX 
                        // scrollY 
                        btn
                        striped
                        borderless
                        small
                        data={this.state.data}
                        // hover
                        
                    />
                    </Card>
                </Pane>
            )
        }
        else {
            return (
                <Pane key={key} defaultSize={{ width: '50%', height: 450 }} style={paneStyle} resizable = {false}>
                    <Plot data = {this.state.persons.data} layout = {this.state.persons.layout} responsive = {true}></Plot>
                </Pane>
            )           
        }

    });
    return (
        <div >
        <Container className ="d-flex justify-content-center">

                <SortablePane direction="vertical" margin={40} defaultOrder={['0', '1']}>
                    {panes}
                </SortablePane>



            {/* <Row >
                <Col></Col>
                <Col>
                    <Card>
                        <CardHeader>
                        Line Chart
                        <div className="card-header-actions">
                            <a href="http://www.chartjs.org" className="card-header-action">
                            <small className="text-muted">docs</small>
                            </a>
                        </div>
                        </CardHeader>
                        <CardBody>
                        <div className="chart-wrapper">

                            
                        </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col></Col>
            </Row> */}
        </Container>
        </div>
    );
  }
}

export default withFirebase(DataReport);

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import TableauReport from 'tableau-react';
// import Plot from 'react-plotly.js';
// import axios from 'axios';

// class DataReport extends React.Component {
//   state = {
//     persons: []
//   }

//   componentDidMount() {
//     axios.get(`http://127.0.0.1:5000/age_distribution`)
//       .then(res => {
//         const persons = res.data;
//         console.log(persons)
//         this.setState({ persons });
//       })
//   }

//   render() {
//     return (
//       <Plot data = {this.state.persons.data} layout = {this.state.persons.layout}></Plot>
//       // <h1>hi</h1>
//     )
//   }
// }
// export default DataReport;
