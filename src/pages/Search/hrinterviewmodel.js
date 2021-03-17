import react,{useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from "../../component/Butttons/button";
import { useDispatch, connect } from "react-redux";
import Axios from 'axios';
import { apiurl } from "../../utils/baseUrl";
function HrInterviewModel() {
    const[roundDropdownValues,setroundDropdownValues] =useState({})
    useEffect(()=> {
        Axios({
            method: 'GET',
            url: apiurl +'get_round',
        }).then((response) => {
                    let hr_round = []
                response.data.data.map((data, index) =>
                hr_round.push({ 
                    id: data.status_id,
                    value: data.status
                  
                   })
                )
                setroundDropdownValues({hr_round})
                console.log(roundDropdownValues.hr_round,"hr_round")
        })
        },[])
    return (
        <div>
           
                <Labelbox type="select" placeholder="Round"    dropdown={roundDropdownValues.hr_round}/>
                <Labelbox type="select" placeholder="Designation" />
                <Labelbox type="datepicker" placeholder="Proposed Date" />
                <Labelbox type="select" placeholder="Interviewer" />
          
            <div className="hrbtnInterview"><CustomButton btnName={"Save"} btnCustomColor="customPrimary" /></div>
        </div>
    )
}
export default HrInterviewModel;