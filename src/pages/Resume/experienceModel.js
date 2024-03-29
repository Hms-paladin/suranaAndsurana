import react, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from "../../component/Butttons/button";
import { message } from 'antd';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import { InesertResume } from "../../actions/ResumeAction"
import Axios from 'axios';
import { apiurl } from "../../utils/baseUrl";
import './resume.scss';
import { getIndustry } from '../../actions/MasterDropdowns';
import moment from "moment";

function ExperienceModel(props) {
// console.log("parentToChild", parentToChild)
    const dispatch = useDispatch()
    const [city, setCity] = useState([])
    const [industryOptions, setIndustryOptions] = useState([])
    const [Experience_Form, setExperienceForm] = useState({

        industry: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        companyname: {
            value: "",
            validation: [{ "name": "required" }, { "name": "50Char" }],
            error: null,
            errmsg: null,
        },
        city: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        department: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }, { "name": "50Char" }],
            error: null,
            errmsg: null,
        },
        designation: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }, { "name": "50Char" }],
            error: null,
            errmsg: null,
        },
        periodfrom: {
            value: '',
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        periodto: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        responsibilities: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
    })

    useEffect(() => {
        handleCancel()
    }, [props.nullFieldValueExp])

    useEffect(() => {

        if(props.editExperiences&&props.editExperiences.length>0){
        
        const industry = props.editExperiences[0]?.type_of_industry;
        const compName = props.editExperiences[0]?.company_name;
        const city = props.editExperiences[0]?.city_id;
        const dept = props.editExperiences[0]?.department;
        const desig = props.editExperiences[0]?.designation;
        const periodFrm = props.editExperiences[0]?.period_from;
        const periodTo = props.editExperiences[0]?.period_to;
        const respons = props.editExperiences[0]?.responsible;

        Experience_Form.industry.value = industry;
        Experience_Form.companyname.value = compName;
        Experience_Form.city.value = Number(city);
        Experience_Form.department.value = dept;
        Experience_Form.designation.value = desig;
        Experience_Form.periodfrom.value = periodFrm;
        Experience_Form.periodto.value = periodTo;
        Experience_Form.responsibilities.value = respons;

        setExperienceForm((prevState) => ({
            ...prevState,
        }));
        }
        // Experience_Form.companyname.value = "compName";
    }, [props.editExperiences, props.editExperienceid]);


//     function updateExperience() {

//         props.EditExperience(Experience_Form, props.editExperienceid);
//         handleCancel()
       
//         props.handleChangeCloseModel()
    
// }



// console.log(props.editExperiences, props.editExperienceid,"editExperienceid")

    useEffect(() => {
        Axios({
            method: "get",
            url: apiurl + "get_s_tbl_m_city",
        }).then((response) => {
            let cityList = [];
            response.data.data.map((data, index) =>
                cityList.push({ value: data.state, id: data.city_id })
            );
            setCity(cityList);
        });

    }, [])

    
    function onSubmit(data) {
        var mainvalue = {};
        var targetkeys = Object.keys(Experience_Form);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Experience_Form[targetkeys[i]].value,
                Experience_Form[targetkeys[i]].validation
            );
            Experience_Form[targetkeys[i]].error = !errorcheck.state;
            Experience_Form[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Experience_Form[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => Experience_Form[obj].error == true
        );
   
        if (filtererr.length > 0) {
            // setExperienceForm({ error: true });
        } else {
            // setExperienceForm({ error: false });
          
            if(data==='Save'){
                props.addExperience(Experience_Form)
            }else{
                props.EditExperience(Experience_Form, props.editExperienceid);
            }
            handleCancel()
            props.handleChangeCloseModel&&props.handleChangeCloseModel()
        }

        setExperienceForm(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "industry", "companyname", "city", "department", "designation", "periodfrom", "periodto", "responsibilities",
        ]

        ResumeFrom_key.map((data) => {
            Experience_Form[data].value = ""
        })
        setExperienceForm(prevState => ({
            ...prevState,
        }));
       
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Experience_Form[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Experience_Form[key].validation
        }
console.log(data,"dddd")
        setExperienceForm(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };

    useEffect(() => {
        dispatch(getIndustry())
    }, [])

    useEffect(() => {
        const industryList = []
        props.getOptions && props.getOptions.map((data, index) => {
            industryList.push({ value: data.industry, id: data.industry_id })
        })
        setIndustryOptions(industryList)
    }, [props.getOptions])

    return (
        <div className="experienceModelContainer">
            <Grid item xs={12} container direction="row" spacing={2}>
                <Grid item xs={6}> <Labelbox type="select" placeholder="Type of Industry"
                    changeData={(data) => checkValidation(data, "industry")}
                    dropdown={industryOptions}
                    value={Experience_Form.industry.value}
                    error={Experience_Form.industry.error}
                    errmsg={Experience_Form.industry.errmsg} />
                </Grid>
                <Grid item xs={6}><Labelbox type="text" placeholder="Company Name"
                    changeData={(data) => checkValidation(data, "companyname")}
                    value={Experience_Form.companyname.value}
                    error={Experience_Form.companyname.error}
                    errmsg={Experience_Form.companyname.errmsg} />
                </Grid>
            </Grid>
            <Grid item xs={12} container direction="row" spacing={2}>
                <Grid item xs={6}> <Labelbox type="select" placeholder="City"
                    changeData={(data) => checkValidation(data, "city")}
                    dropdown={city}
                    value={Experience_Form.city.value}
                    error={Experience_Form.city.error}
                    errmsg={Experience_Form.city.errmsg} />
                </Grid>
            </Grid>
            <Grid item xs={12} container direction="row" spacing={2}>
                <Grid item xs={6}> <Labelbox type="text" placeholder="Department"
                    changeData={(data) => checkValidation(data, "department")}
                    value={Experience_Form.department.value}
                    error={Experience_Form.department.error}
                    errmsg={Experience_Form.department.errmsg} />
                </Grid>
                <Grid item xs={6}><Labelbox type="text" placeholder="Designation"
                    changeData={(data) => checkValidation(data, "designation")}
                    value={Experience_Form.designation.value}
                    error={Experience_Form.designation.error}
                    errmsg={Experience_Form.designation.errmsg} />
                </Grid>

            </Grid>
            <Grid item xs={12} container direction="row" spacing={2}>
                <Grid item xs={6}> <Labelbox type="datepicker" placeholder="Period From"
                    changeData={(data) => checkValidation(data, "periodfrom")}
                     value={Experience_Form.periodfrom.value}
                    error={Experience_Form.periodfrom.error}
                    errmsg={Experience_Form.periodfrom.errmsg}
                    disableFuture={"false"} 
                    />
                </Grid>
                <Grid item xs={6}><Labelbox type="datepicker" placeholder="Period To"
                    changeData={(data) => checkValidation(data, "periodto")}
                    value={Experience_Form.periodto.value}
                    error={Experience_Form.periodto.error}
                    errmsg={Experience_Form.periodto.errmsg}
                    disableFuture={"false"}
                    minDate={Experience_Form.periodfrom.value}
                />
                </Grid>
            </Grid>
            <Grid item xs={12} container direction="row" spacing={2}>

                <Grid item xs={12}>
                    <div className="commentbox"> <Labelbox type="textarea" placeholder="Responsibilities"
                        changeData={(data) => checkValidation(data, "responsibilities")}
                        value={Experience_Form.responsibilities.value}
                        error={Experience_Form.responsibilities.error}
                        errmsg={Experience_Form.responsibilities.errmsg} />
                    </div>
                </Grid>

            </Grid>

            {props.editbtn ? (
                <CustomButton
                    btnName={"Update"}
                    btnCustomColor="customPrimary"
                    onBtnClick={()=>onSubmit('Update')}
                />
            ) : (
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" onBtnClick={()=>onSubmit('Save')} />
            )}

        </div>
    )
}

const mapStateToProps = state => ({
    getOptions: state.getOptions.getIndustry
})

export default connect(mapStateToProps)(ExperienceModel);