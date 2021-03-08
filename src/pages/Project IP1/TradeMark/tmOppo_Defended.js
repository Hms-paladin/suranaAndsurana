import react, { useState } from 'react';
// import './tradeMarkOposition2.scss';
import TabsTcons from '../../../component/TradeMarkTabIcons/trademarktabIcons';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../../helpers/labelbox/labelbox";
import { Upload, message, Button, Icon } from 'antd';
import { InesertResume } from "../../../actions/ResumeAction";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import PublishIcon from '@material-ui/icons/Publish';
import CustomButton from '../../../component/Butttons/button';


function TradeMarkOposition2() {
    // const [fileList, setfileList] = useState("")
    // const [file,setfile]=useState("")

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
        applicationNumber: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        ourReference: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },


        opositionNumber: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },

        tnjNumber: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        tmjDate: {
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
        opponent: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },

        deadline: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        agent: {
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

    // function onFileChange(e) {
    //     setfileList(e.target.files[0])
    //     setfile(e.target.files[0].name)

    // }
    return (
        <div className="trademarkOpsosotionContainer">
            <Grid item xs={12} container direction="column" spacing={1} >
                <Grid item xs={12} container direction="row" spacing={2}  >
                    <Grid item xs={2} >
                        <Labelbox type="select"
                            placeholder={" Status"} />
                    </Grid>
                    <Grid item xs={2} >
                        <Labelbox type="text"
                            placeholder={" Our Refernce"}
                            changeData={(data) => checkValidation(data, "ourReference")}
                            value={Trade_Mark.mark.value}
                            error={Trade_Mark.mark.error}
                            errmsg={Trade_Mark.mark.errmsg} />
                    </Grid>
                    <Grid item xs={2} >
                        <Labelbox type="text"
                            placeholder={" Mark"}
                            changeData={(data) => checkValidation(data, "mark")}
                            value={Trade_Mark.mark.value}
                            error={Trade_Mark.mark.error}
                            errmsg={Trade_Mark.mark.errmsg} />

                    </Grid>
                    <Grid item xs={3} >
                        <div className="uploadbox_div" >
                            <div>
                                <Upload {...props} className="uploadbox_tag"
                                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                                    <div className="upload_file_inside"><label>Upload Image</label><PublishIcon /></div>
                                </Upload>,
                                     </div>
                        </div>

                    </Grid>
                    <Grid item xs={3} >
                        <Labelbox type="select"
                            placeholder={" Class"} />
                    </Grid>
                </Grid>
                <Grid item xs={12} container direction="row" spacing={2}  >
                    <Grid item xs={2} >
                        <Labelbox type="text"
                            placeholder={" Application Number "}
                            changeData={(data) => checkValidation(data, "applicationNumber")}
                            value={Trade_Mark.applicationNumber.value}
                            error={Trade_Mark.applicationNumber.error}
                            errmsg={Trade_Mark.applicationNumber.errmsg} />
                    </Grid>
                    <Grid item xs={2} >
                        <Labelbox type="datepicker"
                            placeholder={" Application Date "}
                            disableFuture={true}
                            changeData={(data) => checkValidation(data, "applicationdate")}
                            value={Trade_Mark.applicationdate.value}
                            error={Trade_Mark.applicationdate.error}
                            errmsg={Trade_Mark.applicationdate.errmsg} />
                    </Grid>
                    <Grid item xs={2} >
                        <Labelbox type="text"
                            placeholder={" TMJ Number "}
                            changeData={(data) => checkValidation(data, "tnjNumber")}
                            value={Trade_Mark.tnjNumber.value}
                            error={Trade_Mark.tnjNumber.error}
                            errmsg={Trade_Mark.tnjNumber.errmsg} />
                    </Grid>
                    <Grid item xs={3} >
                        <Labelbox type="datepicker"
                            placeholder={" TMJ Date "}
                            disableFuture={true}
                            changeData={(data) => checkValidation(data, "tmjDate")}
                            value={Trade_Mark.applicationdate.value}
                            error={Trade_Mark.applicationdate.error}
                            errmsg={Trade_Mark.applicationdate.errmsg} />
                    </Grid>
                    <Grid item xs={3} >
                        <Labelbox type="text"
                            placeholder={" Oposition Number "}
                            changeData={(data) => checkValidation(data, "opositionNumber")}
                            value={Trade_Mark.opositionNumber.value}
                            error={Trade_Mark.opositionNumber.error}
                            errmsg={Trade_Mark.opositionNumber.errmsg} />
                    </Grid>
                </Grid>
                <Grid item xs={12} container direction="row" spacing={2}  >
                    <Grid item xs={4} >
                        <Labelbox type="text"
                            placeholder={" Opponent"}
                            changeData={(data) => checkValidation(data, "opponent")}
                            value={Trade_Mark.opponent.value}
                            error={Trade_Mark.opponent.error}
                            errmsg={Trade_Mark.opponent.errmsg} />

                    </Grid>
                    <Grid item xs={4} >
                        <Labelbox type="text"
                            placeholder={" Agent"}
                            changeData={(data) => checkValidation(data, "agent")}
                            value={Trade_Mark.agent.value}
                            error={Trade_Mark.agent.error}
                            errmsg={Trade_Mark.agent.errmsg} />
                    </Grid>
                    <Grid item xs={4} >
                        {/* <input type="file" onChange={onFileChange} id="pdfupload" /> <PublishIcon /> */}

                        <Labelbox type="datepicker"
                            placeholder={" Deadline "}
                            disableFuture={true}
                            changeData={(data) => checkValidation(data, "deadline")}
                            value={Trade_Mark.deadline.value}
                            error={Trade_Mark.deadline.error}
                            errmsg={Trade_Mark.deadline.errmsg} />
                    </Grid>
                </Grid>

                <Grid container justify="left" direction="row"  >
                    <div className="uploadbox_div" >
                        <div>
                            <Upload {...props} className="uploadbox_tag"
                                action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                                <div className="upload_file_inside"><label> Order </label><PublishIcon /></div>
                            </Upload>,
                                     </div>
                    </div>
                </Grid>
            </Grid>
            <div className="customButtonOposition">
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} custombtnCSS="TMOpositionButton" />
                <CustomButton btnName={"CANCEL"} custombtnCSS="TMOpositionButton" />

            </div>

        </div>
    )
}
export default TradeMarkOposition2;