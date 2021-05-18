import react, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './EmployeeList.scss'
import EnhancedTable from '../../component/DynTable/table'
import { useDispatch, connect } from "react-redux";
import { getDesignationList, getDepartment} from '../../actions/MasterDropdowns'
import { getEmployeeListSearch,getEmployeeCode} from '../../actions/EmployeeListAction'
import ValidationLibrary from "../../helpers/validationfunction";
import moment from 'moment'
import DynModel from "../../component/Model/model";
import Employeeform from '../Employeeform/employeeform';
import Axios from 'axios';
import { apiurl } from '../../utils/baseUrl'

function EmployeeList(props){
    const dispatch = useDispatch();
    const [getdata, setgetData] = useState([])
    const [dept, setdept] = useState({})
    const [empCode, setEmpCode] = useState({})
    const [employee_List_Data, setEmployee_List_Data] = useState([])
    const [empCodeName, setEmpCodeName] = useState("")

    const [EmployeeFormOpen, setEmployeeFormOpen] = useState(false)
    const [Employee_Data, setEmployee_Data] = useState([])
    const [stateClear, setStateClear] = useState(false)
    const [resume_id, setResume_id] = useState("")

   
    const [EmpList, setEmpList] = useState({
        empcode: {
            value:"",
            validation: [],
            error: null,
            errmsg: null,
        },
        designation: {
            value:"",
            validation: [],
            error: null,
            errmsg: null,
        },
        department: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
})
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
            
//Dropdowns
useEffect(() => {
    dispatch(getDesignationList());
    dispatch(getDepartment());
    dispatch(getEmployeeCode());
}, [])

  //SETDropdowns 
  useEffect(() => {
    let Designation = [];
    props.getDesignationList.map((data, index) =>
        Designation.push({ id: data.designation_id, value: data.designation })
    );
    setgetData({ Designation });

    let Department = [];
    props.getDepartment.map((data, index) =>
        Department.push({ id: data.department_id, value: data.department })
    );
    setdept({ Department });

    let EmpCode = [];
    props.getEmployeeCode.map((data, index) =>
    EmpCode.push({ id: data.emp_id, value: data.employee_code })
    );
    setEmpCode({ EmpCode });
  
}, [
    props.getDesignationList,
    props.getDepartment,
    props.getEmployeeCode,
]);

useEffect(() => {

    let employee_list = [];
    
    props.getEmployee_List_Data.map((data,index) => employee_list.push(data));
    var employee_List_Data = [];
    for (var m = 0; m < employee_list.length; m++) {
        const index = m;
      var listarray = {
        employee_code: employee_list[m].employee_code,
        name: <a className="link_tag" onClick={()=>onclickEmpName(employee_list[index])}>{employee_list[m].name}</a>,
        gender: employee_list[m].gender==='F'?'FEMALE':'MALE',
        designation: employee_list[m].designation,
        department: employee_list[m].department,
        dob: <span style={{whiteSpace:'nowrap'}}>{employee_list[m].dob?moment(employee_list[m].dob).format('DD-MMM-YYYY'):'--'}</span>,
        doj: <span style={{whiteSpace:'nowrap'}}>{employee_list[m].doj?moment(employee_list[m].doj).format('DD-MMM-YYYY'):'--'}</span>,
        experience: employee_list[m].experience,
        supervisor_name: employee_list[m].supervisor_name,
   
      };
      employee_List_Data.push(listarray);
    }
    setEmployee_List_Data({ employee_List_Data });
    console.log(employee_List_Data,"getEmployee_List_Data")
   
  }, [props.getEmployee_List_Data])

//   function Sup_nameGetId(data) {
//       try{
//     Axios({
//         method: "post",
//         header: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         },
//         url: apiurl + "get_employee_by_id",
//         data: {
//             "emp_id": data
//         }
//     }).then((response) => {
//         let empData = []
//         response.data.data.map((data, index) =>
//             empData.push(data)
//         )
//         setResume_id(empData[0].resume_id)
//         return Promise.resolve();
//     })
// }catch{

// }
// }

  function checkValidation(data, key) {
    console.log(data, key, "dataValue")

    var errorcheck = ValidationLibrary.checkValidation(
        data,
        EmpList[key].validation
    );
    let dynObj = {
        value: data,
        error: !errorcheck.state,
        errmsg: errorcheck.msg,
        validation: EmpList[key].validation,
    };


    if(key==="empcode"){
            
        let EmpCode = [];
        if(props.getEmployeeCode.length>0){
        props.getEmployeeCode.map((data) => EmpCode.push(data));

        for (var m = 0; m < EmpCode.length; m++) {
            if(EmpCode[m].emp_id===data){
                setEmpCodeName(EmpCode[m].employee_code)
              
            }
           
        }
       
    }
    }
    setEmpList((prevState) => ({
        ...prevState,
        [key]: dynObj,
    }));
}

const onclickEmpName=data=>{
  
    // Sup_nameGetId(data.emp_id)
    setEmployee_Data({int_status_id:data.emp_id})
    setEmployeeFormOpen(true)
}
console.log(resume_id,"resume_id",Employee_Data)
const onNewPageClear = (bln) => {
    // setStateClear(!stateClear);
    // setInerviewScreen(bln);
    setEmployeeFormOpen(bln);

}

function onSubmit() {
dispatch(getEmployeeListSearch(empCodeName,EmpList)).then(() => {

})
   
}
    return(
        <div>
                <div className="emp_master_h">Employee List</div>
                <Grid container spacing={2} className="emp_grid_cont">
                <Grid item xs={12} container direction="row" alignItems="center" spacing={2} className="emp_item_grid">
                    <Grid item xs={2}>
                   
                    <Labelbox type="select" placeholder="Employee Code"
                      dropdown={empCode.EmpCode}
                        changeData={(data) => checkValidation(data,"empcode")}
                        value={EmpList.empcode.value}
                        error={EmpList.empcode.error}
                        errmsg={EmpList.empcode.errmsg}
                    />
                    </Grid>
                    <Grid item xs={2}>
                    <Labelbox type="select" placeholder="Designation"
                       dropdown={getdata.Designation}
                        changeData={(data) => checkValidation(data,"designation")}
                        value={EmpList.designation.value}
                        error={EmpList.designation.error}
                        errmsg={EmpList.designation.errmsg}
                    />
                    </Grid>
                    <Grid item xs={2}>
                   
                    <Labelbox type="select" placeholder="Department"
                        dropdown={dept.Department}
                        changeData={(data) => checkValidation(data,"department")}
                        value={EmpList.department.value}
                        error={EmpList.department.error}
                        errmsg={EmpList.department.errmsg}
                    />
                    </Grid>
                    <Grid item xs={2}>
                    <CustomButton btnName={"Go"} onBtnClick={onSubmit} btnCustomColor="customPrimary" 
                    custombtnCSS={"emp_btn_css"} 
                   />
                    </Grid>
                </Grid>
                </Grid>
                <EnhancedTable headCells={header}
                 rows={employee_List_Data.length == 0 ? employee_List_Data : employee_List_Data.employee_List_Data} 
               />

                {/*EmployeeForm after  selected in interview approve     */}
                <DynModel modelTitle={"Employee Form"} handleChangeModel={EmployeeFormOpen} handleChangeCloseModel={(bln) => onNewPageClear(bln)} width={1100}
                content={<Employeeform closemodal={(bln) => onNewPageClear(bln)} emp_form_id={Employee_Data} stateClear={stateClear} emp_list={true} />} />

        </div>
    )
}

const mapStateToProps = (state) => (
    {
        getDesignationList: state.getOptions.getDesignationList || [],
        getDepartment: state.getOptions.getDepartment || [],
        getEmployeeCode: state.EmployeeListReducer.getEmployeeCode || [],
        getEmployee_List_Data: state.EmployeeListReducer.getEmployeeListSearch || [],
        // getEmployeeDetails: state.CandidateAndEmployeeDetails.getEmployeeDetails || [],
    }
);

export default connect(mapStateToProps)(EmployeeList);