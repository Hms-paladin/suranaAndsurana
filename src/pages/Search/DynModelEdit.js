import React, { useEffect, useState } from "react";
import { Modal } from 'antd';
import ResumePage from '../Resume/resume'
function DynModelEdit(props) {
    const [editResume, setEditResume] = useState(true)
    const [visible, setVisible] = useState(false)
    function handleCancel() {
        setVisible(false)
        props.handleChangeCloseModel(false)
    }
    function edit_resume() {
        setEditResume(!editResume)
    }
    useEffect(() => {
        setVisible(props.handleChangeModel)
    }, [props.handleChangeModel])

    return (
        < Modal
            className="modelContainer"
            title={props.modelTitle}
            centered={props.centered ? true : false}
            visible={visible}
            footer={null}
            width={props.width ? props.width : 1000}
            zIndex={1201}
            onCancel={handleCancel}>
            <div>
                <ResumePage EditResume={editResume} Editid={props.resumeEditid} />
            </div>
        </Modal >
    )

}
export default DynModelEdit;