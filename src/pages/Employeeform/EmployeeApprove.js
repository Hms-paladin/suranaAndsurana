import React, { useState, useEffect } from 'react'
import Labelbox from '../../helpers/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import { useDispatch, connect } from "react-redux";
import { GetEmployeeApprove } from '../../actions/EmployeeApproveAction'
import { apiurl } from '../../utils/baseUrl'
import Axios from 'axios'
import CustomButton from '../../component/Buttons/button';
import { notification } from 'antd'
import { EmployeeApproveOrReject } from '../../actions/TodoListAction'
import moment from 'moment';
import { getHrTaskList } from "../../actions/TodoListAction";
function EmployeeApprove(props) {
    const dispatch = useDispatch();
    const [employee, setemployee] = useState([])

    useEffect(() => {
        // setresume_id(props.int_details_id)
        Axios({
            method: "post",
            url: apiurl + "get_employee_approval",
            data: {
                emp_id: props.emp_viewer_id && props.emp_viewer_id.interviewer_id,
            }
        }).then((response) => {
            setemployee(
                response.data.data.map((data) => ({
                    id: data.emp_id,
                    name: data.name,
                    designation: data.designation,
                    emp_code: data.employee_code,
                }))
            );
        })

    }, [props])

const InsertEmployee = (data) => {
    let status=false
        if (data === "accept") {
            status=true
        }
        if (data === "reject") {
            status=false
        }

        dispatch(EmployeeApproveOrReject(employee[0].id, status, props.emp_viewer_id.task_id)).then((response) => {
            props.closemodal()
        })
        //     Axios({
        //         method:"post",
        //         url:apiurl+"insert_employee_status",
        //         data:{
        //             "emp_id":employee.id,
        //             "approved_by":localStorage.getItem("empId"),
        //             "approved_date":moment().format('YYYY-MM-DD') ,
        //             "emp_status":status === true?1 :2, 
        //             "task_id":props.emp_viewer_id.task_id                                 
        //         },
        //     }).then((response)=>{
        //         if(response.data.status==1){
        //             props.closemodal()
        // dispatch(getHrTaskList())
        //             notification.success({
        //                 message: `Employee approved successfully`,
        //                 placement: "topRight",
        //               });
        //         }
        //         if(response.data.status==0){
        //             notification.warning({
        //                 message: `Employee rejected`,
        //                 placement: "topRight",
        //               });
        //         }

        //     })
        // props.closemodal()
    }
    return (
        <div>
            {employee.map((data) => {
                return (<div>
                    <Labelbox type="text" placeholder="Employee Id" disabled={true} value={data.emp_code==null?"":data.emp_code} />
                    <Labelbox type="text" placeholder="Employee N" disabled={true} value={data.name} />
                    <Labelbox type="text" placeholder="Designation" disabled={true} value={data.designation} />
                    <div className="employeeform_save">
                        {/* <CustomButton btnName={"Reject"} btnCustomColor="customPrimary" custombtnCSS="int_btn_save" onBtnClick={() => InsertEmployee("reject")} /> */}
                        <CustomButton btnName={"Approve"} btnCustomColor="customPrimary" custombtnCSS="int_btn_save" onBtnClick={() => InsertEmployee("accept")} />
                    </div>
                </div>
                )
            })
            }

        </div>
    )
}
const mapStateToProps = state => ({
    GetEmployeeApprove: state.getemployee
})

export default connect(mapStateToProps)(EmployeeApprove);