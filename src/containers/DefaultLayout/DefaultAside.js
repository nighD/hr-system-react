import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppSwitch } from '@coreui/react'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '1' })}
                     onClick={() => {
                       this.toggle('1');
                     }}>
              <i className="icon-list"></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '2' })}
                     onClick={() => {
                       this.toggle('2');
                     }}>
              <i className="icon-speech"></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '3' })}
                     onClick={() => {
                       this.toggle('3');
                     }}>
              <i className="icon-settings"></i>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <ListGroup className="list-group-accent" tag={'div'}>
              <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Today</ListGroupItem>
              <ListGroupItem action tag="a" href="#" className="list-group-item-accent-warning list-group-item-divider">
                {/* <div className="avatar float-right"> */}
                  {/* <img className="img-avatar" src="assets/img/avatars/7.jpg" alt="admin@bootstrapmaster.com"></img> */}
                {/* </div> */}
                <div>Meeting with <strong>Mr.Quang</strong> </div>
                <small className="text-muted mr-3">
                  <i className="icon-calendar"></i>&nbsp; 2 - 3pm
                </small>
                <small className="text-muted">
                  <i className="icon-location-pin"></i> 2.4.44, RMIT
                </small>
              </ListGroupItem>
              <ListGroupItem action tag="a" href="#" className="list-group-item-accent-info list-group-item-divider">
                {/* <div className="avatar float-right">
                  <img className="img-avatar" src="assets/img/avatars/4.jpg" alt="admin@bootstrapmaster.com"></img>
                </div> */}
                <div>Class <strong>Machine Learning</strong></div>
                <small className="text-muted mr-3">
                  <i className="icon-calendar"></i>&nbsp; 4:30 - 6pm
                </small>
                <small className="text-muted">
                  <i className="icon-location-pin"></i> 2.4.44,RMIT
                </small>
              </ListGroupItem>
              <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Tomorrow</ListGroupItem>
              <ListGroupItem action tag="a" href="#" className="list-group-item-accent-danger list-group-item-divider">
                <div>Capstone project A - <strong>deadline</strong></div>
                <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 12pm</small>
                <small className="text-muted"><i className="icon-home"></i>&nbsp; RMIT Canvas</small>
                {/* <div className="avatars-stack mt-2">
                  <div className="avatar avatar-xs">
                    <img src={'assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </div>
                  <div className="avatar avatar-xs">
                    <img src={'assets/img/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </div>
                  <div className="avatar avatar-xs">
                    <img src={'assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </div>
                  <div className="avatar avatar-xs">
                    <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </div>
                  <div className="avatar avatar-xs">
                    <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </div>
                </div> */}
              </ListGroupItem>
              <ListGroupItem action tag="a" href="#" className="list-group-item-accent-success list-group-item-divider">
                <div><strong>Coffe Shop</strong> Meetup</div>
                <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 3 - 4pm</small>
                <small className="text-muted"><i className="icon-location-pin"></i>&nbsp; RMIT Campus</small>
              </ListGroupItem>
              <ListGroupItem action tag="a" href="#" className="list-group-item-accent-primary list-group-item-divider">
                <div><strong>Team meeting</strong></div>
                <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 4 - 6pm</small>
                <small className="text-muted"><i className="icon-home"></i>&nbsp; RMIT Build 1</small>
                {/* <div className="avatars-stack mt-2">
                  <div className="avatar avatar-xs">
                    <img src={'assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </div>
                  <div className="avatar avatar-xs">
                    <img src={'assets/img/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </div>
                  <div className="avatar avatar-xs">
                    <img src={'assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </div>
                  <div className="avatar avatar-xs">
                    <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </div>
                  <div className="avatar avatar-xs">
                    <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </div>
                  <div className="avatar avatar-xs">
                    <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </div>
                  <div className="avatar avatar-xs">
                    <img src={'assets/img/avatars/8.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </div> */}
                {/* </div> */}
              </ListGroupItem>
            </ListGroup>
          </TabPane>
          <TabPane tabId="2" className="p-3">
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                {/* <div className="avatar">
                  <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-success"></span>
                </div> */}
              </div>
              <div>
                <small className="text-muted">Hung</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Update Design</div>
              <small className="text-muted">Data Model need to be redesigned.
              </small>
            </div>
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                {/* <div className="avatar">
                  <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-success"></span>
                </div> */}
              </div>
              <div>
                <small className="text-muted">Thao Phung</small>
                <small className="text-muted float-right mt-1">6:00 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Study</div>
              <small className="text-muted">Focus ,please. Stop make me laugh!
              </small>
            </div>
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                {/* <div className="avatar">
                  <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-success"></span>
                </div> */}
              </div>
              <div>
                <small className="text-muted">Hoang Vo</small>
                <small className="text-muted float-right mt-1">9:00 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Laugh Out Loud</div>
              <small className="text-muted">This is study time, Bao.
              </small>
            </div>
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                {/* <div className="avatar">
                  <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-success"></span>
                </div> */}
              </div>
              <div>
                <small className="text-muted">Duy Phuong</small>
                <small className="text-muted float-right mt-1">7:00 AM</small>
              </div>
              <div className="text-truncate font-weight-bold">Running</div>
              <small className="text-muted">Where are you, Bao ?
              </small>
            </div>
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                {/* <div className="avatar">
                  <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-success"></span>
                </div> */}
              </div>
              <div>
                <small className="text-muted">Vinh Ngo</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Crush</div>
              <small className="text-muted">I need your advices :(
              </small>
            </div>
          </TabPane>
          <TabPane tabId="3" className="p-3">
            <h6>Settings</h6>

            <div className="aside-options">
              <div className="clearfix mt-4">
                <small><b>Dark Ground</b></small>
                <AppSwitch className={'float-right'} variant={'pill'} label color={'success'}  size={'sm'}/>
              </div>
            </div>

            <div className="aside-options">
              <div className="clearfix mt-3">
                <small><b>Notification</b></small>
                <AppSwitch className={'float-right'} variant={'pill'} label color={'success'} defaultChecked size={'sm'}/>
              </div>
            </div>

            <div className="aside-options">
              <div className="clearfix mt-3">
                <small><b>Alert</b></small>
                <AppSwitch className={'float-right'} variant={'pill'} label color={'success'} defaultChecked size={'sm'}/>
                {/* <div>
                  <small className="text-muted">Option disabled.</small>
                </div> */}
              </div>
            </div>

            <hr />
            {/* <h6>System Utilization</h6>

            <div className="text-uppercase mb-1 mt-4">
              <small><b>CPU Usage</b></small>
            </div>
            <Progress className="progress-xs" color="info" value="25" />
            <small className="text-muted">348 Processes. 1/4 Cores.</small>

            <div className="text-uppercase mb-1 mt-2">
              <small><b>Memory Usage</b></small>
            </div>
            <Progress className="progress-xs" color="warning" value="70" />
            <small className="text-muted">11444GB/16384MB</small>

            <div className="text-uppercase mb-1 mt-2">
              <small><b>SSD 1 Usage</b></small>
            </div>
            <Progress className="progress-xs" color="danger" value="95" />
            <small className="text-muted">243GB/256GB</small>

            <div className="text-uppercase mb-1 mt-2">
              <small><b>SSD 2 Usage</b></small>
            </div>
            <Progress className="progress-xs" color="success" value="10" />
            <small className="text-muted">25GB/256GB</small> */}
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
