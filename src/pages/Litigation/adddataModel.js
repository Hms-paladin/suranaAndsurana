import react, { useState } from 'react';
import './litigation.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import { InesertResume } from "../../actions/ResumeAction";
import CustomButton from "../../component/Butttons/button";
import { message } from 'antd';
import { InsertLitigationDetails } from '../../actions/Litigation';

function AddDataModel() {
    const dispatch = useDispatch()

    const [Litigation_Form, setResumeFrom] = useState({

        counsel: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        name: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        phoneno: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        emailid: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        address: {
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

            dispatch(InsertLitigationDetails(Litigation_Form)).then(() => {
                handleCancel()
            })
        }

        setResumeFrom(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "counsel", "name", "phoneno","emailid","address"
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
        <div >
            <Grid item xs={12} container direction="column" justify="center" spacing={2} >


                <div className="liticationDetails">
                    <Labelbox type="select" placeholder={"Counsel"}
                        changeData={(data) => checkValidation(data, "counsel")}
                        value={Litigation_Form.counsel.value}
                        error={Litigation_Form.counsel.error}
                        errmsg={Litigation_Form.counsel.errmsg} />

                    <Labelbox type="text" placeholder={"Name"}
                        changeData={(data) => checkValidation(data, "name")}
                        value={Litigation_Form.name.value}
                        error={Litigation_Form.name.error}
                        errmsg={Litigation_Form.name.errmsg} />

                    <Labelbox type="text" placeholder={"Phone No"}
                        changeData={(data) => checkValidation(data, "phoneno")}
                        value={Litigation_Form.phoneno.value}
                        error={Litigation_Form.phoneno.error}
                        errmsg={Litigation_Form.phoneno.errmsg} />
   

                    <Labelbox type="text" placeholder={"Email Id"}
                        changeData={(data) => checkValidation(data, "emailid")}
                        value={Litigation_Form.emailid.value}
                        error={Litigation_Form.emailid.error}
                        errmsg={Litigation_Form.emailid.errmsg} />

                    <div className="test">
                        <Labelbox type="textarea" placeholder={"Address"}
                            changeData={(data) => checkValidation(data, "address")}
                            value={Litigation_Form.address.value}
                            error={Litigation_Form.address.error}
                            errmsg={Litigation_Form.address.errmsg} />
                    </div>

                    <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} />

                </div>


            </Grid>

        </div>
    )
}
export default AddDataModel;