import React, { useState } from 'react';
import './trademarktabIcons.scss';
import Grid from '@material-ui/core/Grid';


// Icons order :
import CheckList from '../../images/checkboxIcon.svg';
import ApproveIcon from '../../images/approveicon.svg';
import Tasks from '../../images/menuicon.svg';
import Application from '../../images/editicon.svg';
import GroupIcon from '../../images/groupicon.svg';
import TimeSheet from '../../images/timesheet.svg';
import Rupees from '../../images/rupeesIcon.svg';


import Tooltip from '@material-ui/core/Tooltip';
import { withStyles} from '@material-ui/core/styles';


const TabIcons = [{ img: Rupees, title: "OPE" }, { img: TimeSheet, title: "TIME SHEET" }, { img: CheckList, title: "CHECKLIST" }, { img: ApproveIcon, title: "STAGE" }, { img: Tasks, title: "TASKS" }, { img: Application, title: "APPLICATION" }, { img: GroupIcon, title: "STAGE  MONITOR" }]

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: 'white',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 700,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);
function TradeMarkTabIcons(props) {
    const [selectBox, setSelectBox] = useState()

    const tabBox = (boxName) => {
        props.onChangeTabBox && props.onChangeTabBox(boxName)
    }

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <div className="tradeMarkIcons">
 
            <Grid item xs={12} container direction="row" justify="flex-end" className="tabsIcons" >
                {TabIcons.map((data, index) => {
                    return (
                        <div>
                            {data.title === "TIME SHEET" ?

                                <div>
                                    
                                    <HtmlTooltip open={open} onClose={handleClose} onOpen={handleOpen} arrow
        
                                        title={
                                           
                                                <div className="tabIconsViewtooltip">
                                                    <div className="tooltiptitle">Time Sheet</div>
                                                    <div style={{ backgroundColor: '#F0F0F0', padding: 10 }}>
                                                        <Grid container >
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                container
                                                                direction="row"
                                                                className="spaceBtGrid"
                                                                alignItems="center"
                                                                style={{ padding: 5,marginLeft: 36 }}
                                                            >
                                                                <Grid item xs={3}>
                                                                    <label className="maintitle"></label>
                                                                </Grid>
                                                                <Grid item xs={3}>
                                                                    <label className="maintitle">Start Date & Time</label>
                                                                </Grid>
                                                                <Grid item xs={3}>
                                                                    <label className="maintitle">End Date & Time</label>
                                                                </Grid>
                                                                <Grid item xs={3}>
                                                                    <label className="maintitle">No. of Hours</label>
                                                                </Grid>

                                                            </Grid>


                                                            <Grid
                                                                item
                                                                xs={12}
                                                                container
                                                                direction="row"
                                                                className="spaceBtGrid"
                                                                alignItems="center"
                                                                style={{ border: '1px solid lightgray',paddingLeft: -5 }}
                                                            >
                                                                <Grid item xs={3}>
                                                                    <Grid item xs={12}>
                                                                        <div style={{display:'grid',textAlign:'center'}}>
                                                                            <label style={{ fontWeight: 'bold' }}>Documentation </label>
                                                                            <label className="subtitle"> Sub Activity</label>
                                                                        </div>
                                                                    </Grid>

                                                                </Grid>
                                                                <Grid item xs={9}>

                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                        container
                                                                        direction="row"
                                                                        className="spaceBtGrid"
                                                                        alignItems="center"
                                                                        style={{ padding: 5 }}
                                                                    >
                                                                        <Grid item xs={3}>
                                                                            <label className="time">07-mar-2020  07:00 am</label>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            <label className="time">07-mar-2020  08:00 am</label>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            <label className="hours">1</label>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                        container
                                                                        direction="row"
                                                                        className="spaceBtGrid"
                                                                        alignItems="center"
                                                                        style={{ padding: 5 }}
                                                                    >
                                                                        <Grid item xs={3}>
                                                                            <label className="time">07-mar-2020  07:00 am</label>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            <label className="time">07-mar-2020  08:00 am</label>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            <label className="hours">1</label>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                        container
                                                                        direction="row"
                                                                        className="spaceBtGrid"
                                                                        alignItems="center"
                                                                        style={{ padding: 5 }}
                                                                    >
                                                                        <Grid item xs={3}>
                                                                            <label className="time">07-mar-2020  07:00 am</label>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            <label className="time">07-mar-2020  08:00 am</label>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            <label className="hours">1</label>
                                                                        </Grid>
                                                                    </Grid>

                                                                </Grid>

                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                container
                                                                direction="row"
                                                                className="spaceBtGrid"
                                                                alignItems="center"
                                                                style={{ border: '1px solid lightgray', borderTop: 0 }}
                                                            >
                                                                <Grid item xs={3}>
                                                                    <Grid item xs={12}>
                                                                    <div style={{display:'grid',textAlign:'center'}}>
                                                                        <label style={{ fontWeight: 'bold' }}>Hearing </label>
                                                                        <label className="subtitle"> Non effective</label>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={9}>

                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                        container
                                                                        direction="row"
                                                                        className="spaceBtGrid"
                                                                        alignItems="center"
                                                                        style={{ padding: 5 }}
                                                                    >
                                                                        <Grid item xs={3}>
                                                                            <label className="time">07-mar-2020  07:00 am</label>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            <label className="time">07-mar-2020  08:00 am</label>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            <label className="hours">1</label>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                        container
                                                                        direction="row"
                                                                        className="spaceBtGrid"
                                                                        alignItems="center"
                                                                        style={{ padding: 5 }}
                                                                    >
                                                                        <Grid item xs={3}>
                                                                            <label className="time">07-mar-2020  07:00 am</label>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            <label className="time">07-mar-2020  08:00 am</label>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            <label className="hours">1</label>
                                                                        </Grid>
                                                                    </Grid>


                                                                </Grid>

                                                            </Grid>

                                                        </Grid>
                                                    </div>
                                                </div>

                                        }
                                    >
                                        <div className="tabIconsView" onClick={() => tabBox(data.title)}>
                                            <Grid><img src={data.img} className="tabIconImage" /></Grid>
                                            <Grid> <div className="tabiconTitle">{data.title}</div></Grid>
                                        </div>
                                    </HtmlTooltip>
                               
                                </div>
                                :
                                <div className="tabIconsView" onClick={() => tabBox(data.title)}>
                                    <Grid><img src={data.img} className="tabIconImage" /></Grid>
                                    <Grid> <div className="tabiconTitle">{data.title}</div></Grid>
                                </div>
                            }


                        </div>

                    )
                })}

            </Grid>
        </div >
    )
}
export default TradeMarkTabIcons;





