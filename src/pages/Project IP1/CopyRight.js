import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import '../Project IP1/Patent/Patent.scss'
import CustomButton from '../../component/Butttons/button';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Upload } from 'antd';
import PublishIcon from '@material-ui/icons/Publish';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import { InesertResume } from "../../actions/ResumeAction";



export default function CopyRight(props) {

    const dispatch = useDispatch()
    const [copy_Right, setResumeFrom] = useState({

        status: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        work_type: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        reference: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        title: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
    })

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(copy_Right);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                copy_Right[targetkeys[i]].value,
                copy_Right[targetkeys[i]].validation
            );
            copy_Right[targetkeys[i]].error = !errorcheck.state;
            copy_Right[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = copy_Right[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => copy_Right[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
        } else {
            // setResumeFrom({ error: false });

            dispatch(InesertResume(copy_Right)).then(() => {
                handleCancel()
            })
        }

        setResumeFrom(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "mark", "projecttype"
        ]

        ResumeFrom_key.map((data) => {
            copy_Right[data].value = ""
        })
        setResumeFrom(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            copy_Right[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: copy_Right[key].validation
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
            <div className="copyright_div">
                <Labelbox type="text" placeholder={"Title"}
                    changeData={(data) => checkValidation(data, "title")}
                    value={copy_Right.title.value}
                    error={copy_Right.title.error}
                    errmsg={copy_Right.title.errmsg} />

                <Labelbox type="datepicker" placeholder={"Type of work"}
                    changeData={(data) => checkValidation(data, "work_type")}
                    value={copy_Right.work_type.value}
                    error={copy_Right.work_type.error}
                    errmsg={copy_Right.work_type.errmsg} />

                <div className="uploadbox_div"  >
                    <div>
                        <Upload {...props} className="uploadbox_tag"
                            action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                            <div className="upload_file_inside" ><label>Upload Image</label><PublishIcon /></div>
                        </Upload>,
                                     </div>
                </div>
                <Labelbox type="text" placeholder={"Reference"}
                    changeData={(data) => checkValidation(data, "reference")}
                    value={copy_Right.reference.value}
                    error={copy_Right.reference.error}
                    errmsg={copy_Right.reference.errmsg} />

                <Labelbox type="text" placeholder={"Status"}
                    changeData={(data) => checkValidation(data, "status")}
                    value={copy_Right.status.value}
                    error={copy_Right.status.error}
                    errmsg={copy_Right.status.errmsg} />
            </div>
            <Grid item xs={12} container justify="flex-end" className="patent_btns">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save"  onBtnClick={onSubmit}/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
            </Grid>
        </div>
    )
}