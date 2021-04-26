import React from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './LibraryBook.scss'
import EnhancedTable from '../../component/DynTable/table';
import PlusIcon from "../../images/plusIcon.svg";
function IssueBooksModal() {
    return (
            <div>
                <div className="Rtitlediv">
                    <div className="RModalTitle">Resource</div>
                    <div className="RModalTitle">Subject</div>
                    <div className="RModalTitle">Author</div>
                    <div className="RModalTitle">Title</div>
                    <div className="RModalTitle">Year Of Publication</div>
                    <div className="RModalTitle">Department</div>
                    <div className="RModalTitle">Copies</div>
                </div>
                
                <div className="Rvaluesdiv">
                    <div className="RModalValues" style={{width:"113px"}}>Book</div>
                    <div className="RModalValues" style={{width:"102px"}}>Law</div>
                    <div className="RModalValues" style={{width:"100px"}}>Litigation</div>
                    <div className="RModalValues" style={{width:"82px"}}>Title 1</div>
                    <div className="RModalValues" style={{width:"171px"}}>1990</div>
                    <div className="RModalValues" style={{width:"134px"}}>Department 1</div>
                    <div className="RModalValues" style={{width:"55px"}}>5</div>
                </div>
                <div className="linespace"></div>
                <div className="plusgrid">
                    <Grid item xs={6} container direction="row" spacing={2}>
                        <Grid item xs={5} container direction="column">
                            <div className="RModalTitle">Employee Code</div>
                            <Labelbox type="text" />
                        </Grid>
                        <Grid item xs={1} container direction="row" justify="center" alignitems="center">
                            <img src={PlusIcon} className="plusicon"></img>
                        </Grid>
                    </Grid>
                </div>
                <div className="RGridcss">
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={2} direction="column">
                        <div className="RModalTitle">Employee Name</div>
                        <div className="RModalValues">Rajesh</div>
                    </Grid>
                    <Grid item xs={2} direction="column">
                        <div className="RModalTitle">Designation</div>
                        <div className="RModalValues">Rajesh</div>
                    </Grid>
                    <Grid item xs={2} direction="column">
                        <div className="RModalTitle">Department</div>
                        <div className="RModalValues">Litigation</div>
                    </Grid>
                </Grid>
                </div>
               
                <div className="okbtndiv">
                <CustomButton btnName={"Ok"}  btnCustomColor="customPrimary" 
                            custombtnCSS={"ok_btn_css"} onBtnClick={""}/>
                </div>
        </div>
    )
}
export default IssueBooksModal;