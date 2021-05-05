import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
function TaskStatus() {
    // const useStyles = makeStyles({
    //     root: {
    //       width: 200,
    //     },
    //   });
    // const [value, setValue] = React.useState('');
    // const handleChange = (event) => {
    //     setValue(event.target.value);
    //     const classes = useStyles();
    //     const [value, setValue] = React.useState(30);

    //     const handleChange = (event, newValue) => {
    //         setValue(newValue);
    //     };
    // };
    return (
        <div>
            <div className="radio_btns">
            <Slider disabled defaultValue={30} aria-labelledby="disabled-slider" />
            </div>
        </div>
    )
}
export default TaskStatus;