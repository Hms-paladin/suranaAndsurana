import react, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table';
import ValidationLibrary from "../../helpers/validationfunction";
import PlusIcon from "../../images/plusIcon.svg";
import { useDispatch, connect } from "react-redux";


import './appraisal.scss';


function Appraisal() {
    const dispatch = useDispatch();
    const [addemployeeDetails, setAddemployeeDetails] = useState([])
    const [Appraisal, setAppraisal] = useState({
        area_dev: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        details: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        date: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
    })

    const AddempDetails = () => {
        addemployeeDetails.push({ details: Appraisal.details.value, date: Appraisal.date.value })
        setAddemployeeDetails([...addemployeeDetails])

    }


    function checkValidation(data, key) {
        console.log(data, key, "dataValue")

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Appraisal[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Appraisal[key].validation,
        };


        setAppraisal((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }
    return (
        <div>
            <div>Appraisal</div>
            <div className="appraisalContainer">
                <div className="empDetails">
                    <div>
                        <div>Employee Name</div>
                        <div>Rajesh</div>
                    </div>
                    <div>
                        <div>Period</div>
                        <div>April 2021 to March 2021</div>
                    </div>
                </div>
                <div>
                    <Grid item xs={12} container direction="row" spacing={2}>

                        <Grid item xs={3}>
                            <div className="appraisalFieldheading"> Area of Developement</div>
                            <div>
                                <Labelbox type="select"
                                    changeData={(data) =>
                                        checkValidation(data, "area_dev")
                                    }
                                    value={Appraisal.area_dev.value}
                                    error={Appraisal.area_dev.error}
                                    errmsg={Appraisal.area_dev.errmsg}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="appraisalFieldheading"> Details</div>
                            <div>
                                <Labelbox type="text"
                                    changeData={(data) =>
                                        checkValidation(data, "details")
                                    }
                                    value={Appraisal.details.value}
                                    error={Appraisal.details.error}
                                    errmsg={Appraisal.details.errmsg}

                                />
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="appraisalFieldheading">Date</div>
                            <div>
                                <Labelbox type="datepicker"
                                    changeData={(data) =>
                                        checkValidation(data, "date")
                                    }
                                    value={Appraisal.date.value}
                                    error={Appraisal.date.error}
                                    errmsg={Appraisal.date.errmsg}

                                />
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            <br />
                            <img src={PlusIcon} onClick={AddempDetails} />
                        </Grid>
                    </Grid>

                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Appraisal;