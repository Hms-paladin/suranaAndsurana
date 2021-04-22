import react, { useEffect, useState } from 'react';
import EnhancedTable from "../../component/DynTable/table";
import Edit from "../../images/editable.svg";
import Delete from '../../images/dashboard/delete.svg';
import PlusIcon from "../../images/plusIcon.svg";
import DynModel from "../../component/Model/model";
import UserGroupModal from "./addusergroupmodal"
import './usermanagement.scss';
import { connect, useDispatch } from "react-redux";
import { getGroupName } from "../../actions/UserGroupAction";



function UserGroup(props) {
    const dispatch = useDispatch();
    const [usergroupModel, setUsergroupModel] = useState(false)
    const headCells = [
        { id: 'sno', label: 'S. No' },
        { id: 'group', label: 'Group' },
        { id: 'action', label: 'Action' },
    ];
    const rows = [
        { sno: 1, group: "Paladin Tester", action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon" /></> },
        { sno: 2, group: "Admin", action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon" /></> },
        { sno: 3, group: "Associates", action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon" /></> },
        { sno: 4, group: "HOD", action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon" /></> },
        { sno: 5, group: "Human Resources", action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon" /></> },
        { sno: 6, group: "Human Resources", action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon" /></> },
        { sno: 7, group: "Human Resources", action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon" /></> }
    ]

    useEffect(() => {
        dispatch(getGroupName());
    }, [])

    useEffect(() => {
        // console.log(props.UserGroupName, "UserGroupName")



    }, [props.UserGroupName])

    return (
        <div>
            <div className="UserGroup">
                <div>User Group</div>
                <img src={PlusIcon} className="plusicon" onClick={() => setUsergroupModel(true)} />
                <DynModel modelTitle={"ADD USER GROUP"} handleChangeModel={usergroupModel} handleChangeCloseModel={(bln) => setUsergroupModel(bln)} content={<UserGroupModal />} />

            </div>
            <EnhancedTable headCells={headCells} rows={rows} aligncss="usergroupcss" />
            <div>

                {/* {props.UserGroupName.length > 0 && props.UserGroupName.map((data) => {
                    console.log(data,"UserGroupName")
                    return (
                        <div>
                            {data.group_name}

                        </div>
                    )
                })} */}
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>

(
    console.log(state, "state")

    //     {
    //     UserGroupName: state.getOptions.getGroupName || [],
    // }
);

export default connect(mapStateToProps)(UserGroup);


// 