import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';

import ValidationLibrary from "../../helpers/validationfunction";
import DynModel from "../../component/Model/model";
import PlusIcon from "../../images/plusIcon.svg";
import EditIcon from "../../images/edit.svg";
import { useDispatch,connect } from 'react-redux';
import {getEmployeeList} from '../../actions/MasterDropdowns'
function KPIModal(props) {
    let dispatch=useDispatch()
    const [EmployeeList,setEmployeeList]=useState("")
    useEffect(()=>{
        dispatch(getEmployeeList())
    },[])
    useEffect(()=>{
        let Employee=[]
        props.EmployeeList.map((data)=>{
            Employee.push({id:data.emp_id,value:data.name})
        })
        setEmployeeList(Employee)
    },[props.EmployeeList])

    return (
        <div>
            <div className="kra_main">
                <div >
                    <Grid container className="kra_sub">
                        <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            className="spaceBtGrid"
                            alignItems="center"
                            style={{ padding: 10 }}
                            spacing={2}
                        >
                            <Grid item xs={3}>
                                <div className="KRAhead"><label onClick="">Employee Name</label></div>
                                <Labelbox
                                    type="select"
                                    dropdown={EmployeeList}
                                />
                            </Grid>
                            <Grid item xs={3} container direction="column">
                                <div className="period"><label >From Period</label></div>
                                <Labelbox
                                    type="datepicker"
                                    placeholder={"From Period"}
                                    view={["year", "month"]}
                                    format={"mmm/yyyy"}
                                />
                            </Grid>
                            <Grid item xs={3} container direction="column">
                                <div className="period"><label >To Period</label></div>
                                <Labelbox
                                    type="datepicker"
                                    placeholder={"to Period"}
                                    view={["year", "month"]}
                                    format={"mmm/yyyy"}
                                /></Grid>

                            <Grid item xs={3}>

                                <div className="GO_btn" style={{ display: 'flex', padding: "15px" }}>
                                    <CustomButton
                                        btnName={"GO"}
                                        btnCustomColor="customPrimary"
                                        custombtnCSS={"btnUsergroup"}
                                    />
                                </div>
                            </Grid>
                        </Grid>


                    </Grid>
                </div>

                <div className="kpi_table">
                    <Grid container >
                        <Grid item xs={12} container direction="row" className="spaceBtGrid kra_table_row kra_table_header" alignItems="center" style={{ height: 45 }}>
                            <Grid item xs={3}><label className="maintitle" style={{ color: "#0f0fab" }}>Employee</label></Grid>
                            <Grid item xs={3}> <label className="maintitle" style={{ color: "#0f0fab" }}>Activity</label> </Grid>
                            <Grid item xs={3}><label className="maintitle" style={{ color: "#0f0fab" }}>Target %</label></Grid>
                            <Grid item xs={3}><label className="maintitle" style={{ color: "#0f0fab" }}>Achievement</label></Grid>


                        </Grid>


                     
                        <Grid item xs={12} container direction="row" className="spaceBtGrid kra_table_row" alignItems="center" >
                            <Grid item xs={3}><label className="maintitle"></label></Grid>
                            <Grid item xs={3}><label className="maintitle">Documentation</label></Grid>
                            <Grid item xs={3}><label className="maintitle">40</label> </Grid>
                            <Grid item xs={3}> <label className="maintitle">35</label></Grid>

                        </Grid>
                      

                        <Grid item xs={12} container direction="row" className="spaceBtGrid kra_table_row" alignItems="center" style={{ backgroundColor: "#D8D8D8" }}>
                            <Grid item xs={3}><label className="maintitle" style={{ color: 'black' }}>Total </label></Grid>
                            <Grid item xs={3}><label className="maintitle" style={{ color: 'black' }}></label></Grid>
                            <Grid item xs={3}><label className="maintitle" style={{ color: 'black' }}>100</label></Grid>
                            <Grid item xs={3}><label className="maintitle" style={{ color: 'black' }}>83</label></Grid>
                        </Grid>
                    </Grid>
                </div>

                {/* <div className="kpi_btn">
                    <CustomButton
                        btnName={"Save"}
                        btnCustomColor="customPrimary"
                        custombtnCSS={"btnUsergroup"}

                    />
                    <CustomButton
                        btnName={"Cancel"}
                        custombtnCSS={"btnUsergroup"}

                    />
                </div> */}

            </div>
        </div>
    )
}
const mapStateToProps=(state)=>({
    EmployeeList: state.getOptions.getEmployeeList,
})
export default connect(mapStateToProps)(KPIModal);