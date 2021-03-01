




// resume



// import React from "react";
// import Labelbox from "../../helpers/labelbox/labelbox"

// function Resume(){
//     return(
//         <>
//         Add Resume
//         <Labelbox type="text" />
//         </>
//     )
// }

// export default Resume;

import react from 'react'
import './resume.scss'
import Grid from '@material-ui/core/Grid';
import { Layout, Input, DatePicker, message, Button,Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import InfoIcon from '@material-ui/icons/Info';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { Select, Row, Col } from 'antd'
import { DownCircleTwoTone } from '@ant-design/icons'
// icons:
// import SelectionIcon from '../../images/selectIcon.png'
import SelectionIcon from '../../images/select.svg'
import CalenderIcon from '../../images/calender.svg'



function ResumePage() {
    function onChange(date, dateString) {
        console.log(date, dateString);
      }

      const success = () => {
        message.success('This is a success message');
      };

    return (
        <div className="Container">
            <Grid item xs={12} className="ContentTitle">
                Add Resume

          </Grid>
            <div className="master_container">
                <div className="Left_Container">
                    <Grid container direction="column" spacing={1}>
                        <Grid item xs={8} container alignItems="center" className="ContainerInput">
                            <Input placeholder="User Id(Auto Generated)" />
                        </Grid>

                        <Grid item xs={8} container alignItems="center" className="ContainerInput" >
                            <Input placeholder="Name   " />
                        </Grid>

                        <Grid item xs={6} className="SelectOption">
                            <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />}
                                showSearch placeholder="Type of Resource" optionFilterProp="children" filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput"
                                style={{ width: "70%" }} >

                            </Select>
                        </Grid>

                        <Grid item xs={6} className="SelectOption">
                            <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch placeholder="Gender" optionFilterProp="children" filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                                className="SelectionInput" style={{ width: "50%" }} >

                            </Select>
                        </Grid>


                        <Grid item xs={6} className="DatepickerInput">
                            <DatePicker suffixIcon={<img src={CalenderIcon} className="DateInput_svg" />} onChange={onChange} placeholder="Date of Birth" style={{ width: 185 }} className="DatePicker_View" />

                        </Grid>


                        <Grid item xs={6} className="SelectOption">
                            <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch placeholder="Basic Qualification"
                                optionFilterProp="children" filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                } className="SelectionInput" style={{ width: "70%" }} >

                            </Select>
                        </Grid>

                        <Grid item xs={6} className="SelectOption">
                            <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="Additional Qualification 1" optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput" style={{ width: "70%" }} >

                            </Select>
                        </Grid>

                        <Grid item xs={6} className="SelectOption">
                            <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch placeholder="Additional Qualification 2" optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput" style={{ width: "70%" }}  >

                            </Select>
                        </Grid>

                        <Grid item xs={6} className="SelectOption">
                            <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="Institution" optionFilterProp="children" filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput" style={{ width: "70%" }} >

                            </Select>
                        </Grid>

                        <Grid item xs={8}
                            container alignItems="center" className="ContainerInput">
                            <Input placeholder="Last Employer" />

                        </Grid>

                        <Grid item xs={6} className="DatepickerInput">
                            <DatePicker suffixIcon={<img src={CalenderIcon} className="DateInput_svg" />} onChange={onChange} placeholder="start Date" style={{ width: 185 }} className="DatePicker_View" />

                        </Grid>

                        <Grid item xs={6} className="DatepickerInput">
                            <DatePicker suffixIcon={<img src={CalenderIcon} className="DateInput_svg" />} onChange={onChange} placeholder="End Date" style={{ width: 185 }} className="DatePicker_View" />

                        </Grid>

                        <Grid item xs={8}
                            container alignItems="center" className="ContainerInput">
                            <Input placeholder="Reference Email 1" />

                        </Grid>

                        <Grid item xs={8}
                            container alignItems="center" className="ContainerInput">
                            <Input placeholder="Reference Email 2" />

                        </Grid>

                        <Grid item xs={6}
                            container alignItems="center" className="ContainerInput">
                            <Input placeholder="Reference Phone 1" />

                        </Grid>

                        <Grid item xs={6}
                            container alignItems="center" className="ContainerInput">
                            <Input placeholder="Reference Phone 2" />

                        </Grid>

                    </Grid>
                </div>
                <div className="Right_Container">
                    <Grid container direction="column" justify="center" spacing={1}>
                        <Grid item xs={12} className="SelectOption">
                            <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="Skils" optionFilterProp="children" filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput" style={{ width: "70%" }}  >

                            </Select>
                        </Grid>

                        <Grid item xs={12} className="SelectOption">
                            <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />}
                                showSearch placeholder="Traits" optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput" style={{ width: "70%" }}  >

                            </Select>
                        </Grid>

                        <Grid item xs={12} className="SelectOption">
                            <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="Certification" optionFilterProp="children" filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput" style={{ width: "70%" }} >

                            </Select>
                        </Grid>

                        <Grid item xs={12} className="SelectOption">
                            <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch placeholder="Specializations"
                                optionFilterProp="children" filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput" style={{ width: "70%" }} >

                            </Select>
                        </Grid>

                        <Grid item xs={12} className="SelectOption">
                            <Select
                                suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch placeholder="Talents" optionFilterProp="children" filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput" style={{ width: "70%" }} >

                            </Select>
                        </Grid>

                        <Grid item xs={12} className="SelectOption">
                            <Select
                                suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch placeholder="Special Intrests" optionFilterProp="children" filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput" style={{ width: "70%" }} >

                            </Select>
                        </Grid>

                        <Grid item xs={5} container alignItems="center" className="ContainerInput">
                            <Input placeholder="Contact Phone " style={{ width: "200%" }} />
                        </Grid>

                        <Grid item xs={8} container alignItems="center" className="ContainerInput">
                            <Input placeholder="Email Id " />
                        </Grid>


                        <Grid item xs={8} container alignItems="center" className="ContainerInput">
                            <Input placeholder="Mail Address " />
                        </Grid>

                        <Grid item xs={12} className="SelectOption">
                            <Select
                                suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch placeholder="State of Domecile" optionFilterProp="children" filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput" style={{ width: "70%" }} >

                            </Select>
                        </Grid>

                        <Grid item xs={12} className="SelectOption">
                            <Select
                                suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch placeholder="City" optionFilterProp="children" filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput" style={{ width: "70%" }} >

                            </Select>
                        </Grid>

                        <Grid item xs={12} className="SelectOption">
                            <Select
                                suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch placeholder="Languages Known" optionFilterProp="children" filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput" style={{ width: "70%" }} >

                            </Select>
                        </Grid>

                        <Grid item xs={12} className="SelectOption">
                            <Select
                                suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch placeholder="Industry" optionFilterProp="children" filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput" style={{ width: "70%" }} >

                            </Select>
                        </Grid>
                        <Grid item xs={8} container direction="row" justify="space-around" alignItems="flex-start" className="Final_buttons" >
                            <div className="SaveButton saveMessage"  onClick={success}> Save</div>
                            <div className="CancelButton"> Cancel</div>

                        </Grid>

                    </Grid>
                </div>

            </div>
        </div>

    )
}
export default ResumePage;



// resume.scss



.ContentTitle {
    font-size: 24px;
    font-weight: 550;
    color: #000000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    height: 40px;
  }
  
  .master_container {
    display: flex;
    padding: 1%;
  }
  
  .Left_Container {
    width: 55%;
    padding-left: 7%;
  }
  
  .Right_Container {
    width: 45%;
  
  }
  
  .SelectInput_svg {
    width: 167%;
    height: 19px;
  }
  .DateInput_svg{
    height: 20px;
  }
  
  // .ContainerInput .ant-input {
  //   border-top-left-radius: 8px;
  //   border-bottom-left-radius: 8px;
  //   border-top-right-radius: 8px;
  //   border-bottom-right-radius: 8px;
  //   border: 1px solid #0353A4;
  
  // }
  
  .SelectionInput .ant-select-arrow {
    margin-top: -11px;
    margin-right: 5px;
  
  }
  
  
  .SelectOption .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 1px solid #0353A4;
  
  }
  
  .DatepickerInput .ant-picker {
  
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 1px solid #0353A4;
  }
  
  .DatepickerInput .ant-picker-suffix {
    font-size: 23px;
    color: #0353A4;
  }
  
  .SaveButton {
    height: 35px;
    width:28%;
    background-color: #023E7D;
    text-align: center;
    color: white;
    font-size: 18px;
    font-weight: bold;
    padding-top: 5px;
    border-radius: 8px;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
    margin-top: 10%;
    cursor: pointer;
  }
  
  
  
  .CancelButton{
    height: 35px;
    width: 30%;
    background-color: rgb(251, 248, 252);
    text-align: center;
    color: rgb(134, 130, 130);
    font-size: 18px;
    font-weight: bold;
    padding-top: 5px;
    border-radius: 8px;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
    margin-top: 10%;
    cursor: pointer;
  
  }

  // ::-webkit-input-placeholder {
  //   color: rgb(87, 84, 84) !important;
  // }
  
  // .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
  //   color: rgb(87, 84, 84) !important;
  
  // }