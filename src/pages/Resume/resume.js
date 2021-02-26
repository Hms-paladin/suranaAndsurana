import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Select, Row, Col } from 'antd'
import Labelbox from "../../helpers/labelbox/labelbox"
import SelectionIcon from '../../images/select.svg'
import CalenderIcon from '../../images/calender.svg'

import './resume.scss'


function ResumePage() {

    return (
        <div className="Container">
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Labelbox type="text" />
            </Grid>
            <Grid item xs={12}>
                <Labelbox type="select" />
            </Grid>
            <Grid item xs={12}>
                <Labelbox type="datepicker" />
            </Grid>
        </Grid>
        </div>
    )
}
export default ResumePage;