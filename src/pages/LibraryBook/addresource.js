import React, { useState,useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Buttons/button';
import './LibraryBook.scss'
import EnhancedTable from '../../component/DynTable/table'
import { notification } from "antd";
import { useDispatch, connect } from "react-redux";

function AddResource(props) {
    const [addRights, setAddRights] = useState([])
    const header = [
        { id: 'resource', label: 'Resource' },
        { id: 'subject', label: 'Subject' },
        { id: 'author', label: 'Author' },
        { id: 'title', label: 'Title' },
        { id: 'year', label: 'Year of Publication' },
        { id: 'dept', label: 'Department' },
        { id: 'copies', label: 'Copies' },
    ];
    const rows = [
        {
            resource: <a className="link_tag">Book</a>, subject: 'Law', author: 'Mr.X', title: 'Title 1', year: '1985', dept: 'Department 1', copies: '5'
        },

        {
            resource: <a className="link_tag">Journal</a>, subject: 'IP', author: 'Mr.Y', title: 'Title 2', year: '1990', dept: 'Department 2', copies: '1'
        },

        {
            resource: <a className="link_tag">Magazine</a>, subject: 'Law', author: 'Mr.Z', title: 'Title 3', year: '1985', dept: 'Department 3', copies: '5'
        },

        {
            resource: <a className="link_tag">Journal</a>, subject: 'Ip', author: 'Mr.A', title: 'Title 4', year: '1985', dept: 'Department 4', copies: '1'
        },

        {
            resource: <a className="link_tag">Magazine</a>, subject: 'Law', author: 'Mr.Z', title: 'Title 5', year: '1985', dept: 'Department 5', copies: '5'
        },
    ];

///***********user permission**********/
    useEffect(() => {
    if(props.UserPermission.length>0&&props.UserPermission){
       let data_res_id = props.UserPermission.find((val) => { 
       return (
           "Library - Add Resource" == val.control 
       ) 
      })
      setAddRights(data_res_id)
   }
  
   }, [props.UserPermission]);

  /////////////
    return (
        <div>
            <div className="addresource">Add Resource</div>
            <div className="AddResourceContainer">
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={3} container direction="column">
                        <div style={{marginBottom:"10px"}}>Resource</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div style={{marginBottom:"10px"}}>Subject</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div style={{marginBottom:"10px"}}>Author</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div style={{marginBottom:"10px"}}>Title</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div style={{marginBottom:"10px"}}>Year of Publication</div>
                        <Labelbox type="datepicker"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div style={{marginBottom:"10px"}}>Department</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div style={{marginBottom:"10px"}}>No. of Copies</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                </Grid>

                <div className="okbtndiv">
                    <CustomButton btnName={"Add"} btnCustomColor="customPrimary"
                        custombtnCSS={"add_btn_css"} btnDisable={!addRights||addRights.display_control&&addRights.display_control==='N'?true:false} onBtnClick={''} />
                </div>
                <div className="addresource_table" style={{marginTop:"10px"}}>
                    <EnhancedTable headCells={header} rows={rows} aligncss="addresource_table_align"></EnhancedTable>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
    ({
        UserPermission: state.UserPermissionReducer.getUserPermission,
});
export default connect(mapStateToProps) (AddResource);