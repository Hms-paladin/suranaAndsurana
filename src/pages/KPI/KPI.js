import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table';
import ValidationLibrary from "../../helpers/validationfunction";
import DynModel from "../../component/Model/model";
import './KPI.scss'
import { Checkbox } from 'antd';
import { useDispatch, connect } from "react-redux";
import KPIModal from './KPIViewModal'
import Edit from "../../images/editable.svg";
import {GetKpiAchivement,UpdateKpiAchivement,InsertKpi} from '../../actions/KPIActions'
import SaveIcon from '@material-ui/icons/Save';
import moment from 'moment'
const KPI = (props) => {
    let dispatch=useDispatch()
    const header = [
        // { id: 'table_name', label: 'Table Name' },
        { id: 'activity', label: 'Activity' },
        { id: 'target', label: 'Target %' },
        { id: 'achievement', label: 'Achievement' },
        { id: 'action', label: 'Action' },
    ];
    const [kpimodel, setKpimodel] = useState(false);

    const [saveRights, setSaveRights] = useState([])
    const [viewRights, setViewRights] = useState([])

    const [isLoaded, setIsLoaded] = useState(true);
    const [kpiViewModal, setKpiViewModal] = useState(false)
    const [Achivement,setAchivement]=useState("")
    const [KpiId,setKpiId]=useState("")
    const [EditTrue,setEditTrue]=useState(false)
    const [achiveTotal,setachiveTotal]=useState("0")
    const [percentageTotal,setpercentageTotal]=useState("0")
    const [DataStorage,setDataStorage]=useState({
        from:sessionStorage.getItem("from"),
        to: sessionStorage.getItem("to")
    })

    const [KpiData,setkpiData]=useState("")
    const [kpi_form, setKpi_form] = useState({

        achivements: {
            value: "",
            validation: [{ name: "required" }, { name: "allowNumaricOnly1" }],
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
           "KPI - Save" == val.control 
       ) 
      })
      setSaveRights(data_res_id)

      data_res_id = props.UserPermission.find((val) => { 
        return (
            "KPI - View KPI" == val.control 
        ) 
       })
       setViewRights(data_res_id)
   }
  
   }, [props.UserPermission]);
  

  /////////////

  useEffect(()=>{
     dispatch(GetKpiAchivement(DataStorage)).then(()=>{
        sessionStorage.clear();
     })
  },[])

  useEffect(()=>{
      let kpiData=[]
      let Achivement=["0"]
      let percentage=["0"]
      props.Kpiachivement.map((data)=>{
        kpiData.push(data)
        percentage.push(data.kra_percentage)
        Achivement.push(data.achivement)
      })
      setAchivement(kpiData)
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      console.log(Achivement.reduce(reducer),"Total")
      setachiveTotal(Achivement.reduce(reducer))
      setpercentageTotal(percentage.reduce(reducer))
// console.log("Total",Total)

 },[ props.Kpiachivement])
const EditData=(id)=>{
    kpi_form.achivements.value=""
    setKpiId(id)
    setEditTrue(true)
    var KpiData=props.Kpiachivement.find((data)=>{
        return(data.kra_id==id)
    })
    setkpiData(KpiData)
}
const UpdateAchivement=()=>{
    if(EditTrue){
    dispatch(UpdateKpiAchivement(KpiId,kpi_form.achivements.value)).then(()=>{
    setKpiId("")
    kpi_form.achivements.value=""
    })
  }
    setKpi_form((prevState) => ({
        ...prevState,
    }));
}
const Submit =()=>{
    let KpiData=[]
    for(let i=0;i<Achivement.length;i++){
       let Data={
        "kra_id":Achivement[i].kra_id,
        "emp_id":Achivement[i].emp_id,
        "achievement":Achivement[i].achivement,
        "created_on":moment().format("YYYY-MM-DD"),
        "created_by":localStorage.getItem("empId")
       }
       console.log("Achivementlength",Data)
       KpiData.push(Data)

    }
    dispatch(InsertKpi(KpiData)).then(()=>{ 
    })
}
const HandleCancel=()=>{
    setKpiId("")
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
                                <div><label style={{ fontWeight: 'bold', paddingTop: "6px" }}>{JSON.parse(localStorage.getItem("user_name"))}</label></div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="KRAhead"><label >Period</label></div>
                                <div><label style={{ fontWeight: 'bold', paddingTop: "6px" }}>{DataStorage.from} to {DataStorage.to}</label></div>
                            </Grid>
                            <Grid item xs={4}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <CustomButton
                                    btnName={"View KPI"}
                                    btnCustomColor="customPrimary"
                                    custombtnCSS={"btnUsergroup"}
                                    btnDisable={!viewRights||viewRights.display_control&&viewRights.display_control==='N'?true:false}
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

                       {Achivement.length>0&&Achivement.map((data)=>
                        <Grid item xs={12} container direction="row" className="spaceBtGrid" alignItems="center" style={{ borderBottom: " 1px solid lightgray" }}>
                            <Grid item xs={3}><label className="maintitle">{data.activity}</label></Grid>
                            <Grid item xs={3}> <label className="maintitle">{data.kra_percentage}</label></Grid>
                            {KpiId===data.kra_id?<Grid item xs={3}><div style={{ width: '50%',marginLeft:"30px"}}>
                            <Labelbox
                                    type="text"
                                    placeholder={""}
                                    value={35}
                                    changeData={(data) => checkValidation(data, "achivements")}
                                    value={kpi_form.achivements.value}
                                    // error={kpi_form.achivements1.error}
                                    // errmsg={kpi_form.achivements1.errmsg}
                                /></div>
                            </Grid>:
                             <Grid item xs={3}> <label className="maintitle">{data.achivement===null?"-":data.achivement}</label></Grid>}
                            <Grid item xs={3}>
                            {KpiId===data.kra_id?
                                 <SaveIcon onClick={()=>UpdateAchivement(data.kra_id)} className="save_ic"/>:
                                <img src={Edit} className="editicon" onClick={()=>EditData(data.kra_id)}/>}
                            </Grid>

                        </Grid>
                        )}
                       
                       
                        <Grid item xs={12} container direction="row" className="spaceBtGrid" alignItems="center" style={{ backgroundColor: "#D8D8D8", height: 50 }}>
                            <Grid item xs={3}><label className="maintitle" style={{ color: 'black' }}>Total </label></Grid>
                            <Grid item xs={3}><label className="maintitle" style={{ color: 'black' }}>{percentageTotal}</label> </Grid>
                            <Grid item xs={3}><label className="maintitle" style={{ color: 'black' }}>{achiveTotal}</label></Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>
                    </Grid>
                </div>
                <div className="kpi_btn">
                    <CustomButton
                        btnName={"Save"}
                        btnCustomColor="customPrimary"
                        custombtnCSS={"btnUsergroup"}
                        onBtnClick={Submit}
                        btnDisable={!saveRights||saveRights.display_control&&saveRights.display_control==='N'?true:false}
                    />
                    <CustomButton
                        btnName={"Cancel"}
                        custombtnCSS={"btnUsergroup"}
                        onBtnClick={HandleCancel}
                    />
                </div>
            </div>
            <DynModel modelTitle={"KPI View"} handleChangeModel={kpiViewModal} modalchanges="recruit_modal_css" handleChangeCloseModel={(bln) => setKpiViewModal(bln)} width={900} content={<KPIModal/>} />
        </div>
    )
}

const mapStateToProps = (state) =>
    ({
        UserPermission: state.UserPermissionReducer.getUserPermission,
        Kpiachivement:state.KpiReducer.GetKpi_Achivement
    });
export default connect(mapStateToProps) (KPI);