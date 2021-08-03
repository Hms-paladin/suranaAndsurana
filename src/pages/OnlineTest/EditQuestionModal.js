import React, { useEffect, useState, useCallback } from 'react'
import { connect, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import CustomButton from "../../component/Butttons/button";
import { editQuestions, viewAddedQuestions } from "../../actions/AddQuationsAction";
import { notification } from "antd";

function EditQuestionsModal(props) {
    const dispatch = useDispatch();
    const [Add_question, setAdd_question] = useState({
        type_ques: {
            value: '',
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        option: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        answer: {
            value: '',
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        }
    })
    ///***********user permission**********/
    useEffect(() => {
        if (props.UserPermission.length > 0 && props.UserPermission) {
            let data_res_id = props.UserPermission.find((val) => {
                return (
                    "Add Questions - Add" == val.control
                )
            })
            setAddRights(data_res_id)
        }

    }, [props.UserPermission]);

    // dit 
    useEffect(() => {
        const question = props.question
        const choice = props.choice
        const answer = props.answer
        if (question) {
            Add_question.type_ques.value = question

            setAdd_question((prevState) => ({
                ...prevState,
            }));
        }
        if (choice) {
            Add_question.option.value = choice

            setAdd_question((prevState) => ({
                ...prevState,
            }));
        }
        if (answer) {
            Add_question.answer.value = answer

            setAdd_question((prevState) => ({
                ...prevState,
            }));
        }
    }, [props.question])

    const handleCancel = () => {
        let LeaveUpdate_key = [
            "category", "subcategory", "ques_type", "type_ques", "option", "answer"
        ]

        LeaveUpdate_key.map((data) => {
            Add_question[data].value = ""
        })
        setAdd_question(prevState => ({
            ...prevState,
        }));

    }
    const [addRights, setAddRights] = useState([])

    function checkValidation(data, key) {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Add_question[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Add_question[key].validation,
        };
        setAdd_question((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }


    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(Add_question);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Add_question[targetkeys[i]].value,
                Add_question[targetkeys[i]].validation
            );
            Add_question[targetkeys[i]].error = !errorcheck.state;
            Add_question[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Add_question[targetkeys[i]].value;
        }

        var filtererr = targetkeys.filter(
            (obj) => Add_question[obj].error == true
        );
        // console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setAdd_question({ error: true });
        } else {
            console.log(props.quesId, "id")
            dispatch(editQuestions(props.quesId, Add_question.answer.value, Add_question.option.value, Add_question.type_ques.value)).then((response) => {
                props.handleChangeCloseModel()
                notification.success({
                    message: 'Question Updated Successfully',
                });
                dispatch(viewAddedQuestions(props.quescatId, props.quessubcatId, props.ques_type))
            })
            //handleCancel()
        }

        setAdd_question((prevState) => ({
            ...prevState,
        }));
    }
    return (
        <div>
            {console.log(props.question, "ques")}
            {/* {viewquetions && viewquetions.map((val) => {
                return ( */}
            <div className="viewques_container">
                <Grid item xs={12} container direction="row" spacing={3}>
                    <Grid item xs={9}>
                        <Labelbox type="textarea" placeholder="Type Question"
                            changeData={(data) => checkValidation(data, "type_ques")}
                            value={Add_question.type_ques.value}
                            error={Add_question.type_ques.error}
                            errmsg={Add_question.type_ques.errmsg}
                        >

                        </Labelbox>
                    </Grid>
                </Grid>
                <Grid item xs={12} container direction="row" spacing={3}>
                    <Grid item xs={6} spacing={1}>
                        <Labelbox type="text" placeholder="Option"
                            changeData={(data) => checkValidation(data, "option")}
                            value={Add_question.option.value}
                            error={Add_question.option.error}
                            errmsg={Add_question.option.errmsg}></Labelbox>
                    </Grid>
                    <Grid item xs={3} spacing={1}>
                        <Labelbox type="text" placeholder="Answer"
                            changeData={(data) => checkValidation(data, "answer")}
                            value={Add_question.answer.value}
                            error={Add_question.answer.error}
                            errmsg={Add_question.answer.errmsg}></Labelbox>
                    </Grid>
                    <Grid item xs={2} spacing={1}>
                        <CustomButton btnName={"UPDATE"} btnDisable={!addRights || addRights.display_control && addRights.display_control === 'N' ? true : false} btnCustomColor="customPrimary" custombtnCSS="AQAddbtn" onBtnClick={onSubmit} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => (
    console.log(state.AddQuations, "state.getOptions.getCategory"),

    {
        viewAddedQuestions: state.AddQuations.viewAddedQuestions || [],
        UserPermission: state.UserPermissionReducer.getUserPermission,
    }
);

export default connect(mapStateToProps)(EditQuestionsModal);