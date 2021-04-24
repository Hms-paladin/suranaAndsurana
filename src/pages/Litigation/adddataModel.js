import react, { useEffect, useState } from 'react';
import './litigation.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import CustomButton from "../../component/Butttons/button";
import { InsertLitigationDetails ,GetLitigation} from '../../actions/Litigation';
import { getLitigationCounsel } from '../../actions/MasterDropdowns';

const AddDataModel=(props)=> {
    const dispatch = useDispatch()                                                                                                                                                  
    const[LitiCounsel,setLitiCounsel] =useState([])
    const[projtId,setProjtId] =useState("")
    const[IteriumModel,setIteriumModel] =useState(false)
    const[LitiID,setLitiID] =useState("")
    const [Litigation_Form, setResumeFrom] = useState({
        counsel: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        name: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        phoneno: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        emailid: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        address: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        interimname: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        interimapplicationno: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        interimapplicationdate: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        interimdetails: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },


    })
   useEffect(() => {
dispatch(getLitigationCounsel())
   }, [])

useEffect(() => {
      setProjtId(props.id.project_id)
}, [props.id])

    useEffect (() => {
    let liti_councel=[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
      props.getLitigationCounsel.map((dat)=>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        liti_councel.push({
            id:dat.liti_councel_id,value:dat.liti_councel
        })
      )
      setLitiCounsel({liti_councel});

    }, [props.getLitigationCounsel])
    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(Litigation_Form);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Litigation_Form[targetkeys[i]].value,
                Litigation_Form[targetkeys[i]].validation
            );
            Litigation_Form[targetkeys[i]].error = !errorcheck.state;
            Litigation_Form[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Litigation_Form[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => Litigation_Form[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
        } else {
            // setResumeFrom({ error: false });

            dispatch(InsertLitigationDetails(Litigation_Form,LitiID)).then(() => {
                handleCancel();
                props.handleChangeCloseModel();
                dispatch(GetLitigation(projtId))

            })
        }

        setResumeFrom(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "counsel", "name", "phoneno","emailid","address","interimname", "interimapplicationno","interimapplicationdate","interimdetails"
        ]

        ResumeFrom_key.map((data) => {
            Litigation_Form[data].value = ""
        })
        setResumeFrom(prevState => ({
            ...prevState,
        }));
    }
useEffect(() => {
    setLitiID(props.Litigation_ID)

}, [props.Litigation_ID])
    function checkValidation(data, key, multipleId) {
   
    if(data && data == 5 && key=="counsel"){
    setIteriumModel(true)
    }else if(data && data!== 5 && key =="counel"){
    setIteriumModel(false)
     }
         
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Litigation_Form[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Litigation_Form[key].validation
        }

        // only for multi select (start)

        let multipleIdList = []

        if (multipleId) {
            multipleId.map((item) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i] === item.value) {
                        multipleIdList.push(item.id)
                    }
                }
            })
            dynObj.valueById = multipleIdList.toString()
        }
        // (end)

        setResumeFrom(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };

    return (
        <div >
            <Grid item xs={12} container direction="column" justify="center" spacing={2} >


                <div className="liticationDetails">
                    <Labelbox type="select" placeholder={"Counsel"}
                      dropdown={LitiCounsel.liti_councel}
                        changeData={(data) => checkValidation(data, "counsel")}
                        value={Litigation_Form.counsel.value}
                        error={Litigation_Form.counsel.error}
                        errmsg={Litigation_Form.counsel.errmsg} />
  { IteriumModel !== true ?
        <>
                    <Labelbox type="text" placeholder={"Name"}
                        changeData={(data) => checkValidation(data, "name")}
                        value={Litigation_Form.name.value}
                        error={Litigation_Form.name.error}
                        errmsg={Litigation_Form.name.errmsg} />

                    <Labelbox type="text" placeholder={"Phone No"}
                        changeData={(data) => checkValidation(data, "phoneno")}
                        value={Litigation_Form.phoneno.value}
                        error={Litigation_Form.phoneno.error}
                        errmsg={Litigation_Form.phoneno.errmsg} />
   


                    <Labelbox type="text" placeholder={"Email Id"}
                        changeData={(data) => checkValidation(data, "emailid")}
                        value={Litigation_Form.emailid.value}
                        error={Litigation_Form.emailid.error}
                        errmsg={Litigation_Form.emailid.errmsg} />
                     
                     <div className="test">
                        <Labelbox type="textarea" placeholder={"Address"}
                            changeData={(data) => checkValidation(data, "address")}
                            value={Litigation_Form.address.value}
                            error={Litigation_Form.address.error}
                            errmsg={Litigation_Form.address.errmsg} />
                    </div>

               
                 </>:<>
                 {console.log("Litigation_Form",Litigation_Form)}
                        <Labelbox type="text" placeholder={"Interim Name"}
                        changeData={(data) => checkValidation(data, "interimname")}
                        value={Litigation_Form.interimname.value}
                        error={Litigation_Form.interimname.error}
                        errmsg={Litigation_Form.interimname.errmsg} />
                        
                        <Labelbox type="text" placeholder={"Interim Application No"}
                        changeData={(data) => checkValidation(data, "interimapplicationno")}
                        value={Litigation_Form.interimapplicationno.value}
                        error={Litigation_Form.interimapplicationno.error}
                        errmsg={Litigation_Form.interimapplicationno.errmsg} />


                    <Labelbox type="datepicker" placeholder={"Interim Application Date"}
                        changeData={(data) => checkValidation(data, "interimapplicationdate")}
                        value={Litigation_Form.interimapplicationdate.value} 
                       
                        error={Litigation_Form.interimapplicationdate.error}
                        errmsg={Litigation_Form.interimapplicationdate.errmsg} />


                    <div className="test">
                        <Labelbox type="textarea" placeholder={"Interim Details"}
                            changeData={(data) => checkValidation(data, "interimdetails")}
                            value={Litigation_Form.interimdetails.value}
                            error={Litigation_Form.interimdetails.error}
                            errmsg={Litigation_Form.interimdetails.errmsg} />
                    </div>
                        </>
                  

                        
    }


            



                

                    <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} />

                </div>


            </Grid>

        </div>
    )
}

const mapStateToProps = (state) => ({

    getLitigationCounsel: state.getOptions.getLitigationCounsel || [],

  });
  
  export default connect(mapStateToProps)(AddDataModel);
