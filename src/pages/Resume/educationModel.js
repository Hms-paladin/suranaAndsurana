import react, { useState, useEffect } from 'react';
import './resume.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from "../../component/Butttons/button";
import { message } from 'antd';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import { InesertResume } from "../../actions/ResumeAction"
import { getQualification } from '../../actions/MasterDropdowns';



function EducationModel(props) {

    const dispatch = useDispatch()
    const [qualificationList, setQualificationList] = useState([])
  
    const [Education_Form, setEducationForm] = useState({

        basicQualification: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        institution: {
            value: "",
            validation: [{ "name": "required" },{ "name": "alphabetwithspace" },{ "name": "50Char" }],
            error: null,
            errmsg: null,
        },
        yearpassing: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        percentage: {
            value: "",
            validation: [{ "name": "required" },{ "name": "PercentageCGPA" }],
            error: null,
            errmsg: null,
        },


    })

   

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(Education_Form);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Education_Form[targetkeys[i]].value,
                Education_Form[targetkeys[i]].validation
            );
            Education_Form[targetkeys[i]].error = !errorcheck.state;
            Education_Form[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Education_Form[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => Education_Form[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setEducationForm({ error: true });
        } else {
            // setEducationForm({ error: false });

            props.addEducations(Education_Form)
            handleCancel()
        }

        setEducationForm(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "basicQualification", "institution", "yearpassing", "percentage",
        ]

        ResumeFrom_key.map((data) => {
            Education_Form[data].value = ""
        })
        setEducationForm(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Education_Form[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Education_Form[key].validation
        }

        setEducationForm(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };

    useEffect(() => {
        dispatch(getQualification())
    }, [])

    useEffect(() => {
        console.log(props.getOptions, "getOptions")

        const qualificationList = []

        props.getOptions && props.getOptions.map((data, index) => {
            qualificationList.push({ value: data.qual_name, id: data.qualification_id })
        })

        setQualificationList(qualificationList)

    }, [props.getOptions])

    return (
        <div className="educationModelContainer" >
            <Labelbox type="select" placeholder="Qualification"
                changeData={(data) => checkValidation(data, "basicQualification")}
                dropdown={qualificationList}
                value={Education_Form.basicQualification.value}
                error={Education_Form.basicQualification.error}
                errmsg={Education_Form.basicQualification.errmsg} />

            <Labelbox type="text" placeholder="Insitution/University"
                changeData={(data) => checkValidation(data, "institution")}
                value={Education_Form.institution.value}
                error={Education_Form.institution.error}
                errmsg={Education_Form.institution.errmsg} />

            <Labelbox type="datepicker" placeholder="Year of Passing"
                changeData={(data) => checkValidation(data, "yearpassing")}
                value={Education_Form.yearpassing.value}
                error={Education_Form.yearpassing.error}
                errmsg={Education_Form.yearpassing.errmsg} />

            <Labelbox type="text" placeholder="Percentage/CGPA"
                changeData={(data) => checkValidation(data, "percentage")}
                value={Education_Form.percentage.value}
                error={Education_Form.percentage.error}
                errmsg={Education_Form.percentage.errmsg} />

            <CustomButton btnName={"Save"} btnCustomColor="customPrimary" onBtnClick={onSubmit} />
        </div>
    )
}

const mapStateToProps = state => ({
    getOptions: state.getOptions.getQualification
})

export default connect(mapStateToProps)(EducationModel);