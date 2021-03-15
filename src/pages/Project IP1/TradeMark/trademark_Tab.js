import React, { useState, useEffect } from 'react'
import Tabs from '../../../component/TradeMarkTabIcons/trademarktabIcons';
import DynModel from '../../../component/Model/model';
import ProjectTaskModel from '../ProjectTaskModel/projecttaskModel';

// stage icon in tabviewicons:

import Stages from '../../stages/stageicon';

// tradeMark pages:
import TMapplicationFiling from './trademarks';
import TMapplicationInternationalFiled from './tmApp_InternationalFiling';
import TMoppositionFiled from './tmOppo_Filed';
import TMoppositionDefended from './tmOppo_Defended'

export default function TradeMark(props) {

    const [modelOpen, setModelOpen] = useState(false)
    const [task, setTask] = useState(true)
    const [stage, setStage] = useState(false)
    const [stageMonitor, setStageMonitor] = useState(false)



    function projectTaskModel(boxName) {
        if (boxName === "TASKS") {
            setModelOpen(true)
        }
        else if (boxName === "STAGE") {
            setStage(true)
            setTask(false)

        }
        else if (boxName === "STAGE  MONITOR"){
            setStageMonitor(true)
            setTask(false)
            setStage(false)

        }

    }

    const modelContent = () => {
        return (
            <ProjectTaskModel />
        )
    }

    return (
        <div>
            <Tabs onChangeTabBox={(data) => projectTaskModel(data)} />
            <DynModel modelTitle={"Project Task"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} content={modelContent()} width={800} />

            {stage &&
                <Stages />
            }
           {task && <div>
                {
                    props.Type.process_type.value === '' && props.Type.filling_type.value == '' &&
                    <TMapplicationFiling />
                    
                }

                {
                    props.Type.process_type.value === '1' && props.Type.filling_type.value == '1' &&
                    <TMapplicationFiling />

                }
                {
                    props.Type.process_type.value === '1' && props.Type.filling_type.value == '2' &&
                    <TMapplicationInternationalFiled />

                }
                {
                    props.Type.process_type.value === '4' && props.Type.filling_type.value == '1' &&
                    <TMoppositionFiled />
                }
                {
                    props.Type.process_type.value === '4' && props.Type.filling_type.value == '2' &&
                    <TMoppositionDefended />
                }
            </div>}
            

        </div>
    )
}