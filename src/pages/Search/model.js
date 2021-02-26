import React from "react";
import { Modal } from 'antd';
import LabelBox from '../../helpers/labelbox/labelbox'
import './search.scss'
import { Button } from "@material-ui/core";
import SelectionIcon from '../../images/select.svg'
import { Select, Row, Col } from 'antd'
import { Layout, Input, DatePicker, message,Space } from 'antd';
import CalenderIcon from '../../images/calender.svg'



function DynModel(props){

    const [visible, setVisible] = React.useState(false);
    function onChange(date, dateString) {
        console.log(date, dateString);
      }

    function handleCancel() {
        setVisible(false)
        props.handleChangeCloseModel(false)
    }

    React.useEffect(()=>{
        setVisible(props.handleChangeModel)
    },[props.handleChangeModel])

    return(
        <Modal
        className="modelContainer"
        title={props.modelTitle}
        centered={props.centered ? true : false}
        visible={visible}
        footer={null}
        width={props.width ? props.width : 520}
        zIndex={1201}
        onCancel={handleCancel}
        >
            <div className="interviewdetailformdiv">
            <div className="interviewdetailform">
            <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="Proposed Designation" optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput"  >

                            </Select>
            </div>
            <div className="interviewdetailform">
            <DatePicker suffixIcon={<img src={CalenderIcon} className="DateInput_svg" />} onChange={onChange} placeholder="Proposed Date"  className="DatePicker_View" />
 
            </div>
            <div className="interviewdetailform">
            <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="Interviewer" optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput"  >

                            </Select>
            </div>
            <div className="interviewdetailsubmnit"><Button>Submit</Button></div>
            </div>
        </Modal>
    )
}

export default DynModel;