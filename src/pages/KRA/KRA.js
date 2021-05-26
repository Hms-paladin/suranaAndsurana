import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import { useDispatch, connect } from "react-redux";
import EnhancedTable from "../../component/DynTable/table";
import ValidationLibrary from "../../helpers/validationfunction";
import DynModel from "../../component/Model/model";
import './KRA.scss'
import PlusIcon from "../../images/plusIcon.svg";
import EditIcon from "../../images/edit.svg";
import { notification } from "antd";
import KRAModal from "./KRAViewModal"
import Edit from "../../images/editable.svg";


const KRA = (props) => {
    const header = [
        // { id: 'table_name', label: 'Table Name' },
        { id: 'activity', label: 'Activity' },
        { id: 'percent', label: 'Percentage' },
        { id: 'action', label: 'Action' },
    ];

    const rows = [
        { activity: "Hearing", percent: "20",action:<img src={Edit} className="editicon"/> },
        { activity: "Documentation", percent: "40",action:<img src={Edit} className="editicon"/> },
        { activity: "Research", percent: "40",action:<img src={Edit} className="editicon"/> },
        { activity: "Total", percent: "100" },
    ]

    const [kramodel, setKramodel] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);

    const [saveRights, setSaveRights] = useState([])
    const [viewRights, setViewRights] = useState([])

    const [kraViewModal, setKraViewModal] = useState(false)
    const [value, setValue] = useState(new Date().getMonth());
    const [kpi_form, setKpi_form] = useState({
            
        activity: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        subactivity: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        percentage: {
            value: "",
            validation: [{ name: "required" }],
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

///***********user permission**********/
useEffect(() => {
    if(props.UserPermission.length>0&&props.UserPermission){
       let data_res_id = props.UserPermission.find((val) => { 
       return (
           "KRA - Save" == val.control 
       ) 
      })
      setSaveRights(data_res_id)

      data_res_id = props.UserPermission.find((val) => { 
        return (
            "KRA - View KRA" == val.control 
        ) 
       })
       setViewRights(data_res_id)
   }
  
   }, [props.UserPermission]);
  
  
    console.log(saveRights,"rights")
  /////////////

    return (
        <div>
            <div className="kra">KRA</div>
            <div className="kra_main">
                <div >
                    {/* <div style={{display:"flex",justifyContent:"right",width:"100%"}}>
                    <CustomButton
                        btnName={"View KRA"}
                        btnCustomColor="customPrimary"
                        custombtnCSS={"btnUsergroup"}

                    /></div> */}
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
                            <Grid item xs={2} style={{ padding: 0 }}>
                                <div className="KRAhead lblemp"><label onClick={() => setKramodel(true)}>Employee Name</label></div>
                                <div className="lblname"><label style={{ fontWeight: 'bold', paddingTop: "6px", position: "relative", top: "-10px" }}>Rajesh</label></div>
                            </Grid>
                            <Grid item xs={4} container direction="row">
                                <div className="KRAhead per_head"><label >From Period</label></div>
                                <div className="KRAhead per_head"><label >To Period</label></div>
                                <div className="period_div">
                                    <Labelbox
                                        type="datepicker"
                                        placeholder={"From Period"}
                                        view={["year", "month"]}
                                        format={"mm/yyyy"}
                                    />
                                    <Labelbox
                                        type="datepicker"
                                        placeholder={"to Period"}
                                        view={["year", "month"]}
                                        format={'mm/yyyy'}
                                    /></div>
                                {/* <div><label style={{ fontWeight: 'bold' ,paddingTop:"6px"}}>April 2021 to March 2021</label></div> */}
                            </Grid>
                            <Grid item xs={2}>
                                <div className="KRAhead"><label style={{ fontSize: 15 }}>Activity</label></div>
                                <div style={{ width: '100%', display: 'inline-block' }}>
                                    <Labelbox
                                        type="select"
                                        placeholder={""}
                                        value={35}
                                        changeData={(data) => checkValidation(data, "activity")}
                                        value={kpi_form.activity.value}
                                        error={kpi_form.activity.error}
                                        errmsg={kpi_form.activity.errmsg}
                                    /></div>
                            </Grid>
                            {/* <Grid item xs={2}>
                            <div className="KRAhead"><label style={{ fontSize: 15 }}>Sub Activity</label></div>
                                <div style={{ width: '100%', display: 'inline-block' }}>
                                <Labelbox
                                    type="select"
                                    placeholder={""}
                                    value={35}
                                    changeData={(data) => checkValidation(data, "subactivity")}
                                    value={kpi_form.subactivity.value}
                                    error={kpi_form.subactivity.error}
                                    errmsg={kpi_form.subactivity.errmsg}
                                /></div>
                            </Grid> */}
                            <Grid item xs={2}>
                                <div className="KRAhead"><label style={{ fontSize: 15 }}>Percentage</label></div>
                                <div style={{ width: '100%', display: 'inline-block' }}>
                                    <Labelbox
                                        type="text"
                                        placeholder={""}
                                        value={35}
                                        changeData={(data) => checkValidation(data, "percentage")}
                                        value={kpi_form.percentage.value}
                                        error={kpi_form.percentage.error}
                                        errmsg={kpi_form.percentage.errmsg}
                                    /></div>
                            </Grid>
                            <Grid item xs={2} container direction="row">
                                <div style={{ display: 'flex', justifyContent: "center", padding: "15px" }}>
                                    <img src={PlusIcon} style={{ cursor: 'pointer', width: 19 }} />
                                </div>
                                <div style={{ display: "flex", justifyContent: "center" }}><CustomButton
                                    btnName={"View KRA"}
                                    btnCustomColor="customPrimary"
                                    custombtnCSS={"btnUsergroup"}
                                    btnDisable={!viewRights||viewRights.display_control&&viewRights.display_control==='N'?true:false}
                                    onBtnClick={() => setKraViewModal(!kraViewModal)}

                                /></div>
                            </Grid>
                        </Grid>


                    </Grid>
                </div>

                {/* <div style={{padding:"10px"}}>
                    <EnhancedTable headCells={header} aligncss="kra_table"
                        rows={rows} />
                </div> */}

                <div className="kpi_table">
                    <Grid container >
                        <Grid item xs={12} container direction="row" className="kra_table_row kra_table_header" alignItems="center" style={{ height: 45 }}>
                            <Grid item xs={4}><label className="maintitle" style={{ color: "#0f0fab" }}>Activity</label></Grid>
                            <Grid item xs={4}><label className="maintitle" style={{ color: "#0f0fab" }}>Percentage</label></Grid>
                            <Grid item xs={4}><label className="maintitle" style={{ color: "#0f0fab" }}>
                                Action</label></Grid>

                        </Grid>
                        <Grid item xs={12} container direction="row" className="kra_table_row" alignItems="center" >
                            <Grid item xs={4}><label className="maintitle">Hearing</label></Grid>
                            <Grid item xs={4}> <label className="maintitle">20</label></Grid>
                            <Grid item xs={4}><img src={Edit} className="editicon"/></Grid>

                        </Grid>
                        <Grid item xs={12} container direction="row" className="kra_table_row" alignItems="center" >
                            <Grid item xs={4}><label className="maintitle">Documentation</label></Grid>
                            <Grid item xs={4}><label className="maintitle">40</label> </Grid>
                            <Grid item xs={4}><img src={Edit} className="editicon"/></Grid>

                        </Grid>
                        <Grid item xs={12} container direction="row" className="kra_table_row" alignItems="center" >
                            <Grid item xs={4}> <label className="maintitle">Research</label></Grid>
                            <Grid item xs={4}><label className="maintitle">40</label> </Grid>
                            <Grid item xs={4}><img src={Edit} className="editicon"/></Grid>

                        </Grid>

                        <Grid item xs={12} container direction="row" className="kra_table_row" alignItems="center" style={{ backgroundColor: "#D8D8D8" }}>
                            <Grid item xs={4}><label className="maintitle" style={{ color: 'black' }}>Total </label></Grid>
                            <Grid item xs={4}><label className="maintitle" style={{ color: 'black' }}>100</label></Grid>
                        </Grid>
                    </Grid>
                </div>

                <div className="kpi_btn">
                    <CustomButton
                        btnName={"Save"}
                        btnCustomColor="customPrimary"
                        custombtnCSS={"btnUsergroup"}
                        btnDisable={!saveRights||saveRights.display_control&&saveRights.display_control==='N'?true:false}
                        onBtnClick={''}    
                    />
                    <CustomButton
                        btnName={"Cancel"}
                        custombtnCSS={"btnUsergroup"}

                    />
                </div>

                <DynModel modelTitle={"KRA View"} handleChangeModel={kraViewModal} modalchanges="recruit_modal_css" handleChangeCloseModel={(bln) => setKraViewModal(bln)} width={900} content={<KRAModal />} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>
    ({
        UserPermission: state.UserPermissionReducer.getUserPermission,
    });
export default connect(mapStateToProps) (KRA);
