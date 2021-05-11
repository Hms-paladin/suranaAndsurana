import react from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from "../../component/DynTable/table";

import './checklists.scss'


const headCells = [
    { id: "department", label: "Department" },
    { id: "category", label: "Category" },
    { id: "listName", label: "Check List Name" },
    { id: "listType", label: "Check List Type" },
    { id: "taskItem", label: "TaskItem" },
    { id: "activity", label: "Activity" },
    { id: "subactivity", label: "Sub Activity" },
    { id: "frequency", label: "Frequency" },
]

const rows = [
    { department: "Research", category: "category1", listName: "listName1", listType: "simple", taskItem: "Book Hall", activity: "", subactivity: "", frequency: "" },
    { department: "", category: "", listName: "", listType: "simple", taskItem: "But Stationaries", activity: "", subactivity: "", frequency: "" },
    { department: "", category: "", listName: "", listType: "Task Linked", taskItem: "Documentaion", activity: "Activity", subactivity: "Sub Activity", frequency: "On Demand" },
    { department: "", category: "", listName: "", listType: "simple", taskItem: "Bio metric", activity: "", subactivity: "", frequency: "" },
    { department: "", category: "", listName: "", listType: "No Task Linked", taskItem: "Pay Electricaly bill", activity: "", subactivity: "", frequency: "Fortnightly" },
    { department: "", category: "", listName: "", listType: "Task linked", taskItem: "Monthly Report", activity: "Documentation", subactivity: "", frequency: "Monthly" },
]

function checkListCreation() {
    return (
        <div>
            <div className="mainHeading">Check List Creation</div>
            <div className="chechlistFields">
                <div className="firstrowFields">
                    <div>  <div className="TThead">Department</div>
                        <Labelbox type="select" /></div>
                    <div>  <div className="TThead">Category</div>
                        <Labelbox type="select" /></div>
                    <div>  <div className="TThead">Check List Name</div>
                        <Labelbox type="text" /></div>
                    <div>  <div className="TThead">Check List Type</div>
                        <Labelbox type="select" /></div>
                    <div>  <div className="TThead">Activity</div>
                        <Labelbox type="select" /></div>
                </div>
                <div className="secondrowFields">
                    <div>  <div className="TThead">Sub Activity</div>
                        <Labelbox type="select" /></div>
                    <div>  <div className="TThead">Frequency</div>
                        <Labelbox type="select" /></div>
                    <div className="taskfield">  <div className="TThead">Task</div>
                        <Labelbox type="text" /></div>
                    <div> <div className="TThead"></div><CustomButton btnName={"Add"} custombtnCSS="customaddbtn" btnCustomColor="customPrimary" /></div>
                </div>

            </div>
            <EnhancedTable
                headCells={headCells}
                rows={rows}
                aligncss="aligncss"
            />
            <div className="checklistBtn">
                <CustomButton btnName={"Save"} custombtnCSS="custombtn" btnCustomColor="customPrimary" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custombtn" />
            </div>
        </div>
    )
}

export default checkListCreation;