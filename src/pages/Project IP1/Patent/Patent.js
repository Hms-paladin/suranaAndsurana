import React from 'react'
import ApplicationDomestic from './ApplicationDomestic'
import Grid from '@material-ui/core/Grid';
import CustomButton from '../../../component/Butttons/button';
import Labelbox from "../../../helpers/labelbox/labelbox";
export default function Patent(){
    return(
        <div>
           <ApplicationDomestic/>
           <Grid item xs={12} container justify="end">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" />
                <CustomButton btnName={"Cancel"} />

            </Grid>
        </div>
    )
}