import React, { useState } from 'react'
import CustomButton from "../../component/Butttons/button";
import Labelbox from "../../helpers/labelbox/labelbox";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './onlinetest.scss'
function OnlineQA() {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <div>
            <div className="AQTitle">Online Test</div>
            <div className="QAContainer">
                <div className="QAPanel">
                    <div id="QAcount">Q.2 | Question 2 of 8</div>
                    <div id="Question">What is Felonies</div>
                    <div className="options">
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                <FormControlLabel value="female" control={<Radio />} label="A crime regarded in the US and many other judicial systems as more serious than a misdemeanour." />
                                <FormControlLabel value="male" control={<Radio />} label="Not a Crime" />
                                <FormControlLabel value="other" control={<Radio />} label="Not an illegal Act" />
                                {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div id="TTbtns">
                        <CustomButton btnName={"Previous"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick="" />
                        <CustomButton btnName={"Save & Exit"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick="" />
                    </div>
                </div>
                <div className="QAStatusPane"></div>
            </div>
        </div>
    )
}
export default OnlineQA;