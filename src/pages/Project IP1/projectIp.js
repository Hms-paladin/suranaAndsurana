import react, { useState } from 'react';
import './projectIp.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import { TableContainer } from '@material-ui/core';
import CustomButton from '../../component/Butttons/button';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import { InesertResume } from "../../actions/ResumeAction"
import { Tabs } from 'antd';

//import tab content:

import TradeMark from './TradeMark/tradeMark';
// Design 
import IndiaFilling from './Design/Application/IndiaFilling';

import InternationalFilling from './Design/Application/InternationalFilling';
import CancelFiled from './Design/Cancellation/CancelFiled';
import CancelDefended from "./Design/Cancellation/CancelDefended";
import RectificationFiled from './Design/Rectification/RectificationFiled';
import RectificationDefended from './Design/Rectification/RectificationDefended';

const { TabPane } = Tabs;



function ProjectIp() {
    const dispatch = useDispatch()

    function callback(key) {
        console.log(key);
    }

    function callbackinside(key) {
        console.log(key);
    }


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
        clientname: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        process_type:{
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        filling_type:{
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,

        }

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

console.log(Resume_Form.process_type.value,"ff")
console.log(Resume_Form.filling_type.value,"ss")

    return (
        <div>
            <Grid item xs={12} container spacing={4} >
                <Grid item xs={9} container spacing={4} >
                    <Grid item xs={6}>
                        <Labelbox type="text"
                            placeholder={"Project Name *"}
                        // changeData={(data) => checkValidation(data, "projectname")}
                        // value={Resume_Form.projectname.value}
                        // error={Resume_Form.projectname.error}
                        // errmsg={Resume_Form.projectname.errmsg}

                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Labelbox type="text"
                            placeholder={"client Name *"}
                            changeData={(data) => checkValidation(data, "clientname")}
                            value={Resume_Form.clientname.value}
                            error={Resume_Form.clientname.error}
                            errmsg={Resume_Form.clientname.errmsg}

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
                        dropdown={[{ id: "1", value: "Application" }, { id: "2", value: "Rectification" }, { id: "3", value: "Cancellation" }]}
                        changeData={(data) => checkValidation(data, "process_type")}
                        value={Resume_Form.process_type.value}
                        error={Resume_Form.process_type.error}
                        errmsg={Resume_Form.process_type.errmsg}

                    />
                </Grid>
                <Grid item xs={3} >
                    <Labelbox type="select"
                        placeholder={"Fillng Type"}
                        dropdown={Resume_Form.process_type.value==1 ?[{id:"1",value:"IndiaFilling"},{id:"2", value:"InternationalFilling"}]:[{id:"1", value:"Filed"},{id:"2", value:"Defended"}]}
                        changeData={(data) => checkValidation(data, "filling_type")}
                        value={Resume_Form.filling_type.value}
                        error={Resume_Form.filling_type.error}
                        errmsg={Resume_Form.filling_type.errmsg}
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
                        placeholder={"Application"}

                    />
                </Grid>
                <Grid item xs={6}>
                    <Labelbox type="textarea"
                        placeholder={"Application"}
                        rows={4}
                    />
                </Grid>



            </Grid>
            <Tabs onChange={callback} type="card">
                <TabPane tab="Tab 1" key="1">
                    <Tabs onChange={callbackinside} type="card" className="tradeMarkTab">
                        <TabPane tab="Trade Mark" key="1">
                            <TradeMark />
                        </TabPane>
                        <TabPane tab="Design" key="2">
                        {
                           Resume_Form.process_type.value=== '1' && Resume_Form.filling_type.value == '1' &&
                           <IndiaFilling/> 
                        }
                        {
                           Resume_Form.process_type.value=== '1' && Resume_Form.filling_type.value == '2' &&
                           <InternationalFilling/>  
                        }
                        {
                           Resume_Form.process_type.value=== '2' && Resume_Form.filling_type.value == '1' &&
                             <CancelFiled/> 
                        }
                        {
                           Resume_Form.process_type.value=== '2' && Resume_Form.filling_type.value == '2' &&
                           <CancelDefended/>    
                        }
                        {
                           Resume_Form.process_type.value=== '3' && Resume_Form.filling_type.value == '1' &&
                           <RectificationFiled/>    
                        }
                        {
                           Resume_Form.process_type.value=== '3' && Resume_Form.filling_type.value == '2' &&
                           <RectificationDefended/>    
                        }              
                        </TabPane>
                        <TabPane tab="Patent" key="3">
                            Content of Tab Pane 3
                       </TabPane>
                        <TabPane tab="CopyRight" key="4">
                            Content of Tab Pane 4
                </TabPane>
                    </Tabs>
                </TabPane>

            </Tabs>


        </div>
    )
}
export default ProjectIp;