import react, { useState } from 'react';
import './litigation.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import { InesertResume } from "../../actions/ResumeAction";
import CustomButton from "../../component/Butttons/button";
import { message } from 'antd';

function AddDataModel() {
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


    const [Litigation_Form, setResumeFrom] = useState({

        interim: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        interimname: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        interimapplicationno: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        interimapplicationdate: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        interimdetails: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },


    })

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

            dispatch(InesertResume(Litigation_Form)).then(() => {
                handleCancel()
            })
        }

        setResumeFrom(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "interim", "interimname", "interimapplicationno","interimapplicationdate","interimdetails"
        ]

        ResumeFrom_key.map((data) => {
            Litigation_Form[data].value = ""
        })
        setResumeFrom(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

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
                    <Labelbox type="select" placeholder={"Interim"}
                        changeData={(data) => checkValidation(data, "interim")}
                        value={Litigation_Form.interim.value}
                        error={Litigation_Form.interim.error}
                        errmsg={Litigation_Form.interim.errmsg} />

                    <Labelbox type="text" placeholder={"Interim Name"}
                        changeData={(data) => checkValidation(data, "interimname")}
                        value={Litigation_Form.interimname.value}
                        error={Litigation_Form.interimname.error}
                        errmsg={Litigation_Form.interimname.errmsg} />

                    <Labelbox type="number" placeholder={"Interim Application No"}
                        changeData={(data) => checkValidation(data, "interimapplicationno")}
                        value={Litigation_Form.interimapplicationno.value}
                        error={Litigation_Form.interimapplicationno.error}
                        errmsg={Litigation_Form.interimapplicationno.errmsg} />

                    <Labelbox type="text" placeholder={"Interim Application Date"}
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
                    <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} />

                </div>


            </Grid>

        </div>
    )
}
export default AddDataModel;