import React from 'react'
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import PlusIcon from "../../images/plusIcon.svg";

const UserGroups = () => {
  
  return (
    <div>
      <Grid item xs={6} className="ContentTitle">
        User Groups
      </Grid>
      <div className="Container">
        {/* <div className="leftContainer"> */}
          <Grid container 
           direction="row"
           className="spaceBtGrid"
           alignItems="center"
           spacing={3}>
            <Grid item xs={3}>
              <Labelbox
                type="select"
                placeholder={"Employee"}
              // dropdown={resumeGetList.candidateList}
              // changeData={(data) => checkValidation(data, "candidate")}
              // value={Resume_Form.candidate.value}
              // error={Resume_Form.candidate.error}
              // errmsg={Resume_Form.candidate.errmsg}
              />
            </Grid>

            <Grid item xs={3}>
              <Labelbox
                type="select"
                placeholder={"Employee"}
              // dropdown={resumeGetList.candidateList}
              // changeData={(data) => checkValidation(data, "candidate")}
              // value={Resume_Form.candidate.value}
              // error={Resume_Form.candidate.error}
              // errmsg={Resume_Form.candidate.errmsg}
              />
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <img src={PlusIcon} style={{ cursor: 'pointer', width: 19 }} />
            </div>
          </Grid>
        {/* </div> */}
      </div>
    </div>
  )
}

export default UserGroups
