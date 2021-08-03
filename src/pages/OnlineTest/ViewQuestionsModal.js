import React, { useEffect, useState } from 'react'
import EnhancedTable from '../../component/DynTable/table';
import { viewAddedQuestions, deleteQuestions } from "../../actions/AddQuationsAction";
import { connect, useDispatch } from "react-redux";
import EditQuestionsModal from '../OnlineTest/EditQuestionModal';
import Edit from "../../images/editable.svg"
import Delete from "../../images/delete.png"
import DynModel from "../../component/Model/model";
import { notification } from "antd";

function ViewQuestionsModal(props) {
    const dispatch = useDispatch();
    const [viewquetions, setViewquetions] = useState({})
    const [rowData, setRowData] = useState([])
    const headCells = [
        { id: "question", label: "Question" },
        { id: "option", label: "Options" },
        { id: "answer", label: "Answer" },
        { id: "action", label: "Actions" }
    ];
    const [question, setQuestion] = useState()
    const [choice, setChoice] = useState()
    const [answer, setAnswer] = useState()
    const [qusId, setQusID] = useState()

    const [editQuestionview, setEditQuestionView] = useState(false)

    useEffect(() => {
        dispatch(viewAddedQuestions(props.quescatId, props.quessubcatId, props.ques_type))
    }, [props.quescatId, props.quessubcatId, props.ques_type, props.delQuestions])

    useEffect(() => {
        console.log(props.viewAddedQuestions, "viewAddedQuestion")

        setViewquetions(props.viewAddedQuestions[0])

        let rowDataList = []
        props.viewAddedQuestions && props.viewAddedQuestions.map((data, index) => {
            rowDataList.push({
                question: data.Question,
                option: data.Choice,
                answer: data.Answer,
                action: <> <img src={Edit} onClick={() => editQuations(data.Question, data.Choice, data.Answer, data.QuesId)} className="eyesview" />
                    <img src={Delete} onClick={() => deleteQuations(data.QuesId)} className="eyesview" /></>,

            })
        })

        setRowData(rowDataList)

        console.log(props.editQuestions, "props")
    }, [props.viewAddedQuestions, props.editQuestions])
    console.log(props.quesId, "id")
    const editQuations = (Question, Choice, Answer, QuesId) => {
        setQusID(QuesId)
        setQuestion(Question)
        setChoice(Choice)
        setAnswer(Answer)
        setEditQuestionView(true)
        console.log(viewquetions, "viewquetions")

    }

    const deleteQuations = (QuesId) => {
        dispatch(deleteQuestions(QuesId))
        props.handleChangeCloseModel()
        notification.success({
            message: 'Question Deleted Successfully',
        });
    }

    return (
        <div>

            {/* {viewquetions && viewquetions.map((val) => {
                return ( */}
            <div className="viewques_container">
                <div className="viewques_head">
                    <div>Category</div>
                    <div>Sub Category</div>
                    <div>Question Type</div>
                    <div>No. Of Question</div>
                </div>
                <div className="viewques_values">
                    <div>{viewquetions && viewquetions.QuescatName}</div>
                    <div>{viewquetions && viewquetions.QuesubcatName}</div>
                    <div>{viewquetions && viewquetions.QuesType === 1 ? "Checklist" : "Radiobutton"}</div>
                    <div>{viewquetions && viewquetions.no_of_quest}</div>
                </div>
            </div>


            <div>
                <EnhancedTable headCells={headCells} rows={rowData} aligncss="usergroupcss"></EnhancedTable>
            </div>
            <DynModel modelTitle="Edit Question" handleChangeModel={editQuestionview} handleChangeCloseModel={(bln) => setEditQuestionView(bln)} width={1000}
                content={<EditQuestionsModal question={question} choice={choice} answer={answer} quesId={qusId} quescatId={props.quescatId} quessubcatId={props.quescatId} ques_type={props.ques_type} handleChangeCloseModel={(bln) => setEditQuestionView(bln)} />} closeModel={() => setEditQuestionView(false)} />

        </div>
    )
}

const mapStateToProps = (state) => (

    {
        viewAddedQuestions: state.AddQuations.viewAddedQuestions || [],
        editQuestions: state.AddQuations.editQuestions || [],
        delQuestions: state.AddQuations.delQuestions || []
    }
);

export default connect(mapStateToProps)(ViewQuestionsModal);