
import react, { useState } from 'react';
import './trademark.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../../helpers/labelbox/labelbox";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import { InesertResume } from "../../../actions/ResumeAction";
import CustomButton from '../../../component/Butttons/button';
import Tabs from '../../../component/TradeMarkTabIcons/trademarktabIcons';
import PublishIcon from '@material-ui/icons/Publish';
import { Upload, message, Button, Icon } from 'antd';




function TradeMark() {

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
        projecttype: {
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
        nextRenewal: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        internalstutus: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        amendment: {
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
        internalstutus: {
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
        order: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        tmjNumber: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        comments: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        indiaStatus: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        journalextract: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        applicationdate: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        usefromdate: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        certificatedate: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        tnjDate: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        renewalcertificateDate: {
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
            <Tabs />
            
            <div>
                <Grid item xs={12} container direction="row" spacing={1} >
                    <Grid item xs={4} container direction="column" spacing={2}  >
                        <Grid item xs={12} container direction="row" spacing={1}>
                            <Grid item xs={4} >
                                <Labelbox type="select"
                                    placeholder={" Status"} />
                            </Grid>
                            <Grid item xs={2} >
                                <Labelbox type="text"
                                    placeholder={" Mark"}
                                    changeData={(data) => checkValidation(data, "mark")}
                                    value={Trade_Mark.mark.value}
                                    error={Trade_Mark.mark.error}
                                    errmsg={Trade_Mark.mark.errmsg} />
                            </Grid>
                            <Grid item xs={6} >
                                <div className="uploadbox" >
                                    <div>
                                        <Upload {...props} className="uploadbox_tag"
                                            action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                                            <div className="upload_file_inside"><label>Upload Image</label><PublishIcon /></div>
                                        </Upload>,
                                     </div>
                                </div>

                            </Grid>
                        </Grid>
                        <Grid item xs={12} >
                            <Labelbox type="text"
                                placeholder={" Goods and Description"}
                                changeData={(data) => checkValidation(data, "goodsdescription")}
                                value={Trade_Mark.goodsdescription.value}
                                error={Trade_Mark.goodsdescription.error}
                                errmsg={Trade_Mark.goodsdescription.errmsg} />
                        </Grid>
                    </Grid>
                    <Grid item xs={4} container direction="column" spacing={2}>
                        <Grid item xs={12} container direction="row" spacing={1}>
                            <Grid item xs={6} >
                                <Labelbox type="text"
                                    placeholder={" Application Number "}
                                    changeData={(data) => checkValidation(data, "applicationNumber")}
                                    value={Trade_Mark.applicationNumber.value}
                                    error={Trade_Mark.applicationNumber.error}
                                    errmsg={Trade_Mark.applicationNumber.errmsg} />
                            </Grid>
                            <Grid item xs={6} >
                                <Labelbox type="datepicker"
                                    placeholder={" Application Date "}
                                    disableFuture={true}
                                    changeData={(data) => checkValidation(data, "applicationdate")}
                                    value={Trade_Mark.applicationdate.value}
                                    error={Trade_Mark.applicationdate.error}
                                    errmsg={Trade_Mark.applicationdate.errmsg} />
                            </Grid>

                        </Grid>
                        <Grid item xs={12} container direction="row" spacing={1}>
                            <Grid item xs={6} >
                                <Labelbox type="select"
                                    placeholder={" Usage Details "} />
                            </Grid>
                            <Grid item xs={6} >
                                <Labelbox type="datepicker"
                                    placeholder={" Used From Date "}
                                    disableFuture={true}
                                    changeData={(data) => checkValidation(data, "usefromdate")}
                                    value={Trade_Mark.usefromdate.value}
                                    error={Trade_Mark.usefromdate.error}
                                    errmsg={Trade_Mark.usefromdate.errmsg} />
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={4} container direction="column" spacing={2}>

                        <Grid item xs={12} >
                            <Labelbox type="select"
                                placeholder={" Class"} />
                        </Grid>

                        <Grid item xs={12} >
                            <Labelbox type="text"
                                placeholder={" IP India Status"}
                                changeData={(data) => checkValidation(data, "indiaStatus")}
                                value={Trade_Mark.indiaStatus.value}
                                error={Trade_Mark.indiaStatus.error}
                                errmsg={Trade_Mark.indiaStatus.errmsg} />
                        </Grid>



                    </Grid>
                    <Grid item xs={12} container direction="row" spacing={2}>
                        <Grid item xs={2} >
                            <Labelbox type="datepicker"
                                placeholder={" Next Renewal "}
                                changeData={(data) => checkValidation(data, "nextRenewal")}
                                value={Trade_Mark.indiaStatus.value}
                                error={Trade_Mark.indiaStatus.error}
                                errmsg={Trade_Mark.indiaStatus.errmsg}
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="textarea"
                                placeholder={" comments"}
                                changeData={(data) => checkValidation(data, "comments")}
                                value={Trade_Mark.comments.value}
                                error={Trade_Mark.comments.error}
                                errmsg={Trade_Mark.comments.errmsg} />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="text"
                                placeholder={" Internal Status"}
                                changeData={(data) => checkValidation(data, "internalstutus")}
                                value={Trade_Mark.internalstutus.value}
                                error={Trade_Mark.internalstutus.error}
                                errmsg={Trade_Mark.internalstutus.errmsg} />
                        </Grid>
                        <Grid item xs={4} >
                            <Labelbox type="text"
                                placeholder={" Allotment"}
                                changeData={(data) => checkValidation(data, "allotment")}
                                value={Trade_Mark.allotment.value}
                                error={Trade_Mark.allotment.error}
                                errmsg={Trade_Mark.allotment.errmsg} />
                        </Grid>
                    </Grid>
                    <Grid item xs={4} container direction="column" spacing={2}>
                        <Grid item xs={10} >
                        <div className="uploadbox" >
                                    <div>
                                        <Upload {...props} className="uploadbox_tag"
                                            action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                                            <div className="upload_file_inside"><label>Order</label><PublishIcon /></div>
                                        </Upload>,
                                     </div>
                                </div>
                            {/* <Labelbox type="text"
                                placeholder={" Order"}
                                changeData={(data) => checkValidation(data, "order")}
                                value={Trade_Mark.order.value}
                                error={Trade_Mark.order.error}
                                errmsg={Trade_Mark.order.errmsg} /> */}
                        </Grid>

                        <Grid item xs={12} container direction="row" spacing={1}>
                            <Grid item xs={6} >
                                <Labelbox type="text"
                                    placeholder={" TMJ Number "}
                                    changeData={(data) => checkValidation(data, "tmjNumber")}
                                    value={Trade_Mark.tmjNumber.value}
                                    error={Trade_Mark.tmjNumber.error}
                                    errmsg={Trade_Mark.tmjNumber.errmsg} />
                            </Grid>
                            <Grid item xs={6} >
                                <Labelbox type="datepicker"
                                    placeholder={" TMJ Date"}
                                    disableFuture={true}
                                    changeData={(data) => checkValidation(data, "tnjDate")}
                                    value={Trade_Mark.tnjDate.value}
                                    error={Trade_Mark.tnjDate.error}
                                    errmsg={Trade_Mark.tnjDate.errmsg}
                                />
                            </Grid>

                        </Grid>

                        <Grid item xs={12} >
                            <Labelbox type="datepicker"
                                placeholder={" Certificate Date"}
                                disableFuture={true}
                                changeData={(data) => checkValidation(data, "certificatedate")}
                                value={Trade_Mark.certificatedate.value}
                                error={Trade_Mark.certificatedate.error}
                                errmsg={Trade_Mark.certificatedate.errmsg} />
                        </Grid>



                    </Grid>
                    <Grid item xs={4} container direction="column" spacing={2}>

                        <Grid item xs={12} >
                            <Labelbox type="text"
                                placeholder={" Amendment"}
                                changeData={(data) => checkValidation(data, "amendment")}
                                value={Trade_Mark.amendment.value}
                                error={Trade_Mark.amendment.error}
                                errmsg={Trade_Mark.amendment.errmsg} />
                        </Grid>

                        <Grid item xs={12} >
                            <Labelbox type="text"
                                placeholder={" Journal Extract"}
                                changeData={(data) => checkValidation(data, "journalextract")}
                                value={Trade_Mark.journalextract.value}
                                error={Trade_Mark.journalextract.error}
                                errmsg={Trade_Mark.journalextract.errmsg} />
                        </Grid>
                        <Grid item xs={12} >
                            <Labelbox type="datepicker"
                                placeholder={" Renewal Certificate Date"}
                                disableFuture={true}
                                changeData={(data) => checkValidation(data, "renewalcertificateDate")}
                                value={Trade_Mark.applicationdate.value}
                                error={Trade_Mark.applicationdate.error}
                                errmsg={Trade_Mark.applicationdate.errmsg} />
                        </Grid>



                    </Grid>
                    <Grid item xs={4} container direction="column" spacing={2}>

                        <Grid item xs={12} >
                            <Labelbox type="text"
                                placeholder={" Priority Details"}
                                changeData={(data) => checkValidation(data, "prioritydetails")}
                                value={Trade_Mark.prioritydetails.value}
                                error={Trade_Mark.prioritydetails.error}
                                errmsg={Trade_Mark.prioritydetails.errmsg} />
                        </Grid>
                        <Grid item xs={12} >
                            <Labelbox type="select"
                                placeholder={" POA"} />
                        </Grid>
                        <Grid item xs={12} container justify="center" >
                            <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} />
                            <CustomButton btnName={"CANCEL"} />

                        </Grid>

                    </Grid>
                </Grid>

            </div>

          
        </div>

    )
}

export default TradeMark;