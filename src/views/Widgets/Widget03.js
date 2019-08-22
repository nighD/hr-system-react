import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';
import Avatar from 'react-avatar';
import captain from '../../assets/img/captain.png';
const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  dataBox: PropTypes.func,
};

const defaultProps = {
  dataBox: () => ({ User: '', Name: '-', Role: '-' }),
};

class Widget03 extends Component {
  render() {

    // eslint-disable-next-line
    const { children, className, cssModule, dataBox, ...attributes } = this.props;

    // demo purposes only
    const data = dataBox();
    const User = data.variant;
    const Role = data.Role;
    if (!User < 0) {
      return (null);
    }
    let back = '' ;
    if (Role === 'admin' ){
      back = 'bg-danger';
    }
    else if (Role === 'employee'){
      back = 'bg-success';
    }
    else {
      back = 'bg-warning';
    }
    

    
    // const icon = 'fa fa-' + variant;
    const keys = Object.keys(data);
    const vals = Object.values(data);

    const classCard = 'brand-card';
    const classCardHeader = classNames(`${classCard}-header`, back);
    const classCardBody = classNames(`${classCard}-body`);
    const classes = mapToCssModules(classNames(classCard, className), cssModule);
    //console.log(Object.values(data));
    return (
      <div className={classes}>
        <div className={classCardHeader}>
          {/* <i className={icon}></i> */}
          <Avatar size="100" src={captain} round="60%" />
          {/* {children} */}
        </div>
        <div className={classCardBody}>
          <div>
            <div className="text-value">{vals[1]}</div>
            <div className="text-uppercase text-muted small">{keys[1]}</div>
          </div>
          <div>
            <div className="text-value">{vals[2]}</div>
            <div className="text-uppercase text-muted small">{keys[2]}</div>
          </div>
        </div>
      </div>
    );
  }
}

Widget03.propTypes = propTypes;
Widget03.defaultProps = defaultProps;

export default Widget03;
