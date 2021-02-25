import React from "react";
import { Modal } from 'antd';
import LabelBox from '../../helpers/labelbox/labelbox'
import './search.scss'
import { Button } from "@material-ui/core";


function DynModel(props){
    const [visible, setVisible] = React.useState(false);

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
            <div className="interviewdetailform"><LabelBox type="select"/></div>
            <div className="interviewdetailform"></div>
            <div className="interviewdetailform"><LabelBox type="select"/></div>
            <div className="interviewdetailsubmnit"><Button>Submit</Button></div>
            </div>
        </Modal>
    )
}

export default DynModel;