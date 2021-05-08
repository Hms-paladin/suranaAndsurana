import React from 'react'
import { Input, Icon } from 'antd';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Checkbox, Collapse } from 'antd';
import CustomButton from '../../component/Butttons/button';
import './OpeAdvance.scss'
export default function OPE_Expense() {
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
                    <CustomButton btnName={"Upload"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                </div>
                <div className="des_grid">
                    <Grid item xs={6} spacing={2}>
                        <div>Description</div>
                        <Labelbox type="textarea"></Labelbox>
                    </Grid>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                </div>
            </div>
        </div>
    )
}