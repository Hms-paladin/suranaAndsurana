import react, { useState } from 'react';
import DynModel from '../../component/Model/model';
import TimeSheetStart from '../Search/TimeSheets/timesheetStart';
import TimeSheetStop from '../Search/TimeSheets/timesheetStop';

// resume Model ==>

import EducationModel from '../Resume/educationModel';
import ExperienceModel from '../Resume/experience';

function TimeSheetModel() {
    const [modelOpen, setModelOpen] = useState(false)
    const [modelOpens, setModelOpens] = useState(false)
    const [educationModelOpen, setEducationModelOpen] = useState(false)
    const [experienceModelOpen, setExperienceModelOpen] = useState(false)


    function showmodelStart() {
        setModelOpen(true)
    }
    function showmodelStop() {
        setModelOpens(true)
    }

    // resume model ==>

    function showEducationModel() {
        setEducationModelOpen(true)
    }

    function showExperienceModel(){
        setExperienceModelOpen(true)
    }

    return (
        <div style={{ margin: "100px" }}>
            <button onClick={showmodelStart}>open Model</button>
            <DynModel modelTitle={"Time Sheet"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} width={1000} content={<TimeSheetStart />} />
            <button onClick={showmodelStop}>open </button>
            <DynModel modelTitle={"Time Sheet"} handleChangeModel={modelOpens} handleChangeCloseModel={(bln) => setModelOpens(bln)} width={1000} content={<TimeSheetStop />} />
            <br /><br />

            {/* resume model buttons */}

            <button onClick={showEducationModel}>Education</button>
            <DynModel modelTitle={"Education"} handleChangeModel={educationModelOpen} handleChangeCloseModel={(bln) => setEducationModelOpen(bln)} content={<EducationModel />} />
            <button onClick={showExperienceModel}>Experience</button>
            <DynModel modelTitle={"Experience"} handleChangeModel={experienceModelOpen} handleChangeCloseModel={(bln) => setExperienceModelOpen(bln)}width={700} content={<ExperienceModel />} />
        </div>

    )
}
export default TimeSheetModel;