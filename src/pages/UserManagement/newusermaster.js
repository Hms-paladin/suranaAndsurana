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

function NewUserMaster(props){
    const dispatch = useDispatch();
    const [usergroupModel, setUsergroupModel] = useState(false)
    const [change, setchange] = useState(false)
    const [UserAddEdit, setUserAddEdit] = useState(false)
    const [UserData, setUserData] = useState({})
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
            action: (
                <>
                  <img src={Edit} className="editImage" style={{cursor:'pointer'}} onClick={()=>onEditUser(userlist[index])}  />{" "}
                  <img src={Delete} className="editImage" style={{cursor:'pointer'}} onClick={()=>onDeleteUser(userlist[index].user_id)} />
                </>
              ),
          };
          Userlist.push(listarray);
        }
        setUserList({ Userlist });
    
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
    // const rows = [
    //     { sno: 1, username: "shyam",mobileno:"9870965789",emailid:"zzz@gmail.com",usergroup:"Associates",state:<div><button className="btnActive">Active</button></div>, action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon" /></> },
    //     { sno: 2, username: "dharani",mobileno:"9870965789",emailid:"zzz@gmail.com",usergroup:"HOD",state:<div><button className="btnActive">Active</button></div>, action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon" /></> },
    //     { sno: 3, username: "priya",mobileno:"9870965789",emailid:"zzz@gmail.com",usergroup:"Human Resource",state:<div><button className="btnActive">Active</button></div>, action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon" /></> },
    //     { sno: 4, username: "xxx",mobileno:"9870965789",emailid:"zzz@gmail.com",usergroup:"Admin",state:<div><button className="btnInActive">InActive</button></div>, action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon" /></> },
    //     { sno: 5, username: "yyy",mobileno:"9870965789",emailid:"zzz@gmail.com",usergroup:"Paladin",state:<div><button className="btnInActive">InActive</button></div>, action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon"/></> },
    //     { sno: 6, username: "zzz",mobileno:"9870965789",emailid:"zzz@gmail.com",usergroup:"HOD",state:<div><button className="btnInActive">InActive</button></div>, action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon"/></> },
    //     { sno: 7, username: "aaa",mobileno:"9870965789",emailid:"zzz@gmail.com",usergroup:"Associates",state:<div><button className="btnInActive">InActive</button></div>, action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon"/></> }
    // ]
// console.log(UserAddEdit,"UserAddEdit")
    return(
        <div>
            <div className="UserGroup">
                <div>User Master</div>
                <img src={PlusIcon} className="plusicon" onClick={() => (setUserAddEdit(false),setUsergroupModel(true))} />
                <DynModel modelTitle={UserAddEdit?"EDIT USER":"ADD USER"} handleChangeModel={usergroupModel} handleChangeCloseModel={(bln) => setUsergroupModel(bln)} width={1000} 
                 content={UserAddEdit?<UserMasterModal user_data={UserData} closeModel={()=>setUsergroupModel(false)}/>:<UserMasterModal closeModel={()=>setUsergroupModel(false)}/>} />

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
    }
);
export default connect(mapStateToProps)(NewUserMaster);
