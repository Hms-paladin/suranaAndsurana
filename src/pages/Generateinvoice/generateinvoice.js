import React, { useState,useEffect } from 'react';
import './generateinvoice.scss';
import { Grid } from '@material-ui/core';
import CustomButton from "../../component/Butttons/button";
import Labelbox from "../../helpers/labelbox/labelbox";
import EnhancedTable from "../../component/DynTable/table";
import { Checkbox } from 'antd';
import { notification } from "antd";
import { useDispatch, connect } from "react-redux";

function GenerateInvoice(props) {
    const [invoicetable, setInvoivetable] = useState([])


    const headCells = [
        { id: 'projectType', label: 'Project Type' },
        { id: 'projectName', label: 'Project Name' },
        { id: 'billabletype', label: 'Billable Type' },
        { id: 'totalhours', label: 'Total No.Of Hours' },
        { id: 'totalamount', label: 'Total Amount' },
    ];

    const rows = [
        { projectType: "IP Project", projectName: 'Project 1', billabletype: "Client Specific ", totalhours: "20", totalamount: "1000" },
        { projectType: "Corporate Compliance", projectName: 'Project 2', billabletype: "Lumpsum Project", totalhours: "34", totalamount: "2000" },
        { projectType: "Ligation projects", projectName: 'Project 3', billabletype: "Fixed Reatainer", totalhours: "40", totalamount: "3000" },
        { projectType: "Retainer projects", projectName: 'Project 4', billabletype: "Fixed Reatainer with cap", totalhours: "50", totalamount: "4000" },
        { projectType: "Value projects", projectName: 'Project 5', billabletype: "Bilended Rate", totalhours: "60", totalamount: "5000" },
    ];

    const BillableCells = [
        { id: 'billed', label: 'Billed' },
        { id: 'activity', label: 'Activity' },
        { id: 'desription', label: 'Description' },
        { id: 'resource', label: 'Resource' },
        { id: 'acthours', label: 'Actual Hours' },
        { id: 'startdate', label: 'Start Date' },
        { id: 'enddate', label: 'End Date' },
        { id: 'rate', label: 'Rate (Rs)' },
        { id: 'billablehours', label: 'Billable Hours' },
        { id: 'amount', label: 'Amount(Rs)' },
    ];

    const Billablerows = [
        { billed: <Checkbox />, activity: "Opinion Render", desription: "Field 5 ", resource: "Mani", acthours: <input style={{ width: '50px' }} />, startdate: '07-Mar-2021', enddate: '08-Mar-2021', rate: '500', billablehours: <input style={{ width: '50px' }} />, amount: '1000' },
        { billed: <Checkbox />, activity: 'Project 2', desription: "Field 5", resource: "Pradish", acthours: <input style={{ width: '50px' }} />, startdate: '07-Mar-2021', enddate: '08-Mar- 2021', rate: '500', billablehours: <input style={{ width: '50px' }} />, amount: '1000' },
    ];

    const [permission, setPermission] = useState([])

    ///*****user permission**********/
    useEffect(() => {
        if(props.UserPermission.length>0&&props.UserPermission[0].item[0].item){
        let data_res_id = props.UserPermission[0].item[0].item.find((val) => { 
        return (
            "Generate Invoice" == val.screen_name
        ) 
        })
        setPermission(data_res_id)
        if(data_res_id.allow_view==='N')
            rights()
        }
    }, [props.UserPermission]);
/////////////
console.log(props.UserPermission,"props.UserPermission")
    function rights(){
        notification.success({
            message: "You Dont't Have Rights To Access This",
        });
    }
    return (
        <div>
            {/* { permission.allow_view==='Y'&&<div> */}
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Labelbox type="select"
                        placeholder="Client Name"
                    />
                </Grid>

                <Grid item xs={3} >
                    <Labelbox type="datepicker"
                        placeholder="From Date"
                    />
                </Grid>
                <Grid item xs={3} >
                    <Labelbox type="datepicker"
                        placeholder="To date"
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomButton btnName={"Search"} btnCustomColor="customPrimary" custombtnCSS={"goSearchbtn"} />
                </Grid>
            </Grid>
            <div className="generateTable">
                <EnhancedTable headCells={headCells} rows={rows} />
            </div>

            <div>
                <p style={{ color: '#0353A4', marginTop: '20px', marginBottom: '0px' }}>Billable Hours</p>
                <EnhancedTable headCells={BillableCells} rows={Billablerows} />
            </div>
            <div className="btngenerate">
                <CustomButton btnName={"Generate"} btnCustomColor="customPrimary" onBtnClick={permission.allow_add==="Y"?'':rights}/>
            </div>

        {/* </div> } */}

        </div>
    )
}

const mapStateToProps = (state) =>
({
    UserPermission: state.UserPermissionReducer.getUserPermission,
});
export default connect(mapStateToProps) (GenerateInvoice);