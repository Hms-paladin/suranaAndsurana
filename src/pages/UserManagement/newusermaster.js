import react, { useState,useEffect } from 'react';
import EnhancedTable from "../../component/DynTable/table";
import './usermanagement.scss';
import Edit from "../../images/editable.svg";
import Delete from '../../images/dashboard/delete.svg';
import PlusIcon from "../../images/plusIcon.svg";
import DynModel from "../../component/Model/model";
import UserMasterModal from './addusermodal';
import { connect, useDispatch } from "react-redux";
import {getUser,deleteUser} from "../../actions/UserMasterAction";
import { notification } from "antd";

function NewUserMaster(props){
    const dispatch = useDispatch();
    const [usergroupModel, setUsergroupModel] = useState(false)
    const [change, setchange] = useState(false)
    const [UserAddEdit, setUserAddEdit] = useState(false)
    const [UserData, setUserData] = useState({})
    const [rights, setRights] = useState([])
    const [UserList, setUserList] = useState([])
    function onChange() {
        setchange(!change)
    }

    function onEditUser(params) {
        setUserData(params)
        setUserAddEdit(true)
        setUsergroupModel(true)
    }
        
    function onDeleteUser(params) {
        dispatch(deleteUser(params)).then(() => {
    
        })
    }
    // console.log(User_Id);
    /////////////////
    useEffect(() => {
        dispatch(getUser());
    }, [])

    useEffect(() => {

        let userlist = [];
        
        props.getUserList.map((data,index) => userlist.push(data));
        var Userlist = [];
        for (var m = 0; m < userlist.length; m++) {
            const index = m;
          var listarray = {
            sno: index+1,
            username: userlist[m].user_name,
            mobileno: userlist[m].mobileno===0?'0':userlist[m].mobileno,
            emailid: userlist[m].email===0?'0':userlist[m].email,
            usergroup: userlist[m].group_name===0?'0':userlist[m].group_name,
            state: userlist[m].active_flag===1?<div><button className="btnActive">Active</button></div>:<div><button className="btnInActive">InActive</button></div>,
            // action: (
            //     <>
            //       <img src={Edit} className="editImage" style={{cursor:'pointer'}} onClick={()=>onEditUser(userlist[index])}  />{" "}
            //       <img src={Delete} className="editImage" style={{cursor:'pointer'}} onClick={()=>onDeleteUser(userlist[index].user_id)} />
            //     </>
            //   ),
              action: (
                <>
                  <img src={Edit} className="editImage" style={{cursor:  rights&&rights.display_control&&rights.display_control==="Y"?'pointer':'not-allowed'}} onClick={()=>(  rights&&rights.display_control&&rights.display_control==='Y'&&onEditUser(userlist[index]))}  />{" "}
                  <img src={Delete} className="editImage" style={{cursor:  rights&&rights.display_control&&rights.display_control==="Y"?'pointer':'not-allowed'}} onClick={()=>(  rights&&rights.display_control&&rights.display_control==='Y'&&onDeleteUser(userlist[index]))} />
                </>
              ),
          };
          Userlist.push(listarray);
        }

        setUserList({ Userlist })
        // permission.allow_view==='Y'?setUserList({ Userlist }):setUserList([]);
    
      }, [props.getUserList])


    const headCells = [
        { id: 'sno', label: 'S. No' },
        { id: 'username', label: 'User Name' },
        { id: 'mobileno', label: 'Mobile Number' },
        { id: 'emailid', label: 'E-mail Id' },
        { id: 'usergroup', label: 'User Group' },
        { id: 'state', label: 'State' },
        { id: 'action', label: 'Action' }
    ];

  ///*****user permission**********/
  useEffect(() => {
    if(props.UserPermission.length>0&&props.UserPermission){
       let data_res_id = props.UserPermission.find((val) => { 
       return (
           "User Control" == val.control
       ) 
   })
   setRights(data_res_id)
   }
  
   }, [props.UserPermission]);
  
    //  console.log(rights.display_control,"rigths")
  
   function rightsNotification(){
    notification.success({
        message: "You are not Authorized. Please Contact Administrator",
    });
  }
  /////////////
    return(
        <div>
            <div className="UserGroup">
                <div>User Master</div>
                {/* <img src={PlusIcon} className="plusicon"  onClick={() => (setUserAddEdit(false),setUsergroupModel(true))} /> */}
                <img src={PlusIcon} className="plusicon" style={{cursor:  rights&&rights.display_control&&rights.display_control==="Y"?'pointer':'not-allowed'}}  onClick={() => ( rights&&rights.display_control&&rights.display_control==='Y'&&(setUserAddEdit(false),setUsergroupModel(true)))} />
                <DynModel modelTitle={UserAddEdit?"EDIT USER":"ADD USER"} handleChangeModel={usergroupModel} handleChangeCloseModel={(bln) => setUsergroupModel(bln)} width={1000} 
                 content={UserAddEdit?<UserMasterModal user_data={UserData} closeModel={()=>(setUsergroupModel(false),setUserData({}))}/>:<UserMasterModal user_add={""} closeModel={()=>setUsergroupModel(false)}/>} />

            </div>
            <EnhancedTable headCells={headCells}  aligncss="usergroupcss"
             rows={UserList.length == 0 ? UserList : UserList.Userlist}  />
        </div>
    )
}

const mapStateToProps = (state) =>
(
    {
        getUserList: state.UserMasterReducer.getUser || [],
        UserPermission: state.UserPermissionReducer.getUserPermission,
    }
);
export default connect(mapStateToProps)(NewUserMaster);