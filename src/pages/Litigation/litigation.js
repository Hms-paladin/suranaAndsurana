import react, { useState } from 'react';
import './litigation.scss';
import { Tabs, Radio } from 'antd';
import Grid from '@material-ui/core/Grid';
import Tabcontent from '../../component/TradeMarkTabIcons/trademarktabIcons';
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import { InesertResume } from "../../actions/ResumeAction";
import AddIcon from '../../images/addIcon.svg';
import CustomButton from "../../component/Butttons/button";
import { message } from 'antd';
import DynModel from '../../component/Model/model';
import AddDataModel from './adddataModel';
import InterimModel from './interimModel';

const { TabPane } = Tabs;

function Litigation() {
    const [litigationCounsel, setLitigationCounsel] = useState(false)
    const [litigationInterim, setLitigationInterim] = useState(false)

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

        internalcaseno: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        status: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        courtname: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        casetype: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        courtcaseno: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        ddra: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        hearingdate: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        duedate: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        subcase: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        suitvalue: {
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
            "internalcaseno", "status", "courtname","casetype","courtcaseno","ddra","hearingdate","duedate","subcase","suitvalue"
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
        <div>
            <div className="litigationContaoner">
                <Grid item xs={12}>
                    <div className="litigationFields">
                        <div className="litigationData">
                            <div className="litigationTitle">Project Name</div>
                            <div>Name</div>
                        </div>
                        <div className="litigationData">
                            <div className="litigationTitle">Client Name</div>
                            <div>Name</div>
                        </div>
                        <div className="litigationData">
                            <div className="litigationTitle">Project type</div>
                            <div>J0450</div>
                        </div>
                        <div className="litigationData">
                            <div className="litigationTitle">Project Sub type</div>
                            <div>J0450</div>
                        </div>
                        <div className="litigationData">
                            <div className="litigationTitle">Process type</div>
                            <div>J0450</div>
                        </div>
                    </div>

                </Grid>
                <Grid item xs={12}>
                    <div className="litigationFields">
                        <div className="litigationData">
                            <div className="litigationTitle">Filling Type</div>
                            <div>Name</div>
                        </div>
                        <div className="litigationData">
                            <div className="litigationTitle">Billable Type</div>
                            <div>Name</div>
                        </div>
                        <div className="litigationData">
                            <div className="litigationTitle">DRA</div>
                            <div>J0450</div>
                        </div>
                        <div className="litigationData">
                            <div className="litigationTitle">DDRA</div>
                            <div>J0450</div>
                        </div>

                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="litigationFields">
                        <div className="litigationData">
                            <div className="litigationTitle">Comments</div>
                            <div>text</div>
                        </div>
                    </div>

                </Grid>
            </div>
            <Tabs defaultActiveKey="1" type="card" className="litigationTabs">
                <TabPane tab="Litigation" key="1">
                    <div className="litigationHeader">
                        <div className="addCase">Add Case</div>
                        <Tabcontent className="IconsHeader" />


                    </div>
                    <Grid item xs={12} container direction="row" spacing={2}>
                        <Grid item xs={4} container direction="column" spacing={2} >
                            <Labelbox type="text" placeholder={"Internal Case No."}
                                changeData={(data) => checkValidation(data, "prioritydetails")}
                                value={Litigation_Form.internalcaseno.value}
                                error={Litigation_Form.internalcaseno.error}
                                errmsg={Litigation_Form.internalcaseno.errmsg} />

                             <Labelbox type="select" placeholder={"Status"}
                                changeData={(data) => checkValidation(data, "status")}
                                value={Litigation_Form.status.value}
                                error={Litigation_Form.status.error}
                                errmsg={Litigation_Form.status.errmsg} />

                           <Labelbox type="select" placeholder={"Court Name"}
                                changeData={(data) => checkValidation(data, "courtname")}
                                value={Litigation_Form.courtname.value}
                                error={Litigation_Form.courtname.error}
                                errmsg={Litigation_Form.courtname.errmsg} />

                            <Labelbox type="select" placeholder={"Case Type"}
                                changeData={(data) => checkValidation(data, "casetype")}
                                value={Litigation_Form.casetype.value}
                                error={Litigation_Form.casetype.error}
                                errmsg={Litigation_Form.casetype.errmsg} />

                            <Labelbox type="text" placeholder={"Court Case No."}
                                changeData={(data) => checkValidation(data, "courtcaseno")}
                                value={Litigation_Form.courtcaseno.value}
                                error={Litigation_Form.courtcaseno.error}
                                errmsg={Litigation_Form.courtcaseno.errmsg} />

                            <Labelbox type="select" placeholder={"DDRA"}
                                changeData={(data) => checkValidation(data, "ddra")}
                                value={Litigation_Form.ddra.value}
                                error={Litigation_Form.ddra.error}
                                errmsg={Litigation_Form.ddra.errmsg} />

                            <Grid item xs={12} container direction="row" >
                                <Grid xs={6} > <Labelbox type="datepicker" placeholder={"Next Hearing Date"}
                                    changeData={(data) => checkValidation(data, "hearingdate")}
                                    value={Litigation_Form.hearingdate.value}
                                    error={Litigation_Form.hearingdate.error}
                                    errmsg={Litigation_Form.hearingdate.errmsg} />
                                </Grid>
                                <Grid xs={6} > <Labelbox type="datepicker" placeholder={"Due Date"}
                                    changeData={(data) => checkValidation(data, "duedate")}
                                    value={Litigation_Form.duedate.value}
                                    error={Litigation_Form.duedate.error}
                                    errmsg={Litigation_Form.duedate.errmsg} />
                                </Grid>


                            </Grid>
                            <Labelbox type="select" placeholder={"Sub case"}
                                changeData={(data) => checkValidation(data, "subcase")}
                                value={Litigation_Form.subcase.value}
                                error={Litigation_Form.subcase.error}
                                errmsg={Litigation_Form.subcase.errmsg} />

                            <Labelbox type="text" placeholder={"Suit Value (Numeric)"}
                                changeData={(data) => checkValidation(data, "suitvalue")}
                                value={Litigation_Form.suitvalue.value}
                                error={Litigation_Form.suitvalue.error}
                                errmsg={Litigation_Form.suitvalue.errmsg} /> 


                        </Grid>

                        <Grid item xs={8} container direction="row"  >
                            <div className="litigationScroller">
                                <div className="litigationCounsel">
                                    <div className="ourCounselTitle">Our Counsel</div>
                                    <div className="ourCounselFields">
                                        <div>Name</div>
                                        <div>Phone No</div>
                                        <div>Email ID</div>
                                        <div>Address</div>
                                        <img src={AddIcon} onClick={() => setLitigationCounsel(true)} />

                                    </div>
                                </div>
                                <div className="litigationCounsel">
                                    <div className="ourCounselTitle">External Counsel</div>
                                    <div className="ourCounselFields">
                                        <div>Name</div>
                                        <div>Phone No</div>
                                        <div>Email ID</div>
                                        <div>Address</div>
                                        <img src={AddIcon} onClick={() => setLitigationCounsel(true)} />

                                    </div>
                                </div>
                                <div className="litigationCounsel">
                                    <div className="ourCounselTitle">Opposite Party </div>
                                    <div className="ourCounselFields">
                                        <div>Name</div>
                                        <div>Phone No</div>
                                        <div>Email ID</div>
                                        <div>Address</div>
                                        <img src={AddIcon} onClick={() => setLitigationCounsel(true)} />

                                    </div>
                                </div>
                                <div className="litigationCounsel">
                                    <div className="ourCounselTitle">Opposite Party Counsel</div>
                                    <div className="ourCounselFields">
                                        <div>Name</div>
                                        <div>Phone No</div>
                                        <div>Email ID</div>
                                        <div>Address</div>
                                        <img src={AddIcon} onClick={() => setLitigationCounsel(true)} />

                                    </div>
                                </div>
                                <div className="litigationCounsel">
                                    <div className="ourCounselTitle">Opposite Party Counsel</div>
                                    <div className="ourCounselFields">
                                        <div>Name</div>
                                        <div>Phone No</div>
                                        <div>Email ID</div>
                                        <div>Address</div>
                                        <img src={AddIcon} onClick={() => setLitigationCounsel(true)} />
                                    </div>
                                </div>
                                <div className="litigationCounsel">
                                    <div className="ourCounselTitle">Adjournment</div>
                                    <div className="ourCounselFields">
                                        <div>Name</div>
                                        <div>Phone No</div>
                                        <div>Email ID</div>
                                        <div>Address</div>
                                    </div>
                                </div>
                                <div className="litigationCounsel">
                                    <div className="ourCounselTitle">Interim</div>
                                    <div className="ourCounselFields">
                                        <div>Name</div>
                                        <div>Phone No</div>
                                        <div>Email ID</div>
                                        <div>Address</div>
                                        <img src={AddIcon} onClick={() => setLitigationInterim(true)} />
                                    </div>
                                </div>
                            </div>
                            <DynModel modelTitle={"Litigation Details"} handleChangeModel={litigationCounsel} handleChangeCloseModel={(bln) => setLitigationCounsel(bln)} content={<AddDataModel />} />
                            <DynModel modelTitle={"Litigation Details"} handleChangeModel={litigationInterim} handleChangeCloseModel={(bln) => setLitigationInterim(bln)} content={<InterimModel />} />
                            <div className="customAddcasebtn">
                                <CustomButton btnName={"SAVE "} btnCustomColor="customPrimary" custombtnCSS={"btnProjectForm"} onBtnClick={onSubmit} />

                                <CustomButton btnName={"CANCEL "} custombtnCSS={"btnProjectForm"} />


                            </div>
                        </Grid>

                    </Grid>


                </TabPane>

            </Tabs>

        </div>
    )
}

export default Litigation;