import react, { useState } from 'react';
import './stagesicon.scss';
import TabIcons from '../../component/TradeMarkTabIcons/trademarktabIcons';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import AddIcon from '../../images/addIcon.svg';
import CustomButton from '../../component/Butttons/button';

function Stages() {
    const [test, setTest] = useState([])

    function Addbox() {
        setTest([...test, <Grid item xs={9} container direction="row" spacing={2}>
            <Grid item xs={5}>
                <Labelbox type="select" />

            </Grid>
            <Grid item xs={5}>
                <Labelbox type="select" />
            </Grid>
           
        </Grid>])


    }

    return (
        <div>
            <Grid>

                <div className="StagesTitle">Stages</div>



            </Grid>

            <Grid item xs={9} container direction="row" spacing={2}>
                <Grid item xs={5}>
                    <Labelbox type="select" 
                    placeholder="Stage" />

                </Grid>
                <Grid item xs={5}>
                    <Labelbox type="select" />
                </Grid>
                <Grid item xs={2}>
                    <img src={AddIcon} onClick={Addbox} />
                </Grid>
            </Grid>
            {test}

            <Grid item xs={11} container justify="center" className="patent_btns">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
            </Grid>
        </div>
    )
}

export default Stages;