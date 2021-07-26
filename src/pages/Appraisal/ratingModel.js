import react, { useEffect, useState } from 'react';
import './appraisal.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import PlusIcon from "../../images/plusIcon.svg";
import { GetDevelopment } from '../../actions/MasterDropdowns';
import { useDispatch, connect } from "react-redux";
import { id, tr } from 'date-fns/locale';
import { InsertSupervisorRate, GetEmpAppraisalSupRate } from '../../actions/AppraisalAction';
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

    useEffect(() => {
        dispatch(GetDevelopment())
        dispatch(GetEmpAppraisalSupRate(9))
        // console.log(props.employeeID,"props.employeeID")
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



    }, [props.GetDevelopment, props.GetEmpAppraisalSupRate])


    useEffect(() => {
        if (props.rowID == 2) {
            let ids = areDevelopment.AreDevelopment && areDevelopment.AreDevelopment.map((data) => {
                return data.value
            })

            var firstval;
            var secondval;
            var thirdval;
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

    const checkVali = (data, index, datas, val) => {
        let chooseval = val.value[data - 1]
        let rateval;
        datas[index].value.map((i) => {
            if (i === chooseval) {
                rateval = i
            }
        })
        setChooserate(rateval)

        if (index === 0) {
            setFirstDropdown(rateval)
            setSecondDropdown("-")
            setThirdDropdown("-")
        } else if (index === 1) {
            setSecondDropdown(rateval)
            setFirstDropdown("-")
            setThirdDropdown("-")
        } else {
            setThirdDropdown(rateval)
            setFirstDropdown("-")
            setSecondDropdown("-")
        }

        setIndexid(index)
        setAttributeId(data)
    }

    const showaddDetails = (datas) => {
        return (
            datas.map((val, index) => {
                return (
                    <div className="attributes">
                        <div className="attributeKey">{val.key}</div>
                        <div className="attributeValue">
                            <Labelbox type="select"
                                dropdown={[
                                    { id: 1, value: val.value[0] },
                                    { id: 2, value: val.value[1] },
                                    { id: 3, value: val.value[2] },
                                ]}
                                changeData={(data) =>
                                    checkVali(data, index, datas, val)
                                }
                                value={indexid === index ? attributeId : ""}
                            />
                        </div>
                    </div>
                )
            })
        )
    }
    const listratingDetails = (data, dropDownID) => {

        return (
            data.map((val, index) => {
                return (
                    <div className="showRatings" >
                        <div className="showratingContent">{val.key}</div>
                        <div className="showratingValue" >
                            {(dropdownValue[dropDownID] && dropdownValue[dropDownID]["key" + (index + 1)])}
                        </div>
                        <div>{showrowID == 2 && < img src={Edit} className="editRating" on />}</div>
                    </div>
                )
            })
        )
    }

    const showdevelopmentdetails = () => {

        let disabledropdown = []

        disabledropdown.push(development)
        if (areDevelopment.AreDevelopment) {
            if (disabledropdown.length > 0) {
                disabledropdown.map((data) => {
                    areDevelopment.AreDevelopment[data - 1].disable = true
                })
            }
            areDevelopment.AreDevelopment[development - 1].disable = true
        }


        setCount(count + 1)
        setShowratingdetails(true)
        setRowid([...rowid, development])
        setDropdownValue([...dropdownValue, { key1: firstDropdown, key2: secondDropdown, key3: thirdDropdown, deve_id: development }])
        setRateList([
            ...rateList,
            {
                "emp_id": localStorage.getItem("empId"),
                "development_id": development,
                "rating": chooserate
            },
        ]);
    }

    const submitrate = () => {
        console.log(dropdownValue.length, "dropdownValue.length ")
        if (dropdownValue.length === 17) {
            dispatch(InsertSupervisorRate(rateList))
            props.handleChangeCloseModel()
            props.changeenable(true)
        } else {
            notification.error({
                message: 'Please Rate All Options',
            });
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
            {showrowID != 2 && <div className="areaDevelopment">

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
            </div>}
            {development && showaddDetails(rating[development - 1])}


            {showratingdetails && rowid.map((id, index) => {
                return (
                    <div>
                        <div className="ratingHeading">{developmentid[id - 1]}</div>
                        <div> {listratingDetails(rating[id - 1], index)}</div>
                    </div>
                )
            })}

            {showrowID == 2 && showratingDetails && showratingDetails.map((val, index) => {
                return (
                    <div className="showRateingscontainer">
                        <div className="ratingHeading">{val.area_of_development}</div>
                        <div> {listratingDetails(rating[val.development_id - 1], index)}</div>
                    </div>
                )
            })

            }

            <div className="appraisalBtn">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={submitrate} />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" />
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