import React,{useState}from 'react'
import './RecruitmentModal.scss'
import CustomButton from '../../component/Butttons/button';
import Grid from '@material-ui/core/Grid';
export default function RecruitmentModal(props){
    const [close,setclose]=useState(false)
    return(
        <div>
             <Grid container spacing={2} style={{width:"100%"}}>
             <Grid item xs={12} container direction="row" alignItems="center" spacing={2} className="fst_item_grid_rec">
                <div><div>No.of Positions</div><div>01</div></div>
                <div><div>Required by</div><div>21-May-2021</div></div>
             </Grid>
             <Grid item xs={12} container direction="row" alignItems="center" spacing={2} className="snd_item_grid_rec">
                <div><div>Department</div><div>Civil</div></div>
                <div><div>Designation</div><div>Attorney</div></div>
                <div><div>Qualification</div><div>Bsc, Bl</div></div>
                <div><div>Age Limit</div><div>25-40</div></div>
                <div><div>Languages Known</div><div>Tamil, English</div></div>
                <div><div>State </div><div>Tamil nadu</div></div>
                <div><div>Experience</div><div>2</div></div>
             </Grid>
             <Grid item xs={12} container direction="row" alignItems="center" spacing={2} >
                 <Grid item xs={6} className="third_item_grid_rec">
                <div><div>Skills</div><div>Skills 1, Skills 2</div></div>
                <div><div>Certification</div><div>Certification 1, Certification 2</div></div>
                <div><div>Capabilites</div><div>Capabilites 1, Capabilites 2</div></div>
             
                </Grid>
                <Grid item xs={6} className="third_item_grid_rec">
                <div><div>Traits</div><div>Traits 1, Traits 2</div></div>
                <div><div>Specialization</div><div>Specialization 1, Specialization 2</div></div>
                <div><div>Talents </div><div>Talents 1</div></div>
                </Grid>    
             </Grid>
            </Grid>

            {close===false?<div className="btn_div_close">
           <CustomButton btnName={"Close"} btnCustomColor="customPrimary" custombtnCSS="custom_close_re" onBtnClick={()=>setclose(true)}/>
            </div>:

            <div className="status_div_close">
                <div className="status_inner_div"><label>Status :</label><label>Progress</label></div>
            </div>}
       </div>
    )
}