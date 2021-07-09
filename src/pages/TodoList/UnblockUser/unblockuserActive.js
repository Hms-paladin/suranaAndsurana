import react, { useEffect, useState } from "react";
import './unblockUser.scss';
import CustomButton from "../../../component/Butttons/button";
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import {unblockUser } from "../../../actions/TodoListAction";
import { useDispatch, connect } from "react-redux";
import {getProjectTasks } from "../../../actions/TodoListAction";

function UnblockUserActive(props) {
    const [change, setChange] = useState(false)
    const [unblockData, setUnblockData] = useState([])
    const [loading,setloading]=useState(true)

    const dispatch = useDispatch();
    function changeSwitch(){
        setChange(!change)
        setloading(false)
    }
    useEffect(()=>{
        if(props.unblock_user_data){
            setUnblockData(props.unblock_user_data)
        }
    },[props.unblock_user_data])
    console.log(change,"change")

    const unblock=()=>{
        dispatch(unblockUser(props.unblock_user_data)).then(
            dispatch(getProjectTasks()),
            props.closemodal(false)
        )
    }
    return (
        <div>
            <div className="empUserName">{props.unblock_user_data&&props.unblock_user_data.employee}</div>
            <div className="useActive">
                <div className="empStatus">Status</div>
                {/* <div className="empActive">ACTIVE</div> */}
                <div className={change?"useActivechange":"useActives"}>
                    <Switch checkedChildren="Active" unCheckedChildren="InActive" defaultChecked  onChange={changeSwitch}/>
                </div>
            </div>
            <div className="userbtnActive">
                <CustomButton btnName={"Approve "} onBtnClick={unblock} btnCustomColor="customPrimary" />
            </div>
        </div>
    )
}
export default UnblockUserActive;