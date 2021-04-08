
import react, { useState } from 'react';
// import './trademark.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../../helpers/labelbox/labelbox";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import { InesertResume } from "../../../actions/ResumeAction";
import CustomButton from '../../../component/Butttons/button';
import PublishIcon from '@material-ui/icons/Publish';
import { Upload, message, Button, Icon } from 'antd';

// import Tab icons

import TabsTcons from '../../../component/TradeMarkTabIcons/trademarktabIcons';


function TradeMarkInternational() {

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

    const [Trade_Mark, setResumeFrom] = useState({

        mark: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        associateRefernce: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        ourRefernce: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        applicationdate: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },

        prioritydetails: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        applicationNumber: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        userclaim: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        allotment: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        goodsdescription: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        amendment: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },


    })

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(Trade_Mark);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Trade_Mark[targetkeys[i]].value,
                Trade_Mark[targetkeys[i]].validation
            );
            Trade_Mark[targetkeys[i]].error = !errorcheck.state;
            Trade_Mark[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Trade_Mark[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => Trade_Mark[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
        } else {
            // setResumeFrom({ error: false });

            dispatch(InesertResume(Trade_Mark)).then(() => {
                handleCancel()
            })
        }

        setResumeFrom(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "mark", "projecttype", "goodsdescription", "internalstutus", "basicQualification", "additionalQualification1", "additionalQualification2", "institution", "lastEmployer", "startDate", "endDate", "email1", "email2", "phone1", "phone2", "skills", "Traits", "certifications", "specializations", "talents", "intrests", "contactPhone", "emailId", "mailAddress", "state", "city", "language", "industry"
        ]

        ResumeFrom_key.map((data) => {
            Trade_Mark[data].value = ""
        })
        setResumeFrom(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Trade_Mark[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Trade_Mark[key].validation
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

        // <Grid container direction={"column"}>
        //        <Grid item xs={12} md={12} className="app_cont_domestic">
        //          <Labelbox type="text" placeholder={"Name of Opponent"}/>
        //          <Labelbox type="datepicker" placeholder={"Opposition Filled Date"}/>
        //          <Labelbox type="text" placeholder={"Types of Grant"}/>
        //          <Labelbox type="text" placeholder={"Patent Application Number"}/>
        //          <Labelbox type="text" placeholder={"Patent Title"}/>
        //          <Labelbox type="datepicker" placeholder={"Publication Date"}/>
        //          <Labelbox type="text" placeholder={"Patent Applicant"}/>
        //          <Labelbox type="text" placeholder={"Application Agent"}/>
        //        </Grid>

        //     </Grid>

        <div className="tradeMarkContainer">
            <Grid container direction={"column"}>
                <Grid item xs={12} md={12} className="app_cont_domestic">
                    <Labelbox type="select"
                        placeholder={" Status"} />

                    <Labelbox type="text"
                        placeholder={" Associate Reference"}
                        changeData={(data) => checkValidation(data, "associateRefernce")}
                        value={Trade_Mark.associateRefernce.value}
                        error={Trade_Mark.associateRefernce.error}
                        errmsg={Trade_Mark.associateRefernce.errmsg} />

                    <Labelbox type="text"
                        placeholder={" Our Reference"}
                        changeData={(data) => checkValidation(data, "ourRefernce")}
                        value={Trade_Mark.ourRefernce.value}
                        error={Trade_Mark.ourRefernce.error}
                        errmsg={Trade_Mark.ourRefernce.errmsg} />

                    <Labelbox type="select"
                        placeholder={" Class"} />

                    <Labelbox type="text"
                        placeholder={" Mark"}
                        changeData={(data) => checkValidation(data, "mark")}
                        value={Trade_Mark.mark.value}
                        error={Trade_Mark.mark.error}
                        errmsg={Trade_Mark.mark.errmsg} />
                    {/* <Labelbox> */}
                    <div className="uploadbox">
                        <div style={{ width: "280%" }}>
                            <Upload {...props} className="uploadbox_tag"
                                action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                                <div className="upload_file_inside"><label>Upload Image  </label><PublishIcon /></div>
                            </Upload>,
                            </div>
                    </div>
                    {/* </Labelbox> */}

                    <Labelbox type="text"
                        placeholder={" Associate"} />

                    <Labelbox type="text"
                        placeholder={" Application Number"}
                        changeData={(data) => checkValidation(data, "applicationNumber")}
                        value={Trade_Mark.applicationNumber.value}
                        error={Trade_Mark.applicationNumber.error}
                        errmsg={Trade_Mark.applicationNumber.errmsg} />

                    <Labelbox type="datepicker"
                        placeholder={" Application Date"}
                        disableFuture={true}
                        changeData={(data) => checkValidation(data, "applicationdate")}
                        value={Trade_Mark.applicationdate.value}
                        error={Trade_Mark.applicationdate.error}
                        errmsg={Trade_Mark.applicationdate.errmsg} />

                    <Labelbox type="select"
                        placeholder={" Country"} />

                    <Labelbox type="text"
                        placeholder={" Priority Details"}
                        changeData={(data) => checkValidation(data, "prioritydetails")}
                        value={Trade_Mark.prioritydetails.value}
                        error={Trade_Mark.prioritydetails.error}
                        errmsg={Trade_Mark.prioritydetails.errmsg} />

                    <Labelbox type="text"
                        placeholder={" User Claim"}
                        changeData={(data) => checkValidation(data, "userclaim")}
                        value={Trade_Mark.userclaim.value}
                        error={Trade_Mark.userclaim.error}
                        errmsg={Trade_Mark.userclaim.errmsg} />

                    <Labelbox type="text"
                        placeholder={" Allotment"}
                        changeData={(data) => checkValidation(data, "allotment")}
                        value={Trade_Mark.allotment.value}
                        error={Trade_Mark.allotment.error}
                        errmsg={Trade_Mark.allotment.errmsg} />
                    <div className="projectFormComments">
                        <Labelbox type="textarea"
                            placeholder={" Goods and Services Description"}
                            changeData={(data) => checkValidation(data, "goodsdescription")}
                            value={Trade_Mark.goodsdescription.value}
                            error={Trade_Mark.goodsdescription.error}
                            errmsg={Trade_Mark.goodsdescription.errmsg} />
                    </div>


                </Grid>
            </Grid>

            <Grid item xs={12} container justify="flex-end" >
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} custombtnCSS="TMopositionbuttons" />
                <CustomButton btnName={"CANCEL"} custombtnCSS="TMopositionbuttons" />
            </Grid>
        </div >


    )
}

export default TradeMarkInternational;