import React from 'react'
import ApplicationDomestic from './ApplicationDomestic'
import ApplicationForeign from './ApplicationForeign'
import ApplicationPCT from './ApplicationPCT'
import OppositionDefended  from './OppositionDefended'
import OppositionFilled from './OppositionFilled'
import Grid from '@material-ui/core/Grid';
import CustomButton from '../../../component/Butttons/button';
import Labelbox from "../../../helpers/labelbox/labelbox";
export default function Patent(){
    return(
        <div>
           {/* <ApplicationDomestic/> */}
           {/* <ApplicationForeign/> */}
           {/* <ApplicationPCT/> */}
           <OppositionDefended/>
           {/* <OppositionFilled/> */}
           <Grid item xs={12} container justify="flex-end">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save"/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"/>
            </Grid>
        </div>
    )
}