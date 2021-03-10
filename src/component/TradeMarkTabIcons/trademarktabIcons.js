import react, { useState } from 'react';
import './trademarktabIcons.scss';
import Grid from '@material-ui/core/Grid';


// Icons order :
import CheckList from '../../images/checkboxIcon.svg';
import ApproveIcon from '../../images/approveicon.svg';
import Tasks from '../../images/menuicon.svg';
import Application from '../../images/editicon.svg';
import GroupIcon from '../../images/groupicon.svg';


const TabIcons = [{ img: CheckList, title: "CHECKLIST" }, { img: ApproveIcon, title: "STAGE" }, { img: Tasks, title: "TASKS" }, { img: Application, title: "APPLICATION" }, { img: GroupIcon, title: "STAGE  MONITOR" }]


function TradeMarkTabIcons(props) {
    const [selectBox, setSelectBox] = useState()

    const tabBox =(boxName)=>{
        props.onChangeTabBox && props.onChangeTabBox(boxName)
    }

    return (
        <div className="tradeMarkIcons">

            <Grid item xs={12} container direction="row" justify="flex-end" className="tabsIcons" >
                {TabIcons.map((data, index) => {
                    return (
                        <div className="tabIconsView" onClick={() => tabBox(data.title)}>
                            <Grid><img src={data.img} className="tabIconImage" /></Grid>
                            <Grid> <div className="tabiconTitle">{data.title}</div></Grid>
                        </div>
                    )
                })}

            </Grid>
        </div >

    )
}
export default TradeMarkTabIcons;





