import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';

import EnhancedTable from '../../component/DynTable/table';
import ValidationLibrary from "../../helpers/validationfunction";
import DynModel from "../../component/Model/model";
import './KPI.scss'
import { Checkbox } from 'antd';

const KPI = (props) => {
    const header = [
        // { id: 'table_name', label: 'Table Name' },
        { id: 'activity', label: 'Activity' },
        { id: 'subactivity', label: 'Subactivity' },
        { id: 'target', label: 'Target' },
        { id: 'achievement', label: 'Achievement' },
    ];

    const [kpimodel, setKpimodel] = useState(false);

    const [isLoaded, setIsLoaded] = useState(true);

    const [kpi_form, setKpi_form] = useState({

        achivements: {
            value: "",
            validation: [{ name: "required" },{ name: "allowNumaricOnly1" }],
            error: null,
            errmsg: null,
        },

        achivements1: {
            value: 17,
            validation: [{ name: "required" },{ name: "allowNumaricOnly1" }],
            error: null,
            errmsg: null,
        },
        achivements2: {
            value: 35,
            validation: [{ name: "required" },{ name: "allowNumaricOnly1" }],
            error: null,
            errmsg: null,
        },
        achivements3: {
            value: 40,
            validation: [{ name: "required" },{ name: "allowNumaricOnly1" }],
            error: null,
            errmsg: null,
        },
    });

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
                            <Grid item xs={6}>
                                <div><label style={{ fontSize: 11 }} onClick={() => setKpimodel(true)}>Employee Name</label></div>
                                <div><label style={{ fontWeight: 'bold' }}>Rajesh</label></div>
                            </Grid>
                            <Grid item xs={6}>
                                <div><label style={{ fontSize: 11 }}>Period</label></div>
                                <div><label style={{ fontWeight: 'bold' }}>April 2021 to March 2021</label></div>
                            </Grid>
                        </Grid>


                    </Grid>
                </div>
                <div className="kpi_table">
                    <Grid container >
                        <Grid item xs={12} container direction="row" className="spaceBtGrid kpi_table_header" alignItems="center">
                            <Grid item xs={3}><label className="maintitle">Activity</label></Grid>
                            <Grid item xs={3}> <label className="maintitle">Sub Activity</label> </Grid>
                            <Grid item xs={3}> <label className="maintitle">Target</label></Grid>
                            <Grid item xs={3}><label className="maintitle">Achievement</label></Grid>

                        </Grid>


                        <Grid item xs={12} container direction="row" className="spaceBtGrid" alignItems="center" style={{ borderBottom: " 1px solid lightgray" }}>
                            <Grid item xs={3}><label className="maintitle">Hearing</label></Grid>
                            <Grid item xs={3}><label className="maintitle">In Effective</label></Grid>
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

                        </Grid>
                        <Grid item xs={12} container direction="row" className="spaceBtGrid" alignItems="center" style={{ borderBottom: " 1px solid lightgray" }}>
                            <Grid item xs={3}><label className="maintitle">Documentation</label></Grid>
                            <Grid item xs={3}><label className="maintitle"></label></Grid>
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

                        </Grid>
                        <Grid item xs={12} container direction="row" className="spaceBtGrid" alignItems="center" style={{ borderBottom: " 1px solid lightgray" }}>
                            <Grid item xs={3}> <label className="maintitle">Research</label></Grid>
                            <Grid item xs={3}> <label className="maintitle"></label></Grid>
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

                        </Grid>

                        <Grid item xs={12} container direction="row" className="spaceBtGrid" alignItems="center" style={{ backgroundColor: "#D8D8D8", height: 50 }}>
                            <Grid item xs={3}><label className="maintitle" style={{color:'black'}}>Total </label></Grid>
                            <Grid item xs={3}><label className="maintitle" style={{color:'black'}}></label></Grid>
                            <Grid item xs={3}><label className="maintitle" style={{color:'black'}}></label> </Grid>
                            <Grid item xs={3}><label className="maintitle" style={{color:'black'}}>92</label></Grid>
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
            <DynModel
                modelTitle={"KPI Approval"}
                handleChangeModel={kpimodel}
                handleChangeCloseModel={(bln) => setKpimodel(bln)}
                content={
                        <div>
                            <div className="kpi_sudb">
                                <Grid container spacing={2} className="ratemaster_firstgrid" className="kpi_sub">
                                    <Grid item xs={7} container direction="row" className="spaceBtGrid" alignItems="center">
                                        <Grid item xs={6}>
                                            <div><label style={{ fontSize: 11 }}>Employee Name</label></div>
                                            <div><label style={{ fontWeight: 'bold' }}>Rajesh</label></div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div><label style={{ fontSize: 11 }}>Period</label></div>
                                            <div><label style={{ fontWeight: 'bold' }}>April 2021 to March 2021</label></div>
                                        </Grid>
                                    </Grid>


                                </Grid>
                            </div>
                            <div className="kpi_table">
                                <Grid container >
                                    <Grid item xs={12} container direction="row" className="spaceBtGrid kpi_table_header title_label" alignItems="center">
                                        <Grid item xs={3}><label >Activity</label></Grid>
                                        <Grid item xs={3}> <label >Sub Activity</label> </Grid>
                                        <Grid item xs={3}> <label >Target</label></Grid>
                                        <Grid item xs={3}><label >Achievement</label></Grid>

                                    </Grid>


                                    <Grid item xs={12} container direction="row" className="spaceBtGrid title_label" alignItems="center" style={{ borderBottom: " 1px solid lightgray" }}>
                                        <Grid item xs={3} ><label >Hearing</label></Grid>
                                        <Grid item xs={3} ><label >In Effective</label></Grid>
                                        <Grid item xs={3} > <label >20</label></Grid>
                                        <Grid item xs={3} ><div style={{ width: '70%' }}>
                                            <Labelbox
                                                type="text"
                                                placeholder={""}
                                                value={35}
                                                changeData={(data) => checkValidation(data, "achivements")}
                                                value={kpi_form.achivements.value}
                                                error={kpi_form.achivements.error}
                                                errmsg={kpi_form.achivements.errmsg}
                                            /></div>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={12} container direction="row" className="spaceBtGrid title_label" alignItems="center" style={{ borderBottom: " 1px solid lightgray" }}>
                                        <Grid item xs={3} ><label >Documentation</label></Grid>
                                        <Grid item xs={3} ><label ></label></Grid>
                                        <Grid item xs={3} ><label >40</label> </Grid>
                                        <Grid item xs={3} ><div style={{ width: '70%' }}>
                                            <Labelbox
                                                type="text"
                                                placeholder={""}
                                                value={35}
                                                changeData={(data) => checkValidation(data, "achivements")}
                                                value={kpi_form.achivements.value}
                                                error={kpi_form.achivements.error}
                                                errmsg={kpi_form.achivements.errmsg}
                                            /></div>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={12} container direction="row" className="spaceBtGrid title_label" alignItems="center" style={{ borderBottom: " 1px solid lightgray" }}>
                                        <Grid item xs={3}> <label >Research</label></Grid>
                                        <Grid item xs={3}> <label ></label></Grid>
                                        <Grid item xs={3}><label >40</label> </Grid>
                                        <Grid item xs={3}><div style={{ width: '70%' }}>
                                            <Labelbox
                                                type="text"
                                                placeholder={""}
                                                value={35}
                                                changeData={(data) => checkValidation(data, "achivements")}
                                                value={kpi_form.achivements.value}
                                                error={kpi_form.achivements.error}
                                                errmsg={kpi_form.achivements.errmsg}
                                            /></div>
                                        </Grid>

                                    </Grid>

                                    <Grid item xs={12} container direction="row" className="spaceBtGrid title_label" alignItems="center" style={{ backgroundColor: "#D8D8D8", height: 50 }}>
                                        <Grid item xs={3}><label style={{color:'black'}}>Total </label></Grid>
                                        <Grid item xs={3}><label style={{color:'black'}}></label></Grid>
                                        <Grid item xs={3}><label style={{color:'black'}}></label> </Grid>
                                        <Grid item xs={3}><label style={{color:'black'}}>92</label></Grid>
                                    </Grid>
                                </Grid>
                            </div>

                            <div  style={{marginTop: 20}}>
                                <Grid container >
                                    <Grid item xs={12} container direction="row" className="spaceBtGrid  title_label" alignItems="center">
                                        <Grid item xs={3}><label >Qualification</label></Grid>
                                        <Grid item xs={3}> <label >Achievements</label> </Grid>
                                        <Grid item xs={3}> <label >Seminar</label></Grid>
                                        <Grid item xs={3}><label >Trainings</label></Grid>

                                    </Grid>


                                    <Grid item xs={12} container direction="row" className="spaceBtGrid title_label" alignItems="center" >
                                        <Grid item xs={3}><div style={{ width: '70%', display: 'inline-block' }}>
                                            <Labelbox
                                                type="text"
                                                placeholder={""}
                                                value={35}
                                                changeData={(data) => checkValidation(data, "achivements")}
                                                value={kpi_form.achivements.value}
                                                error={kpi_form.achivements.error}
                                                errmsg={kpi_form.achivements.errmsg}
                                            /></div>
                                        </Grid>
                                        <Grid item xs={3}><div style={{ width: '70%', display: 'inline-block' }}>
                                            <Labelbox
                                                type="text"
                                                placeholder={""}
                                                value={35}
                                                changeData={(data) => checkValidation(data, "achivements")}
                                                value={kpi_form.achivements.value}
                                                error={kpi_form.achivements.error}
                                                errmsg={kpi_form.achivements.errmsg}
                                            /></div>
                                        </Grid>
                                        <Grid item xs={3}><div style={{ width: '70%', display: 'inline-block' }}>
                                            <Labelbox
                                                type="text"
                                                placeholder={""}
                                                value={35}
                                                changeData={(data) => checkValidation(data, "achivements")}
                                                value={kpi_form.achivements.value}
                                                error={kpi_form.achivements.error}
                                                errmsg={kpi_form.achivements.errmsg}
                                            /></div>
                                        </Grid>
                                        <Grid item xs={3}><div style={{ width: '70%', display: 'inline-block' }}>
                                            <Labelbox
                                                type="text"
                                                placeholder={""}
                                                value={35}
                                                changeData={(data) => checkValidation(data, "achivements")}
                                                value={kpi_form.achivements.value}
                                                error={kpi_form.achivements.error}
                                                errmsg={kpi_form.achivements.errmsg}
                                            /></div>
                                        </Grid>

                                    </Grid>

                                </Grid>
                            </div>

                            <div className="kpi_btn">
                                <CustomButton
                                    btnName={"Approve"}
                                    btnCustomColor="customPrimary"
                                    custombtnCSS={"btnUsergroup"}
                                    onBtnClick={()=>setKpimodel(false)}
                                />
                                <CustomButton
                                    btnName={"Return"}
                                    btnCustomColor="customPrimary"
                                    custombtnCSS={"btnUsergroup"}
                                    onBtnClick={()=>setKpimodel(false)}

                                />
                            </div>
                    </div>

                }
                width={700}
            />
        </div>
    )
}


export default (KPI);