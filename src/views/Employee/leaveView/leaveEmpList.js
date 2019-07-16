import React, { Component } from 'react';
import { Badge,
    Card,
    CardBody,
    CardHeader, 
    Col, 
    CardText,
    CardFooter, 
    Row, 
    Table, 
    Pagination, 
    PaginationItem, 
    PaginationLink,
    Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader,    
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Button  } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import * as actionService from '../../../services/actionService';
import { MDBDataTable,MDBBtn,MDBTableHead,MDBTableBody,MDBTable } from 'mdbreact';

var data = {
    columns:[
        {
            label: 'Employee Name',
            field: 'emp_name',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Request Date',
            field: 'reqdate',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Start Date',
            field: 'startdate',
            sort: 'asc',
            width: 100
        },
        {
            label: 'No of Days',
            field: 'nodays',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Status',
            field: 'Status',
            width: 50,
        }

    ],
    rows: [

    ]
}
var colors = {
    all: 'light',
    pending:'light',
    approved: 'light',
    rejected: 'light',
    draft: 'light'
    
}
var formModal = {
    status: false,
    dataModal: []
}
const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: 35,
      width: 350,
    },
    textFull: {
        marginLeft: theme.spacing(1),
        marginRight: 100,
        width: 350
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  }));
  const leave_types = [
    {
      value: 'Casual',
    },
    {
      value: 'Medical',
    },
    {
      value: 'Comp Off',
    },
    {
      value: 'Restricted',
    },
  ];
function FormDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({
        leave_type: 'Casual',
        title: '',
        approver: {
            emp_uid: '',
            emp_name: ''
        },
        add_approver1: {
            emp_uid: [],
            emp_name:[]
        },
        add_approver2: {
            emp_uid: [],
            emp_name:[]
        },
        start_date:'',
        end_date:'',
        notes: ''
      });
    function getApprover(){
        const team_id = JSON.parse(localStorage.getItem('userInfo')).teamid;
        actionService.getTeamManager(team_id).then(res => {
            const data = res.data.data[0];
            console.log("start");
            const a = new Promise((res,rej)=> {
                res(setValues({ ...values, 
                    approver:{
                        emp_name: data.User_Infos[0].emp_fname+ " " + data.User_Infos[0].emp_lname,
                        emp_uid: data.User_Infos[0].emp_uid
                    }
                }));
            })
            // setValues({ ...values, 
            //     approver:{
            //         emp_name: data.User_Infos[0].emp_fname+ " " + data.User_Infos[0].emp_lname,
            //         emp_uid: data.User_Infos[0].emp_uid
            //     }
            // });
            a.then(() => {
                getManagers();
            })
        })
    }
    function getManagers(){
        actionService.getManagers().then(res => {
          const datas = res.data.data;
          var arrays = [];
          datas.map((manager,index)=> {
              console.log(manager.emp_uid);
              console.log(values.approver);
              if (manager.emp_uid !== values.approver.emp_uid){
                arrays.push({
                    emp_name: manager.emp_fname + " " + manager.emp_lname,
                    emp_uid: manager.emp_uid
                })
              }
          })
        })
    }
    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };
    function handleClickOpen() {
      getApprover();
      setOpen(true);
    //   console.log(values.approver);
    }
  
    function handleClose() {
      setOpen(false);
    }
  
    return (
      <div>
        <Pagination size="md">
            <PaginationItem >
                <PaginationLink tag="button" onClick = {handleClickOpen}>
                    + New Request
                </PaginationLink> 
            </PaginationItem>
        </Pagination>
        <Dialog maxWidth= 'lg' open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Request Leave Form</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To request leave form, please enter your detail here. We will send updates.
            </DialogContentText>
            <TextField
              id="leavetype"
              select
              label="Leave Type"
              value={values.leave_type}
              onChange={handleChange('leave_type')}
              className={classes.textFull}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select your leave type"
              margin="normal"
            >
            {leave_types.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.value}
                </MenuItem>
            ))}
            </TextField>
            <TextField
              id="title"
              label="Title"
              value={values.title}
              onChange={handleChange('title')}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="approver"
              label="Approver"
              value={values.approver.emp_name}
              className={classes.textField}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="start_date"
              label="Start Date"
              type= "date"
              value={values.start_date}
              onChange={handleChange('start_date')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <TextField
              id="add_approver1"
              label="Additional Approver 1"
              value={values.add_approver1.emp_name}
              onChange={handleChange('add_approver1')}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="end_date"
              label="End Date"
              type= "date"
              value={values.end_date}
              onChange={handleChange('end_date')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <TextField
              id="add_approver2"
              label="Additional Approver 2"
              value={values.add_approver2.emp_name}
              onChange={handleChange('add_approver2')}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="note"
              label="Notes To Approver"
              multiline
              value={values.notes}
              onChange={handleChange('notes')}
              className={classes.textField}
              margin="normal"
              rows="8"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Save as Draft
            </Button>
            <Button onClick={handleClose} color="primary">
              Submit for Approve
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
class Leave_Emp_List extends Component {
  constructor(props){
    super(props);
    this.state = { teams: [],data,colors,formModal};
    this.checkTable = this.checkTable.bind(this);
    this.getAllLeaves = this.getAllLeaves.bind(this);
    this.viewClick = this.viewClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.viewTeamDetail = this.viewTeamDetail.bind(this);
    this.getLeavesStatus = this.getLeavesStatus.bind(this);
    this.tempCheckTable = this.tempCheckTable.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }
  componentDidMount(){
    this.getAllLeaves();
    this.checkTable(0);
  }
  viewClick = id => {
    console.log(id)
    this.props.history.push({
      pathname: '/teamlist/detail',
      state: {team_id: id}
    })
  }
  editClick = id => {
    console.log(id)
    this.props.history.push({
      pathname:  '/teamlist/edit_detail',
      state: {team_id: id}
    })
  }
  viewTeamDetail = (param,event) => {
    console.log(param);
  };
  getAllLeaves = () => {
    const uid =JSON.parse(localStorage.getItem('authUser')).uid;
    actionService.getEmpLeaveList(uid).then(res => {
      const leaves = res.data.data;
      var leaveArray = [];
      var leaveStatus = [];
      let statusColor;
      leaves.map((leave,index) => {
        switch(leave.status){
          case 'Pending':
            statusColor = (
              <a className="text-warning" onClick ={this.getLeavesStatus.bind(this,'pending')}><b>{leave.status}</b></a>
            );
            break;
          case 'Approved':
            statusColor = (
              <a className="text-success" onClick ={this.getLeavesStatus.bind(this,'approved')}><b>{leave.status}</b></a>
            );
            break;
          case 'Rejected':
            statusColor = (
              <a className="text-danger" onClick ={this.getLeavesStatus.bind(this,'rejected')}><b>{leave.status}</b></a>
            );
            break;
          case 'Draft':
            statusColor = (
              <a className="text-dark" onClick ={this.getLeavesStatus.bind(this,'draft')}><b>{leave.status}</b></a>
            );
            break;
          default:
        }
        leaveArray.push({
          emp_name: leave.emp_name,
          reqdate: leave.requested_date.substring(0,10),
          startdate: leave.start_date.substring(0,10),
          nodays: leave.duration,
          status: statusColor,
        })
        })
      this.setState({leaveList: leaves});
      this.setState(prevState => ({
        data: {
         ...prevState.data,
         rows: leaveArray
        }
      })
      )
    })
  };
  getLeavesStatus =(status) =>{
      let empleaveList = this.state.leaveList;
      let leaveStatus = [];
      let statusColor;
      switch(status){
        case 'Pending':
          statusColor = (
            <a className="text-warning" ><b>{status}</b></a>
          );
          break;
        case 'Approved':
          statusColor = (
            <a className="text-success" ><b>{status}</b></a>
          );
          break;
        case 'Rejected':
          statusColor = (
            <a className="text-danger" ><b>{status}</b></a>
          );
          break;
        case 'Draft':
          statusColor = (
            <a className="text-dark" ><b>{status}</b></a>
          );
          break;
        default:
      }
      empleaveList.map((leave,index)=>{
        if(leave.status === status){
            leaveStatus.push({
                emp_name: leave.emp_name,
                reqdate: leave.requested_date.substring(0,10),
                startdate: leave.start_date.substring(0,10),
                nodays: leave.duration,
                status: statusColor,
              })
        }
      });
      this.setState(prevState => ({
        data: {
         ...prevState.data,
         rows: leaveStatus
        }
      })
      )

  }
  tempCheckTable(a){
    let colors = {
      all: 'light',
      pending:'light',
      approved: 'light',
      rejected: 'light',
      draft: 'light'
    }
    switch(a){
      case 0:
        colors.all = 'danger';
        break;
      case 1:
        colors.draft = 'danger';
        break;
      case 2:
        colors.pending = 'danger';
        break;
      case 3:
        colors.approved = 'danger';
        break;
      case 4:
        colors.rejected = 'danger';
        break;
      default:
    }
    this.setState({colors: colors});
  }
  checkTable(a){
    let colors = {
      all: 'light',
      pending:'light',
      approved: 'light',
      rejected: 'light',
      draft: 'light'
    }
    switch(a){
      case 0:
        colors.all = 'danger';
        this.getAllLeaves();
        break;
      case 1:
        colors.draft = 'danger';
        this.getLeavesStatus('Draft');
        break;
      case 2:
        colors.pending = 'danger';
        this.getLeavesStatus('Pending');
        break;
      case 3:
        colors.approved = 'danger';
        this.getLeavesStatus('Approved');
        break;
      case 4:
        colors.rejected = 'danger';
        this.getLeavesStatus('Rejected');
        break;
      default:
    }
    this.setState({colors: colors});
    console.log(this.state.colors.all);
  }
  toggleForm(event) {
    // console.log(event);
    this.setState({
        formModal: {
            status: !this.state.formModal.status
        }
    })
  }
  render() {
    return (
        <div className="animated fadeIn">
        <Card>
        <CardBody>
        <FormDialog></FormDialog>
        <Row className="align-items-center mt-3">
            <Col col="2" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color={this.state.colors.all} className ="btn-pill" onClick ={this.checkTable.bind(this,0)} >All</Button>
            </Col>
            <Col col="2" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color={this.state.colors.draft} className ="btn-pill" onClick ={this.checkTable.bind(this,1)} >Draft</Button>
            </Col>
            <Col col="2" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color={this.state.colors.pending} className ="btn-pill" onClick ={this.checkTable.bind(this,2)} >Pending</Button>
            </Col>
            <Col col="2" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color={this.state.colors.approved} className ="btn-pill" onClick ={this.checkTable.bind(this,3)} >Approved</Button>
            </Col>
            <Col col="2" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color={this.state.colors.rejected}className ="btn-pill" onClick ={this.checkTable.bind(this,4)} >Rejected</Button>
            </Col>
        </Row>
        <MDBDataTable
            data={this.state.data}
            striped
            borderless
            small
            
        />
        </CardBody>
        </Card>
        </div>
       );
     }
   }
   
   export default Leave_Emp_List;
