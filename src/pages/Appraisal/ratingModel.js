import react, { useEffect, useState } from 'react';
import './appraisal.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import PlusIcon from "../../images/plusIcon.svg";
import { GetDevelopment } from '../../actions/MasterDropdowns';
import { useDispatch, connect } from "react-redux";
import { id, tr } from 'date-fns/locale';
import { InsertSupervisorRate, GetEmpAppraisalSupRate, InsertManagingPartnerRate } from '../../actions/AppraisalAction';
import moment from 'moment';
import { notification } from 'antd';
import Edit from "../../images/editable.svg";




function RatingModel(props) {
    const dispatch = useDispatch();
    const [areDevelopment, setAreDevelopment] = useState({})
    const [development, setDevelopment] = useState()
    const [ratingAttribute, setRatingAttribute] = useState({
        punchuvality: [
            { key: "Always on time and completes the task well ahead of time", value: [9, 8, 7] },
            { key: "Maintains the time and complete the tasks with few reminders", value: [6, 5, 4] },
            { key: "Unable to keep up with time and requires constant reminders to complete the tasks", value: [3, 2, 1] }
        ],
        communication: [
            { key: "Able to express very clearly", value: [9, 8, 7] },
            { key: "Able to express with some difficulty", value: [6, 5, 4] },
            { key: "Improvement required to express the thoughts", value: [3, 2, 1] }
        ],
        teamwork: [
            { key: "Team Player", value: [9, 8, 7] },
            { key: "Contributes, if requested", value: [6, 5, 4] },
            { key: "Unable to cope up with team work", value: [3, 2, 1] }
        ],
        endurance: [
            { key: "Quality of work never varies in a stressed environment and ready to put in long hours", value: [9, 8, 7] },
            { key: "Encouragement required once in a while", value: [6, 5, 4] },
            { key: "Constant encouragement requires and breaks down very easily", value: [3, 2, 1] }
        ],
        initiative: [
            { key: "On Own, takes lot initiative in improving the quality of work", value: [9, 8, 7] },
            { key: "With little push, takes initiative to improve the quality of work", value: [6, 5, 4] },
            { key: "Carries out the woek only as instructed", value: [3, 2, 1] }
        ],
        personalhabit: [
            { key: "Courteous to superiors and colleagues", value: [9, 8, 7] },
            { key: "Respectful and work along with other colleagues", value: [6, 5, 4] },
            { key: "Respectful to superiors but doesn't have any concern for sub-ordinates", value: [3, 2, 1] }
        ],
        commitment: [
            { key: "Highly committed to the cause", value: [9, 8, 7] },
            { key: "Does the needful", value: [6, 5, 4] },
            { key: "Constant monitoring required.", value: [3, 2, 1] }
        ],
        supervision: [
            { key: "No supervision is required", value: [9, 8, 7] },
            { key: "Supervision required sometimes", value: [6, 5, 4] },
            { key: "Supervision required all the times", value: [3, 2, 1] }
        ],
        presentassignment: [
            { key: "Very through in the area", value: [9, 8, 7] },
            { key: "Satisfactory", value: [6, 5, 4] },
            { key: "Needs lot of improvement", value: [3, 2, 1] }
        ],
        applicationknowledge: [
            { key: "Applies very efficiently", value: [9, 8, 7] },
            { key: "Needs guidance sometimes", value: [6, 5, 4] },
            { key: "Need to be guided always", value: [3, 2, 1] }
        ],
        meatingdeadlines: [
            { key: "Finishes assignments well ahead of deadlines", value: [9, 8, 7] },
            { key: "Finishes in time and some degree of  monitoring required", value: [6, 5, 4] },
            { key: "Always lag behind and requires constant prodding", value: [3, 2, 1] }
        ],
        presentationskills: [
            { key: "Excellent", value: [9, 8, 7] },
            { key: "Satisfactory", value: [6, 5, 4] },
            { key: "Needs lot of improvement", value: [3, 2, 1] }
        ],
        suitableassignment: [
            { key: "High Suitable", value: [9, 8, 7] },
            { key: "With some hard work can do better", value: [6, 5, 4] },
            { key: "Not suitable", value: [3, 2, 1] }
        ],
        preparationdocument: [
            { key: "Excellent", value: [9, 8, 7] },
            { key: "Satisfactory", value: [6, 5, 4] },
            { key: "Needs lot of improvements", value: [3, 2, 1] }
        ],
        additionwork: [
            { key: "Adds lot of value to any job", value: [9, 8, 7] },
            { key: "Adds value once in a while", value: [6, 5, 4] },
            { key: "PErforms a mediocre job", value: [3, 2, 1] }
        ],
        clientmanagement: [
            { key: "Handles client very effeciently", value: [9, 8, 7] },
            { key: "Handles Satisfactorily", value: [6, 5, 4] },
            { key: "Requires lot of improvement", value: [3, 2, 1] }
        ],
        practicedevelopment: [
            { key: "With own initiative brings in new business", value: [9, 8, 7] },
            { key: "Occassionally uses the opportinities to bring in new business", value: [6, 5, 4] },
            { key: "Never takes initiative to bring in new business", value: [3, 2, 1] }
        ],
        prnetworking: [
            { key: "Utilizes all the avenues  extensively, to promote the firm", value: [9, 8, 7] },
            { key: "Whenever possible promotes the firm", value: [6, 5, 4] },
            { key: "Never Utilizes, even the available opportunities to promote the firm.", value: [3, 2, 1] }
        ]
    })
    const [attributeId, setAttributeId] = useState()
    const [indexid, setIndexid] = useState()
    const [showratingdetails, setShowratingdetails] = useState(false)
    const [rateList, setRateList] = useState([])
    const [developmentid, setDevelopmentid] = useState([])
    const [rowid, setRowid] = useState([])
    const [count, setCount] = useState(0)
    const [firstDropdown, setFirstDropdown] = useState()
    const [secondDropdown, setSecondDropdown] = useState()
    const [thirdDropdown, setThirdDropdown] = useState();
    const [dropdownValue, setDropdownValue] = useState([]);
    const [empDetails, setEmpDetails] = useState({})
    const [chooserate, setChooserate] = useState()
    const [showrowID, setShowrowID] = useState()
    const [showratingDetails, setShowratingDetails] = useState([])
    const { punchuvality, communication, teamwork, endurance, initiative, personalhabit, commitment, supervision, presentassignment, applicationknowledge, meatingdeadlines, presentationskills, suitableassignment, preparationdocument, additionwork, clientmanagement, practicedevelopment, prnetworking } = ratingAttribute

    const rating = [punchuvality, communication, teamwork, endurance, initiative, personalhabit, commitment, supervision, presentassignment, applicationknowledge, meatingdeadlines, presentationskills, suitableassignment, preparationdocument, additionwork, clientmanagement, practicedevelopment, prnetworking]
    const [showdropdown, setShowdropdown] = useState([])
    const [showdropdownindex, setShowdropdownindex] = useState()
    const [changeeditrate, setChangeeditrate] = useState(true)
    const [ratingTitle, setRatingTitle] = useState([])
    const [formValue, setFormValue] = useState({});
    const [empId, setEmpId] = useState()
    const [emp_apprid, setEmp_apprid] = useState()


    useEffect(() => {
        dispatch(GetDevelopment())
        dispatch(GetEmpAppraisalSupRate(props.employeeID))
        setEmpId(props.employeeID)
        setEmp_apprid(props.emp_appr_id)
        console.log(props.employeeID, "props.employeeID")
        // employeeID
    }, [])

    useEffect(() => {
        let AreDevelopment = []
        props.GetDevelopment && props.GetDevelopment.map((data) =>
            AreDevelopment.push({ id: data.area_of_development_id, value: data.area_of_development })
        );
        setAreDevelopment({ AreDevelopment });
        setEmpDetails(props.empDetail)
        setShowrowID(props.rowID)
        setShowratingDetails(props.GetEmpAppraisalSupRate)
        console.log(props.GetEmpAppraisalSupRate, "checkrate")
        setRatingTitle(props.GetDevelopment)


    }, [props.GetDevelopment, props.GetEmpAppraisalSupRate])


    useEffect(() => {

        if (props.rowID == 2) {
            let arrVal = []

            showratingDetails && showratingDetails.map((data, index) => {
                // let test =
                console.log(data, "tesing")

                let obj = {}

                if (data.rating === 9 || data.rating === 8 || data.rating === 7) {
                    obj.key1 = data.rating
                    obj.key2 = "-"
                    obj.key3 = "-"
                }
                else if (data.rating === 6 || data.rating === 5 || data.rating === 4) {
                    obj.key2 = data.rating
                    obj.key1 = "-"
                    obj.key3 = "-"
                }
                else {
                    obj.key3 = data.rating
                    obj.key1 = "-"
                    obj.key2 = "-"
                }

                arrVal.push(obj)
            })

            console.log(arrVal, "arrval")
            setDropdownValue(arrVal)
        }
    }, [props.rowID, props.GetEmpAppraisalSupRate, showratingDetails])

    function checkValidation(data, key) {
        setAttributeId()
        setDevelopment(data)
        let ids = areDevelopment.AreDevelopment.map((data) => {
            return data.value
        })
        setDevelopmentid(ids)
    }

    const checkVali = (data, index, datas, val, indexVal, name) => {
        let chooseval = val.value[data - 1]
        let rateval;
        datas[index].value.map((i) => {
            if (i === chooseval) {
                rateval = i
            }
        })
        let getIndex;
        let formKeys = Object.keys(formValue)

        formKeys.forEach((li, index) => {
            if (name.slice(0, name.lastIndexOf("_")) === li.slice(0, li.lastIndexOf("_"))) {
                getIndex = index + 1
            }
        })

        if (!getIndex || getIndex === undefined) {
            let formvalArr = formValue
            formvalArr[name] = data
            setFormValue(formvalArr)
        } else {
            let formSliceArr = formValue
            delete formSliceArr[formKeys[getIndex - 1]]
            formSliceArr[name] = data
            setFormValue(formSliceArr)
        }

        setChooserate(rateval)
        setIndexid(index)
        setAttributeId(data)
    }


    const showaddDetails = (datas, indexVal) => {
        return (
            datas.map((val, index) => {
                let formKeys = Object.keys(formValue)
                let setVal = []
                formKeys.forEach((ke) => {
                    console.log(formValue[ke], ke, "key_" + indexVal + "_" + index, ke === "key_" + indexVal + "_" + index && formValue[ke], "test123")
                    ke === "key_" + indexVal + "_" + index && setVal.push(formValue[ke])
                })

                return (
                    <div className="attributes">
                        <div className="attributeKey">{val.key}</div>
                        {console.log(formValue[indexVal] && formValue[indexVal]["key_" + indexVal + "_" + index], "formValue[indexVal]")}
                        <div className="attributeValue">
                            <Labelbox type="select"
                                dropdown={[
                                    { id: 1, value: val.value[0] },
                                    { id: 2, value: val.value[1] },
                                    { id: 3, value: val.value[2] },
                                ]}
                                changeData={(data) =>
                                    checkVali(data, index, datas, val, indexVal, "key_" + indexVal + "_" + index)
                                }
                                value={setVal.length > 0 && setVal[0]}
                            />
                        </div>
                    </div>
                )
            })
        )
    }
    const listratingDetails = (data, dropDownID) => {
        const editRating = (data, id, key, dropid) => {
            setChangeeditrate(true)
            setShowdropdown(dropid)
            setShowdropdownindex(key)
        }
        const chooserate = (data, index, editrows) => {
            let rate = showdropdown[data - 1]
            if (rate === 9 || rate === 8 || rate === 7) {
                dropdownValue[dropDownID].key1 = rate
            }
            else if (rate === 6 || rate === 5 || rate === 4) {
                dropdownValue[dropDownID].key2 = rate
            }
            else {
                dropdownValue[dropDownID].key3 = rate
            }
            setChangeeditrate(false)

        }
        return (
            data.map((val, index) => {
                return (
                    <div className="showRatings" >
                        <div className="showratingContent">{val.key}</div>
                        {changeeditrate && showdropdownindex === val.key ?
                            <div className="showratingdrop"><Labelbox type="select"
                                dropdown={[
                                    { id: 1, value: showdropdown[0] },
                                    { id: 2, value: showdropdown[1] },
                                    { id: 3, value: showdropdown[2] },
                                ]}
                                changeData={(data) =>
                                    chooserate(data, index, val)
                                }
                            />
                            </div> :
                            <div className="showratingValue" >
                                {console.log(dropdownValue[dropDownID] && dropdownValue[dropDownID]["key" + (index + 1)], "dropdownValue")}
                                {(dropdownValue[dropDownID] && dropdownValue[dropDownID]["key" + (index + 1)])}
                            </div>}

                        {showrowID == 2 && <div className="editrow">{(dropdownValue[dropDownID] && dropdownValue[dropDownID]["key" + (index + 1)]) === "-" ? " " : < img src={Edit} className="editRating" onClick={() => editRating(dropdownValue[dropDownID] && dropdownValue[dropDownID]["key" + (index + 1)], index, val.key, val.value)} />}</div>}

                    </div>
                )
            })
        )
    }

    console.log(dropdownValue, "dropdownValuett")


    const showdevelopmentdetails = () => {

        // let disabledropdown = []

        // disabledropdown.push(development)
        // if (areDevelopment.AreDevelopment) {
        //     if (disabledropdown.length > 0) {
        //         disabledropdown.map((data) => {
        //             areDevelopment.AreDevelopment[data - 1].disable = true
        //         })
        //     }
        //     areDevelopment.AreDevelopment[development - 1].disable = true
        // }


        setCount(count + 1)
        setShowratingdetails(true)
        setRowid([...rowid, development])
        setDropdownValue([...dropdownValue, { key1: firstDropdown, key2: secondDropdown, key3: thirdDropdown }])
        // setRateList([
        //     ...rateList,
        //     {
        //         "emp_id": localStorage.getItem("empId"),
        //         "development_id": development,
        //         "rating": chooserate
        //     },
        // ]);
    }

    const submitrate = () => {
        if (showrowID == 2) {
            let rateLists = []

            for (let i = 0; i < 18; i++) {
                if (dropdownValue[i].key2 === "-" && dropdownValue[i].key3 === "-") {
                    rateLists.push({ "emp_id": props.employeeID, "development_id": i + 1, "rating": dropdownValue[i].key1, "emp_appr_id": emp_apprid })
                } else if (dropdownValue[i].key1 === "-" && dropdownValue[i].key3 === "-") {
                    rateLists.push({ "emp_id": props.employeeID, "development_id": i + 1, "rating": dropdownValue[i].key2, "emp_appr_id": emp_apprid })
                } else if (dropdownValue[i].key1 === "-" && dropdownValue[i].key2 === "-") {
                    rateLists.push({ "emp_id": props.employeeID, "development_id": i + 1, "rating": dropdownValue[i].key3, "emp_appr_id": emp_apprid })
                }
            }
            if (rateLists.length === 18) {
                dispatch(InsertManagingPartnerRate(rateLists))
                props.handleChangeCloseModel()
                props.changeenable(true)
            }
        }
        else {
            let rateLists = []
            let allobj = Object.keys(formValue)
            let allval = Object.values(formValue)
            console.log(Object.values(formValue), "formValues")


            for (let i = 0; i < allobj.length; i++) {
                console.log(allobj[i].split("_")[2], allobj[i].split("_")[1], "allobj[i]")
                if (allobj[i].split("_")[2] == 0) {
                    if (allval[i] == 1) {
                        rateLists.push({ "emp_id": props.employeeID, "development_id": Number(allobj[i].split("_")[1]) + 1, "rating": 9, "emp_appr_id": emp_apprid })
                    }
                    if (allval[i] == 2) {
                        rateLists.push({ "emp_id": props.employeeID, "development_id": Number(allobj[i].split("_")[1]) + 1, "rating": 8, "emp_appr_id": emp_apprid })
                    }
                    if (allval[i] == 3) {
                        rateLists.push({ "emp_id": props.employeeID, "development_id": Number(allobj[i].split("_")[1]) + 1, "rating": 7, "emp_appr_id": emp_apprid })
                    }
                    console.log(allval[i], "allval")
                } else if (allobj[i].split("_")[2] == 1) {
                    if (allval[i] == 1) {
                        rateLists.push({ "emp_id": props.employeeID, "development_id": Number(allobj[i].split("_")[1]) + 1, "rating": 6, "emp_appr_id": emp_apprid })
                    }
                    if (allval[i] == 2) {
                        rateLists.push({ "emp_id": props.employeeID, "development_id": Number(allobj[i].split("_")[1]) + 1, "rating": 5, "emp_appr_id": emp_apprid })
                    }
                    if (allval[i] == 3) {
                        rateLists.push({ "emp_id": props.employeeID, "development_id": Number(allobj[i].split("_")[1]) + 1, "rating": 4, "emp_appr_id": emp_apprid })
                    }
                } else if (allobj[i].split("_")[2] == 2) {
                    if (allval[i] == 1) {
                        rateLists.push({ "emp_id": props.employeeID, "development_id": Number(allobj[i].split("_")[1]) + 1, "rating": 3, "emp_appr_id": emp_apprid })
                    }
                    if (allval[i] == 2) {
                        rateLists.push({ "emp_id": props.employeeID, "development_id": Number(allobj[i].split("_")[1]) + 1, "rating": 2, "emp_appr_id": emp_apprid })
                    }
                    if (allval[i] == 3) {
                        rateLists.push({ "emp_id": props.employeeID, "development_id": Number(allobj[i].split("_")[1]) + 1, "rating": 1, "emp_appr_id": emp_apprid })
                    }
                }
            }

            console.log(rateLists, "splitval")

            if (rateLists.length === 18) {
                dispatch(InsertSupervisorRate(rateLists))
                props.handleChangeCloseModel()
                props.changeenable(true)
            } else {
                notification.error({
                    message: 'Please Rate All Options',
                });
            }
        }

    }

    return (
        <div>
            <div className="empDetailsIn">
                <div>
                    <div>Employee Name</div>
                    <div className="employeeData">{empDetails?.name}</div>
                </div>
                <div>
                    <div>Period</div>
                    <div className="employeeData">{moment(empDetails?.period_from).format("DD-MMM-yyy") + " to " + moment(empDetails?.period_to).format("DD-MMM-yyy")}</div>
                </div>
            </div>
            {/* {showrowID != 2 && <div className="areaDevelopment">

                <Grid item xs={4}>
                    <div className="appraisalFieldheading"> Area of Development</div>
                    <div>
                        <Labelbox type="select"
                            dropdown={areDevelopment.AreDevelopment}
                            changeData={(data) =>
                                checkValidation(data)
                            }
                            value={development}
                        />
                    </div>
                </Grid>
                <img src={PlusIcon} className="plusiconview" onClick={showdevelopmentdetails} />
            </div>} */}
            <div className="modelcontent">

                {showrowID !== 2 && rating.map((id, index) => {
                    return (
                        <div>
                            {console.log(ratingTitle && ratingTitle[index]?.area_of_development, "ratingTitle")}
                            <div className="ratingHeading">{ratingTitle && ratingTitle[index]?.area_of_development}</div>
                            <div>{showaddDetails(rating[index], index)}</div>
                        </div>

                    )
                })}
                {/* {showratingdetails && rowid.map((id, index) => {
                    return (
                        <div>
                            <div className="ratingHeading">{developmentid[id - 1]}</div>
                            <div> {listratingDetails(rating[id - 1], index)}</div>
                        </div>
                    )
                })} */}

                {console.log(showratingDetails, "showratingDetails")}
                {showrowID === 2 && showratingDetails && showratingDetails.map((val, index) => {
                    return (
                        <div className="showRateingscontainer">
                            <div className="ratingHeading">{val.area_of_development}</div>
                            <div> {listratingDetails(rating[val.development_id - 1], index)}</div>
                        </div>
                    )
                })

                }

                <div className="appraisalBtn">
                    <CustomButton btnName={showrowID == 2 ? "Approve" : "Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={submitrate} />
                    <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" />
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
({
    GetDevelopment: state.getOptions.GetDevelopment || [],
    GetEmpAppraisalSupRate: state.GetEmpAppraisalDetails.GetEmpAppraisalSupRate
});
export default connect(mapStateToProps)(RatingModel);