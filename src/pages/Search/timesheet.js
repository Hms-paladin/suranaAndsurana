import react, { useState } from 'react';
import DynModel from '../../component/Model/model';
import TimeSheetStart from '../Search/TimeSheets/timesheetStart';
import TimeSheetView from '../Search/TimeSheets/timesheetview';

function TimeSheetModel() {
    const [modelOpen, setModelOpen] = useState(false)
    const [modelOpens, setModelOpens] = useState(false)

    return (
        <div style={{ margin: "100px" }}>
            <button onClick={()=>setModelOpen(true)}>open Model</button>
            <DynModel modelTitle={"Time Sheet"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} width={1000} content={<TimeSheetStart />} />
            <button onClick={()=>setModelOpens(true)}>open </button>
            <DynModel modelTitle={"Time Sheet"} handleChangeModel={modelOpens} handleChangeCloseModel={(bln) => setModelOpens(bln)} width={1000} content={<TimeSheetView />} />
            <br /><br />
        </div>

    )
}
export default TimeSheetModel;