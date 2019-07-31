import React from 'react';

export const DASHBOARD = '/dashboard';
export const LOGIN = '/login';
export const SIGN_OUT = '/signout';
export const REGISTER = '/register';
export const DETAIL = '/detail';
export const EDIT_DETAIL = '/edit_detail';
export const CALENDAR = '/calendar';
export const ATT_DETAIL = '/att_detail';
export const LEAVE_DETAIL= '/leave_detail';
// export const LEAVE_REQUEST = '/leave_request';
export const PERFOR_LIST = '/perfor_list';
export const PERFOR_DETAIL = '/perfor_detail';
export const PERFOR_UPDATE = '/perfor_update';
export const PAYROLL_SUM = '/payroll_sum';
export const PAYROLL_DETAIL = '/payroll_detail';
export const PAYROLL_CAL = '/payroll_cal';
// export const RESET_PASSWORD = '/reset_password';
// export const CHANGE_PASSWORD = '/change_password';


const Data_Report = React.lazy(() => import('./views/Admin/Machine_Learning/Model_Test'));
const Data_Visualization = React.lazy(() => import('./views/Admin/DataVisualization/dataReport'));
// const Users = React.lazy(() => import('./views/Users/Users'));
// const User = React.lazy(() => import('./views/Users/User'));
// const Login = React.lazy(() => import('./views/Pages/Login'));
// const Sign_out = React.lazy(() => import('./views/Users/Users'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Detail = React.lazy(() => import('./views/Employee/personalInfoView/employeeDetailView'));
const Edit_detail = React.lazy(() => import('./views/Employee/personalInfoView/employeeEDetailView'));
const Employee_List = React.lazy(() => import('./views/Admin/EmployeeList/employeeListView'));
const Employee_List_Detail = React.lazy(() => import('./views/Admin/EmployeeList/employeeListDetail'));
const Employee_List_EDetail = React.lazy(() => import('./views/Admin/EmployeeList/employeeListEDetail'));
const Team_Detail = React.lazy(() => import('./views/Employee/teamView/teamInfoView'));
const Team_List = React.lazy(() => import('./views/Admin/TeamList/teamListView'));
const Team_List_Detail = React.lazy(() => import('./views/Admin/TeamList/teamListDetail'));
const Team_List_EDetail = React.lazy(() => import('./views/Admin/TeamList/teamListDetail'));
const CalendarView = React.lazy(() => import('./views/Employee/attendanceView/attendanceCalendarView'));
const AdminCalendar = React.lazy(() => import('./views/Admin/CalendarView/calendarView'))
const Att_Detail = React.lazy(() => import('./views/Employee/attendanceView/attendanceDetailView'));
const Leave_List = React.lazy(() => import('./views/Admin/LeaveView/leaveListView'));
const Leave_Emp_List = React.lazy(() => import('./views/Employee/leaveView/leaveEmpList'));
// const Leave_Request = React.lazy(() => import('./views/Employee/leaveView/requestLeaveView'));
const Perfor_List = React.lazy(() => import('./views/Employee/performanceView/performanceListView'));
const Perfor_Detail = React.lazy(() => import('./views/Employee/performanceView/performanceDetailView'));
const Perfor_Update = React.lazy(() => import('./views/Employee/performanceView/performanceUpdateView'));
const Perfor_Admin = React.lazy(() => import('./views/Admin/Performance/performanceView'));
const Payroll_Run = React.lazy(() => import('./views/Admin/Payroll/RunPayRoll/RunPayrollView'));
const Payroll_Detail = React.lazy(() => import('./views/Employee/payrollView/payrollDetailView'));
const Payroll_Cal = React.lazy(() => import('./views/Employee/payrollView/payrollCalculationView'));
// const Data_Report = React.lazy(() => import('./views/Admin/DataVisualization/dataReport'));

// const Reset_Password = React.lazy(() => import('./views/Users/User'));
// const Change_Password = React.lazy(() => import('./views/Users/User'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/data_report', name: 'Dashboard', component: Data_Report },
  { path: '/detail', exact: true,  name: 'User Detail', component: Detail },
  { path: '/edit_detail', exact: true, name: 'Edit User Detail', component: Edit_detail },
  { path: '/calendar', exact: true, name: 'Attendance Calendar', component: CalendarView },
  { path: '/admcalendar', exact: true, name: 'Admin Calendar', component: AdminCalendar },
  { path: '/att_calendar', exact: true, name: 'Attendance Detail', component: Att_Detail },
  { path: '/leave_emp_list', exact: true, name: 'Leave List', component: Leave_Emp_List },
  { path: '/data_visualization', exact: true, name: 'Data Report', component: Data_Visualization },
  { path: '/perfor_list', exact: true, name: 'Performance List', component: Perfor_List },
  { path: '/perfor_detail', exact: true, name: 'Performance Detail', component: Perfor_Detail },
  { path: '/perfor_update', exact: true, name: 'Performance Update', component: Perfor_Update },
  { path: '/perfor_search', exact: true, name: 'Performance Search', component: Perfor_Admin },
  { path: '/run_payroll', exact: true, name: 'Run Payroll', component: Payroll_Run },
  { path: '/payroll_detail', exact: true, name: 'Payroll Detail', component: Payroll_Detail },
  { path: '/payroll_cal', exact: true, name: 'Payroll Calculation', component: Payroll_Cal },
  { path: '/register', exact: true,name: 'Register', component: Register},
  { path: '/teamdetail', exact: true,name: 'Team Detail', component: Team_Detail},
  { path: '/teamlist', exact: true,name: 'Team Detail', component: Team_List},
  { path: '/teamlist/detail', exact: true,name: 'Team Detail', component: Team_List_Detail},
  { path: '/teamlist/edit_detail', exact: true,name: 'Team Detail', component: Team_List_EDetail},
  { path: '/employeelist', exact: true,name: 'Employee List', component: Employee_List},
  { path: '/employeelist/detail', exact: true,name: 'Employee List Detail', component: Employee_List_Detail},
  { path: '/employeelist/edit_detail', exact: true,name: 'Employee List Edit Detail', component: Employee_List_EDetail},
  { path: '/leavelist', exact: true,name: 'Employee Leave List', component: Leave_List},  
];

// const routes = [
//   DASHBOARD = '/dashboard',
//   SIGN_IN = '/signin',
//   SIGN_OUT = '/signout',
//   DETAIL = '/detail',
//   EDIT_DETAIL = '/edit_detail',
//   CALENDAR = '/calendar',
//   ATT_DETAIL = '/att_detail',
//   LEAVE_DETAIL= '/leave_detail',
//   LEAVE_REQUEST = '/leave_request',
//   PERFOR_LIST = '/perfor_list',
//   PERFOR_DETAIL = '/perfor_detail',
//   PERFOR_UPDATE = '/perfor_update',
//   PAYROLL_SUM = '/payroll_sum',
//   PAYROLL_DETAIL = '/payroll_detail',
//   PAYROLL_CAL = '/payroll_cal',
//   RESET_PASSWORD = '/reset_password',
//   CHANGE_PASSWORD = '/change_password',
// ]
export default routes;
