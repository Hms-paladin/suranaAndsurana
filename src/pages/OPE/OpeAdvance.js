import React from 'react'
import { Input,Icon } from 'antd';
import './OpeAdvance.scss'
export default function OPE(){

    return(
        <div>
             <div className="lib_master_h">OPE Advance</div>
                <div className="parent_div_lib">
                  <div className="noposition">
                     <div><div>Employee</div><div>Rajesh</div></div>
                     <div><div>Designation</div><div>Attorney</div></div>
                     <div><div>Department</div><div>Litigation</div></div>
                  </div>
                  <div className="noposition">
                     <div><div>Current Advance Amount</div><div>5000</div></div>
                     <div><div>Amount Spent</div><div>4,500</div></div>
                     <div><div>Balance</div><div>500</div></div>
                  </div>
                  <div>
                      <div>Advance Amount</div>
                     <Input   prefix={<Icon type="save" />}/>;
                 </div>
                </div>
        </div>
    )
}