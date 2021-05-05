import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
// import CustomButton from '../../../component/Butttons/button';
import CustomButton from '../../component/Butttons/button';
function TaskStatus() {
    function valuetext(value) {
        return `${value}`;
      }
      const[sildeval,setSlideVal]=useState([0])
      const range=(e,data)=>{
          setSlideVal(data)
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
                <div className="status_btn"><CustomButton btnName={"Save"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick="" /></div>
            </div>
        </div>
    )
}
export default TaskStatus;