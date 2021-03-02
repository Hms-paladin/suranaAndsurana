import react, { useState } from 'react';
import './tabs.scss';
import { Tabs, Radio } from 'antd';

const { TabPane } = Tabs;

function DynTabs(props) {
    return (
        <Tabs defaultActiveKey="1" type="card" style={{border:"1px solid #023E7D"}}>
            
                    <TabPane   tab={props.tabHeading} key={props.keys} >
                        {props.tabContent}
                    </TabPane>
              
        </Tabs>
    )

}

export default DynTabs;