import React from 'react';
// import './search.s/css';
import './Task.scss';
import { Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Progress } from 'antd';
import File from "../../images/file.png";
import Percentage from "../../images/percentage.png";
import Grid from '@material-ui/core/Grid';
import Order from "../../images/order.png";
import Clock from "../../images/clock.png";
import Arrow from "../../images/arrow.svg";
import Star from "../../images/star.png";
import Tick from "../../images/tick.png";
import H_icon from "../../images/H_icon.svg";
import M_icon from "../../images/Medium_priority.svg";
import L_icon from "../../images/Low_priority.svg";
import Delete from "../../images/delete.png";
import Plus from "../../images/plus.png";
import Edit from "../../images/edit.svg";
import Labelbox from "../../helpers/labelbox/labelbox";
import TablePagination from '@material-ui/core/TablePagination';
import Blue from "../../images/blue_round.png";
import Light from "../../images/light_round.png";
import Orange from "../../images/orange_round.png";
import Red from "../../images/red_round.png";


function Task(){
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    return(
       <div>
            <div className="searchfilterflex">
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div style={{display:'flex'}}>
                    <p className="task_head">Tasks</p>
                    <Labelbox type="select"
                            placeholder="Subordinate"
                        />

                    </div>
                    
                    <div style={{display:'flex'}}>
                        <img src={Delete} style={{width:'40px'}}/>
                        <img src={ Edit } style={{width:'33px'}}/>
                        <img src={Plus}style={{width:'40px', height:'38px'}} />
                    </div>

                </div>
           
           
              
{/* first card */}
               <div className="card_div">
                   <Card >
                       <div style={{display:'flex', justifyContent:'space-betwen'}}>
                           <div style={{backgroundColor:'#707070', width:'55px'}}> 
                               <p className="num_align_side">1</p>
                               <Divider/>
                               <img src={Clock} className="img_side_align" />
                           </div>
                        
                           <div style={{width:'36%', padding:'15px'}}>
                              <div style={{display:'flex', justifyContent:'space-around', fontWeight:'bold'}}>
                                  <p>Project Name</p>
                                  <p>project Type</p>
                                  <p>Client Name</p>
                              </div>
                              <div style={{display:'flex', marginLeft:'10px', fontWeight:'bold', fontSize:'16px'}}>
                                  <p style={{paddingRight:'30px'}}>Activity</p>
                                  <p>sub Activity</p>
                              </div>
                              <div style={{display:'flex', fontWeight:'bold'}}>
                                  <p style={{marginRight:'10px'}}>Start Date : 11-jan-2020</p>
                                  <p>End Date : 11-jan-2020</p>
                              </div>
                                <div className="task_bar_align">
                                <Progress percent={100} status="active" />
                               </div>
                          </div>
                          <div className="divider"></div>
                          <div style={{width:'37%'}}>
                            <div className="start_date_yellow">
                                <p>Started Date : 11-jan-2020</p>
                                <p>Time : HH:MM</p>
                            </div>
                            <div style={{marginBottom:'20px', display:'flex' ,justifyContent:'space-between'}}>
                               <span>Actual Start Date :<span>11-jan-2020</span></span>    
                                <span>End Date :<span>11-jan-2020</span></span> 
                            </div>
                            <div>
                              <p>Assigned By <a>Charon Winston</a>On <a>11-jan-2020</a></p>   
                            </div>
                   </div>
                   <div className="divider"></div>
                   <div style={{marginTop:'20px'}}>
                       <div className="total_12_div">
                           <p style={{display:"flex", justifyContent:'center', marginBottom:'0px'}}>Total Hours</p>
                           <p style={{display:"flex", justifyContent:'center'}}>12</p>
                       </div>
                       <div className="images_div">
                           <img src={ Arrow } style={{marginRight:'5px', width:'18px'}}/>
                           <img src={ File } style={{marginRight:'5px', width:'18px'}}/>
                           <img src={ Percentage } style={{marginRight:'5px', width:'18px'}}/>
                           <img src={ Order } style={{marginRight:'5px', width:'18px'}}/>
                       </div>
                    </div>
                    <div style={{backgroundColor:'#707070', width:'55px'}}>
                        <img src={Star} style={{margin:'12px'}}/>
                        <Divider/>
                        <img src={Tick} style={{margin:'12px'}}/> 
                     </div>
                       </div>
                   </Card>
               </div>
               {/* first card end */}

{/* second card */}
               <div className="card_div" style={{marginTop:'10px'}}>
                   <Card >
                       <div style={{display:'flex', justifyContent:'space-betwen'}}>
                           <div style={{backgroundColor:'#707070', width:'55px'}}> 
                               <p className="num_align_side">1</p>
                               <Divider/>
                               <img src={Clock} className="img_side_align"/>
                           </div>
                        
                           <div style={{width:'36%', padding:'15px'}}>
                               <p className="adhoc_align">Adhoc</p>
                               <p className="adhoc_align">Task Description</p>
                              <div style={{display:'flex', fontWeight:'bold'}}>
                                  <p style={{marginRight:'10px'}}>Start Date : 11-jan-2020</p>
                                  <p>End Date : 11-jan-2020</p>
                              </div>
                                <div className="task_bar_align_yellow">
                                <Progress percent={47} status="active" />
                               </div>
                          </div>
                          <div className="divider"></div>
                          <div style={{width:'37%'}}>
                            <div className="start_date_yellow">
                                <p>Started Date : 11-jan-2020</p>
                                <p>Time : HH:MM</p>
                            </div>
                            <div style={{marginBottom:'20px', display:'flex' ,justifyContent:'space-between'}}>
                               <span>Actual Start Date :<span>11-jan-2020</span></span>    
                                <span>End Date :<span>11-jan-2020</span></span> 
                            </div>
                            <div>
                              <p>Assigned By <a>Charon Winston</a>On <a>11-jan-2020</a></p>   
                            </div>
                   </div>
                   <div className="divider"></div>
                   <div style={{marginTop:'20px'}}>
                       <div className="total_12_div">
                           <p style={{display:"flex", justifyContent:'center', marginBottom:'0px'}}>Total Hours</p>
                           <p style={{display:"flex", justifyContent:'center'}}>12</p>
                       </div>
                       <div className="images_div">
                           <img src={ H_icon } style={{marginRight:'10px'}}/>
                           <img src={ File } style={{marginRight:'10px'}}/>
                           <img src={ Percentage } style={{marginRight:'10px'}}/>
                       </div>
                    </div>
                    <div style={{backgroundColor:'#707070', width:'55px'}}>
                        <img src={Star} style={{margin:'12px'}}/>
                        <Divider/>
                        <img src={Tick} style={{margin:'12px'}}/> 
                     </div>
                       </div>
                   </Card>
               </div>
{/* second card end */}


{/* third card start */}
               <div className="card_div" style={{marginTop:'10px'}}>
                   <Card >
                       <div style={{display:'flex', justifyContent:'space-betwen'}}>
                           <div style={{backgroundColor:'#707070', width:'55px'}}> 
                               <p className="num_align_side">1</p>
                               <Divider/>
                               <img src={Clock} className="img_side_align"/>
                           </div>
                        
                           <div style={{width:'36%', padding:'15px'}}>
                               <h3>Task Details And Other  Details</h3>
                               <p>Task Details And Other  Details   </p>
                       
                              <div style={{display:'flex', fontWeight:'bold'}}>
                                  <p style={{marginRight:'10px'}}>Start Date : 11-jan-2020</p>
                                  <p>End Date : 11-jan-2020</p>
                              </div>
                                <div className="task_bar_align_orange">
                                <Progress percent={10} status="active" />
                               </div>
                          </div>
                          <div className="divider"></div>
                          <div style={{width:'37%'}}>
                            <div className="start_date_yellow">
                                <p>Started Date : 11-jan-2020</p>
                                <p>Time : HH:MM</p>
                            </div>
                            <div style={{marginBottom:'20px', display:'flex' ,justifyContent:'space-between'}}>
                               <span>Actual Start Date :<span>11-jan-2020</span></span>    
                                <span>End Date :<span>11-jan-2020</span></span> 
                            </div>
                            <div>
                              <p>Assigned By <a>Charon Winston</a>On <a>11-jan-2020</a></p>   
                            </div>
                   </div>
                   <div className="divider"></div>
                   <div style={{marginTop:'20px'}}>
                       <div className="total_12_div">
                           <p style={{display:"flex", justifyContent:'center', marginBottom:'0px'}}>Total Hours</p>
                           <p style={{display:"flex", justifyContent:'center'}}>12</p>
                       </div>
                       <div className="images_div">
                           <img src={ M_icon } style={{marginRight:'10px', width:'18px'}}/>
                           <img src={ File } style={{marginRight:'10px', width:'18px'}}/>
                           <img src={ Percentage } style={{marginRight:'10px', width:'18px'}}/>
                           <img src={ Order } style={{marginRight:'10px', width:'18px'}}/>
                       </div>
                    </div>
                    <div style={{backgroundColor:'#707070', width:'55px'}}>
                        <img src={Star} style={{margin:'12px'}}/>
                        <Divider/>
                        <img src={Tick} style={{margin:'12px'}}/> 
                     </div>
                       </div>
                   </Card>
               </div>
  {/* Third card end */}



   {/* fourth card start */}
               <div className="card_div" style={{marginTop:'10px'}}>
                   <Card >
                       <div style={{display:'flex', justifyContent:'space-betwen'}}>
                           <div style={{backgroundColor:'#707070', width:'55px'}}> 
                               <p className="num_align_side">1</p>
                               <Divider/>
                               <img src={Clock} className="img_side_align"/>
                           </div>
                        
                           <div style={{width:'36%', padding:'15px'}}>
                               <h3>Task Details And Other  Details</h3>
                               <p>Task Details And Other  Details   </p>
                              <div style={{display:'flex', fontWeight:'bold'}}>
                                  <p style={{marginRight:'10px'}}>Start Date : 11-jan-2020</p>
                                  <p>End Date : 11-jan-2020</p>
                              </div>
                                <div className="task_bar_align">
                                <Progress percent={100} status="active" />
                               </div>
                          </div>
                          <div className="divider"></div>
                          <div style={{width:'37%'}}>
                            <div className="start_date_yellow">
                                <p>Started Date : 11-jan-2020</p>
                                <p>Time : HH:MM</p>
                            </div>
                            <div style={{marginBottom:'20px', display:'flex' ,justifyContent:'space-between'}}>
                               <span>Actual Start Date :<span>11-jan-2020</span></span>    
                                <span>End Date :<span>11-jan-2020</span></span> 
                            </div>
                            <div>
                              <p>Assigned By <a>Charon Winston</a>On <a>11-jan-2020</a></p>   
                            </div>
                   </div>
                   <div className="divider"></div>
                   <div style={{marginTop:'20px'}}>
                       <div className="total_12_div">
                           <p style={{display:"flex", justifyContent:'center', marginBottom:'0px'}}>Total Hours</p>
                           <p style={{display:"flex", justifyContent:'center'}}>12</p>
                       </div>
                       <div className="images_div">
                           <img src={ L_icon } style={{marginRight:'10px'}}/>
                           <img src={ File } style={{marginRight:'10px'}}/>
                           <img src={ Percentage } style={{marginRight:'10px'}}/>
                           
                       </div>
                    </div>
                    <div style={{backgroundColor:'#707070', width:'55px'}}>
                        <img src={Star} style={{margin:'12px'}}/>
                        <Divider/>
                        <img src={Tick} style={{margin:'12px'}}/> 
                     </div>
                       </div>
                   </Card>
               </div>
 {/*fourth card end  */}

 {/* fifth card start */}
               <div className="card_div" style={{marginTop:'10px'}}>
                   <Card >
                       <div style={{display:'flex', justifyContent:'space-betwen'}}>
                           <div style={{backgroundColor:'#707070', width:'55px'}}> 
                               <p className="num_align_side">1</p>
                               <Divider/>
                               <img src={Clock} className="img_side_align"/>
                           </div>
                        
                           <div style={{width:'36%', padding:'15px'}}>
                               <h3>Task Details And Other  Details</h3>
                               <p>Task Details And Other  Details   </p>
                              <div style={{display:'flex', fontWeight:'bold'}}>
                                  <p style={{marginRight:'10px'}}>Start Date : 11-jan-2020</p>
                                  <p>End Date : 11-jan-2020</p>
                              </div>
                                <div className="task_bar_align_red">
                                <Progress percent={27} status="active" />
                               </div>
                          </div>
                          <div className="divider"></div>
                          <div style={{width:'37%'}}>
                            <div className="start_date_yellow">
                                <p>Started Date : 11-jan-2020</p>
                                <p>Time : HH:MM</p>
                            </div>
                            <div style={{marginBottom:'20px', display:'flex' ,justifyContent:'space-between'}}>
                               <span>Actual Start Date :<span>11-jan-2020</span></span>    
                                <span>End Date :<span>11-jan-2020</span></span> 
                            </div>
                            <div>
                              <p>Assigned By <a>Charon Winston</a>On <a>11-jan-2020</a></p>   
                            </div>
                   </div>
                   <div className="divider"></div>
                   <div style={{marginTop:'20px'}}>
                       <div className="total_12_div">
                           <p style={{display:"flex", justifyContent:'center', marginBottom:'0px'}}>Total Hours</p>
                           <p style={{display:"flex", justifyContent:'center'}}>12</p>
                       </div>
                       <div className="images_div">
                       <img src={ L_icon } style={{marginRight:'10px', width:'18px'}}/>
                           <img src={ File } style={{marginRight:'10px', width:'18px'}}/>
                           <img src={ Percentage } style={{marginRight:'10px', width:'18px'}}/>
                           <img src={ Order } style={{marginRight:'10px', width:'18px'}}/>
                       </div>
                    </div>
                    <div style={{backgroundColor:'#707070', width:'55px'}}>
                        <img src={Star} style={{margin:'12px'}}/>
                        <Divider/>
                        <img src={Tick} style={{margin:'12px'}}/> 
                     </div>
                       </div>
                   </Card>
               </div>
{/* fifth card end */}

{/* sixth card start */}
               <div className="card_div" style={{marginTop:'10px'}}>
                   <Card >
                       <div style={{display:'flex', justifyContent:'space-betwen'}}>
                           <div style={{backgroundColor:'#707070', width:'55px'}}> 
                               <p className="num_align_side">1</p>
                               <Divider/>
                               <img src={Clock} className="img_side_align"/>
                           </div>
                        
                           <div style={{width:'36%', padding:'15px'}}>
                               <h3>Task Details And Other  Details</h3>
                               <p>Task Details And Other  Details   </p>
                              <div style={{display:'flex', fontWeight:'bold'}}>
                                  <p style={{marginRight:'10px'}}>Start Date : 11-jan-2020</p>
                                  <p>End Date : 11-jan-2020</p>
                              </div>
                                <div className="task_bar_align">
                                <Progress percent={100} status="active" />
                               </div>
                          </div>
                          <div className="divider"></div>
                          <div style={{width:'37%'}}>
                            <div className="start_date_yellow">
                                <p>Started Date : 11-jan-2020</p>
                                <p>Time : HH:MM</p>
                            </div>
                            <div style={{marginBottom:'20px', display:'flex' ,justifyContent:'space-between'}}>
                               <span>Actual Start Date :<span>11-jan-2020</span></span>    
                                <span>End Date :<span>11-jan-2020</span></span> 
                            </div>
                            <div>
                              <p>Assigned By <a>Charon Winston</a>On <a>11-jan-2020</a></p>   
                            </div>
                   </div>
                   <div className="divider"></div>
                   <div style={{marginTop:'20px'}}>
                       <div className="total_12_div">
                           <p style={{display:"flex", justifyContent:'center', marginBottom:'0px'}}>Total Hours</p>
                           <p style={{display:"flex", justifyContent:'center'}}>12</p>
                       </div>
                       <div className="images_div">
                           <img src={ Arrow } style={{marginRight:'10px', width:'18px'}}/>
                           <img src={ File } style={{marginRight:'10px', width:'18px'}}/>
                           <img src={ Percentage } style={{marginRight:'10px', width:'18px'}}/>
                           <img src={ Order } style={{marginRight:'10px', width:'18px'}}/>
                       </div>
                    </div>
                    <div style={{backgroundColor:'#707070', width:'55px'}}>
                        <img src={Star} style={{margin:'12px'}}/>
                        <Divider/>
                        <img src={Tick} style={{margin:'12px'}}/> 
                     </div>
                       </div>
                   </Card>
               </div>
   {/* sixth card end */}
           <div className="bottom_align">
            <div className="bottom_div" >
                <div style={{width:'50%'}}>
                    <p>Time Utilized</p>
                </div>
                <div className="divider_bottom"></div>
                <div style={{width:'45%'}}>
                    <p style={{marginBottom:'0px'}}>This Month</p>
                    <p>247 Hrs</p>
                </div>
                <div className="divider_bottom"></div>
                <div  style={{width:'40%'}}>
                    <p style={{marginBottom:'0px'}}>This Week</p>
                    <p>47 Hrs</p>
                </div>
            </div>
            <div>
            <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={100}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        
        />
            </div>
            <div style={{display:'flex'}}>
                <div style={{display:'flex'}}>
                    <img src={Blue} style={{height:'18px'}} />
                    <p>Completed</p>
                </div>
                <div style={{display:'flex'}}>
                    <img src={Light} style={{height:'18px'}}/>
                    <p>In Progress</p>
                </div>
                <div style={{display:'flex'}}>
                    <img src={Orange} style={{height:'18px'}}/>
                    <p>Not Started</p>
                </div>
                <div style={{display:'flex'}}>
                    <img src={Red} style={{height:'18px'}}/>
                    <p>Delayed</p>
                </div>
            </div>
            </div>
           </div>

       </div>
    )
}
export default Task;