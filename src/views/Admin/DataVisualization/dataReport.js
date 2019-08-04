import React, { Component } from 'react';

import { withFirebase } from '../../../containers/Firebase';
import * as actionService from '../../../services/actionService';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import Plot from 'react-plotly.js';

import Papa from 'papaparse';
import {
    Container,
    Card,

  } from 'reactstrap';
var excelll = '../../../../WA_Fn-UseC_-HR-Employee-Attrition.csv';
// const Plot = createPlotlyComponent(Plotly);
let columns = [];
let data = [];
// const Plot = createPlotlyComponent(window.Plotly);
// create Plotly React component via dependency injection
// const Plot = createPlotlyComponent(window.Plotly);

const PlotlyRenderers = createPlotlyRenderers(Plot);

let test_data = [];
class PivotTableUISmartWrapper extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {pivotState: props};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({pivotState: nextProps});
    }

    render() {
        console.log("yeah yeah");
        return (
            <PivotTableUI
                data={this.state.pivotState} 
                renderers={Object.assign(
                    {},
                    TableRenderers,
                    createPlotlyRenderers(Plot)
                )}
                {...this.state.pivotState}
                onChange={s => this.setState({pivotState: s})}
                unusedOrientationCutoff={Infinity}
            />
        );
    }
}
class DataReport extends Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = {data:[]}
  }

componentDidMount() {
    // this.getDataa();
    var csvFilePath = require("../../../WA_Fn-UseC_-HR-Employee-Attrition.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      // Here this is also available. So we can call our custom class method
      complete: this.updateData
    });
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
    //     // console.log(persons)
    //     this.setState({ persons });
    // });
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
async updateData(result) {
    const data = result.data;
    // Here this is available and we can call this.setState (since it's binded in the constructor)
    await this.setState({data: data}); // or shorter ES syntax: this.setState({ data });
    console.log(this.state.data);
  }
  render() {

    return (
        <div>

          <Card>
            <PivotTableUI
                data={this.state.data}
                onChange={s => this.setState(s)}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                {...this.state}
                unusedOrientationCutoff={Infinity}
                />
          </Card>
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
