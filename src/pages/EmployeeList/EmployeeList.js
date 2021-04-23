import React from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './EmployeeList.scss'
import EnhancedTable from '../../component/DynTable/table'
export default function EmployeeList(props){
    const header = [
        { id: 'emp_code', label: 'Employee Code' },
        { id: 'emp_name', label: 'Employee Name' },
        { id: 'gender', label: 'Gender' },
        { id: 'designation', label: 'Designation' },
        { id: 'dept', label: 'Department' },
        { id: 'dob', label: 'DOB' },
        { id: 'doj', label: 'DOJ' },
        { id: 'exp', label: <div style={{lineHeight:"1.5",marginTop:"15px"}}><div>Experience</div>
        <div style={{fontSize:"10px"}}>(No.of Years)</div></div> },
        { id: 'sup', label: 'Supervisor' },
      ];
            
const rows = [
    {emp_code:'Field1', emp_name:<a className="link_tag">Field2</a>,gender:'Field3',designation:'Field4',dept:'Field5',dob:'Field6',doj:'Field7',exp:'Field8',sup:'Field9'},
    {emp_code:'Field1', emp_name:<a className="link_tag">Field2</a>,gender:'Field3',designation:'Field4',dept:'Field5',dob:'Field6',doj:'Field7',exp:'Field8',sup:'Field9'},
    {emp_code:'Field1', emp_name:<a className="link_tag">Field2</a>,gender:'Field3',designation:'Field4',dept:'Field5',dob:'Field6',doj:'Field7',exp:'Field8',sup:'Field9'},
    {emp_code:'Field1', emp_name:<a className="link_tag">Field2</a>,gender:'Field3',designation:'Field4',dept:'Field5',dob:'Field6',doj:'Field7',exp:'Field8',sup:'Field9'},
    {emp_code:'Field1', emp_name:<a className="link_tag">Field2</a>,gender:'Field3',designation:'Field4',dept:'Field5',dob:'Field6',doj:'Field7',exp:'Field8',sup:'Field9'},
    {emp_code:'Field1', emp_name:<a className="link_tag">Field2</a>,gender:'Field3',designation:'Field4',dept:'Field5',dob:'Field6',doj:'Field7',exp:'Field8',sup:'Field9'},
    {emp_code:'Field1', emp_name:<a className="link_tag">Field2</a>,gender:'Field3',designation:'Field4',dept:'Field5',dob:'Field6',doj:'Field7',exp:'Field8',sup:'Field9'},
    {emp_code:'Field1', emp_name:<a className="link_tag">Field2</a>,gender:'Field3',designation:'Field4',dept:'Field5',dob:'Field6',doj:'Field7',exp:'Field8',sup:'Field9'},
    {emp_code:'Field1', emp_name:<a className="link_tag">Field2</a>,gender:'Field3',designation:'Field4',dept:'Field5',dob:'Field6',doj:'Field7',exp:'Field8',sup:'Field9'},
    {emp_code:'Field1', emp_name:<a className="link_tag">Field2</a>,gender:'Field3',designation:'Field4',dept:'Field5',dob:'Field6',doj:'Field7',exp:'Field8',sup:'Field9'},
    
    
   
];

    return(
        <div>
                <div className="emp_master_h">Employee List</div>
                <Grid container spacing={2} className="emp_grid_cont">
                <Grid item xs={12} container direction="row" alignItems="center" spacing={2} className="emp_item_grid">
                    <Grid item xs={2}>
                    <Labelbox type="select" placeholder={"Employee Code"}/>
                    </Grid>
                    <Grid item xs={2}>
                    <Labelbox type="select" placeholder={"Designation"}/>
                    </Grid>
                    <Grid item xs={2}>
                    <Labelbox type="select" placeholder={"Department"}/>
                    </Grid>
                    <Grid item xs={2}>
                    <CustomButton btnName={"Go"} btnCustomColor="customPrimary" 
                    custombtnCSS={"emp_btn_css"} onBtnClick={""}
                   />
                    </Grid>
                </Grid>
                </Grid>
                <EnhancedTable headCells={header}
              rows={rows} />
        </div>
    )
}