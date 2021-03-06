import React from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './LibraryBook.scss'
import EnhancedTable from '../../component/DynTable/table'
function ReceiveBooksModal() {
    return (
        <div>
            <div className="RIContainer">
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
                    <div className="RModalValues">Book</div>
                    <div className="RModalValues">Law</div>
                    <div className="RModalValues">Litigation</div>
                    <div className="RModalValues">Title 1</div>
                    <div className="RModalValues">1990</div>
                    <div className="RModalValues">Department 1</div>
                    <div className="RModalValues">5</div>
                </div>
            </div>
            <div className="linespace"></div>
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
            <div className="RGridcss1">
                <Grid item xs={6} container direction="column" spacing={3}>
                    <div className="RModalTitle" style={{ marginBottom: "5px" }}>Book Condition</div>
                    <Labelbox type="text" />
                </Grid>
            </div>
            <div className="okbtndiv">
                <CustomButton btnName={"Ok"} btnCustomColor="customPrimary"
                    custombtnCSS={"ok_btn_css"} onBtnClick={""} />
            </div>
        </div>
    )
}
export default ReceiveBooksModal;