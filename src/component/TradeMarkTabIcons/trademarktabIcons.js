import React, { useEffect, useState } from 'react';
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
import { withStyles } from '@material-ui/core/styles';

import Timesheetmodel from '../../pages/Project IP1/TimesheetModel/Timesheetmodel';



function TradeMarkTabIcons(props) {
    const [variableRateIcon, setVariableRateIcon] = useState("")
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
    var TabIcons = [{ img: Rupees, title: "VARIABLE RATE" }, { img: Rupees, title: "OPE" }, { img: TimeSheet, title: "TIME SHEET" }, { img: CheckList, title: "CHECKLIST" }, { img: ApproveIcon, title: `${props.litigation ? 'CASE TYPE' : 'STAGE'}` }, { img: Tasks, title: "TASKS" }, { img: Application, title: "APPLICATION" }, { img: GroupIcon, title: `${props.litigation ? 'CASE LIFE CYCLE' : 'STAGE  MONITOR'}` }]

    const HtmlTooltip = withStyles((theme) => ({
        arrow: {
            color: theme.palette.common.white,
        },
        tooltip: {
            backgroundColor: 'white',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 700,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }))(Tooltip);

    useEffect(() => {
        setVariableRateIcon(props.variableRate.billable_type_id)
    }, [props.variableRate, props.checkListsAssigned, props.projectDetails])

    const showFromSec = props?.variableRate?.billable_type_id !== 2 ? 0 : null

    var showFromCheckList = true;
    if (props.checkListsAssigned.length > 0) {
        showFromCheckList = false;
    }

    if (showFromCheckList) {
        TabIcons = [{ img: Rupees, title: "VARIABLE RATE" }, { img: Rupees, title: "OPE" },
        { img: TimeSheet, title: "TIME SHEET" },
        { img: ApproveIcon, title: `${props.litigation ? 'CASE TYPE' : 'STAGE'}` }, { img: Tasks, title: "TASKS" },
        { img: Application, title: "APPLICATION" }, { img: GroupIcon, title: `${props.litigation ? 'CASE LIFE CYCLE' : 'STAGE  MONITOR'}` }]
    }

    if (showFromSec == 0) {
        TabIcons = [{ img: Rupees, title: "OPE" }, { img: TimeSheet, title: "TIME SHEET" },
        { img: CheckList, title: "CHECKLIST" }, { img: ApproveIcon, title: `${props.litigation ? 'CASE TYPE' : 'STAGE'}` },
        { img: Tasks, title: "TASKS" },
        { img: Application, title: "APPLICATION" }, { img: GroupIcon, title: `${props.litigation ? 'CASE LIFE CYCLE' : 'STAGE  MONITOR'}` }]
    }
    if (showFromSec == 0 && showFromCheckList) {
        TabIcons = [{ img: Rupees, title: "OPE" },
        { img: TimeSheet, title: "TIME SHEET" },
        { img: ApproveIcon, title: `${props.litigation ? 'CASE TYPE' : 'STAGE'}` }, { img: Tasks, title: "TASKS" },
        { img: Application, title: "APPLICATION" }, { img: GroupIcon, title: `${props.litigation ? 'CASE LIFE CYCLE' : 'STAGE  MONITOR'}` }]

    }

    return (
        <div className="tradeMarkIcons">

            <Grid item xs={12} container direction="row" justify="flex-end" className="tabsIcons" >

                {TabIcons.map((data, index) => {

                    return (
                        <div>
                            {data.title === "TIME SHEET" ?

                                <div>

                                    {data.title === data.title &&
                                        <HtmlTooltip open={open} onClose={handleClose} onOpen={handleOpen} arrow

                                            title={<Timesheetmodel />}
                                            onMouseEnter={() => setOpen(true)}
                                            onMouseLeave={() => setOpen(false)}
                                        >
                                            <div className="tabIconsView" onClick={() => (tabBox(data.title), setOpen(false))}>
                                                <Grid>{data.img && <img src={data.img} className="tabIconImage" />}</Grid>
                                                <Grid> <div className="tabiconTitle">{data.title}</div></Grid>
                                            </div>
                                        </HtmlTooltip>}

                                </div>
                                :
                                <div className="tabIconsView" onClick={() => tabBox(data.title)}>
                                    {data.img && <Grid><img src={data.img} className="tabIconImage" /></Grid>}
                                    <Grid> <div style={{ marginTop: 0 }} className="tabiconTitle">{data.title}</div></Grid>
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





