import React,{useState,useEffect}from 'react'
import { Input, Icon } from 'antd';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Checkbox, Collapse } from 'antd';
import CustomButton from '../../component/Butttons/button';
import './OpeAdvance.scss'

import { useDispatch, connect } from "react-redux";

function OPE_Expense(props) {
    const [saveRights, setSaveRights] = useState([])
    
        ///***********user permission**********/
useEffect(() => {
    if(props.UserPermission.length>0&&props.UserPermission){
       let  data_res_id = props.UserPermission.find((val) => { 
        return (
            "OPA/ Expenses- OPE - Save" == val.control 
        ) 
       })
       setSaveRights(data_res_id)

    }
    
    }, [props.UserPermission]);
    return (
        <div>
            <div style={{ fontSize: "20px", fontWeight: "600" }}>OPE</div>
            <div className="ope_container">
                <Grid item xs={12} spacing={2} container direction="row">
                    <Grid item xs={4} container direction="column">
                        <div>Project Type</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div>Project Name</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div>Client Name</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div>Expense Type</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div>Amount</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div>Made of Payment</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                </Grid>
                <div className="bill_contianer">
                    <div>BILL <Checkbox /></div>
                    <CustomButton btnName={"Upload"}  btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                </div>
                <div className="des_grid">
                    <Grid item xs={6} spacing={2}>
                        <div>Description</div>
                        <Labelbox type="textarea"></Labelbox>
                    </Grid>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <CustomButton btnName={"Save"}  btnDisable={!saveRights||saveRights.display_control&&saveRights.display_control==='N'?true:false} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
({
    UserPermission: state.UserPermissionReducer.getUserPermission,
});
export default connect(mapStateToProps) (OPE_Expense);