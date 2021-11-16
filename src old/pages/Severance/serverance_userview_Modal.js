import React,{useState} from 'react'
import Grid from '@material-ui/core/Grid';
import CustomButton from '../../component/Butttons/button';
import './severance.scss'
function ServeranceModal(){
    return(
        <div style={{backgroundColor:'white'}}>
            <div className="serverance_container">
                <div className="container_head">
                    <div>Employee Name</div>
                    <div>Designation</div>
                    <div>Department</div>
                </div>
                <div className="container_values">
                    <div>Rajesh</div>
                    <div>Attorney</div>
                    <div>Litigation</div>
                </div>
            </div>
             <div className="serverance_container">
                <div className="container_Date">
                    <div>Date Of Resignation</div>
                    <div>Resignation Accepted Date And By</div>
                    <div>Proposed Date Of Relieving</div>
                </div>
                <div className="container_Date c1">
                    <div>23-Mar-2021</div>
                    <div>14-Mar-2021 / Ravi</div>
                    <div>23-Mar-2021</div>
                </div>
            </div>
            <div className="NOC_container">
                <div className="NOC_head">
                    <div>IT Date Of NOC</div>
                    <div >IT NOC By</div>
                    <div className="adminnoc">Admin Date Of NOC</div>
                    <div>Admin NOC By</div>
                    <div>HR Date Of NOC</div>
                    <div>HR NOC By</div>
                </div>
                <div className="NOC_values">
                    <div>23-Mar-2021</div>
                    <div >Kumar</div>
                    <div className="adminnoc">23-Mar-2021</div>
                    <div>Ravi</div>
                    <div>23-Mar-2021</div>
                    <div>Jeeva</div>
                </div>
            </div>
            <div className="serverance_container">
                <div className="container_head">
                    <div>Actual Date Of Relieving</div>
                </div>
                <div className="container_values">
                    <div>23-Mar-2021</div>
                </div>
            </div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",paddingBottom: 10}}>
                <CustomButton btnName={"OK"} btnCustomColor="customPrimary"
                custombtnCSS={"ok_btn_css"} onBtnClick={""}/>
            </div>
        </div>
    )
}
export default ServeranceModal;