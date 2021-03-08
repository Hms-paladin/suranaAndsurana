import React from 'react'
import Grid from '@material-ui/core/Grid';
import CustomButton from '../../../component/Butttons/button';
import Tabs from '../../../component/TradeMarkTabIcons/trademarktabIcons';
import Labelbox from "../../../helpers/labelbox/labelbox";

// tradeMark pages:
import TMapplicationFiling from './trademarks';
import TMapplicationInternationalFiled from './tmApp_InternationalFiling';
import TMoppositionFiled from './tmOppo_Filed';
import TMoppositionDefended from './tmOppo_Defended'

export default function TradeMark(props) {
    console.log(props, "props")
    return (
        <div>
            <Tabs />
            {
                props.Type.process_type.value === '' && props.Type.filling_type.value == '' &&
                <TMapplicationFiling />

            }

            {
                props.Type.process_type.value === '1' && props.Type.filling_type.value == '1' &&
                <TMapplicationFiling />

            }
            {
                props.Type.process_type.value === '1' && props.Type.filling_type.value == '2' &&
                <TMapplicationInternationalFiled />

            }
            {
                props.Type.process_type.value === '4' && props.Type.filling_type.value == '1' &&
                <TMoppositionFiled />
            }
            {
                props.Type.process_type.value === '4' && props.Type.filling_type.value == '2' &&
                //    <OppositionDefended/>
                <TMoppositionDefended />
            }



            {/* <Grid item xs={12} container justify="flex-end" className="patent_btns">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save"/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"/>
            </Grid> */}
        </div>
    )
}