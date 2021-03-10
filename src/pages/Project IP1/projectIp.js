import react, { useState } from 'react';
import './projectIp.scss';
import CopyRight from '../Project IP1/CopyRight'
import Grid from '@material-ui/core/Grid';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import { InesertResume } from "../../actions/ResumeAction";
import { Tabs } from 'antd';

// IP Tabs:
import TradeMarkTab from './TradeMark/trademark_Tab';
import Patent from '../Project IP1/Patent/Patent'
import Design from '../Project IP1/Design/design';

const { TabPane } = Tabs;



function ProjectIp() {
    const dispatch = useDispatch()

    function callback(key) {
        console.log(key);
    }

    function callbackinside(key) {
        console.log(key);
    }


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
        clientname: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        process_type: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        filling_type: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,

        }

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
        <div>
            <div className="projectIpContainer">
                <Grid item xs={12}>
                    <div className="projectIpFields">
                        <div className="projectIpdata">
                            <div className="projectTitle">Project Name</div>
                            <div>Name</div>
                        </div>
                        <div className="projectIpdata">
                            <div className="projectTitle">Client Name</div>
                            <div>Name</div>
                        </div>
                        <div className="projectIpdata">
                            <div className="projectTitle">Project type</div>
                            <div>J0450</div>
                        </div>
                        <div className="projectIpdata">
                            <div className="projectTitle">Project Sub type</div>
                            <div>J0450</div>
                        </div>
                        <div className="projectIpdata">
                            <div className="projectTitle">Process type</div>
                            <div>J0450</div>
                        </div>

                    </div>

                </Grid>
                <Grid item xs={12}>
                    <div className="projectIpFields">
                        <div className="projectIpdata">
                            <div className="projectTitle">Filling Type</div>
                            <div>Name</div>
                        </div>
                        <div className="projectIpdata">
                            <div className="projectTitle">Billable Type</div>
                            <div>Name</div>
                        </div>
                        <div className="projectIpdata">
                            <div className="projectTitle">HOD / Attorney</div>
                            <div>J0450</div>
                        </div>
                        <div className="projectIpdata">
                            <div className="projectTitle">counsel</div>
                            <div>J0450</div>
                        </div>

                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="projectIpFields">
                        <div className="projectIpdata">
                            <div className="projectTitle">Comments</div>
                            <div>text</div>
                        </div>


                    </div>

                </Grid>
            </div>
            {/* <Grid item xs={12} container spacing={4} >
                <Grid item xs={9} container spacing={4} >
                    <Grid item xs={6}>
                        <Labelbox type="text"
                            placeholder={"Project Name *"}


                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Labelbox type="text"
                            placeholder={"Client Name *"}
                            changeData={(data) => checkValidation(data, "clientname")}
                            value={Trade_Mark.clientname.value}
                            error={Trade_Mark.clientname.error}
                            errmsg={Trade_Mark.clientname.errmsg}

                        />
                    </Grid>
                </Grid>

                <Grid item xs={3}  >
                    <Grid item xs={12} >
                        <Labelbox type="select"
                            placeholder={" Project Type"} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} container spacing={4}>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"Project Sub type *"}

                    />
                </Grid>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"Process Type"}
                        dropdown={[{ id: "1", value: "Application" }, { id: "2", value: "Rectification" }, { id: "3", value: "Cancellation" }, { id: "4", value: "Opposition" }]}
                        changeData={(data) => checkValidation(data, "process_type")}
                        value={Trade_Mark.process_type.value}
                        error={Trade_Mark.process_type.error}
                        errmsg={Trade_Mark.process_type.errmsg}

                    />
                </Grid>
                <Grid item xs={3} >
                    <Labelbox type="select"
                        placeholder={"Fillng Type"}
                        dropdown={Trade_Mark.process_type.value == 1 ? [{ id: "1", value: "IndiaFilling" }, { id: "2", value: "InternationalFilling" }, { id: "3", value: "Domestic" }, { id: "4", value: "Foreign" }, { id: "5", value: "PCT" }]
                            : [{ id: "1", value: "Filed" }, { id: "2", value: "Defended" }]}
                        changeData={(data) => checkValidation(data, "filling_type")}
                        value={Trade_Mark.filling_type.value}
                        error={Trade_Mark.filling_type.error}
                        errmsg={Trade_Mark.filling_type.errmsg}
                    />
                </Grid>
                <Grid item xs={3} >
                    <Labelbox type="select"
                        placeholder={" Billable Type *"} />
                </Grid>


            </Grid>
            <Grid item xs={12} container spacing={4}>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"Project Sub type *"}

                    />
                </Grid>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"Counsel"}

                    />
                </Grid>
                <Grid item xs={6}>
                    <Labelbox type="textarea"
                        placeholder={"Comments"}
                        rows={4}
                    />
                </Grid>



            </Grid> */}
            <Tabs onChange={callback} type="card" className="intellectualPropertyTab">
                <TabPane tab="Intellectual Property" key="1">
                    <Tabs onChange={callbackinside} type="card" className="tradeMarkTab">
                        <TabPane tab="Trade Mark" key="1">
                            <TradeMarkTab Type={Trade_Mark} />
                        </TabPane>
                        <TabPane tab="Design" key="2">
                            <Design Type={Trade_Mark} />
                        </TabPane>
                        <TabPane tab="Patent" key="3">
                            <Patent Type={Trade_Mark} />
                        </TabPane>
                        <TabPane tab="CopyRight" key="4">
                            <CopyRight />
                        </TabPane>
                    </Tabs>
                </TabPane>

            </Tabs>


        </div>
    )
}
export default ProjectIp;