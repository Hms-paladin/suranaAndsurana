import React, { useCallback, useEffect, useState } from 'react'
import EnhancedTable from '../../component/DynTable/table'
import Labelbox from '../../helpers/labelbox/labelbox';
import { useDispatch, connect } from "react-redux";
import { getEmployeeList } from '../../actions/MasterDropdowns';

function CheckListView(props) {
    const dispatch = useDispatch();
    const [employeeId, setEmployeeId] = useState()
    const [employeelist, setEmployeelist] = useState({})

    const header = [
        { id: 'checklist', label: 'CheckList Name' },
        { id: 'startdate', label: 'Start Date' },
        { id: 'endmonth', label: 'End Month' },
        { id: 'week', label: 'Days Of Week' },
    ];

    useEffect(() => {
        dispatch(getEmployeeList())
    }, [])

    useEffect(() => {
        let EmployeeList = []
        props.getEmployeeList.map((data, index) => {
            EmployeeList.push({
                value: data.name,
                id: data.emp_id,
            });
        });
        setEmployeelist({ EmployeeList })
    }, [props.getEmployeeList])


    const Rows = [
        { checklist: "Checklist1", startdate: "15/06/2021", endmonth: "Septemper", week: "7" }
    ]
    const checkValidation = useCallback((data, key) => {
        setEmployeeId(data)
    }, [employeeId])



    return (
        <div>
            <div className="mainHeading">CheckList Assigning View</div>
            <div className="clAssignFields_card">
                <div className="label_div_card"><Labelbox type="select" labelname="Employee"
                    changeData={(data) => checkValidation(data, "employee")}
                    dropdown={employeelist.EmployeeList}
                // value={kpi_form.toperiod.value}
                />
                </div>
                <EnhancedTable
                    headCells={header}
                    rows={Rows}
                    aligncss="aligncss" />
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>
(
    {
        getEmployeeList: state.getOptions.getEmployeeList
    });
export default connect(mapStateToProps)(CheckListView);
