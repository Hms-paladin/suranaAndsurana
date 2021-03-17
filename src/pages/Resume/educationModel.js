import react,{useState} from 'react';
import './resume.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from "../../component/Butttons/button";
import {message} from 'antd';
import {useDispatch,connect} from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import { InesertResume } from "../../actions/ResumeAction"



function EducationModel(){
    const props = {
        name: 'file',
        action: '//jsonplaceholder.typicode.com/posts/',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const dispatch = useDispatch()


    const [Resume_Form, setResumeFrom] = useState({

        basicQualification: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        institution: {
            value: "",
            validation: [{ "name": "required" },],
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
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        

    })

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(Resume_Form);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Resume_Form[targetkeys[i]].value,
                Resume_Form[targetkeys[i]].validation
            );
            Resume_Form[targetkeys[i]].error = !errorcheck.state;
            Resume_Form[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Resume_Form[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => Resume_Form[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
        } else {
            // setResumeFrom({ error: false });

            dispatch(InesertResume(Resume_Form)).then(() => {
                handleCancel()
            })
        }

        setResumeFrom(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "basicQualification", "institution", "yearpassing","percentage",
        ]

        ResumeFrom_key.map((data) => {
            Resume_Form[data].value = ""
        })
        setResumeFrom(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Resume_Form[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Resume_Form[key].validation
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
    return(
        <div className="educationContainer" >
                <Labelbox type="select" placeholder="Qualification" 
                 changeData={(data) => checkValidation(data, "basicQualification")}
                 value={Resume_Form.basicQualification.value}
                 error={Resume_Form.basicQualification.error}
                 errmsg={Resume_Form.basicQualification.errmsg}/>

                <Labelbox type="text" placeholder="Insitution/University" 
                  changeData={(data) => checkValidation(data, "institution")}
                  value={Resume_Form.institution.value}
                  error={Resume_Form.institution.error}
                  errmsg={Resume_Form.institution.errmsg}/>

                <Labelbox type="datepicker" placeholder="Year of Passing" 
                 changeData={(data) => checkValidation(data, "yearpassing")}
                 value={Resume_Form.yearpassing.value}
                 error={Resume_Form.yearpassing.error}
                 errmsg={Resume_Form.yearpassing.errmsg}/>

                <Labelbox type="text" placeholder="Percentage/CGPA" 
                 changeData={(data) => checkValidation(data, "percentage")}
                 value={Resume_Form.percentage.value}
                 error={Resume_Form.percentage.error}
                 errmsg={Resume_Form.percentage.errmsg}/>

                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" onBtnClick={onSubmit} />
        </div>
    )
}

export default EducationModel