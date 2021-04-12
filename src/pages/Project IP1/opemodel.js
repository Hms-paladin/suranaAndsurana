import React, { useState,useEffect } from 'react';
import './projectIp.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Checkbox } from 'antd';
import UploadIcon from '../../images/uploadIcon.svg';
import CustomButton from "../../component/Butttons/button";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import { InesertResume } from "../../actions/ResumeAction";
import { getExpenseType ,getPaymentMode,InsertOPE} from "../../actions/projectTaskAction";



function OpeModel(props) {
    const [expenseLists, setexpenseLists] = useState({})
    const [paymentMode, setpaymentMode] = useState({})
    const dispatch = useDispatch()
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
        ourReference: {
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

    useEffect(() => {
        dispatch(getExpenseType());
        dispatch(getPaymentMode());
      }, []);

      useEffect(() => {
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
        props.expenseList,props.paymentMode
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

            }
            dispatch(InsertOPE(opeModel)).then(() => {
                handleCancel()
            })
           // dispatch(InsertOPE(opeModel));
        }

        setopeModel(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "mark", "projecttype"
        ]

        ResumeFrom_key.map((data) => {
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
                        <div><img src={UploadIcon} /></div>
                    </Grid>
                </Grid>

                <div className="opeComments">

                    <Labelbox type="textarea" 
                    placeholder={"comments"} 
                    changeData={(data) => checkValidation(data, "ourReference")}
                    value={opeModel.ourReference.value}
                    error={opeModel.ourReference.error}
                    errmsg={opeModel.ourReference.errmsg}
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
    paymentMode:state.projectTasksReducer.paymentMode || []
});
export default connect(mapStateToProps)(OpeModel);