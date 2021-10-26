import react, { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { getTagList, getTaskList } from "../../actions/projectTaskAction";
import { connect, useDispatch } from "react-redux";
import { apiurl } from "../../utils/baseUrl.js";
import axios from "axios";
import { notification } from "antd";

function TaskTag(props) {

    const dispatch = useDispatch();
    const [value, setValue] = useState('')

    useEffect(() => {
        dispatch(getTagList());
    }, []);

    useEffect(() => {
        let tagTypeData = []
        props.tagsList.map((data) =>
            tagTypeData.push({
                value: data.status,
                id: data.status_id
            })
        )
        setValue(props.rowData.data.tag_id)
    }, [props.tagsList, props.rowData]);

    function handelCheck(e, val) {
        setValue(val.status_id);
        var val = {
            "task_id": props.rowData.data.task_id,
            "tag_id": val.status_id
        }

        try {
            axios({
                method: 'PUT',
                url: apiurl + 'update_task_tag',
                data: val
            })
                .then(function (response) {
                    if (response.data.status === 1) {
                        dispatch(getTaskList(localStorage.getItem("empId")));
                        notification.success({
                            message: ' Updated Successfully',
                        });
                        props.close && props.close()
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
        <>
            <div className="radio_btns">
                <FormControl component="fieldset">
                    {props.tagsList.length > 0 && props.tagsList.map((data) => {
                        return (
                            <RadioGroup aria-label="task" name="task_tag" value={value} >

                                <FormControlLabel value={data.status_id} onClick={(event) => handelCheck(event, data)}
                                    control={<Radio />} label={data.status} style={{ borderBottom: "1px solid #f5efef", width: "275px" }} />


                            </RadioGroup>
                        )
                    })}
                </FormControl>
            </div>
        </>
    )
}
const mapStateToProps = (state) =>
({

    tagsList: state.projectTasksReducer.tagsList || [],
});

export default connect(mapStateToProps)(TaskTag);