import React,{Component} from 'react'
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
                    <Wizard/>
                </div>
            </Card>

            </div>
        )
    }
}
export default RunPayroll;