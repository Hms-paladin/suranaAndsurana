import React, { useState, useEffect } from 'react';
import './projectIp.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Checkbox } from 'antd';
import UploadIcon from '../../images/uploadIcon.svg';
import { Upload, message, Button, Icon } from 'antd';
import PublishIcon from '@material-ui/icons/Publish';
import CustomButton from "../../component/Butttons/button";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import { InesertResume } from "../../actions/ResumeAction";
import { getExpenseType, getPaymentMode, InsertOPE } from "../../actions/projectTaskAction";
import { getProjectDetails } from "../../actions/ProjectFillingFinalAction";
import { useParams } from "react-router-dom";
import moment from 'moment';
import { notification } from "antd";
import { UploadOutlined } from '@ant-design/icons';



function OpeModel(props) {
    const [expenseLists, setexpenseLists] = useState({})
    const [paymentMode, setpaymentMode] = useState({})
    const dispatch = useDispatch()
    const [projectDetails, setProjectDetails] = useState({})
    const [idDetails, setidDetails] = useState({})
    const [selectedFile, setselectedFile] = useState([]);
    const [uploadList, setUploadFile] = useState(true)




    const [opeModel, setopeModel] = useState({
        expenseType: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        amount: {
            value: "",
            validation: [{ "name": "required" }, { "name": "custommaxLength", "params": "10" }, { "name": "allowNumaricOnly" }],
            error: null,
            errmsg: null,
        },
        description: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        payment: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },



    })

    let { rowId } = useParams()
    useEffect(() => {
        dispatch(getProjectDetails(rowId))
        dispatch(getExpenseType());
        dispatch(getPaymentMode());
    }, []);

    useEffect(() => {
        setProjectDetails(props.ProjectDetails);
        props.ProjectDetails.length > 0 && setidDetails({
            project_id: props.ProjectDetails[0].project_id,
            client_id: props.ProjectDetails[0].client_id,
        })

        let expenseData = []
        props.expenseList.map((data) =>

            expenseData.push({
                value: data.expense_type,
                id: data.status_id
            })
        )

        setexpenseLists({ expenseData })

        let paymentmode = [];
        props.paymentMode.map((data => {
            paymentmode.push({ value: data.payment_mode, id: data.status_id })
        }))
        setpaymentMode({ paymentmode })
    }, [
        props.ProjectDetails, props.expenseList, props.paymentMode
    ]);

    console.log(projectDetails, "props.ProjectDetails")

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(opeModel);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                opeModel[targetkeys[i]].value,
                opeModel[targetkeys[i]].validation
            );
            opeModel[targetkeys[i]].error = !errorcheck.state;
            opeModel[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = opeModel[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => opeModel[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setopeModel({ error: true });
        } else {
            // setopeModel({ error: false });
            let params = {
                "project_id": idDetails.project_id,
                "expence_type": opeModel.expenseType.value,
                "mode_of_payment": opeModel.payment.value,
                "amount": opeModel.amount.value,
                "bill": selectedFile,
                "description": opeModel.description.value,
                "created_by": localStorage.getItem("empId"),
                "created_on": moment().format('YYYY-MM-DD HH:m:s'),
                "updated_on": moment().format('YYYY-MM-DD HH:m:s'),
                "updated_by": localStorage.getItem("empId"),
            }
            dispatch(InsertOPE(params)).then((response) => {

                // if (response.data.status === 1) {
                notification.success({
                    message: "OPE Added Successfully",
                });
                handleCancel()
                props.handleChangeCloseModel()
                setselectedFile([])
                // }
            })
        }

        setopeModel(prevState => ({
            ...prevState
        }));
    };


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
            setselectedFile(fileList);

        }
    };


    // console.log(fileUpload, "fileUpload")

    const handleCancel = () => {
        let From_key = [
            "expenseType", "amount", "description", "payment"
        ]

        From_key.map((data) => {
            opeModel[data].value = ""
        })
        setopeModel(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {


        var errorcheck = ValidationLibrary.checkValidation(
            data,
            opeModel[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: opeModel[key].validation
        }
        // only for multi select (start)

        let multipleIdList = []

        if (multipleId) {
            multipleId.map((item) => {
                console.log(item, 'item')
                for (let i = 0; i < data.length; i++) {
                    if (data[i] === item.value) {
                        multipleIdList.push(item.id)
                    }
                }
            })
            dynObj.valueById = multipleIdList.toString()
        }
        // (end)

        setopeModel(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };
    return (
        <div>
            {projectDetails.length > 0 && projectDetails.map((data) => {
                return (
                    <div className="opeHeader">
                        <div>{data.project_type} </div>
                        <div>{data.project_name}</div>
                        <div>{data.client}</div>
                    </div>

                )
            })}

            <div className="opeFields">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={6}>
                        <Labelbox type="select"
                            placeholder={" Expence Type"}
                            dropdown={expenseLists.expenseData}
                            changeData={(data) => checkValidation(data, "expenseType")}
                            value={opeModel.expenseType.value}
                            error={opeModel.expenseType.error}
                            errmsg={opeModel.expenseType.errmsg}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Labelbox type="text"
                            placeholder={" Amount"}
                            changeData={(data) => checkValidation(data, "amount")}
                            value={opeModel.amount.value}
                            error={opeModel.amount.error}
                            errmsg={opeModel.amount.errmsg} />
                    </Grid>
                    <Grid item xs={12}>
                        <div className="billupload">
                            <div>
                                <Labelbox type="select"
                                    placeholder={" Mode of Payment"}
                                    dropdown={paymentMode.paymentmode}
                                    changeData={(data) => checkValidation(data, "payment")}
                                    value={opeModel.payment.value}
                                    error={opeModel.payment.error}
                                    errmsg={opeModel.payment.errmsg} />
                            </div>
                            <div className="rightitems">
                                <div>
                                    <div id="bill">BILL</div>
                                    <Checkbox />
                                </div>
                                <div className="uploadbtn" >
                                    <div>
                                        <Upload
                                            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                            onChange={(info) => handleChange(info, "examScheduleUpload")}
                                            fileList={selectedFile}
                                            accept={'.jpg', '.pdf', '.png'}
                                        >
                                            <Button>
                                                <UploadOutlined />Click to upload
                                            </Button>
                                        </Upload>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <Grid item xs={6}>
                            <Labelbox type="select"
                                placeholder={" Mode of Payment"}
                                dropdown={paymentMode.paymentmode}
                                changeData={(data) => checkValidation(data, "payment")}
                                value={opeModel.payment.value}
                                error={opeModel.payment.error}
                                errmsg={opeModel.payment.errmsg} />
                        </Grid>
                        <Grid item xs={6} className="opeHeader" direction="row">
                            <div style={{ display: "flex" }}>
                                <div>BILL</div>
                                <Checkbox />
                            </div>
                            <div>
                                <div className="uploadbox_div" >
                                    <div>
                                        <Upload {...fileUpload} className="uploadbox_tag"
                                            action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                                            <div className="upload_file_inside"><label>Bill Upload</label><PublishIcon /></div>
                                        </Upload>
                                    </div>
                                </div>
                            </div>
                        </Grid> */}
                    </Grid>
                </Grid>

                <div className="opeComments">

                    <Labelbox type="textarea"
                        placeholder={"comments"}
                        changeData={(data) => checkValidation(data, "description")}
                        value={opeModel.description.value}
                        error={opeModel.description.error}
                        errmsg={opeModel.description.errmsg}
                    />
                </div>
                <div className="opebtn">
                    <CustomButton
                        btnName={"Save "}
                        btnCustomColor="customPrimary"
                        onBtnClick={onSubmit}
                    />
                </div>



            </div>
        </div>
    )


}

const mapStateToProps = (state) =>
// console.log(state.getOptions.getProcessType, "getProcessType")
({

    expenseList: state.projectTasksReducer.expenseType || [],
    paymentMode: state.projectTasksReducer.paymentMode || [],
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
});
export default connect(mapStateToProps)(OpeModel);