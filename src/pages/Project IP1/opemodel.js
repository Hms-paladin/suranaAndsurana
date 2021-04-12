import React, { useState,useEffect } from 'react';
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
import { getExpenseType ,getPaymentMode,InsertOPE} from "../../actions/projectTaskAction";
import { getProjectDetails } from "../../actions/ProjectFillingFinalAction";  
import { useParams } from "react-router-dom";
import moment from 'moment'

function OpeModel(props) {
    const [expenseLists, setexpenseLists] = useState({})
    const [paymentMode, setpaymentMode] = useState({})
    const dispatch = useDispatch()
    const [projectDetails, setProjectDetails] = useState({})
    const [idDetails, setidDetails] = useState({})
    const [selectedFile, setselectedFile] = useState([]);
    const fileUpload = {
        name: 'file',
       
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                setselectedFile(info.file.originFileObj);
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const [opeModel, setopeModel] = useState({
        expenseType: {  
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        amount: {
            value: "",
            validation: [{ "name": "required" },],
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
            project_id:props.ProjectDetails[0].project_id,
            client_id:props.ProjectDetails[0].client_id,
        })

        let expenseData = []
    props.expenseList.map((data) =>
    
    expenseData.push({ value: data.expense_type,
        id: data.status_id })
    )
  
    setexpenseLists({ expenseData })

        let paymentmode = [];
        props.paymentMode.map((data=>{
         paymentmode.push({value:data.payment_mode,id:data.status_id})   
        }))
        setpaymentMode({paymentmode})
      }, [
        props.ProjectDetails,props.expenseList,props.paymentMode
      ]);

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
            let params  = {
                "project_id":idDetails.project_id,
                "expence_type": opeModel.expenseType.value,
                "mode_of_payment": opeModel.payment.value,
                "amount": opeModel.amount.value,
                "bill": selectedFile,
                "description": opeModel.description.value,
                "created_by" :localStorage.getItem("empId"),
                "created_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
                 "updated_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
                 "updated_by" :localStorage.getItem("empId"),
            }
            dispatch(InsertOPE(params)).then(() => {
                handleCancel()
            })
        }

        setopeModel(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let From_key = [
            "expenseType","amount","description","payment"
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
                console.log(item,'item')
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
            <div className="opeHeader">
                <div>IP Project </div>
                <div>Project Name</div>
                <div>Johnson & Johnson</div>
            </div>
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
                    <Grid item xs={6}>
                        <Labelbox type="select"
                            placeholder={" Mode of Payment"} 
                            dropdown={paymentMode.paymentmode}
                            changeData={(data) => checkValidation(data, "payment")}
                                value={opeModel.payment.value}
                                error={opeModel.payment.error}
                                errmsg={opeModel.payment.errmsg} />
                    </Grid>
                    <Grid item xs={2} className="opeHeader">

                        <div>BILL</div>
                        <Checkbox />
                        <div className="uploadbox_div" >
                        <div>
                            <Upload {...fileUpload} className="uploadbox_tag"
                                action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                                <div className="upload_file_inside"><label>Upload</label><PublishIcon /></div>
                            </Upload>,
                                     </div>
                    </div>
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
    
    expenseList:state.projectTasksReducer.expenseType || [],
    paymentMode:state.projectTasksReducer.paymentMode || [],
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
});
export default connect(mapStateToProps)(OpeModel);