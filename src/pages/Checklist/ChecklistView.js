import React, { useCallback, useEffect, useState } from 'react'
import EnhancedTable from '../../component/DynTable/table'
import Labelbox from '../../helpers/labelbox/labelbox';
import { useDispatch, connect } from "react-redux";
// import { getEmpSupervisor } from '../../actions/MasterDropdowns';
import { getCheckListsView, getEmpSupervisor } from '../../actions/CheckListAction';
import moment from 'moment';

function CheckListView(props) {
    const dispatch = useDispatch();
    const [employeeId, setEmployeeId] = useState()
    const [employeelist, setEmployeelist] = useState({})
    const [rowData, setRowData] = useState([])

    const header = [
        { id: 'checklist', label: 'CheckList Name' },
        { id: 'startdate', label: 'Start Date' },
        { id: 'endmonth', label: 'End Month' },
        { id: 'week', label: 'Days Of Week' },
    ];

    useEffect(() => {
        dispatch(getEmpSupervisor())
    }, [])

    useEffect(() => {
        console.log(props.getEmployeeList, "props.getEmployeeList")

        let EmployeeList = []
        props.getEmployeeList.map((data, index) => {
            EmployeeList.push({
                value: data.name,
                id: data.emp_id,
            });
        });
        setEmployeelist({ EmployeeList })

        // Table Show:

        let rowDataList = []
        props.getCheckListsView && props.getCheckListsView.map((data, index) => {
            var Days = []
            var weeks = data.days_of_week.map((val) => {
                Days.push(val.days_of_week)
            })
            rowDataList.push({
                checklist: data.check_list,
                startdate: moment(data.start_date).format("DD-MMM-YYYY"),
                endmonth: moment(data.end_date).format("MMMM"),
                week: Days.toString()
            })
        })

        setRowData(rowDataList)

        console.log("setRowData", rowData)
    }, [props.getEmployeeList, props.getCheckListsView])


    const checkValidation = useCallback((data, key) => {

        dispatch(getCheckListsView(data))
        setEmployeeId(data)
    }, [employeeId])



    return (
        <div>
            <div className="mainHeading">CheckList Assigning View</div>
            <div className="clAssignFields_card">
                <div className="label_div_card"><Labelbox type="select" labelname="Employee"
                    changeData={(data) => checkValidation(data, "employee")}
                    dropdown={employeelist.EmployeeList}
                    value={employeeId}
                />
                </div>
                <EnhancedTable
                    headCells={header}
                    rows={rowData}
                    aligncss="aligncss" />
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>
(
    {
        getEmployeeList: state.CheckListReducer.getEmpSupervisor,
        getCheckListsView: state.CheckListReducer.getCheckListsView
    });
export default connect(mapStateToProps)(CheckListView);
