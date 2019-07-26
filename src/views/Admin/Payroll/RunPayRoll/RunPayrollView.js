'use strict'
import React,{Component} from 'react'
import { steps } from './steps'
import MultiStep from 'react-multistep'
import { Card } from '@material-ui/core';
import Wizard from './components/wizard';
class RunPayroll extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className='container_select'>
            <Card>
                <div>
                    {/* <MultiStep showNavigation={true} steps={steps} /> */}
                    <Wizard/>
                </div>
            </Card>

            </div>
        )
    }
}
export default RunPayroll;
// const App = () => (
//   <div className='container'>
//     <div>
//       <MultiStep steps={steps} />
//     </div>
//     <div className='container app-footer'>
//       <h6>Press 'Enter' or click on progress bar for next step.</h6>
//       Code is on{' '}
//       <a href='https://github.com/Srdjan/react-multistep' target='_blank'>
//         github
//       </a>
//     </div>
//   </div>
// )