import react, { useState } from 'react';
import './tabs.scss';
import { Tabs, Radio } from 'antd';

const { TabPane } = Tabs;
const tabTitle=[{tabname:"t1"},{tabname:"t2"},{tabname:"t3"}]
function DynTabs(props) {
    
    return (
        <Tabs defaultActiveKey="1" type="card" style={{border:"1px solid #023E7D"}}>
            {/* {tabTitle.map((data)=>{
                return( */}
                    <TabPane  tab={props.tabHeading} key={props.keys} >
                    {props.tabContent}
                </TabPane>
                 {/* )
            })}  */}
            
                   
              
        </Tabs>
    )

}

export default DynTabs;