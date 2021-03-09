import react from 'react';
import './stagesicon.scss';
import TabIcons from '../../component/TradeMarkTabIcons/trademarktabIcons';
import Grid from '@material-ui/core/Grid';


function stages() {
    return (
        <div>
            <Grid>

                <div className="StagesTitle">Stages</div>
                <TabIcons />

            </Grid>

            <Grid item xs={12} container direction="row">
                <Grid item xs={6}>
                    welcome
                </Grid>
                <Grid item xs={6}>
                    welcome
                </Grid>
            </Grid>
        </div>
    )
}

export default stages;