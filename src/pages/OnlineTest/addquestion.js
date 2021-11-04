import React, { useEffect, useState } from 'react'
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import EnhancedTable from '../../component/DynTable/table';
import DynModel from "../../component/Model/model";
import Eyes from "../../images/neweye.svg";
import ViewQuestionsModal from '../OnlineTest/ViewQuestionsModal';
import ValidationLibrary from "../../helpers/validationfunction";
import { getCategory, getSubCategory, getQuestionType } from "../../actions/MasterDropdowns";
import { connect, useDispatch } from "react-redux";
import { InesertQuations, getAddQuations, viewAddedQuestions } from "../../actions/AddQuationsAction";
import './onlinetest.scss'
function AddQuestion(props) {
    const dispatch = useDispatch();
    const [questionview, setQuestionView] = useState(false)
    const [rowData, setRowData] = useState([])
    const [category, setCategory] = useState({})
    const [subcategory, setSubcategory] = useState({})
    const [quationtype, setQuationtype] = useState({})
    const [quescatId, setQuescatId] = useState()
    const [quessubcatId, setQuessubId] = useState()
    const [ques_type, setQues_type] = useState()
    const [Add_question, setAdd_question] = useState({
        category: {
            value: "",
            validation: [{ "name": "required" }, { name: "100Char" }],
            error: null,
            errmsg: null,
        },
        subcategory: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        ques_type: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
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
        },




    })
    const headCells = [
        { id: "category", label: "Category" },
        { id: "subcategory", label: "SubCategory" },
        { id: "QType", label: "Question Type" },
        { id: "NOQ", label: "No.of Question" },
        { id: "action", label: "Action" }
    ];

    useEffect(() => {
        dispatch(getCategory());
        dispatch(getQuestionType());
        dispatch(getAddQuations());

    }, [])

    useEffect(() => {
        let Category = []
        props.Category.map((data, index) => {
            Category.push({
                value: data.QuescatName,
                id: data.QuescatId,
            });
        });
        setCategory({ Category })

        // subCategory

        let SubCategory = []
        props.SubCategory.map((data, index) => {
            SubCategory.push({
                value: data.QuesubcatName,
                id: data.QuesubcatId,
            });
        });
        setSubcategory({ SubCategory })

        // QuationType

        let QuationType = []
        props.Quationtype.map((data, index) => {
            QuationType.push({
                value: data.Questypename,
                id: data.QuestypeId,
            });
        });
        setQuationtype({ QuationType })

    }, [props.Category, props.SubCategory, props.Quationtype])

    const viewQuations = (QuesCatId, QuesubcatId, QuesType, QuesID) => {
        setQuescatId(QuesCatId)
        setQuessubId(QuesubcatId)
        setQues_type(QuesType)
        setQuestionView(true)
    }



    useEffect(() => {

        let rowDataList = []

        props.getAddQuations && props.getAddQuations.map((data, index) => {
            rowDataList.push({
                category: data.QuescatName,
                subcategory: data.QuesubcatName,
                QType: data.QuesType === 1 ? "Checklist" : "Radiobutton",
                NOQ: data.no_of_quest,
                action: <> <img src={Eyes} className="eyesview" onClick={() => viewQuations(data.QuesCatId, data.QuesubcatId, data.QuesType, data.QuesId)}></img> </>,
            })
        })
        setRowData(rowDataList)

    }, [props.getAddQuations])

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
        if (key == "answer") {
            dynObj = {
                value: data,
                error: !errorcheck.state,
                errmsg: errorcheck.msg,
                validation: [{ "name": "required", name: "checkOption", params: Add_question.option.value }],
            };
        }

        if (key === "category" && data) {
            dispatch(getSubCategory(data));
            Add_question.subcategory.value = ""
            Add_question.ques_type.value = ""
        }
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
        const splitArray = Add_question.option.value.split(",")
        var check = splitArray.includes(Add_question.answer.value)
     
        var filtererr = targetkeys.filter(
            (obj) => Add_question[obj].error == true
        );

        if (filtererr.length > 0) {
            // setAdd_question({ error: true });
        } else {
            dispatch(InesertQuations(Add_question)).then((response) => {
                handleCancel()
            })
        }

        setAdd_question((prevState) => ({
            ...prevState,
        }));
    }


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



    /////////////
    return (
        <div>
            <div className="AQTitle">Add Question</div>
            <div className="AQContainer">
                <Grid item xs={12} container direction="row" spacing={3}>
                    <Grid item xs={3} spacing={1}>
                        <Labelbox type="select" placeholder="Category"
                            dropdown={category.Category}
                            changeData={(data) => checkValidation(data, "category")}
                            value={Add_question.category.value}
                            error={Add_question.category.error}
                            errmsg={Add_question.category.errmsg}></Labelbox>
                    </Grid>
                    <Grid item xs={3} spacing={1}>
                        <Labelbox type="select" placeholder="Sub-Category"
                            dropdown={subcategory.SubCategory}
                            changeData={(data) => checkValidation(data, "subcategory")}
                            value={Add_question.subcategory.value}
                            error={Add_question.subcategory.error}
                            errmsg={Add_question.subcategory.errmsg}></Labelbox>
                    </Grid>
                    <Grid item xs={3} spacing={1}>
                        <Labelbox type="select" placeholder="Question Type"
                            dropdown={quationtype.QuationType}
                            changeData={(data) => checkValidation(data, "ques_type")}
                            value={Add_question.ques_type.value}
                            error={Add_question.ques_type.error}
                            errmsg={Add_question.ques_type.errmsg}></Labelbox>
                    </Grid>
                </Grid>
                <Grid item xs={12} container direction="row" spacing={3}>
                    <Grid item xs={9}>
                        <Labelbox type="textarea" placeholder="Type Question"
                            changeData={(data) => checkValidation(data, "type_ques")}
                            value={Add_question.type_ques.value}
                            error={Add_question.type_ques.error}
                            errmsg={Add_question.type_ques.errmsg}></Labelbox>
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
                        <CustomButton btnName={"Add"} btnDisable={!addRights || addRights.display_control && addRights.display_control === 'N' ? true : false} btnCustomColor="customPrimary" custombtnCSS="AQAddbtn" onBtnClick={onSubmit} />
                    </Grid>
                </Grid>
                <div className="egCss">(For Eg Option1,Option2,Option3...)</div>
                <div>
                    <EnhancedTable headCells={headCells} rows={rowData} aligncss="usergroupcss"></EnhancedTable>
                </div>
                <DynModel modelTitle="Questions View" handleChangeModel={questionview} handleChangeCloseModel={(bln) => setQuestionView(bln)} width={1000}
                    content={<ViewQuestionsModal quescatId={quescatId} quessubcatId={quessubcatId} ques_type={ques_type} handleChangeCloseModel={(bln) => setQuestionView(bln)} />} closeModel={() => setQuestionView(false)} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => (
  
    {
        Category: state.getOptions.getCategory || [],
        SubCategory: state.getOptions.getSubCategory || [],
        Quationtype: state.getOptions.getQuestionType || [],
        getAddQuations: state.AddQuations.getAddQuations || [],
        viewAddedQuestions: state.AddQuations.viewAddedQuestions || [],
        UserPermission: state.UserPermissionReducer.getUserPermission,

    }
);

export default connect(mapStateToProps)(AddQuestion);