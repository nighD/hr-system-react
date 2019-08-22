import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import {  DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import PropTypes from 'prop-types';
// import Avatar from 'react-avatar';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
// import react from '../../assets/img/brand/react.svg'
import logo from  '../../assets/img/brand/logo1.png'
// import sygnet from '../../assets/img/brand/sygnet.svg'
// import userava from '../../assets/img/user.png'
import captain from '../../assets/img/captain.png';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" style={{ background: `rgb(218, 221, 226)`}} display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 80, height: 80, alt: 'RMIT Logo' }}
          minimized={{ src: logo, width: 50, height: 50, alt: 'RMIT Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none mr-auto" style={{ background: `rgb(218, 221, 226)`}} display="lg" />

        {/* <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem>
        </Nav> */}
        <Nav className="ml-auto "  navbar>
          {/* <NavItem className="d-md-down-none px-3" style={{ background: `rgb(218, 221, 226)`}}>
            <NavLink to="#" className="nav-link"><i className="fa fa-bell" aria-hidden="false"></i></NavLink>
          </NavItem> */}
          <AppHeaderDropdown direction="down" >
            <DropdownToggle nav>
            {/* <Avatar size="40" src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3" round="60%" /> */}
                                  <img
                        alt="..."
                        className="avatar"
                        src={captain}
                      />
              {/* <a className= "icon-user"></a> */}
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user" href="http://localhost:3001/detail"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Change Password</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none"  style={{ background: `rgb(218, 221, 226)`}}/>
        <AppAsideToggler className="d-lg-none" mobile style={{ background: `rgb(218, 221, 226)`}}/>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
