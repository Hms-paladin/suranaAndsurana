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
import { notification } from "antd";


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
    const [permission, setPermission] = useState([])


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
                action: <><img src={Edit} className="editicon" onClick={()=>( permission.allow_edit==='Y'?(editGroupNames(data.id, groupid)):rights())}  /> 
                        <img src={Delete} className="editicon" onClick={()=>( permission.allow_delete==='Y'?(deleteGroupNames(data.id)):rights())}  /></>
            },

            )
        })
        // setUserGroupName(usergroup)

        permission.allow_view==='Y'?setUserGroupName(usergroup):setUserGroupName([]);
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

    useEffect(() => {
        if(props.UserPermission.length>0&&props.UserPermission[0].item[0].item){
           let data_res_id = props.UserPermission[0].item[0].item.find((val) => { 
           return (
               "User Group" == val.screen_name
           ) 
       })
       setPermission(data_res_id)
       }
   
       }, [props.UserPermission]);
       console.log(permission,"permission")
    function rights(){
        notification.success({
            message: "You Dont't Have Rights To Access This",
        });
    }
    return (
        <div>
            <div className="UserGroup">
                <div>User Group</div>
                <img src={PlusIcon} className="plusicon" onClick={() => (permission.allow_add==='Y'?setUsergroupModel(true):rights())} />
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
        UserPermission: state.UserPermissionReducer.getUserPermission,
    }
);

export default connect(mapStateToProps)(UserGroup);


//