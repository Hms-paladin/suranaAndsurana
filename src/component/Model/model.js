import React from "react";
import { Modal } from 'antd';
import "./model.scss";

function DynModel(props){
    const [visible, setVisible] = React.useState(true);

    function handleCancel() {
        setVisible(false)
    }

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
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
        </Modal>
    )
}

export default DynModel;