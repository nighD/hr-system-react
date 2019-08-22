import React, { Component} from 'react';

import { withFirebase } from '../../../containers/Firebase';
// import * as actionService from '../../../services/actionService';
// import PivotTableUI from 'react-pivottable/PivotTableUI';
// import 'react-pivottable/pivottable.css';
// import TableRenderers from 'react-pivottable/TableRenderers';
// import createPlotlyComponent from 'react-plotly.js/factory';
// import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import axios from 'axios'
// import Plot from 'react-plotly.js';
// import Iframe from 'react-iframe'
// import Papa from 'papaparse';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
// var excelll = '../../../../WA_Fn-UseC_-HR-Employee-Attrition.csv';
// const Plot = createPlotlyComponent(Plotly);
// let columns = [];
// let data = [];
// const Plot = createPlotlyComponent(window.Plotly);
// create Plotly React component via dependency injection
// const Plot = createPlotlyComponent(window.Plotly);

// const PlotlyRenderers = createPlotlyRenderers(Plot);

// let test_data = [];
// Plotly.plot('plotly-div', {
//   data: data,
//   layout: layout
// });
class DataReport extends Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = {persons:[]}
  }

async componentDidMount() {
    // this.getDataa();
    // var csvFilePath = require("../../../WA_Fn-UseC_-HR-Employee-Attrition.csv");
    // var Papa = require("papaparse/papaparse.min.js");
    // Papa.parse(csvFilePath, {
    //   header: true,
    //   download: true,
    //   skipEmptyLines: true,
    //   // Here this is also available. So we can call our custom class method
    //   complete: this.updateData
    // });
    // this.setState(
    //     {
    //         mode: 'thinking',
    //         filename: '(Parsing CSV...)',
    //         textarea: '',
    //         pivotState: {data: []},
    //     },
    //     () =>
    //         Papa.parse(excelll, {
    //             skipEmptyLines: true,
    //             error: e => alert(e),
    //             complete: parsed =>
    //                 this.setState({
    //                     mode: 'file',
    //                     filename: 'WA_Fn-UseC_-HR-Employee-Attrition',
    //                     pivotState: {data: parsed.data},
    //                 }),
    //         })
    // );
    // console.log(P);
    // axios.get(`http://127.0.0.1:5000/age_distribution`)
    //   .then(res => {
    //     const persons = res.data;
    //     console.log(persons)
    //     this.setState({ persons });
    // });
    await this.updateData();
    // let columns_info = [];
    // actionService.getColumnsName().then((res) => {
    //     columns_info = res.data;
    //     columns_info.map((column,index)=> {
    //         columns.push({
    //             label: column,
    //             field: column,
    //             sort: 'asc',
    //             width: 150
    //         })
    //     });
    // });
    // data = {columns};
    // this.setState({data:data})
    // actionService.getData().then((res)=>{
    //     return res;
    // }).then(result => {
    //     test_data = result;
        // this.setState({test_data:result});
    //     result = result.data;
    //     data= {
    //         columns: columns,
    //         rows: result
    //     }
    //     this.setState({data:data});
    // console.log(data);

    // })
    // data= {
    //     columns,
    //     rows
    // }
    // console.log(rows);
    // this.setState({data: data})
    // console.log(rows);

}
async updateData() {
  await axios.get(`http://127.0.0.1:5000/age_distribution`).then(res => {
    const persons = res.data;
   
    this.setState({ persons });
    // console.log(this.state)
});
    // const data = result.data;
    // // Here this is available and we can call this.setState (since it's binded in the constructor)
    // await this.setState({data: data}); // or shorter ES syntax: this.setState({ data });
    // console.log(this.state.data);
  }
  render() {

    return (
          <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="6" lg="4">
              <Card>
                <CardHeader>
                  Over Time vs Attrition
                </CardHeader>
                <CardBody>
                  <iframe width="100%" height="300" display="block" frameborder="0" scrolling="no" src="//plot.ly/~nightD/74.embed?show_link=false&autosize=true&logo=false&height=100%" title="1"></iframe>
                </CardBody>
              </Card>
            </Col>

            <Col xs="12" sm="6" lg="4">
              <Card >
                <CardHeader>
                  Work Life Balance vs Attrition
                </CardHeader>
                <CardBody>
                  <iframe width="100%" height="300" display="block" frameborder="0" scrolling="no" src="//plot.ly/~nightD/72.embed?show_link=false&autosize=true" title="2"></iframe>
                </CardBody>
              </Card>
            </Col>

            <Col xs="12" sm="6" lg="4">
              <Card >
                <CardHeader>
                  Gender vs Attrition
                </CardHeader>
                <CardBody>
                  <iframe width="100%" height="300" display="block" frameborder="0" scrolling="no" src="//plot.ly/~nightD/56.embed?show_link=false&autosize=true" title="3"></iframe>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="6" lg="7">
              <Card>
                <iframe width="100%" height="627" frameborder="0" scrolling="no" src="//plot.ly/~baole16/1.embed?show_link=false&autosize=true" title="4"></iframe>
              </Card>
            </Col>

            <Col xs="12" md="6" lg="5">
              <Row>
                <Col xs="12" md="6" lg="12">
                  <Card>
                    <iframe width="100%" height="300" frameborder="0" scrolling="no" src="//plot.ly/~baole16/5.embed?show_link=false&autosize=true" title="5"></iframe>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="6" lg="12">
                  <Card>
                    <iframe width="100%" height="300" frameborder="0" scrolling="no" src="//plot.ly/~nightD/70.embed?show_link=false&autosize=true" title="6"></iframe>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                  <Col xs="12" sm="6" lg="6">
                    <iframe width="100%" height="400" display="block" frameborder="0" scrolling="no" src="//plot.ly/~nightD/49.embed?show_link=false&autosize=true&height=100%" title="7"></iframe>
                  </Col>
                  <Col xs="12" sm="6" lg="6">
                    <iframe width="100%" height="400" display="block" frameborder="0" scrolling="no" src="//plot.ly/~nightD/33.embed?show_link=false&autosize=true&height=100%" title="8"></iframe>
                  </Col>
                  </Row>
                </CardBody>
                
              </Card>
            </Col>
          </Row>


          <Row>
            <Col>
              <Card>
                <CardHeader>
                  Line Chart and Pie Chart
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="12" md="6" xl="6">
                      <Row>
                        <Col sm="12">
                          <iframe margin="0" width="100%" height="280" display="block" frameborder="0" scrolling="no" src="//plot.ly/~baole16/7.embed?show_link=false&autosize=true&height=100%" title="9"></iframe>
                          <iframe margin="0" width="100%" height="280" display="block" frameborder="0" scrolling="no" src="//plot.ly/~baole16/9.embed?show_link=false&autosize=true&height=100%" title="10"></iframe>
                          <iframe margin="0" width="100%" height="280" display="block" frameborder="0" scrolling="no" src="//plot.ly/~baole16/11.embed?show_link=false&autosize=true&height=100%" title="11"></iframe>
                        </Col>

                      </Row>
                    
                    </Col>
                    <Col xs="12" md="6" xl="6">
                      <Row>
                        <Col sm="12">
                          <iframe margin="0" width="100%" height="280" display="block" frameborder="0" scrolling="no" src="//plot.ly/~nightD/54.embed?show_link=false&autosize=true&height=100%" title="12"></iframe>
                          <iframe margin="0" width="100%" height="280" display="block" frameborder="0" scrolling="no" src="//plot.ly/~nightD/64.embed?show_link=false&autosize=true&height=100%" title="13"></iframe>
                          <iframe margin="0" width="100%" height="280" display="block" frameborder="0" scrolling="no" src="//plot.ly/~nightD/62.embed?show_link=false&autosize=true&height=100%" title="14"></iframe>
                        </Col>
                        {/* <Col sm="6">
                          
                        </Col> */}
                      </Row>
                      
                    </Col>
                  </Row>
                  
                
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        // <div>

        //   <Card>
        //   <Iframe width="500" height="500" src="//plot.ly/~nightD/82.embed" title=""></iframe>
        //   <Plot data = {data} layout = {layout}></Plot>
        //     <PivotTableUI
        //         data={this.state.data}
        //         onChange={s => this.setState(s)}
        //         renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
        //         {...this.state}
        //         unusedOrientationCutoff={Infinity}
        //         />
        //   </Card>
        // </div>
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
