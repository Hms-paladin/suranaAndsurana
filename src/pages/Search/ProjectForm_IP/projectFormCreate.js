import react,{useEffect,useState} from 'react';
import './projectFormcreate.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import Axios from 'axios';
import ValidationLibrary from "../../../helpers/validationfunction";
import { apiurl } from "../../../utils/baseUrl";
function ProjectFormCreate(props) {
    const [ProjectType,setProjectType]=useState({})
    const [ProcessType,setProcessType]=useState({})
    const [FillingType,setFillingType]=useState({})
    const [SubType_Project,setSubType_Project]=useState({})
    const [BillableType,setBillableType]=useState({})
    const [projectform, setprojectform] = useState({
        project_type: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        project_sub_type: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        billable_type: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        process_type: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        filling_type: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
    })
    useEffect(() => {

      
    //   project type
        Axios({
            method: "GET",
            url: apiurl + 'get_project_type',
        })
            .then((response) => {
                console.log("response",response)
                SubType_Project_Api()
               let projectTypedata=[]
               response.data.data.map((data)=>
               projectTypedata.push({value:data.project_type,id:data.project_type_id})
               )
            setProjectType({projectTypedata})
            })
            console.log("type",ProjectType)

            // billable type
           Axios({
            method: "GET",
            url: apiurl + 'get_billable_type',
        })
            .then((response) => {
                console.log("response",response)
               let BillableData=[]
               response.data.data.map((data)=>
               BillableData.push({id:data.billable_type_id,value:data.billable_type})
               )
            setBillableType({BillableData})
            })


        // process type
       Axios({
        method: "post",
        url: apiurl + 'get_process_type',
        data:{
            "project_type_id":projectform.project_type.value,
            "sub_project_type_id":projectform.project_sub_type.value
        },
    }).then((response) => {
            console.log("response",response)
            let processData=[]
            response.data.data.map((data)=>
            processData.push({id:data.process_id,value:data.process})
            )
         setProcessType({processData})
         
        })
    const handleCancel = () => {
        let ResumeFrom_key = [
            "process_type", "filling_type"
        ]}

    // Filling Type
    Axios({
        method: "post",
        url: apiurl + 'get_process_type',
        data:{
            "project_type_id":projectform.project_type.value,
            "sub_project_type_id":projectform.project_sub_type.value,
            "process_id":projectform.process_type.value
        },
    }).then((response) => {
            console.log("response",response)
            let fillingData=[]
            response.data.data.map((data)=>
            fillingData.push({id:data.process_id,value:data.process})
            )
         setFillingType({fillingData})
         
        })
        

    })

//    projectSub_type api
     function SubType_Project_Api(data){
        //  alert(data)
        Axios({
            method: "POST",
            url: apiurl + 'get_project_sub_type',
            data:{
                "project_type_id":data
            }
        }).then((response) => {
                console.log("setProjectSubType",response);
               let projectSubTypeValue=[];
               response.data.data.map((data)=>
               projectSubTypeValue.push({value:data.sub_project_type,id:data.sub_project_type_id})
               )
            setSubType_Project({projectSubTypeValue})
            })

     }

    function checkValidation(data, key) {
        if(key==="project_type"){
            SubType_Project_Api(data)
        }
       
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            projectform[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: projectform[key].validation
        }
   
        // // only for multi select (start)

        // let multipleIdList = []

        // if (multipleId) {
        //     multipleId.map((item) => {
        //         for (let i = 0; i < data.length; i++) {
        //             if (data[i] === item.value) {
        //                 multipleIdList.push(item.id)
        //             }
        //         }
        //     })
        //     dynObj.valueById = multipleIdList.toString()
        // }
        // // (end)

      
        setprojectform(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    };

    function onSubmit() {

        var mainvalue = {};
        var targetkeys = Object.keys(projectform);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                projectform[targetkeys[i]].value,
                projectform[targetkeys[i]].validation
            );
            projectform[targetkeys[i]].error = !errorcheck.state;
            projectform[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = projectform[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => projectform[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setpostData({ error: true });
        } else {
            // setpostData({ error: false });


        }


        projectform(prevState => ({
            ...prevState
        }));
    };


    return (
        <div>
            <Grid item xs={12} className="projectFormTitle">Project Form</Grid>
            <div className="projectFormContent">

                <Grid item xs={12} container direction="row" justify="center" spacing={3}>
                    <Grid item xs={5} >
                        <Labelbox type="select"
                            placeholder={"Client"}


                        />
                    </Grid>
                    <Grid item xs={5} >
                        <Labelbox type="select"
                            placeholder={"Project Name "}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Labelbox type="select"
                            placeholder={"Project Type "}
                            dropdown={[{ id: "1", value: "Application" }, { id: "2", value: "Rectification" }, { id: "3", value: "Cancellation" }, { id: "4", value: "Opposition" }]}
                            changeData={(data) => checkValidation(data, "process_type")}
                            value={projectform.process_type.value}
                            error={projectform.process_type.error}
                            errmsg={projectform.process_type.errmsg}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Labelbox type="select"
                            placeholder={"Project Sub Type "}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Labelbox type="select"
                            placeholder={"Process Type"}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Labelbox type="select"
                            placeholder={"Filling Type "}
                            dropdown={projectform.process_type.value == 1 ? [{ id: "1", value: "IndiaFilling" }, { id: "2", value: "InternationalFilling" }, { id: "3", value: "Domestic" }, { id: "4", value: "Foreign" }, { id: "5", value: "PCT" }]
                                : [{ id: "1", value: "Filed" }, { id: "2", value: "Defended" }]}
                            changeData={(data) => checkValidation(data, "filling_type")}
                            value={projectform.filling_type.value}
                            error={projectform.filling_type.error}
                            errmsg={projectform.filling_type.errmsg}



                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Labelbox type="select"
                            placeholder={" billable Type "}


                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Labelbox type="select"
                            placeholder={"HOD/Attorney "}


                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Labelbox type="select"
                            placeholder={"Councel "}
                            
                        />
                    </Grid>
                   
                    <Grid item xs={5}>
                        <div className="projectTestArea">
                            <Labelbox type="textarea"
                                placeholder={"Comments"}

                            />
                        </div>
                    </Grid>




                </Grid>
               
            </div>
            <div className="customFormbtn">
                <CustomButton btnName={"SAVE "} btnCustomColor="customPrimary" custombtnCSS={"btnProjectForm"} onBtnClick={onSubmit} />
                <CustomButton btnName={"CANCEL "} custombtnCSS={"btnProjectForm"} />

            </div>
        </div>
    )
}
export default ProjectFormCreate;