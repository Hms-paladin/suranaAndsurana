import React, { useCallback, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import './KRA.scss'
import EditIcon from "../../images/edit.svg";
import { getKraApprove, updateKraApprove, InsertApproveKra } from '../../actions/KraAction';
import EnhancedTable from "../../component/DynTable/table";
import PlusIcon from "../../images/plusIcon.svg";
import moment from "moment";
import { notification } from 'antd';
import { getOtherTask } from '../../actions/TodoListAction';


const KRA = (props) => {
    const dispatch = useDispatch();
    const header = [
        { id: 'activity', label: 'Activity' },
        { id: 'percentage', label: 'Percentage' },
    ];
    const [kraList, setKraList] = useState([]);
    const [rows, setRows] = useState([]);
    const [editinput, setEditinput] = useState()
    const [totalPercent, setTotalPercent] = useState()
    const [kra_form, setKra_form] = useState();
    const [approveid, setApproveid] = useState()
    const [kraSelected, setKraSelected] = useState()
    const [kraempname, setKraempname] = useState()


    useEffect(() => {
        setKraempname(props.kraempname)
        setApproveid(props.kraApproveid)
        dispatch(getKraApprove(props.kraApproveid))
    }, [props.kraApproveid, props.kraempname])

    useEffect(() => {
        let periodfrom = moment(props.getKraApprove[0]?.period_from).format("MMM YYYY")
        let periodto = moment(props.getKraApprove[0]?.period_to).format("MMM YYYY")
        setKraSelected(periodfrom + " to " + periodto)
        setKraList(props.getKraApprove)
        let allkraList = []
        props.getKraApprove && props.getKraApprove.map((data, index) => {
            allkraList.push({
                activity: data.activity,
                percentage: <div className="updatePercentage">
                    <div className="percenrInput">
                        {editinput === index ? null : <div>{data.kra_percentage}</div>}
                        {editinput === index &&
                            <Labelbox type="number" changeData={(data) => checkValidation(data, "percentage")} />
                        }</div>
                    <div>
                        {editinput === index ? null : <img src={EditIcon} className="editView" onClick={() => editPercentage(index)} />}
                        {editinput === index &&
                            <img src={PlusIcon} className="editView" onClick={() => updatePercentage(index)} />}
                    </div>
                </div>
            })
        })
        setRows(allkraList)

        // TotalPercent
        let totalPercent = props.getKraApprove?.reduce(function (accumulator, item) {
            return accumulator + item.kra_percentage;
        }, 0);
        setTotalPercent(totalPercent)
    }, [props.getKraApprove, editinput, kra_form, approveid])


    function checkValidation(data, key) {
        setKra_form(data)
    }

    const editPercentage = useCallback((id) => {
        setEditinput(id)
    }, [editinput])

    const updatePercentage = useCallback((id) => {
        dispatch(updateKraApprove(props.getKraApprove[id].kra_id, kra_form, approveid)).then((response) => {
            dispatch(getKraApprove(approveid))
            setEditinput()
            return Promise.resolve();
        })
    }, [props.getKraApprove, kra_form, approveid])

    const approveKra = useCallback(() => {
        if (totalPercent < 100 || totalPercent > 100) {
            notification.error({
                message: 'Total Percent Value should 100 only',
            });
        } else {
            let refLength = kraList && kraList.length
            for (let i = 0; i < refLength; i++) {
                let activityId;
                kraList && kraList.filter((data) => {
                    if (data.activity === kraList[i].activity) {
                        activityId = data.activity_id
                    }
                })
                dispatch(InsertApproveKra(approveid, kraList, activityId, kraList[i].kra_percentage, refLength, i + 1)).then((response) => {
                    dispatch(getOtherTask())
                })
            }
            props.closemodal()

        }
    }, [kraList])

    return (
        <div>
            <div>
                <div className="kpi_sudb">
                    <Grid container spacing={2} className="ratemaster_firstgrid" className="kpi_sub">
                        <Grid item xs={7} container direction="row" className="spaceBtGrid" alignItems="center">
                            <Grid item xs={6}>
                                <div><label style={{ fontSize: 16 }}>Employee Name</label></div>
                                <div><label style={{ fontWeight: 'bold' }}>{kraempname}</label></div>
                            </Grid>
                            <Grid item xs={6}>
                                <div><label style={{ fontSize: 16 }}>Period</label></div>
                                <div><label style={{ fontWeight: 'bold' }}>{kraSelected}</label></div>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div className="kpi_table">
                    <EnhancedTable headCells={header} aligncss="kra_table" rows={rows} />
                </div>
                <div className="totalPercentageshow">
                    <div>Total</div>
                    <div className="percentShow">{totalPercent}
                    </div>
                </div>

                <div className="kpi_btn">
                    <CustomButton
                        btnName={"Approve"}
                        btnCustomColor="customPrimary"
                        custombtnCSS={"btnUsergroup"}
                        onBtnClick={() => approveKra()}
                    />
                    {/* <CustomButton
                        btnName={"Return"}
                        btnCustomColor="customPrimary"
                        custombtnCSS={"btnUsergroup"}
                    // onBtnClick={() => props.handleChangeCloseModel()}

                    /> */}
                </div>
            </div>

        </div>


    )
}

const mapStateToProps = (state) =>

(
    {
        getKraApprove: state.KraReducer.getKraApprove
    });
export default connect(mapStateToProps)(KRA);