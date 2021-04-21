import React from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './LibraryBook.scss'
import EnhancedTable from '../../component/DynTable/table'
export default function LibraryBook(props){
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
    {resource:<a className="link_tag">Book</a>,subject:'Law',author:'Mr.X',title:'Title 1',year:'1985',dept:'Department 1',copies:'5'},
    {resource:<a className="link_tag">Journal</a>,subject:'IP',author:'Mr.Y',title:'Title 2',year:'1990',dept:'Department 2',copies:'1'},
    {resource:<a className="link_tag">Magazine</a>,subject:'Law',author:'Mr.Z',title:'Title 3',year:'1985',dept:'Department 3',copies:'5'},
    {resource:<a className="link_tag">Journal</a>,subject:'Ip',author:'Mr.A',title:'Title 4',year:'1985',dept:'Department 4',copies:'1'},
    {resource:<a className="link_tag">Magazine</a>,subject:'Law',author:'Mr.Z',title:'Title 5',year:'1985',dept:'Department 5',copies:'5'},
   
    
   
];

    return(
        <div>
                <div className="lib_master_h">Library Book Maintenance</div>
                <div className="parent_div_lib">
                <Grid container spacing={2} className="cont_parent_lib_grid">
                <Grid item xs={12} container direction="row" alignItems="center" spacing={2} className="cont_lib_item_grid">
                    <Grid item xs={2}>
                    <Labelbox type="select" labelname="Resource"/>
                    </Grid>
                    <Grid item xs={2}>
                    <Labelbox type="select" labelname="Subject"/>
                    </Grid>
                    <Grid item xs={2}>
                    <Labelbox type="select" labelname="Author"/>
                    </Grid>
                    <Grid item xs={2}>
                    <Labelbox type="select" labelname="Title"/>
                    </Grid>
                    <Grid item xs={2}>
                    <Labelbox type="select" labelname="Year of Publication"/>
                    </Grid>
                    <Grid item xs={2}>
                    <Labelbox type="select" labelname="Department"/>
                    </Grid>
                 
                </Grid>
                </Grid>

                   <div className="lib_btn_div"> 
                    <CustomButton btnName={"Search"} 
                    custombtnCSS={"lib_btn_css"} onBtnClick={""}
                   /></div>

                   <div className="table_container_align">
                   <EnhancedTable headCells={header}
                  rows={rows} aligncss="lib_aligncss_table"/>
                 </div>

                 <div className="add_btn_div"> 
                    <CustomButton btnName={"Add Resource"}  btnCustomColor="customPrimary" 
                    custombtnCSS={"addre_btn_css"} onBtnClick={""}
                   />
                 </div>
              </div>
        </div>
    )
}