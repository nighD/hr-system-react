import React from 'react';
// import styles from './nav.less';
import { Button} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    nav: {
        marginBottom: '15px',
        textAlign: 'center',
    },
    
    dot: {
        color: 'black',
        cursor: 'pointer',
        fontSize: '36px',
        lineHeight: 1,
        margin: '0 15px',
        opacity: .4,
        textShadow: 'none',
        transition: 'opacity 1s ease text-shadow 1s ease',
        willChange: 'opacity, text-shadow'
    },
    
    active: {
        color: 'var(--blue)',
        opacity: 1,
        textShadow: '0 0px 8px',
    }
});
const Nav = (props) => {
    const dots = [];
    const classes = useStyles();
    for (let i = 1; i <= props.totalSteps; i += 1) {
        const isActive = props.currentStep === i;
        var a;
        if(i == 1){
            a = " 1. Hours & Earnings"
        }
        else if (i ==2) {
            a = "2. Time Off"
        }
        else if (i==3){
            a = "3. Review & Submit"
        }
        else if (i==4){
            a = "4. Confirmation"
        }
        
        dots.push((
            <i key={`step-${i}`} onClick={() => props.goToStep(i)}><span
                key={`step-${i}`}
                className={`${classes.dot} ${isActive ? classes.active : ''}`}
                
            >&bull;</span><Button color="ghost-primary">{a}</Button></i>     
        ));
    }

    return (
        <div className={classes.nav}>{dots}</div>
    );
};

export default Nav;
