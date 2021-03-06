import react, { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import { notification } from "antd";
import { connect, useDispatch } from "react-redux";
import { apiurl } from "../../utils/baseUrl.js";
import axios from "axios";
import { getTaskList } from "../../actions/projectTaskAction";
import CustomButton from '../../component/Butttons/button';
function TaskStatus(props) {
    const dispatch = useDispatch();
    function valuetext(value) {
        setvalToSave(value);
        return `${value}`;
      }
      const[valToSave,setvalToSave]=useState('')
      const[sildeval,setSlideVal]=useState([0])
      const range=(e,data)=>{
          setSlideVal(data)
      }
      useEffect(() => {
        
        
        setSlideVal(props.rowData.perecent_completion)
      }, [props.rowData
      ]);

      function handelSave(e,val ){
          var a =valToSave;
        setSlideVal(a);
          var val ={
            "task_id":props.rowData.task_id,
            "percentage_completion":a
        }
    try {
        axios({
            method: 'PUT',
            url: apiurl + 'update_task_tag',
            data: val
        })
            .then(function (response) {
                if (response.data.status === 1) {
                    dispatch(getTaskList());
                    notification.success({
                        message: ' Updated Successfully',
                    });
                    return Promise.resolve();
                }
            });

    } catch (err) {
        notification.error({
            message: 'Record Not Added',
        });
    }
}

    return (
        <div>
            <div className="radio_btns">
                {/* <Slider defaultValue={100} aria-labelledby="disabled-slider" /> */}
                <div style={{textAlign:"right",fontWeight:"600"}}>{sildeval}%</div>
                <Slider
                    defaultValue={sildeval?sildeval:0}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    valueLabelDisplay="auto"
                    onChange={range}
                />
                <div className="status_btn"><CustomButton btnName={"Save"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={handelSave} /></div>
            </div>
        </div>
    )
}
export default TaskStatus;