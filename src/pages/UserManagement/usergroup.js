import react, { useEffect, useState } from 'react';
import EnhancedTable from "../../component/DynTable/table";
import Edit from "../../images/editable.svg";
import Delete from '../../images/dashboard/delete.svg';
import PlusIcon from "../../images/plusIcon.svg";
import DynModel from "../../component/Model/model";
import UserGroupModal from "./addusergroupmodal"
import './usermanagement.scss';
import { connect, useDispatch } from "react-redux";
import { getGroupName, deleteGroupName } from "../../actions/UserGroupAction";
import CustomButton from "../../component/Butttons/button";



function UserGroup(props) {
    const dispatch = useDispatch();
    const [usergroupModel, setUsergroupModel] = useState(false)
    const [userGroupName, setUserGroupName] = useState([])
    const [onEdit, setOnEdit] = useState(false);
    const [nullFieldValue, SetNullFieldValue] = useState(false);
    const [editGroupName, SetEditGroupName] = useState("");
    const [editGroupNameid, setEditGroupNameid] = useState();
    const [usergroupdeleteModel, setUsergroupdeleteModel] = useState(false)
    const [deleteID, setDeleteID] = useState();



    const headCells = [
        { id: 'sno', label: 'S. No' },
        { id: 'group', label: 'Group' },
        { id: 'action', label: 'Action' },
    ];


    useEffect(() => {
        dispatch(getGroupName());
    }, [])


    useEffect(() => {

        let usergroup = []
        props.UserGroupName.map((data, index) => {
            const k = index;
            const groupid = data.id;
            usergroup.push({
                sno: index + 1,
                group: data.group_name,
                action: <><img src={Edit} className="editicon" onClick={() => editGroupNames(data.id, groupid)} /> <img src={Delete} className="editicon" onClick={() => deleteGroupNames(data.id)} /></>
            },

            )
        })
        setUserGroupName(usergroup)
    }, [props.UserGroupName])

    const editGroupNames = (id) => {
        const getUserNameedit = props.UserGroupName.filter((data) => {
            return data.id === id
        })
        setUsergroupModel(true)
        setOnEdit(true)
        SetEditGroupName(getUserNameedit)
        setEditGroupNameid(id)
    }

    const deleteGroupNames = (id) => {
        setUsergroupdeleteModel(true)
        setDeleteID(id)
    }

    const deleteGroupNamerow = () => {
        dispatch(deleteGroupName(deleteID)).then(
            (response) => {
                setUsergroupdeleteModel(false)

            }
        )
    }

    const handleFieldNull = (bln) => {
        setUsergroupModel(bln);
        SetNullFieldValue(!nullFieldValue);
        setOnEdit(false);
    };

    return (
        <div>
            <div className="UserGroup">
                <div>User Group</div>
                <img src={PlusIcon} className="plusicon" onClick={() => setUsergroupModel(true)} />
                <DynModel modelTitle={"ADD USER GROUP"} handleChangeModel={usergroupModel} handleChangeCloseModel={(bln) => setUsergroupModel(bln)} content={<UserGroupModal handleChangeCloseModel={(bln) => setUsergroupModel(bln)} editbtn={onEdit}
                    handleChangeCloseModel={(bln) => handleFieldNull(bln)}
                    editGrouplist={editGroupName}
                    editGrouplistid={editGroupNameid}
                />} />
                <DynModel modelTitle={"ADD USER GROUP"} handleChangeModel={usergroupdeleteModel} handleChangeCloseModel={(bln) => setUsergroupdeleteModel(bln)} content={
                    <div className="deleteBtn">
                        <div>Are You Sure Want to Delete This Record?</div>
                        <div>
                            <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
                            <CustomButton btnName={"Ok"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={deleteGroupNamerow} />
                        </div>
                    </div>} />

            </div>
            <EnhancedTable headCells={headCells} rows={userGroupName} aligncss="usergroupcss" />

        </div>
    )
}

const mapStateToProps = (state) =>
(
    {
        UserGroupName: state.UserGroupReducer.getGroupName || [],
        DeleteGroupName: state.UserGroupReducer.deleteGroupName || [],
    }
);

export default connect(mapStateToProps)(UserGroup);


//