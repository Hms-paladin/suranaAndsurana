
import react,{useState} from 'react';
import './trademark.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../../helpers/labelbox/labelbox";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import { InesertResume } from "../../../actions/ResumeAction";
import CustomButton from '../../../component/Butttons/button';


function TradeMark() {
    const dispatch = useDispatch()

    const [Resume_Form, setResumeFrom] = useState({

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
        usagedetails: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        coments: {
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
        restrictions: {
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
            "mark", "projecttype", "goodsdescription", "internalstutus", "basicQualification", "additionalQualification1", "additionalQualification2", "institution", "lastEmployer", "startDate", "endDate", "email1", "email2", "phone1", "phone2", "skills", "Traits", "certifications", "specializations", "talents", "intrests", "contactPhone", "emailId", "mailAddress", "state", "city", "language", "industry"
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
    return (
        <div className="tradeMarkContainer">

            <Grid item xs={12} container direction="row" spacing={1} >
                <Grid item xs={4} container direction="column" spacing={2} className="projectIp" >
                    <Grid item xs={12} container direction="row" spacing={1}>
                        <Grid item xs={4} >
                            <Labelbox type="select"
                                placeholder={" Status"} />
                        </Grid>
                        <Grid item xs={4} >
                            <Labelbox type="text"
                                placeholder={" Mark"}
                                changeData={(data) => checkValidation(data, "mark")}
                                value={Resume_Form.mark.value}
                                error={Resume_Form.mark.error}
                                errmsg={Resume_Form.mark.errmsg} />
                        </Grid>
                        <Grid item xs={4} >
                            <Labelbox type="text"
                                placeholder={" Project Type"}
                                changeData={(data) => checkValidation(data, "projecttype")}
                                value={Resume_Form.projecttype.value}
                                error={Resume_Form.projecttype.error}
                                errmsg={Resume_Form.projecttype.errmsg} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" Goods and Description"}
                            changeData={(data) => checkValidation(data, "goodsdescription")}
                            value={Resume_Form.goodsdescription.value}
                            error={Resume_Form.goodsdescription.error}
                            errmsg={Resume_Form.goodsdescription.errmsg} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" Internal Status"}
                            changeData={(data) => checkValidation(data, "internalstutus")}
                            value={Resume_Form.internalstutus.value}
                            error={Resume_Form.internalstutus.error}
                            errmsg={Resume_Form.internalstutus.errmsg} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" Amendment"}
                            changeData={(data) => checkValidation(data, "amendment")}
                            value={Resume_Form.amendment.value}
                            error={Resume_Form.amendment.error}
                            errmsg={Resume_Form.amendment.errmsg} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" Priority Details"}
                            changeData={(data) => checkValidation(data, "prioritydetails")}
                            value={Resume_Form.prioritydetails.value}
                            error={Resume_Form.prioritydetails.error}
                            errmsg={Resume_Form.prioritydetails.errmsg} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="select"
                            placeholder={" POA"} />
                    </Grid>

                </Grid>
                <Grid item xs={4} container direction="column" spacing={2}>
                    <Grid item xs={12} container direction="row" spacing={1}>
                        <Grid item xs={6} >
                            <Labelbox type="text"
                                placeholder={" Application Number "}
                                changeData={(data) => checkValidation(data, "applicationNumber")}
                                value={Resume_Form.applicationNumber.value}
                                error={Resume_Form.applicationNumber.error}
                                errmsg={Resume_Form.applicationNumber.errmsg} />
                        </Grid>
                        <Grid item xs={6} >
                            <Labelbox type="datepicker"
                                placeholder={" Application Date "} />
                        </Grid>

                    </Grid>
                    <Grid item xs={12} container direction="row" spacing={1}>
                        <Grid item xs={6} >
                            <Labelbox type="select"
                                placeholder={" Usage Details "} />
                        </Grid>
                        <Grid item xs={6} >
                            <Labelbox type="datepicker"
                                placeholder={" Used From Date "} />
                        </Grid>

                    </Grid>

                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" Allotment"}
                            changeData={(data) => checkValidation(data, "allotment")}
                            value={Resume_Form.allotment.value}
                            error={Resume_Form.allotment.error}
                            errmsg={Resume_Form.allotment.errmsg} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" Order"}
                            changeData={(data) => checkValidation(data, "order")}
                            value={Resume_Form.order.value}
                            error={Resume_Form.order.error}
                            errmsg={Resume_Form.order.errmsg} />
                    </Grid>
                    <Grid item xs={12} container direction="row" spacing={1}>
                        <Grid item xs={6} >
                            <Labelbox type="text"
                                placeholder={" Usage Details "}
                                changeData={(data) => checkValidation(data, "usagedetails")}
                                value={Resume_Form.usagedetails.value}
                                error={Resume_Form.usagedetails.error}
                                errmsg={Resume_Form.usagedetails.errmsg} />
                        </Grid>
                        <Grid item xs={6} >
                            <Labelbox type="datepicker"
                                placeholder={" Used From Date "} />
                        </Grid>

                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="datepicker"
                            placeholder={" Certificate Date"} />
                    </Grid>
                    <Grid item xs={12} container justify="center" >
                        <CustomButton btnName={"save"} btnCustomColor="customPrimary" onBtnClick={onSubmit} />
                        <CustomButton btnName={"cancel"} />

                    </Grid>

                </Grid>

                <Grid item xs={4} container direction="column" spacing={2}>

                    <Grid item xs={12} >
                        <Labelbox type="select"
                            placeholder={" Class"} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" coments"}
                            changeData={(data) => checkValidation(data, "coments")}
                            value={Resume_Form.coments.value}
                            error={Resume_Form.coments.error}
                            errmsg={Resume_Form.coments.errmsg} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" IP India Status"}
                            changeData={(data) => checkValidation(data, "indiaStatus")}
                            value={Resume_Form.indiaStatus.value}
                            error={Resume_Form.indiaStatus.error}
                            errmsg={Resume_Form.indiaStatus.errmsg} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" Restrictions"}
                            changeData={(data) => checkValidation(data, "restrictions")}
                            value={Resume_Form.restrictions.value}
                            error={Resume_Form.restrictions.error}
                            errmsg={Resume_Form.restrictions.errmsg} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" Restrictions"}
                            changeData={(data) => checkValidation(data, "restrictions")}
                            value={Resume_Form.restrictions.value}
                            error={Resume_Form.restrictions.error}
                            errmsg={Resume_Form.restrictions.errmsg} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" Restrictions"}
                            changeData={(data) => checkValidation(data, "restrictions")}
                            value={Resume_Form.restrictions.value}
                            error={Resume_Form.restrictions.error}
                            errmsg={Resume_Form.restrictions.errmsg} />
                    </Grid>
                    <Grid item xs={12} >
                        <Labelbox type="text"
                            placeholder={" Next Renewal Date"}
                        />
                    </Grid>

                </Grid>



            </Grid>





        </div>

    )
}

export default TradeMark;