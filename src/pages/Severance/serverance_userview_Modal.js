import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import CustomButton from '../../component/Butttons/button';
import { Skeleton, List, Avatar } from 'antd';
import './severance.scss'
import { connect, useDispatch } from 'react-redux'
import { ViewSeverance } from '../../actions/ExitSeveranceAction'
import moment, { invalid } from 'moment'
function ServeranceModal(props) {
    const [severanceData, setseveranceData] = useState([])
    const [activeState, setactiveState] = useState(true)
    let dispatch = useDispatch()
    useEffect(() => {
        let ddd = true
        dispatch(ViewSeverance()).then((response) => {
            console.log("activeState", response)

        })

    }, [])
    useEffect(() => {
        if (props.ViewSeverance.length > 0) {
            setactiveState(false)
        }
        props.ViewSeverance.map((data) => {
            setseveranceData({
                empname: data.name === null ? "-" : data.name,
                designation: data.designation === null ? "-" : data.designation,
                department: data.department == null ? "-" : data.department,
                severanceId: data.severece_id,
                resignationDate: moment(data.date_of_resignation).format("DD-MMM-YYYY"),
                res_accepted_on: (data.resignation_accepted_on === null || data.resignation_accepted_on === '0000-00-00') ? "-" : moment(data.resignation_accepted_on, "YYYY-MM-DD").format("DD-MMM-YYYY"),
                res_accepted_by: data.resignation_accepted_by === null ? "-" : data.resignation_accepted_by,
                releive_date: (data.proposed_date_relieving === null || data.proposed_date_relieving === '0000-00-00') ? "-" : moment(data.proposed_date_relieving, "YYYY-MM-DD").format("DD-MMM-YYYY"),
                it_noc_date: moment(data.it_noc_date === null ? "-" : data.it_noc_date).format("DD-MMM-YYYY"),
                hr_noc_date: moment(data.hr_noc_date === null ? "-" : data.hr_noc_date).format("DD-MMM-YYYY"),
                admin_noc_date: moment(data.admin_noc_date === null ? "-" : data.admin_noc_date).format("DD-MMM-YYYY"),
                it_noc_by: data.it_noc_by === null ? "-" : data.it_noc,
                hr_noc_by: data.hr_noc_by === null ? "-" : data.hr_noc,
                admin_noc_by: data.admin_noc_by === null ? "-" : data.admin_noc,
                actual_date_relieving: moment(data.actual_date_relieving === "Invalid date" ? "-" : data.actual_date_relieving).format("DD-MMM-YYYY")

            })
        })
    }, [props.ViewSeverance, activeState])
    return (
        <div style={{ backgroundColor: 'white' }}>
            {activeState ? <div style={{ padding: "15px" }}>{[...Array(3)].map(() =>
                <Skeleton loading={activeState} active paragraph={{ rows: 3 }} />
            )}
            </div> :
                <>

                    <div className="serverance_container">
                        <div className="container_head">
                            <div>Employee Name</div>
                            <div>Designation</div>
                            <div>Department</div>
                        </div>
                        <div className="container_values">
                            <div>{severanceData.empname}</div>
                            <div>{severanceData.designation}</div>
                            <div>{severanceData.department}</div>
                        </div>
                    </div>
                    <div className="serverance_container">
                        <div className="container_Date">
                            <div>Date Of Resignation</div>
                            <div>Resignation Accepted Date And By</div>
                            <div>Proposed Date Of Relieving</div>
                        </div>
                        <div className="container_Date c1">
                            <div>{severanceData.resignationDate}</div>
                            <div>{severanceData.res_accepted_on + '   ' + severanceData.res_accepted_by}</div>
                            <div>{severanceData.releive_date}</div>
                        </div>
                    </div>
                    <div className="NOC_container">
                        <div className="NOC_head">
                            <div>IT Date Of NOC</div>
                            <div >IT NOC By</div>
                            <div className="adminnoc">Admin Date Of NOC</div>
                            <div>Admin NOC By</div>
                            <div>HR Date Of NOC</div>
                            <div>HR NOC By</div>
                            <div>FINANCE Date Of NOC</div>
                            <div>FINANCE NOC By</div>
                        </div>
                        <div className="NOC_values">
                            <div>{severanceData.it_noc_date === "Invalid date" ? "-" : severanceData.it_noc_date}</div>
                            <div >{severanceData.it_noc_by}</div>
                            <div className="adminnoc">{severanceData.admin_noc_date === "Invalid date" ? "-" : severanceData.admin_noc_date}</div>
                            <div>{severanceData.admin_noc_by}</div>
                            <div>{severanceData.hr_noc_date === "Invalid date" ? "-" : severanceData.hr_noc_date}</div>
                            <div>{severanceData.hr_noc_by}</div>
                            <div>{severanceData.hr_noc_date === "Invalid date" ? "-" : severanceData.hr_noc_date}</div>
                            <div>{severanceData.hr_noc_by}</div>
                        </div>
                    </div>
                    <div className="serverance_container">
                        <div className="container_head">
                            <div>Actual Date Of Relieving</div>
                        </div>
                        <div className="container_values">
                            <div>{severanceData.actual_date_relieving === "Invalid date" ? "-" : severanceData.actual_date_relieving}</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: 10 }}>
                        {/* <CustomButton btnName={"OK"} btnCustomColor="customPrimary"
                custombtnCSS={"ok_btn_css"} onBtnClick={""}/> */}
                    </div>
                </>
            }
        </div>
    )
}
const mapStateToProps = state => (
    {
        ViewSeverance: state.ExitSeverance.ViewSeverance,

    }
)

export default connect(mapStateToProps)(ServeranceModal);