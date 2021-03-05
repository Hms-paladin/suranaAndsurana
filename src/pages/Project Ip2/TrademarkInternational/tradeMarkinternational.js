
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

        <div className="tradeMarkContainer">
            <TabsTcons />
            <Grid item xs={12} container direction="row" spacing={1} >
                <Grid item xs={4} container direction="column" spacing={2}  >
                    <Grid item xs={12} >
                        <Labelbox type="select"
                            placeholder={" Status"} />
                    </Grid>

                    <Grid item xs={12} >
                        <Labelbox type="select"
                            placeholder={" Our Refernce"} />
                    </Grid>
                    <Grid item xs={12} >

                        <div className="uploadbox_div">
                            <div style={{width:"230%"}}>
                                <Upload {...props} className="uploadbox_tag"
                                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                                    <div className="upload_file_inside"><label>Click to upload</label><PublishIcon /></div>
                                </Upload>,
                            </div>

                        </div>

                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="datepicker"
                            placeholder={" Amendment"}
                            disableFuture={true}
                            changeData={(data) => checkValidation(data, "amendment")}
                            value={Trade_Mark.amendment.value}
                            error={Trade_Mark.amendment.error}
                            errmsg={Trade_Mark.amendment.errmsg} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" Allotment"}
                            changeData={(data) => checkValidation(data, "allotment")}
                            value={Trade_Mark.allotment.value}
                            error={Trade_Mark.allotment.error}
                            errmsg={Trade_Mark.allotment.errmsg} />
                    </Grid>


                </Grid>
                <Grid item xs={4} container direction="column" spacing={2}>


                    <Grid item xs={12} >
                        <Labelbox type="select"
                            placeholder={"Associate Refernce"} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="select"
                            placeholder={" Associate"} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" Application Number"}
                            changeData={(data) => checkValidation(data, "applicationNumber")}
                            value={Trade_Mark.applicationNumber.value}
                            error={Trade_Mark.applicationNumber.error}
                            errmsg={Trade_Mark.applicationNumber.errmsg} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="select"
                            placeholder={" Class"} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" User Claim"}
                            changeData={(data) => checkValidation(data, "userclaim")}
                            value={Trade_Mark.userclaim.value}
                            error={Trade_Mark.userclaim.error}
                            errmsg={Trade_Mark.userclaim.errmsg} />
                    </Grid>



                </Grid>

                <Grid item xs={4} container direction="column" spacing={2}>

                    <Grid item xs={12} >
                        <Labelbox type="select"
                            placeholder={" ClasCountry"} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" Priority Details"}
                            changeData={(data) => checkValidation(data, "prioritydetails")}
                            value={Trade_Mark.prioritydetails.value}
                            error={Trade_Mark.prioritydetails.error}
                            errmsg={Trade_Mark.prioritydetails.errmsg} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" Goods and Description"}
                            changeData={(data) => checkValidation(data, "goodsdescription")}
                            value={Trade_Mark.goodsdescription.value}
                            error={Trade_Mark.goodsdescription.error}
                            errmsg={Trade_Mark.goodsdescription.errmsg} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" Mark"}
                            changeData={(data) => checkValidation(data, "mark")}
                            value={Trade_Mark.mark.value}
                            error={Trade_Mark.mark.error}
                            errmsg={Trade_Mark.mark.errmsg} />
                    </Grid>
                    <Grid item xs={12} container justify="center">
                        <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} />
                        <CustomButton btnName={"CANCEL"} />

                    </Grid>


                </Grid>



            </Grid>

        </div>


    )
}

export default TradeMarkInternational;