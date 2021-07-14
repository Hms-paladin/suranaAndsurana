import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import './KRA.scss'
import { getSubordinate } from '../../actions/MasterDropdowns';
import { getKra } from '../../actions/KraAction';
import EnhancedTable from "../../component/DynTable/table";


function KRAModal(props) {
    const dispatch = useDispatch();
    const header = [
        { id: 'employeename', label: 'Employee Name' },
        { id: 'activity', label: 'Activity' },
        { id: 'target', label: 'Target' },
    ];
    const [employeeList, setEmployeeList] = useState({});
    const [rowData, setRowData] = useState([])
    const [kra_Model, setkra_Model] = useState({

        employee: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        toperiod: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        fromperiod: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },

    });
    useEffect(() => {
        dispatch(getSubordinate(props.empId));
    }, [props.empId]);

    useEffect(() => {
        let EmployeeList = []
        props.getSubordinate.map((data, index) => {
            EmployeeList.push({
                value: data.name,
                id: data.emp_id,
            });
        });
        setEmployeeList({ EmployeeList })
        // GET_KRA:
        let rowDataList = []
        props.getKra && props.getKra.map((data, index) => {
            rowDataList.push({

                employeename: data.name, activity: data.activity, target: data.kra_percentage,
            })
        })

        setRowData(rowDataList)



    }, [props.getSubordinate, props.getKra])

    function checkValidation(data, key, multipleId) {


        var errorcheck = ValidationLibrary.checkValidation(
            data,
            kra_Model[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: kra_Model[key].validation,
        };

        setkra_Model((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    const onsubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(kra_Model);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                kra_Model[targetkeys[i]].value,
                kra_Model[targetkeys[i]].validation
            );
            kra_Model[targetkeys[i]].error = !errorcheck.state;
            kra_Model[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = kra_Model[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => kra_Model[obj].error == true
        );

        if (filtererr.length > 0) {
            // setkra_Model({ error: true });
        } else {
            dispatch(getKra(kra_Model.employee.value, kra_Model.fromperiod.value, kra_Model.toperiod.value)).then((response) => {
                handleCancel()
            })
        }
        setkra_Model((prevState) => ({
            ...prevState,

        }));
    }



    const handleCancel = () => {
        let From_key = [
            "employee",
            "fromperiod",
            "toperiod",
        ];

        From_key.map((data) => {
            try {
                kra_Model[data].value = "";
            } catch (error) {
                throw error;
            }
        });
        setkra_Model((prevState) => ({
            ...prevState,
        }));
    };

    return (
        <div>
            <div className="kra_main">
                <div >
                    <Grid container className="kra_sub">
                        <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            className="spaceBtGrid"
                            alignItems="center"
                            style={{ padding: 10 }}
                            spacing={2}
                        >
                            <Grid item xs={3}>
                                <div className="KRAhead"><label onClick="">Employee Name</label></div>
                                <Labelbox
                                    type="select"
                                    dropdown={employeeList.EmployeeList}
                                    changeData={(data) => checkValidation(data, "employee")}
                                    value={kra_Model.employee.value}
                                    error={kra_Model.employee.error}
                                    errmsg={kra_Model.employee.errmsg}
                                />
                            </Grid>
                            <Grid item xs={3} container direction="column">
                                <div className="period"><label >From Period</label></div>
                                <Labelbox
                                    type="datepicker"
                                    placeholder={"From Period"}
                                    view={["year", "month"]}
                                    format={"MMM-yyyy"}
                                    changeData={(data) => checkValidation(data, "fromperiod")}
                                    value={kra_Model.fromperiod.value}
                                    error={kra_Model.fromperiod.error}
                                    errmsg={kra_Model.fromperiod.errmsg}
                                />
                            </Grid>
                            <Grid item xs={3} container direction="column">
                                <div className="period"><label >To Period</label></div>
                                <Labelbox
                                    type="datepicker"
                                    placeholder={"To Period"}
                                    view={["year", "month"]}
                                    format={"MMM-yyyy"}
                                    changeData={(data) => checkValidation(data, "toperiod")}
                                    value={kra_Model.toperiod.value}
                                    error={kra_Model.toperiod.error}
                                    errmsg={kra_Model.toperiod.errmsg}
                                /></Grid>

                            <Grid item xs={3}>

                                <div className="GO_btn" style={{ display: 'flex', padding: "15px" }}>
                                    <CustomButton
                                        btnName={"GO"}
                                        btnCustomColor="customPrimary"
                                        custombtnCSS={"btnUsergroup"}
                                        onBtnClick={onsubmit}
                                    />
                                </div>
                            </Grid>
                        </Grid>


                    </Grid>
                </div>


                <div style={{ padding: "10px" }}>
                    <EnhancedTable headCells={header} rows={rowData}
                    />
                </div>

                {/* <div className="kpi_btn">
                    <CustomButton
                        btnName={"Save"}
                        btnCustomColor="customPrimary"
                        custombtnCSS={"btnUsergroup"}

                    />
                    <CustomButton
                        btnName={"Cancel"}
                        custombtnCSS={"btnUsergroup"}

                    />
                </div> */}

            </div>
        </div>
    )
}

const mapStateToProps = (state) =>

(
    console.log(state, "krastare"),
    {
        getSubordinate: state.getOptions.getSubordinate,
        getKra: state.KraReducer.getKra
    });
export default connect(mapStateToProps)(KRAModal);
