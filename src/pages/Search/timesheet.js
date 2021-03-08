import react, { useState } from 'react';
import DynModel from '../../component/Model/model';
import TimeSheetStart from '../Search/TimeSheets/timesheetStart';
import TimeSheetStop from '../Search/TimeSheets/timesheetStop';

function TimeSheetModel() {
    const [modelOpen, setModelOpen] = useState(false)
    const [modelOpens, setModelOpens] = useState(false)


    function showmodelStart() {
        setModelOpen(true)
    }
    function showmodelStop() {
        setModelOpens(true)
    }
    return (
        <div style={{ margin: "100px" }}>
            <button onClick={showmodelStart}>open Model</button>
            <DynModel modelTitle={"Time Sheet"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} width={1000} content={<TimeSheetStart />} />
            <button onClick={showmodelStop}>open </button>
            <DynModel modelTitle={"Time Sheet"} handleChangeModel={modelOpens} handleChangeCloseModel={(bln) => setModelOpens(bln)} width={1000} content={<TimeSheetStop />} />
        </div>

    )
}
export default TimeSheetModel;