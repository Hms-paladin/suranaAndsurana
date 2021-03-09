import react from 'react';
import './projectIp2.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import { Tabs } from 'antd';

//import tab content:

import TradeMark from './TrademarkInternational/tradeMarkinternational';





const { TabPane } = Tabs;

function ProjectIp2() {

    function callback(key) {
        console.log(key);
    }

    function callbackinside(key) {
        console.log(key);
    }

   
    return (
        <div>
            <Grid item xs={12} container spacing={4} >
                <Grid item xs={9} container spacing={4} >
                    <Grid item xs={6}>
                        <Labelbox type="text"
                            placeholder={"Project Name *"}

                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Labelbox type="text"
                            placeholder={"Company Name*"}

                        />
                    </Grid>
                </Grid>

                <Grid item xs={3}  >
                    <Grid item xs={12} >
                        <Labelbox type="select"
                            placeholder={" Project Type"} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} container spacing={4}>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"Project  Sub Type *"}

                    />
                </Grid>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"Application"}

                    />
                </Grid>
                <Grid item xs={3} >
                    <Labelbox type="select"
                        placeholder={"International Filing "} />
                </Grid>
                <Grid item xs={3} >
                    <Labelbox type="select"
                        placeholder={" Billable Type *"} />
                </Grid>


            </Grid>
            <Grid item xs={12} container spacing={4}>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"HOD /Attorney"}

                    />
                </Grid>
                <Grid item xs={3}>
                    <Labelbox type="text"
                        placeholder={"Counsel"}

                    />
                </Grid>
                <Grid item xs={6}>
                    <Labelbox type="textarea"
                        placeholder={"Comments"}
                        rows={4}
                    />
                </Grid>
            </Grid>
            <Tabs onChange={callback} type="card" className="intellectualPropertyTab">
                <TabPane tab="Intellectual Property" key="1">
                    <Tabs onChange={callbackinside} type="card" className="tradeMarkTab">
                        <TabPane tab="Trade Mark" key="1">
                            <TradeMark />
                        </TabPane>
                        <TabPane tab="Patent" key="2">
                            Content of Tab Pane 2
                </TabPane>
                        <TabPane tab="Design" key="3">
                            Content of Tab Pane 3
                </TabPane>
                        <TabPane tab="CopyRight" key="4">
                            Content of Tab Pane 3
                </TabPane>


                    </Tabs>
                </TabPane>

            </Tabs>
        </div>
    )
}

export default ProjectIp2;