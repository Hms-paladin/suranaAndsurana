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


function TradeMarkTabIcons() {
    const [test,setTest] =useState()
    // if (event == "CHECKLIST") {
    //     function func1() {


    //         console.log("test1")


    //     };

    // }
    // else if (event == "STAGE") {

    //     function func2() {
    //         return (
    //             console.log("test2")
    //         )

    //     }
    // }
    // else {
    //     function func3() {
    //         return (
    //             console.log("test3")
    //         )

    //     }
    // }

    function multiplefunction(event) {
        setTest(event)
        func1(event);
        func2(event);
        func3(event);
       
    }

    


    function func1(){

        if(test=="CHECKLIST"){
            console.log("test")
        }
        
    }
    function func2(){
        if(test=="Task"){
            console.log(test,"test1")
        }
    }
    function func3(){
        console.log("test2")
    }
    return (
        <div className="tradeMarkIcons">

            <Grid item xs={12} container direction="row" justify="flex-end" className="tabsIcons" >
                {TabIcons.map((data, index) => {
                    return (
                        <div className="tabIconsView" onClick={() => multiplefunction("TASK")}>
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





// <Grid item xs={12} container direction="row" justify="flex-end" className="tabsIcons" >
// <div className="tabIconsView" onClick={props.checklist}>
//     <Grid><img src={CheckList} className="tabIconImage" /></Grid>
//     <Grid> <div className="tabiconTitle">CHECKLIST</div></Grid>

// </div>
// <div className="tabIconsView" onClick={props.stage}>
//     <Grid><img src={ApproveIcon} className="tabIconImage" /></Grid>
//     <Grid> <div className="tabiconTitle">STAGE</div></Grid>

// </div>
// <div className="tabIconsView" onClick={props.task}>
//     <Grid><img src={Tasks} className="tabIconImage" /></Grid>
//     <Grid> <div className="tabiconTitle">TASKS</div></Grid>

// </div>
// <div className="tabIconsView" onClick={props.application}>
//     <Grid><img src={Application} className="tabIconImage" /></Grid>
//     <Grid> <div className="tabiconTitle">APPLICATION</div></Grid>

// </div>
// <div className="tabIconsView" onClick={props.stageMonitor}>
//     <Grid><img src={GroupIcon} className="tabIconImage" /></Grid>
//     <Grid> <div className="tabiconTitle">STAGE  MONITOR</div></Grid>

// </div>
// </Grid>