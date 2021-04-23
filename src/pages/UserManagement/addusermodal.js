import react, { useState } from 'react';
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import { Switch } from 'antd';
import './usermanagement.scss';
function UserMasterModal() {
    const [change, setchange] = useState(false)
    function SwitchChange() {
    }
    function onChange() {
        setchange(!change)

    }


    return (
        <div>
            <div className="groupame">
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={4} container direction="column">
                        <div>User Name</div>
                        <Labelbox type="text" />
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div>Password</div>
                        <input type="password" className="passwordinput" />
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div>Mobile Number</div>
                        <Labelbox type="text" />
                    </Grid>
                </Grid>
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={4} container direction="column">
                        <div>E-mail Id</div>
                        <Labelbox type="text" />
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div>User Type</div>
                        <Labelbox type="select" />
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div>User Group</div>
                        <Labelbox type="select" />
                    </Grid>
                </Grid>
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={4} container direction="row">
                        <div className="switchdiv">
                            {/* <div classname={change ? "activetrue" : "activefalse"}> */}
                                {change ? <div>In Active</div> : <div> Active</div>}
                                <Switch defaultChecked onChange={onChange} />
                                {/* <Switch checkedChildren="Active" unCheckedChildren="InActive" defaultChildren onClick={SwitchChange}></Switch> */}
                            {/* </div> */}
                        </div>
                    </Grid>
                    <Grid item xs={8} container direction="column"></Grid>
                </Grid>
            </div>
            <div className="groupbtn">
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
                <CustomButton btnName={"Create"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" />
            </div>
        </div>
    )
}
export default UserMasterModal;