import React from 'react';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from "../../component/Butttons/button";
import './search.scss';
import { Divider } from '@material-ui/core';


function TaskSearch(){
    return(
       <div>
            <div className="searchfilterflex">
               <div className="searchfilterflex1">
                  <div className="projsearchfilterdrpdwn">
                  <Labelbox type="select" placeholder="client type"/>
                  </div>
                  <div className="projsearchfilterdrpdwn">
                  <Labelbox type="select" placeholder="client"/>

                  </div>
                  <div className="projsearchfilterdrpdwn">
                  <Labelbox type="select" placeholder="project type"/>

                  </div>
                  <div className="projsearchfilterdrpdwn">
                  <Labelbox type="select" placeholder="project name"/>

                  </div>
                  <div className="projsearchfilterdrpdwn">
                  <Labelbox type="select" placeholder="billing type"/>
                  </div>
                  <div className="projsearchfilterdrpdwn">
                  <Labelbox type="select" placeholder="Priority"/>
                  </div> 
                  <CustomButton btnName ={"Go"}custombtnCSS="projectsearchgo"></CustomButton>
               </div>

               <div style={{width:'100%', display:'flex'}}>
                   <div style={{width:'50%'}}>
                       <p>dsfcsdc</p>                        
                   </div>
                   <Divider  orientation="vertical"/>
                   <div style={{width:'50%'}}>
                       <p>dsfcsdc</p>                        
                   </div>

               </div>
              

           </div>

       </div>
    )
}
export default TaskSearch;