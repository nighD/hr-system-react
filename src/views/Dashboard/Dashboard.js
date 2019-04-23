import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { compose } from 'recompose';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { withAuthorization, withEmailVerification } from '../../containers/Session';
import * as ROLES from '../../constants/roles';
import { withFirebase } from '../../containers/Firebase';
import { AuthUserContext } from '../../containers/Session';
import * as ROUTES from '../../routes';
import UserPage from '../Employee/personalInfoView/employeeDetailView';
const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

// Card Chart 1
class Dashboard extends Component {
  constructor(props) {
    super(props);

  

  }

 

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    console.log(this.props.firebase);
    const authUser0 = JSON.parse(localStorage.getItem('authUser'));
    console.log(JSON.parse(localStorage.getItem('authUser')).roles.ADMIN);
    return (
      <AuthUserContext.Consumer>
      {authUser =>
      <div>
      {
        !authUser0.roles.ADMIN[ROLES.ADMIN] && (
          console.log(authUser),
          console.log("admin"),
          <UserPage/>
        )
      }
      {  
        !!authUser0.roles.ADMIN[ROLES.ADMIN] && (
          console.log("Employee"),
          <UserPage/>
        )
      }
      </div>
      }
      </AuthUserContext.Consumer>
    );
  }
}
const condition = authUser => !!authUser;
// export default Dashboard;
export default compose(
  withFirebase,
  withAuthorization(withEmailVerification,condition),
)(Dashboard);