import React, { Component,useState } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, CardText,CardFooter, Row, Table, Pagination, PaginationItem, PaginationLink,    Label } from 'reactstrap';
import * as actionService from '../../../services/actionService';
import { MDBDataTable,MDBBtn,MDBTableHead,MDBTableBody,MDBTable } from 'mdbreact';
import {Button} from 'reactstrap';
import { companies_worked } from '../../../constants/url';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import AsyncSelect from 'react-select/async';
var data = {
    columns:[
        {
            label: 'Goal Name',
            field: 'goal_name',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Progress',
            field: 'progress',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Status',
            field: 'status',
            sort: 'asc',
            width: 100
        },
        {
          label: 'Priority',
          field: 'priority',
          sort: 'asc',
          width: 150
        },
        {
            label: 'Deadline',
            field: 'deadline',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Action',
            field: 'Action',
            width: 50,
        }

    ],
    rows: [

    ]
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
    width: 300,
  },
  textF: {
    marginLeft: theme.spacing(1),
    marginRight: 30,
    width: 245,
  },
  textFull: {
      marginLeft: theme.spacing(1),
      marginRight: 100,
      width: 644
  },
}));
let selectOptionsEmployee = [];
const progress = [
  {
    value: '0%',
  },
  {
    value: '20%',
  },
  {
    value: '40%',
  },
  {
    value: '60%',
  },
  {
    value: '80%',
  },
  {
    value: '100%',
  },
];
const status = [
  {
    value: 'Active',
  },
  {
    value: 'Complete',
  },
];
const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }
async function optionsForEmployee(search) {
    let response = await actionService.findUserByName(search);
    let data = await response.data.data;
    selectOptionsEmployee = []
    data.map((element,index) => {
        let dropDownEle = { label: element.emp_fname + " " + element.emp_lname, value: element.emp_uid };
        selectOptionsEmployee.push(dropDownEle);
    });
    return selectOptionsEmployee;
}
function AsyncMultiEmployee(props) {
    let [inputEmployee,setInputEmployee] = useState(props.inputEmployee);
    const handleInputChange = async (newValue, actionMeta) => {
        await optionsForEmployee();
        const inputEmployee = newValue;
        setInputEmployee({...inputEmployee,inputEmployee });
        props.selectorEmployee(inputEmployee);

        return inputEmployee;
    };
    return (
        <AsyncSelect
          isClearable
          onChange = {handleInputChange}
        //   defaultOptions
          loadOptions={optionsForEmployee}
        //   cacheOptions
        />
      );
}
function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
      goal_name: '',
      status: 'Active',
      criteria: '',
      progress: '',
      priority:'',
      start_date:'',
      deadline:'',
      date_created: '',
      last_modified:''
    });
  function getGoalDetail(){
    actionService.getGoalID(props.id).then((res)=>{
      // console.log(res.data.data);
      const detail = res.data.data[0];
      setValues({...values,
        goal_name: detail.goal_name,
        status: detail.status,
        criteria: detail.criteria,
        progress: detail.progress,
        priority : detail.priority,
        start_date: detail.start_date.substring(0,10),
        deadline: detail.deadline.substring(0,10),
        date_created: detail.createdAt.substring(0,10),
        last_modified: detail.updatedAt.substring(0,10),
      })
    })
  }
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  function handleClickOpen() {
    getGoalDetail();
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function saveUpdate(e){
    e.preventDefault();
    await actionService.updateGoalID(props.id,values).then(()=>{
      console.log(" Update Successful!");
    }).then(()=>{
      props.loadData(props.uid);
    })
    setOpen(false);
  }

  return (
    <div>
      <MDBBtn key = {props.index} onClick={handleClickOpen} size="sm" color="success" className="fa fa-search-plus " style={{marginRight:'0px',marginLeft:'0px'}} >
      </MDBBtn>
      <Dialog maxWidth= 'md' open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Goal Details</DialogTitle>
        <DialogContent>
          <TextField
            id="goal_name"
            label="Goal Name"
            value={values.goal_name}
            onChange={handleChange('goal_name')}
            className={classes.textField}
            margin="normal"
          >
          </TextField>
          <TextField
            id="status"
            select
            label="Status"
            value={values.status}
            onChange={handleChange('status')}
            className={classes.textField}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
          {status.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.value}
                </MenuItem>
            ))}
          </TextField>
          <TextField
            id="criteria"
            label="Criteria"
            value={values.criteria}
            onChange={handleChange('criteria')}
            className={classes.textFull}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
              id="progress"
              select
              label="Progress"
              value={values.progress}
              onChange={handleChange('progress')}
              className={classes.textField}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
            {progress.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.value}
                </MenuItem>
            ))}
          </TextField>
          <TextField
            id="start_date"
            label="Start Date"
            type= "date"
            value={values.start_date}
            onChange={handleChange('start_date')}
            className={classes.textF}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            id="date_created"
            label="Date Created"
            type= "date"
            disabled
            value={values.date_created}
            onChange={handleChange('start_date')}
            className={classes.textF}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            id="priority"
            label="Priority"
            value={values.priority}
            onChange={handleChange('priority')}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="deadline"
            label="Deadline"
            type= "date"
            value={values.deadline}
            onChange={handleChange('deadline')}
            className={classes.textF}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            id="last_modified"
            label="Last Modified"
            type= "date"
            disabled
            value={values.last_modified}
            onChange={handleChange('deadline')}
            className={classes.textF}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={saveUpdate} color="primary">
            Update
          </Button>
          <Button onClick={handleClose} color="primary">
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
class LeaveList extends Component {
  constructor(props){
    super(props);
    this.state = { teams: [],data,formModal,result: false, inputEmployee:[]};
    this.viewClick = this.viewClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.loadData = this.loadData.bind(this);
    this.selectorEmployee = this.selectorEmployee.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  async selectorEmployee(e) {
    await this.setState({inputEmployee:e});
    // console.log(this.state.inputEmployee);
    const input = this.state.inputEmployee;
    if(input != null){
      this.loadData(this.state.inputEmployee.value);
    }
    else {
      this.setState({result:false});
    }
    
  }
  componentDidMount(){
    // this.loadData();
  }
  async loadData(uid){
    let goals = [];
    console.log(uid)
    actionService.getGoalList(uid).then((res)=>{
      const goal_list = res.data.data;
      goal_list.map((value,index)=>{
        const ButtonTable = (
          <div>
            <FormDialog id = {value.id} index = {index} loadData = {this.loadData} uid = {uid}></FormDialog>
          </div>
        );
        let star;
        switch(value.priority){
          case 1:
            star = (
              <div>
                <i className = "fa fa-star"></i>
              </div>
            )
            break;
          case 2:
            star = (
              <div>
                <i className = "fa fa-star"></i>
                <i className = "fa fa-star"></i>
              </div>
            )
            break;
          case 3:
            star = (
              <div>
                <i className = "fa fa-star"></i>
                <i className = "fa fa-star"></i>
                <i className = "fa fa-star"></i>
              </div>
            )
            break;
          case 4:
            star = (
              <div>
                <i className = "fa fa-star"></i>
                <i className = "fa fa-star"></i>
                <i className = "fa fa-star"></i>
                <i className = "fa fa-star"></i>
              </div>
            )
            break;
          case 5:
            star = (
              <div>
                <i className = "fa fa-star"></i>
                <i className = "fa fa-star"></i>
                <i className = "fa fa-star"></i>
                <i className = "fa fa-star"></i>
                <i className = "fa fa-star"></i>
              </div>
            )
            break;
          default:
        }
        goals.push({
          goal_name:value.goal_name,
          progress: value.progress,
          status: value.status,
          priority: star,
          deadline: value.deadline.substring(0,10),
          action: ButtonTable
        })
      })
    }).then((result)=>{
      this.setState(prevState => ({
        data: {
         ...prevState.data,
         rows: goals
        }
      })
      )
    }).then(res => {
      this.setState({result:true})
    })
  }
  viewClick = id => {
    console.log(id)
  }
  editClick = id => {
    console.log(id)
  }
  handleChange= e => {
      console.log(e);
  }
  render() {
    // const classes = useStyles();
    return (
        <div className="animated fadeIn">
        <Card>
        <CardBody>
          <Row  style={{marginBottom: 20}}>
            <Col className = "col-2">
              <Label>Employee</Label>    
            </Col>
            <Col className = "col-5">
              <AsyncMultiEmployee inputEmployee = {this.state.inputEmployee} selectorEmployee = {this.selectorEmployee}/>
            </Col>
          </Row>
       
            { this.state.result ? 
              <MDBDataTable
              data={this.state.data}
              striped
              borderless
              small            
            /> : null }
        </CardBody>
        </Card>
        </div>
       );
     }
   }
   
   export default LeaveList;
