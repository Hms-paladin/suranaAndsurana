import react from 'react';
import './appraisal.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import ValidationLibrary from "../../helpers/validationfunction";
import PlusIcon from "../../images/plusIcon.svg";


function RatingModel() {
    return (
        <div>
            <div className="empDetailsIn">
                <div>
                    <div>Employee Name</div>
                    <div className="employeeData">Rajesh</div>
                </div>
                <div>
                    <div>Period</div>
                    <div className="employeeData">April 2021 to March 2021</div>
                </div>
            </div>
            <div className="areaDevelopment">

                <Grid item xs={4}>
                    <div className="appraisalFieldheading"> Area of Development</div>
                    <div>
                        <Labelbox type="select"
                        // changeData={(data) =>
                        //     checkValidation(data, "area_dev")
                        // }
                        // value={Appraisal.area_dev.value}
                        // error={Appraisal.area_dev.error}
                        // errmsg={Appraisal.area_dev.errmsg}
                        />
                    </div>
                </Grid>
                <img src={PlusIcon}  className="plusiconview" />
            </div>
            <div className="appraisalBtn">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" />
            </div>
        </div>
    )
}

export default RatingModel;