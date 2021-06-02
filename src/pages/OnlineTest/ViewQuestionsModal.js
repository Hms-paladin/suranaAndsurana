import React, { useEffect, useState } from 'react'
import EnhancedTable from '../../component/DynTable/table';
import { viewAddedQuestions } from "../../actions/AddQuationsAction";
import { connect, useDispatch } from "react-redux";


function ViewQuestionsModal(props) {
    const dispatch = useDispatch();
    const [viewquetions, setViewquetions] = useState({})
    const [rowData, setRowData] = useState([])


    const headCells = [
        { id: "question", label: "Question" },
        { id: "option", label: "Options" },
        { id: "answer", label: "Answer" }
    ];
  

    useEffect(() => {

        dispatch(viewAddedQuestions(props.quescatId, props.quessubcatId, props.ques_type))
    }, [props.quescatId, props.quessubcatId, props.ques_type])

    useEffect(() => {
        console.log(props.viewAddedQuestions, "viewAddedQuestion")

        setViewquetions(props.viewAddedQuestions[0])

        let rowDataList = []
        props.viewAddedQuestions && props.viewAddedQuestions.map((data, index) => {
            rowDataList.push({
                question: data.Question,
                option: data.Choice,
                answer: data.Answer

            })
        })

        setRowData(rowDataList)


    }, [props.viewAddedQuestions])
    console.log(viewquetions, "viewquetions")


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
            {/* )
            })} */}


            <div>
                <EnhancedTable headCells={headCells} rows={rowData} aligncss="usergroupcss"></EnhancedTable>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => (
    console.log(state.AddQuations, "state.getOptions.getCategory"),

    {
        viewAddedQuestions: state.AddQuations.viewAddedQuestions || [],
    }
);

export default connect(mapStateToProps)(ViewQuestionsModal);