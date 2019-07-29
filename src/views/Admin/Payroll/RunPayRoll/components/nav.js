import React from 'react';
// import styles from './nav.less';
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
        dots.push((
            <i key={`step-${i}`}><span
                key={`step-${i}`}
                className={`${classes.dot} ${isActive ? classes.active : ''}`}
                onClick={() => props.goToStep(i)}
            >&bull;</span>{(() =>{
                switch(i){
                    case 1:
                        console.log('yeah');
                        return <label key={i}>Yeah 1</label>;
                    case 2:
                        return <label key={i}>Yeah 1</label>;
                    case 3:
                        return <label key={i}>Yeah 1</label>;
                    default:
                        return null;
                }
            })

            }</i>     
        ));
    }

    return (
        <div className={classes.nav}>{dots}</div>
    );
};

export default Nav;
