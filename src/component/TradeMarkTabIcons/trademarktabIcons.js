import react from 'react';
import './trademarktabIcons.scss';
import Grid from '@material-ui/core/Grid';


// Icons order :


import CheckList from '../../images/checkboxIcon.svg';
import ApproveIcon from '../../images/approveicon.svg';
import Tasks from '../../images/menuicon.svg';
import Application from '../../images/editicon.svg';
import GroupIcon from '../../images/groupicon.svg';

const TabIcons = [{ img: CheckList, title: "CHECKLIST"  }, { img: ApproveIcon, title: "STAGE" }, { img: Tasks, title: "TASKS" }, { img: Application, title: "APPLICATION" }, { img: GroupIcon, title: "STAGE  MONITOR" }]



function TradeMarkTabIcons(){
    function submit(){
        return (
            alert("tfuedh")
        )
       
    }
    return (
       <div className="tradeMarkIcons">
           
                <Grid item xs={12} container direction="row" justify="flex-end" className="tabsIcons" >
                    {TabIcons.map((data,index) => {
                        return (
                            <div   className="tabIconsView" onClick={submit}>
                                <Grid><img src={data.img} /></Grid>
                                <Grid> <div className="tabiconTitle">{data.title}</div></Grid>

                            </div>
                        )
                    })}

                </Grid>
            </div>

    )
}
export default TradeMarkTabIcons;