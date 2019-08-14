import React, { Component} from 'react';
import StepWizard from 'react-step-wizard';
import Nav from './nav';
import {withStyles } from '@material-ui/core/styles';
import { Button,Jumbotron,Col } from 'reactstrap';
import StepOne from '../StepOne';
// import StepTwo from '../StepTwo`';
// import StepThree from '../StepThree';
// import StepFour from '../StepFour';
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
        };
    }

    updateForm = (key, value) => {
        const { form } = this.state;

        form[key] = value;
        this.setState({ form });
    }

    // Do something on step change
    onStepChange = (stats) => {
        // console.log(stats)
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
                                <StepOne Stats = {Stats}/>
                                <First hashKey={'FirstStep'} update={this.updateForm} />
                                <Second form={this.state.form} />
                                <Last hashKey={'TheEnd!'} />
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
}) => (
    <div style={{textAlign:"center"}}>
        <hr />
        { step < totalSteps ?
            <Button style = {{marginLeft:'5px',marginRight:'5px'}}color='primary' onClick={nextStep}>Continue</Button>
            :
            <Button style = {{marginLeft:'5px',marginRight:'5px'}}color='success' onClick={nextStep}>Finish</Button>
        }
        { step > 1 &&
            <Button style = {{marginLeft:'5px',marginRight:'5px'}}color='danger' onClick={previousStep}>Go Back</Button>
        }
        <hr />
    </div>
);

class First extends Component {
    update = (e) => {
        this.props.update(e.target.name, e.target.value);
    }
    render() {
        return (
            <div>
                <h3 className='text-center'>Welcome! Have a look around!</h3>
                <Stats step={1} {...this.props} />
            </div>
        );
    }
}

class Second extends Component {
    render() {
        return (
            <div>
                <Stats step={2} {...this.props} />
            </div>
        );
    }
}

class Last extends Component {
    submit = () => {
        alert('You did it! Yay!') // eslint-disable-line
    }

    render() {
        return (
            <div>
                <div className={'text-center'}>
                    <h3>This is the last step in this example!</h3>
                    <hr />
                    {/* <Plugs /> */}
                </div>
                <Stats step={4} {...this.props} nextStep={this.submit} />
            </div>
        );
    }
}
export default withStyles(useStyles)(Wizard);