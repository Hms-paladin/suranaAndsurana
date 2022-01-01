import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import '../Patent/Patent.scss'
import CustomButton from '../../../component/Butttons/button';
import Labelbox from "../../../helpers/labelbox/labelbox";
import { Upload, Button } from 'antd';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import { UploadOutlined } from '@ant-design/icons';



const CorporateComplance = (props) => {

    const dispatch = useDispatch()
    const [IdDetails, setIdDetails] = useState({});
    const [fileupload, setFileupload] = useState([]);
    const [Corporate, setCorporate] = useState({

        title: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        type_of_work: {
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
        status: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        upload: {
            value: null,
            error: null,
            errmsg: null,
            disabled: false,
            view_file: null
        },

    })




    const handleChange = (info, uploadName) => {

        if (info.status !== 'error' && info.status !== "uploading") {

            let fileList = [...info.fileList];

            // fileList = fileList.slice(-1);

            fileList = fileList.map(file => {
                if (file.response) {
                    file.url = file.response.url;
                }
                return file;
            });
            setFileupload(fileList);

        }
    };




    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(Corporate);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Corporate[targetkeys[i]].value,
                Corporate[targetkeys[i]].validation
            );
            Corporate[targetkeys[i]].error = !errorcheck.state;
            Corporate[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Corporate[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => Corporate[obj].error == true
        );

        if (filtererr.length > 0) {
            // setCorporate({ error: true });
        } else {
          

        }

        setCorporate(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "type_of_work", "status", "reference", "title"
        ]

        ResumeFrom_key.map((data) => {
            Corporate[data].value = ""
        })
        setCorporate(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Corporate[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Corporate[key].validation
        }

        // only for multi select (start)

        let multipleIdList = []

        if (multipleId) {
            multipleId.length > 0 && multipleId.map((item) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i] === item.value) {
                        multipleIdList.push(item.id)
                    }
                }
            })
            dynObj.valueById = multipleIdList.toString()
        }
        // (end)

        setCorporate(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };


    return (
        <div >

            <div className="CorporateComplance_div">
                <Grid item xs={12} md={12} className="app_cont_domestic">

                    <Grid >
                        <div className="copyFieldheadings">Title</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "title")}
                            value={Corporate.title.value}
                            error={Corporate.title.error}
                            errmsg={Corporate.title.errmsg} />
                    </Grid>

                    {/* <Grid>
                        <div className="copyFieldheadings">Type of work</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "type_of_work")}
                            value={Corporate.type_of_work.value}
                            error={Corporate.type_of_work.error}
                            errmsg={Corporate.type_of_work.errmsg} />
                    </Grid> */}

                    <Grid xs={4}>
                        <div className="Tradeheadings">Upload</div>
                        <Labelbox type="upload"
                            changeData={(data) => checkValidation(data, "upload")}
                            view_file={Corporate.upload.view_file}
                            remove_file={() => (setCorporate(prevState => ({
                                ...prevState,
                                upload: {
                                    value: null, error: Corporate.upload.error, errmsg: Corporate.upload.errmsg, disabled: Corporate.upload.disabled, view_file: null
                                },
                            })))}
                            value={Corporate.upload.value}
                            error={Corporate.upload.error}
                            errmsg={Corporate.upload.errmsg}
                            disabled={Corporate.upload.disabled}
                        />
                    </Grid>


                    {/* <Grid>
                        <div className="copyFieldheadings">Reference</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "reference")}
                            value={Corporate.reference.value}
                            error={Corporate.reference.error}
                            errmsg={Corporate.reference.errmsg} />
                    </Grid> */}

                    {/* <Grid>
                        <div className="copyFieldheadings">Status</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "status")}
                            value={Corporate.status.value}
                            error={Corporate.status.error}
                            errmsg={Corporate.status.errmsg} />
                    </Grid> */}
                </Grid>
            </div>

            <Grid item xs={12} container justify="flex-end" className="patent_btns">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={onSubmit} />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
            </Grid>
        </div>
    );
}

const mapStateToProps = (state) => (
    {
        getCopyRightData: state.copyrightReducer.getCopyRight,
    }
);

export default connect(mapStateToProps)(CorporateComplance);
