import react, { useState } from 'react';
import EnhancedTable from "../../component/DynTable/table";
import './usermanagement.scss';
import Edit from "../../images/editable.svg";
import Delete from '../../images/dashboard/delete.svg';
import PlusIcon from "../../images/plusIcon.svg";
import DynModel from "../../component/Model/model";
import UserMasterModal from './addusermodal';
function NewUserMaster(){
    const [usergroupModel, setUsergroupModel] = useState(false)
    const [change, setchange] = useState(false)
    function onChange() {
        setchange(!change)
    }
    const headCells = [
        { id: 'sno', label: 'S. No' },
        { id: 'username', label: 'User Name' },
        { id: 'mobileno', label: 'Mobile Number' },
        { id: 'emailid', label: 'E-mail Id' },
        { id: 'usergroup', label: 'User Group' },
        { id: 'state', label: 'State' },
        { id: 'action', label: 'Action' }
    ];
    const rows = [
        { sno: 1, username: "shyam",mobileno:"9870965789",emailid:"zzz@gmail.com",usergroup:"Associates",state:<div><button className="btnActive">Active</button></div>, action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon" /></> },
        { sno: 2, username: "dharani",mobileno:"9870965789",emailid:"zzz@gmail.com",usergroup:"HOD",state:<div><button className="btnActive">Active</button></div>, action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon" /></> },
        { sno: 3, username: "priya",mobileno:"9870965789",emailid:"zzz@gmail.com",usergroup:"Human Resource",state:<div><button className="btnActive">Active</button></div>, action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon" /></> },
        { sno: 4, username: "xxx",mobileno:"9870965789",emailid:"zzz@gmail.com",usergroup:"Admin",state:<div><button className="btnInActive">InActive</button></div>, action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon" /></> },
        { sno: 5, username: "yyy",mobileno:"9870965789",emailid:"zzz@gmail.com",usergroup:"Paladin",state:<div><button className="btnInActive">InActive</button></div>, action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon"/></> },
        { sno: 6, username: "zzz",mobileno:"9870965789",emailid:"zzz@gmail.com",usergroup:"HOD",state:<div><button className="btnInActive">InActive</button></div>, action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon"/></> },
        { sno: 7, username: "aaa",mobileno:"9870965789",emailid:"zzz@gmail.com",usergroup:"Associates",state:<div><button className="btnInActive">InActive</button></div>, action: <><img src={Edit} className="editicon" /> <img src={Delete} className="editicon"/></> }
    ]

    return(
        <div>
            <div className="UserGroup">
                <div>User Master</div>
                <img src={PlusIcon} className="plusicon" onClick={() => setUsergroupModel(true)} />
                <DynModel modelTitle={"ADD USER"} handleChangeModel={usergroupModel} handleChangeCloseModel={(bln) => setUsergroupModel(bln)} width={1000}  content={<UserMasterModal/>} />

            </div>
            <EnhancedTable headCells={headCells} rows={rows} aligncss="usergroupcss" />
        </div>
    )
}
export default NewUserMaster;