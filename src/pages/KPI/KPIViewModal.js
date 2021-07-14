import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';

import ValidationLibrary from "../../helpers/validationfunction";
import DynModel from "../../component/Model/model";
import PlusIcon from "../../images/plusIcon.svg";
import EditIcon from "../../images/edit.svg";
import { useDispatch,connect } from 'react-redux';
import {GetKpiAchivement} from '../../actions/KPIActions'
import {getEmployeeList,getSubordinate} from '../../actions/MasterDropdowns'
import NoDataFound from '../../images/noDatas.svg';
function KPIModal(props) {
    let dispatch=useDispatch()
    const [EmployeeList,setEmployeeList]=useState("")
    const [search,setSearch]=useState(false)
    const [empId,setempId]=useState(localStorage.getItem("empId"))
    const [Achivement,setAchivement]=useState("")
    const [achiveTotal,setachiveTotal]=useState("0")
    const [percentageTotal,setpercentageTotal]=useState("0")
    const [empty,setempty]=useState(true)
    const [KpiSearch,setKpiSearch]=useState({
        employee: {
            value:"",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        from:{
            value:"",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        to:{
            value:"",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null, 
        }
    })
    function checkValidation(data, key) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            KpiSearch[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: KpiSearch[key].validation,
        };



        setKpiSearch((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }
    useEffect(()=>{
        dispatch(getSubordinate(empId))
    },[empId])
    useEffect(()=>{
        let Employee=[]
        props.EmployeeList.map((data)=>{
            Employee.push({id:data.emp_id,value:data.name})
        })
        setEmployeeList(Employee)
    },[props.EmployeeList])
    useEffect(()=>{
     },[])
    const SearchData=()=>{
        setSearch(true)
        var mainvalue = {};
        var targetkeys = Object.keys(KpiSearch);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                KpiSearch[targetkeys[i]].value,
                KpiSearch[targetkeys[i]].validation
            );
            KpiSearch[targetkeys[i]].error = !errorcheck.state;
            KpiSearch[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = KpiSearch[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => KpiSearch[obj].error == true);

        if (filtererr.length > 0) {
        
        } else{
            dispatch(GetKpiAchivement(KpiSearch,search)).then(()=>{
                // props.closemodal()
             })
        }
      
        setKpiSearch((prevState) => ({
            ...prevState,
        }));
    }
    
     useEffect(()=>{
         let kpiData=[]
         let Achivement=[]
         let percentage=[]
         if(props.Kpiachivement.length>0){
             setempty(false)
         }
         props.Kpiachivement.map((data)=>{
           kpiData.push(data)
           percentage.push(data.kra_percentage)
           Achivement.push(data.achivement)
         })
         setAchivement(kpiData)
         let total=0
      let achive_total=0
      for(let i=0;i<percentage.length;i++){
         total+=percentage[i]
      }
      for(let i=0;i<Achivement.length;i++){
        achive_total+=Achivement[i]
      }

      setachiveTotal(achive_total)
      setpercentageTotal(total)
    },[ props.Kpiachivement])
    console.log("dddd",props.Kpiachivement)
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
                                    changeData={(data) => checkValidation(data, "employee")}
                                    value={KpiSearch.employee.value}
                                    error={KpiSearch.employee.error}
                                    errmsg={KpiSearch.employee.errmsg}
                                />
                            </Grid>
                            <Grid item xs={3} container direction="column">
                                <div className="period"><label >From Period</label></div>
                                <Labelbox
                                    type="datepicker"
                                    // placeholder={"From Period"}
                                    view={["year", "month"]}
                                    format={"MMM-yyyy"}
                                    changeData={(data) => checkValidation(data, "from")}
                                    value={KpiSearch.from.value}
                                    error={KpiSearch.from.error}
                                    errmsg={KpiSearch.from.errmsg}
                                />
                            </Grid>
                            <Grid item xs={3} container direction="column">
                                <div className="period"><label >To Period</label></div>
                                <Labelbox
                                    type="datepicker"
                                    view={["year", "month"]}
                                    format={"MMM-yyyy"}
                                    changeData={(data) => checkValidation(data, "to")}
                                    value={KpiSearch.to.value}
                                    error={KpiSearch.to.error}
                                    errmsg={KpiSearch.to.errmsg}
                                /></Grid>

                            <Grid item xs={3}>

                                <div className="GO_btn" style={{ display: 'flex', padding: "15px" }}>
                                    <CustomButton
                                        btnName={"GO"}
                                        btnCustomColor="customPrimary"
                                        custombtnCSS={"btnUsergroup"}
                                        onBtnClick={SearchData}
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
                       {empty?
                       <div className="nodata_found_div">
                        <div className="nodatafound">
                         <img src={NoDataFound} />
                         <div className="nodatatext">No Data Found</div>
                       </div>
                       </div>
                       :<>
                     {Achivement&&Achivement.map((data,index)=>{
                          let Name=[]
                         Name.push(data.name)
                         let employee=Name[0];
                         console.log("nmae",Name)
                         return(
                        <Grid item xs={12} container direction="row" className="spaceBtGrid kra_table_row" alignItems="center" >
                            <Grid item xs={3}><label className="maintitle"  >{employee}</label></Grid>
                            <Grid item xs={3}><label className="maintitle">{data.activity}</label></Grid>
                            <Grid item xs={3}><label className="maintitle">{data.kra_percentage}</label> </Grid>
                            <Grid item xs={3}> <label className="maintitle">{data.achivement===null?"-":data.achivement}</label></Grid>

                        </Grid>
                        
                      )})}
                        </>
                        }
                        <Grid item xs={12} container direction="row" className="spaceBtGrid kra_table_row" alignItems="center" style={{ backgroundColor: "#D8D8D8" }}>
                            <Grid item xs={3}><label className="maintitle" style={{ color: 'black' }}>Total </label></Grid>
                            <Grid item xs={3}><label className="maintitle" style={{ color: 'black' }}></label></Grid>
                            <Grid item xs={3}><label className="maintitle" style={{ color: 'black' }}>{percentageTotal}</label></Grid>
                            <Grid item xs={3}><label className="maintitle" style={{ color: 'black' }}>{achiveTotal}</label></Grid>
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
    EmployeeList: state.getOptions.getSubordinate,
    Kpiachivement:state.KpiReducer.GetKpi_Achivement
})
export default connect(mapStateToProps)(KPIModal);