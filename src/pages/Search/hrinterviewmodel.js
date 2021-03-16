import react from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from "../../component/Butttons/button";

function HrInterviewModel() {
    return (
        <div>
           
                <Labelbox type="select" placeholder="Round" />
                <Labelbox type="select" placeholder="Designation" />
                <Labelbox type="datepicker" placeholder="Proposed Date" />
                <Labelbox type="select" placeholder="Interviewer" />
          
            <div className="hrbtnInterview"><CustomButton btnName={"Save"} btnCustomColor="customPrimary" /></div>
        </div>
    )
}
export default HrInterviewModel;