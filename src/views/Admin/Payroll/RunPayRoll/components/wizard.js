import React, { Component} from 'react';
import StepWizard from 'react-step-wizard';
import Nav from './nav';
import {withStyles } from '@material-ui/core/styles';
import { Button,Jumbotron,Col } from 'reactstrap';
import StepOne from '../StepOne';
import StepTwo from '../StepTwo';
import StepThree from '../StepThree';
import StepFour from '../StepFour';
const useStyles ={
    animated:  {
        animationDuration: '.8192s',
        animationFillMode: 'backwards',
        transformStyle: 'preserve-3d'
      },
      /** intro */
      '@keyframes intro': {
        from : {
          opacity: 0,
          transform: 'perspective(500px) translate3d(0, 0, -50px)'
        },
        to : {
          opacity: 1,
          transform: 'none'
        }
      },
      intro : {
        animation: 'intro 1s ease-out'
      },
      /** enterRight */
      '@keyframes enterRight': {
        from : {
          opacity: 0,
          transform: 'perspective(500px) translate3d(20%, 0, 0)'
        },
        to : {
          opacity: 1,
          transform: 'none',
        }
      },
      enterRight: {
        animationName: 'enterRight'
      },
      /** enterLeft */
      '@keyframes enterLeft':{
        from: {
          opacity: 0,
          transform: 'perspective(500px) translate3d(-20%, 0, 0)'
        },
        to : {
          opacity: 1,
          transform: 'none',
        }
      },
      enterLeft :{
        animationName: 'enterLeft'
      },
      /** exitRight */
      '@keyframes exitRight' : {
        from : {
          opacity: 1
        },
        to : {
          opacity: 0,
          transform: 'perspective(500px) translate3d(100%, 0, -100px)'
        }
      },
      exitRight : {
        animationName: 'exitRight'
      },
      /** exitLeft */
      '@keyframes exitLeft' :{
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
          transform : 'perspective(500px) translate3d(-100%, 0, -100px)',
        }
      },
      exitLeft : {
        animationName: 'exitLeft'
      }
};

class Wizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[],
          dataOff:[],
          trigger:false,
          triggerOff: false,
        };
        // this.updateData = this.updateData.bind(this);
    }

    updateData = (value) => {
      this.setState({ data:value ,trigger:true},()=>{
      });
    }
    updateDataOff = (value) => {
      console.log("updateDataOff");
      this.setState({ dataOff:value ,triggerOff:true},()=>{
      });
    }

    // Do something on step change
    onStepChange = (stats) => {

    }

    setInstance = SW => this.setState({ SW })

    render() {
        const { classes } = this.props;
        const transitions = {
            enterRight: `${classes.animated} ${classes.enterRight}`,
            enterLeft: `${classes.animated} ${classes.enterLeft}`,
            exitRight: `${classes.animated} ${classes.exitRight}`,
            exitLeft: `${classes.animated} ${classes.exitLeft}`,
            intro: `${classes.animated} ${classes.intro}`,
        };
        return (
            <div className="animated fadeIn">
                    <Jumbotron style = {{padding:0}}>
                        <Col  style = {{minHeight: '1000px !important'}}>
                            <StepWizard
                                onStepChange={this.onStepChange}
                                isHashEnabled
                                transitions={transitions} // comment out this line to use default transitions
                                nav={<Nav />}
                                instance={this.setInstance}
                            >
                            
                                <StepOne Stats = {Stats} updateData = {this.updateData}/>
                                {this.state.trigger ? 
                                  <StepTwo Stats = {Stats} data = {this.state.data} updateDataOff = {this.updateDataOff}/>
                                  : 
                                  <h1>updating</h1>
                                }    
                                {this.state.trigger ? 
                                  (this.state.triggerOff ? (
                                    <StepThree Stats = {Stats} data = {this.state.data} dataOff ={this.state.dataOff}/>
                                  ):(
                                    <h1>updating</h1>
                                  ))
                                 : 
                                  <h1>updating</h1>
                                }         
                                <StepFour Stats = {Stats}/>                      
                            </StepWizard>
                            </Col>
                    </Jumbotron>
                </div>
            // </div>
        );
    }
}

const Stats = ({
    nextStep,
    previousStep,
    totalSteps,
    step,
    data
}) => {
  
  
  return (
    <div style={{textAlign:"center"}}>
        <hr />
        { step > 1 &&
            <Button style = {{marginLeft:'5px',marginRight:'5px'}}color='danger' onClick={previousStep}>Go Back</Button>
        }
        {/* { step < totalSteps &&
            
        } */}
        { step === 3 ? 
          <Button style = {{marginLeft:'5px',marginRight:'5px'}}color='success' onClick={nextStep}>Submit Payroll</Button>
          : (step === 2 || step ===1) &&
          <Button style = {{marginLeft:'5px',marginRight:'5px'}}color='primary' onClick={nextStep}>Continue</Button>
        }
        { step === totalSteps && 
          <Button style = {{marginLeft:'5px',marginRight:'5px'}}color='success' onClick={nextStep}>Back To Dashboard</Button>
        }

        <hr />
    </div>
)};

export default withStyles(useStyles)(Wizard);