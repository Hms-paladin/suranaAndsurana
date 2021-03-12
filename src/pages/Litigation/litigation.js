import react, { useState } from 'react';
import './litigation.scss';
import { Tabs, Radio } from 'antd';
import Grid from '@material-ui/core/Grid';
import Tabcontent from '../../component/TradeMarkTabIcons/trademarktabIcons';
import Labelbox from "../../helpers/labelbox/labelbox";
import AddIcon from '../../images/addIcon.svg';
import CustomButton from "../../component/Butttons/button";
import DynModel from '../../component/Model/model';

// import ValidationLibrary from "../../../helpers/validationfunction";

const { TabPane } = Tabs;

function Litigation() {
    const [litigationCounsel, setLitigationCounsel] = useState(false)
    const [litigationInterim, setLitigationInterim] = useState(false)


    const modelContent = () => {
        return (
            <div >
                <Grid item xs={12} container direction="column" justify="center" spacing={2} >


                    <div className="liticationDetails">
                        <Labelbox type="select" placeholder={"Counsel"} />
                        <Labelbox type="text" placeholder={"Name"} />
                        <Labelbox type="number" placeholder={"Phone No"} />
                        <Labelbox type="text" placeholder={"Email Id"} />
                        <div className="test">
                            <Labelbox type="textarea" placeholder={"Address"} />
                        </div>
                        <CustomButton btnName={"SAVE "} btnCustomColor="customPrimary" />

                    </div>


                </Grid>

            </div>
        )
    }

    const modelInterimContent = () => {
        return (
            <div >
                <Grid item xs={12} container direction="column" justify="center" spacing={2} >


                    <div className="liticationDetails">
                        <Labelbox type="select" placeholder={"Interim"} />
                        <Labelbox type="text" placeholder={"Interim Name"} />
                        <Labelbox type="number" placeholder={"Interim Application No"} />
                        <Labelbox type="text" placeholder={"Interim Application Date"} />
                        <div className="test">
                            <Labelbox type="textarea" placeholder={"Interim Details"} />
                        </div>
                        <CustomButton btnName={"SAVE "} btnCustomColor="customPrimary" />

                    </div>


                </Grid>

            </div>
        )
    }

    return (
        <div>
            <div className="litigationContaoner">
                <Grid item xs={12}>
                    <div className="litigationFields">
                        <div className="litigationData">
                            <div className="litigationTitle">Project Name</div>
                            <div>Name</div>
                        </div>
                        <div className="litigationData">
                            <div className="litigationTitle">Client Name</div>
                            <div>Name</div>
                        </div>
                        <div className="litigationData">
                            <div className="litigationTitle">Project type</div>
                            <div>J0450</div>
                        </div>
                        <div className="litigationData">
                            <div className="litigationTitle">Project Sub type</div>
                            <div>J0450</div>
                        </div>
                        <div className="litigationData">
                            <div className="litigationTitle">Process type</div>
                            <div>J0450</div>
                        </div>
                    </div>

                </Grid>
                <Grid item xs={12}>
                    <div className="litigationFields">
                        <div className="litigationData">
                            <div className="litigationTitle">Filling Type</div>
                            <div>Name</div>
                        </div>
                        <div className="litigationData">
                            <div className="litigationTitle">Billable Type</div>
                            <div>Name</div>
                        </div>
                        <div className="litigationData">
                            <div className="litigationTitle">DRA</div>
                            <div>J0450</div>
                        </div>
                        <div className="litigationData">
                            <div className="litigationTitle">DDRA</div>
                            <div>J0450</div>
                        </div>

                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="litigationFields">
                        <div className="litigationData">
                            <div className="litigationTitle">Comments</div>
                            <div>text</div>
                        </div>
                    </div>

                </Grid>
            </div>
            <Tabs defaultActiveKey="1" type="card" className="litigationTabs">
                <TabPane tab="Litigation" key="1">
                    <div className="litigationHeader">
                        <div className="addCase">Add Case</div>
                        <Tabcontent className="IconsHeader" />


                    </div>
                    <Grid item xs={12} container direction="row" spacing={2}>
                        <Grid item xs={4} container direction="column" spacing={2} >
                            <Labelbox type="text" placeholder={"Internal Case No."} />
                            <Labelbox type="select" placeholder={"Status"} />
                            <Labelbox type="select" placeholder={"Court Name"} />
                            <Labelbox type="select" placeholder={"Case Type"} />
                            <Labelbox type="text" placeholder={"Court Case No."} />
                            <Labelbox type="select" placeholder={"DDRA"} />
                            <Grid item xs={12} container direction="row" >
                                <Grid xs={6} > <Labelbox type="datepicker" placeholder={"Court Case No."} /></Grid>
                                <Grid xs={6} > <Labelbox type="datepicker" placeholder={"Court Case No."} /></Grid>


                            </Grid>
                            <Labelbox type="select" placeholder={"Sub case"} />
                            <Labelbox type="text" placeholder={"Suit Value (Numeric)"} />


                        </Grid>

                        <Grid item xs={8} container direction="row"  >
                            <div className="litigationScroller">
                                <div className="litigationCounsel">
                                    <div className="ourCounselTitle">Our Counsel</div>
                                    <div className="ourCounselFields">
                                        <div>Name</div>
                                        <div>Phone No</div>
                                        <div>Email ID</div>
                                        <div>Address</div>
                                        <img src={AddIcon} onClick={() => setLitigationCounsel(true)} />

                                    </div>
                                </div>
                                <div className="litigationCounsel">
                                    <div className="ourCounselTitle">External Counsel</div>
                                    <div className="ourCounselFields">
                                        <div>Name</div>
                                        <div>Phone No</div>
                                        <div>Email ID</div>
                                        <div>Address</div>
                                        <img src={AddIcon} onClick={() => setLitigationCounsel(true)} />

                                    </div>
                                </div>
                                <div className="litigationCounsel">
                                    <div className="ourCounselTitle">Opposite Party </div>
                                    <div className="ourCounselFields">
                                        <div>Name</div>
                                        <div>Phone No</div>
                                        <div>Email ID</div>
                                        <div>Address</div>
                                        <img src={AddIcon} onClick={() => setLitigationCounsel(true)} />

                                    </div>
                                </div>
                                <div className="litigationCounsel">
                                    <div className="ourCounselTitle">Opposite Party Counsel</div>
                                    <div className="ourCounselFields">
                                        <div>Name</div>
                                        <div>Phone No</div>
                                        <div>Email ID</div>
                                        <div>Address</div>
                                        <img src={AddIcon} onClick={() => setLitigationCounsel(true)}/>

                                    </div>
                                </div>
                                <div className="litigationCounsel">
                                    <div className="ourCounselTitle">Opposite Party Counsel</div>
                                    <div className="ourCounselFields">
                                        <div>Name</div>
                                        <div>Phone No</div>
                                        <div>Email ID</div>
                                        <div>Address</div>
                                        <img src={AddIcon} onClick={() => setLitigationCounsel(true)}/>
                                    </div>
                                </div>
                                <div className="litigationCounsel">
                                    <div className="ourCounselTitle">Adjournment</div>
                                    <div className="ourCounselFields">
                                        <div>Name</div>
                                        <div>Phone No</div>
                                        <div>Email ID</div>
                                        <div>Address</div>
                                    </div>
                                </div>
                                <div className="litigationCounsel">
                                    <div className="ourCounselTitle">Interim</div>
                                    <div className="ourCounselFields">
                                        <div>Name</div>
                                        <div>Phone No</div>
                                        <div>Email ID</div>
                                        <div>Address</div>
                                        <img src={AddIcon} onClick={() => setLitigationInterim(true)} />
                                    </div>
                                </div>
                            </div>
                            <DynModel modelTitle={"Litigation Details"} handleChangeModel={litigationCounsel} handleChangeCloseModel={(bln) => setLitigationCounsel(bln)} content={modelContent()} />
                            <DynModel modelTitle={"Litigation Details"} handleChangeModel={litigationInterim} handleChangeCloseModel={(bln) => setLitigationInterim(bln)} content={modelInterimContent()} />
                            <div className="customAddcasebtn">
                                <CustomButton btnName={"SAVE "} btnCustomColor="customPrimary" custombtnCSS={"btnProjectForm"}/>

                                <CustomButton btnName={"CANCEL "} custombtnCSS={"btnProjectForm"}  />


                            </div>
                        </Grid>

                    </Grid>


                </TabPane>

            </Tabs>

        </div>
    )
}

export default Litigation;