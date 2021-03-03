import react from 'react';
import './projectIpOption2.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Tabs } from 'antd';
import TradeMark from './TradeMarkOposition2/tradeMarkOposition2';
const { TabPane } = Tabs;


function projectIpoption2() {

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
                            placeholder={"Company Name *"}
                         
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
                        placeholder={"Project Sub type *"}

                    />
                </Grid>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"Oposition"}

                    />
                </Grid>
                <Grid item xs={3} >
                    <Labelbox type="select"
                        placeholder={"Filed"} />
                </Grid>
                <Grid item xs={3} >
                    <Labelbox type="select"
                        placeholder={" Billable Type *"} />
                </Grid>


            </Grid>
            <Grid item xs={12} container spacing={4}>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"HOD /Attorney *"}

                    />
                </Grid>
                <Grid item xs={3}>
                    <Labelbox type="select"
                        placeholder={"Counsel"}

                    />
                </Grid>
                <Grid item xs={6}>
                    <Labelbox type="textarea"
                        placeholder={"Application"}
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
export default projectIpoption2;