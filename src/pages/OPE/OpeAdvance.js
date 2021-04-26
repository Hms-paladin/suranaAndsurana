import React from 'react'
import { Input,Icon } from 'antd';
import './OpeAdvance.scss'
import Dollar from '../../images/dollar.svg'
import CustomButton from '../../component/Butttons/button'
import Divider from '@material-ui/core/Divider';
export default function OPE(){

    return(
        <div>
             <div className="lib_master_h">OPE Advance</div>
                <div className="parent_div_ope">

                  <div className="noposition">
                     <div><div>Employee</div><div>Rajesh</div></div>
                     <div><div>Designation</div><div>Attorney</div></div>
                     <div><div>Department</div><div>Litigation</div></div>
                  </div>
                  <Divider/>
                  <div className="noposition_snd">
                     <div><div>Current Advance Amount</div><div>₹ 5000</div></div>
                     <div><div>Amount Spent</div><div>₹ 4,500</div></div>
                     <div><div>Balance</div><div>₹ 500</div></div>
                  </div>
                  
                      <div className="advance_amt">
                      <div>Advance Amount</div>
                       <Input   prefix={<img src={Dollar}/>} style={{width:"40%"}}/>
                      </div>
                     
                      <div className="ope_advance_btns">
                                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="ope_save" />
                                <CustomButton btnName={"Cancel"} custombtnCSS="ope_save" />
                            </div>
                </div>
        </div>
    )
}