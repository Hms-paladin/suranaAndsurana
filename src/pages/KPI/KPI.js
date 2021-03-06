import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table';
import ValidationLibrary from "../../helpers/validationfunction";
import DynModel from "../../component/Model/model";
import './KPI.scss'
import { Checkbox } from 'antd';
import KPIModal from './KPIViewModal'
import Edit from "../../images/editable.svg";

const KPI = (props) => {
    const header = [
        // { id: 'table_name', label: 'Table Name' },
        { id: 'activity', label: 'Activity' },
        { id: 'target', label: 'Target %' },
        { id: 'achievement', label: 'Achievement' },
        { id: 'action', label: 'Action' },
    ];
    const [kpimodel, setKpimodel] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const [kpiViewModal, setKpiViewModal] = useState(false)

    const [kpi_form, setKpi_form] = useState({

        achivements: {
            value: "",
            validation: [{ name: "required" }, { name: "allowNumaricOnly1" }],
            error: null,
            errmsg: null,
        },

        achivements1: {
            value: 17,
            validation: [{ name: "required" }, { name: "allowNumaricOnly1" }],
            error: null,
            errmsg: null,
        },
        achivements2: {
            value: 35,
            validation: [{ name: "required" }, { name: "allowNumaricOnly1" }],
            error: null,
            errmsg: null,
        },
        achivements3: {
            value: 40,
            validation: [{ name: "required" }, { name: "allowNumaricOnly1" }],
            error: null,
            errmsg: null,
        },
    });

    const rows = [
        { activity: "Hearing", target: "20",achievement: <Labelbox
        type="text"
        placeholder={""}
        value={35}
        changeData={(data) => checkValidation(data, "achivements1")}
        value={kpi_form.achivements1.value}
        error={kpi_form.achivements1.error}
        errmsg={kpi_form.achivements1.errmsg}
    />,action:<img src={Edit} className="editicon"/> },
        { activity: "Documentation", percent: "40",achievement:<Labelbox
        type="text"
        placeholder={""}
        value={35}
        changeData={(data) => checkValidation(data, "achivements2")}
        value={kpi_form.achivements2.value}
        error={kpi_form.achivements2.error}
        errmsg={kpi_form.achivements2.errmsg}
    />,action:<img src={Edit} className="editicon"/> },
        { activity: "Research", percent: "40",acheivements:<Labelbox
        type="text"
        placeholder={""}
        value={35}
        changeData={(data) => checkValidation(data, "achivements3")}
        value={kpi_form.achivements3.value}
        error={kpi_form.achivements3.error}
        errmsg={kpi_form.achivements3.errmsg}
    />,action:<img src={Edit} className="editicon"/> },
        { activity: "Total", percent: "100", acheivements:"920"},
    ]

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            kpi_form[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: kpi_form[key].validation,
        };



        setKpi_form((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }



    return (
        <div>
            <div className="kpi">KPI</div>
            <div className="kpi_main">
                <div className="kpi_sub">
                    <Grid container spacing={2} >
                        <Grid
                            item
                            xs={7}
                            container
                            direction="row"
                            className="spaceBtGrid"
                            alignItems="center"
                        >
                            <Grid item xs={4}>
                                <div className="KRAhead"><label onClick={() => setKpimodel(true)}>Employee Name</label></div>
                                <div><label style={{ fontWeight: 'bold', paddingTop: "6px" }}>Rajesh</label></div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="KRAhead"><label >Period</label></div>
                                <div><label style={{ fontWeight: 'bold', paddingTop: "6px" }}>April 2021 to March 2021</label></div>
                            </Grid>
                            <Grid item xs={4}>
                            <div style={{ display: "flex", justifyContent: "center" }}><CustomButton
                                    btnName={"View KPI"}
                                    btnCustomColor="customPrimary"
                                    custombtnCSS={"btnUsergroup"}
                                    onBtnClick={()=>setKpiViewModal(!kpiViewModal)}

                                /></div>
                            </Grid>
                        </Grid>


                    </Grid>
                </div>
                {/* <div style={{padding:"10px"}} className="kpi_table">
                    <EnhancedTable headCells={header} aligncss="kra_table"
                        rows={rows} />
                </div> */}
                <div className="kpi_table">
                    <Grid container >
                        <Grid item xs={12} container direction="row" className="spaceBtGrid kpi_table_header" alignItems="center">
                            <Grid item xs={3}><label className="maintitle" style={{color:"#0f0fab"}}>Activity</label></Grid>
                            <Grid item xs={3}> <label className="maintitle" style={{color:"#0f0fab"}}>Target %</label></Grid>
                            <Grid item xs={3}><label className="maintitle" style={{color:"#0f0fab"}}>Achievement</label></Grid>
                            <Grid item xs={3}><label className="maintitle" style={{ color: "#0f0fab" }}>
                                Action</label></Grid>

                        </Grid>


                        <Grid item xs={12} container direction="row" className="spaceBtGrid" alignItems="center" style={{ borderBottom: " 1px solid lightgray" }}>
                            <Grid item xs={3}><label className="maintitle">Hearing</label></Grid>
                            <Grid item xs={3}> <label className="maintitle">20</label></Grid>
                            <Grid item xs={3}><div style={{ width: '70%' }}>
                                <Labelbox
                                    type="text"
                                    placeholder={""}
                                    value={35}
                                    changeData={(data) => checkValidation(data, "achivements1")}
                                    value={kpi_form.achivements1.value}
                                    error={kpi_form.achivements1.error}
                                    errmsg={kpi_form.achivements1.errmsg}
                                /></div>
                            </Grid>
                            <Grid item xs={3}><img src={Edit} className="editicon"/></Grid>

                        </Grid>
                        <Grid item xs={12} container direction="row" className="spaceBtGrid" alignItems="center" style={{ borderBottom: " 1px solid lightgray" }}>
                            <Grid item xs={3}><label className="maintitle">Documentation</label></Grid>
                            <Grid item xs={3}><label className="maintitle">40</label> </Grid>
                            <Grid item xs={3}><div style={{ width: '70%' }}>
                                <Labelbox
                                    type="text"
                                    placeholder={""}
                                    value={35}
                                    changeData={(data) => checkValidation(data, "achivements2")}
                                    value={kpi_form.achivements2.value}
                                    error={kpi_form.achivements2.error}
                                    errmsg={kpi_form.achivements2.errmsg}
                                /></div>
                            </Grid>
                            <Grid item xs={3}><img src={Edit} className="editicon"/></Grid>

                        </Grid>
                        <Grid item xs={12} container direction="row" className="spaceBtGrid" alignItems="center" style={{ borderBottom: " 1px solid lightgray" }}>
                            <Grid item xs={3}> <label className="maintitle">Research</label></Grid>
                            <Grid item xs={3}><label className="maintitle">40</label> </Grid>
                            <Grid item xs={3}><div style={{ width: '70%' }}>
                                <Labelbox
                                    type="text"
                                    placeholder={""}
                                    value={35}
                                    changeData={(data) => checkValidation(data, "achivements3")}
                                    value={kpi_form.achivements3.value}
                                    error={kpi_form.achivements3.error}
                                    errmsg={kpi_form.achivements3.errmsg}
                                /></div>
                            </Grid>
                            <Grid item xs={3}><img src={Edit} className="editicon"/></Grid>

                        </Grid>

                        <Grid item xs={12} container direction="row" className="spaceBtGrid" alignItems="center" style={{ backgroundColor: "#D8D8D8", height: 50 }}>
                            <Grid item xs={3}><label className="maintitle" style={{ color: 'black' }}>Total </label></Grid>
                            <Grid item xs={3}><label className="maintitle" style={{ color: 'black' }}>100</label> </Grid>
                            <Grid item xs={3}><label className="maintitle" style={{ color: 'black' }}>92</label></Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>
                    </Grid>
                </div>
                <div className="kpi_btn">
                    <CustomButton
                        btnName={"Save"}
                        btnCustomColor="customPrimary"
                        custombtnCSS={"btnUsergroup"}

                    />
                    <CustomButton
                        btnName={"Cancel"}
                        custombtnCSS={"btnUsergroup"}

                    />
                </div>
            </div>
            <DynModel modelTitle={"KPI View"} handleChangeModel={kpiViewModal} modalchanges="recruit_modal_css" handleChangeCloseModel={(bln) => setKpiViewModal(bln)} width={900} content={<KPIModal />} />
        </div>
    )
}


export default (KPI);