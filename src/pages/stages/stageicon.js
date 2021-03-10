import react, { useState } from 'react';
import './stagesicon.scss';
import TabIcons from '../../component/TradeMarkTabIcons/trademarktabIcons';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import AddIcon from '../../images/addIcon.svg';
import CustomButton from '../../component/Butttons/button';

function Stages() {
    const [addRows, setAddRows] = useState([])
    // const [indexValue, setindexValue] = useState([])


    function Addbox() {
        setAddRows([...addRows, <Grid item xs={9} container direction="row" spacing={2}>
            <Grid item xs={5}>
                <Labelbox type="select" />
            </Grid>
            <Grid item xs={5}>
                <Labelbox type="select" />
            </Grid>
            {/* <Grid item xs={2} onClick={()=>deleterow(addRows[0])}>
                Delete
            </Grid> */}

        </Grid>])


    }

    // function deleterow(id) {
    //     console.log(id, "addRows")
    //     if (id > -1) {
    //         addRows.splice(id, 1);
    //       }
    //       setAddRows([...addRows])
    // }

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
                    <img src={AddIcon} onClick={() => Addbox()} />
                </Grid>
            </Grid>

            {addRows}

            <Grid item xs={9} container direction="row" spacing={2}>
                <Grid item xs={5}>
                    <div className="stageHeading" >Stages</div>
                    <div >Stages</div>
                    <div >Stages</div>
                    <div >Stages</div>
                    <div >Stages</div>

                </Grid>
                <Grid item xs={5}>
                    <div className="stageHeading"> Sub Stages</div>
                    <div > Sub Stages</div>
                    <div >Sub Stages</div>
                    <div >Sub Stages</div>
                    <div >Sub Stages</div>

                </Grid>

            </Grid>
            <div className="stagebtn">
                    <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                    <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
            </div>
        </div>
    )
}

export default Stages;