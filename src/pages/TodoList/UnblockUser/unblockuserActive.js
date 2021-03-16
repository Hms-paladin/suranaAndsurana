import react, { useState } from "react";
import './unblockUser.scss';
import CustomButton from "../../../component/Butttons/button";
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

function UnblockUserActive() {
    const [change, setChange] = useState(false)

    function changeSwitch(){
        setChange(!change)
    }
console.log(change,"change")
    return (
        <div>
            <div className="empUserName">Employee Name</div>
            <div className="useActive">
                <div className="empStatus">Status</div>
                {/* <div className="empActive">ACTIVE</div> */}
                <div className={change?"useActivechange":"useActives"}>
                    <Switch checkedChildren="Active" unCheckedChildren="InActive" defaultChecked  onClick={changeSwitch}/>
                </div>
            </div>
            <div className="userbtnActive">
                <CustomButton btnName={"Approve "} btnCustomColor="customPrimary" />
            </div>
        </div>
    )
}
export default UnblockUserActive;