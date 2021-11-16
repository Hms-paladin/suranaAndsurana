import React from "react";
import moment from 'moment';
import "./ComponentToprint.css";

export default class ComponentToPrint extends React.Component {
    state = {
        productDetails: [],
    }
    UNSAFE_componentWillReceiveProps(preState) {
      
        this.setState({
            productDetails: preState.productDetails
        })
    }
    render() {
        return (
            <div style={{padding:10}}>



                <div className="printContainer">
                    {/* {item.normalProduct.length > 0 && <> */}
                    <div className="canteenDetails">

                        <div>Surana And Surana Day End Entry for Next Hearing as on 19 August 2021</div>

                    </div>
                    {/* <div className="orderDetailsContainer"> */}
                    {/* <div className="orderValues">
                        <div className="orderKey">
                            <div>Surana Case No. </div>
                            <div>Court No.   </div>
                            <div>Court  </div>
                            <div>Our Client vs Other Party  </div>
                            <div>Last Heard </div>
                            <div>Counsel </div>
                            <div>Day's Outcome  </div>
                            <div>Next Hearing     </div>
                            <div>Action to be Taken  </div>
                            <div>Person Responsible </div>
                            <div>Due Date </div>
                        </div>
                        {this.state.productDetails.map((data) => {
                            return (
                                <div className="orderValue">
                                    <div>{data.internal_case_no || '-'}</div>
                                    <div>{data.court_case_no || '-'}</div>
                                    <div>{data.court || '-'}</div>
                                    <div>{data.client + ' / ' + data.other_party || '-'}</div>
                                    <div>{moment(data.hearing_date).format("DD-MMM-YYYY") || '-'}</div>
                                    <div>{data.assignee || '-'}</div>
                                    <div>{data.hearing_outcome || '-'}</div>
                                    <div>{data.next_hearing_date || '-'}</div>
                                    <div>{data.action_to_be_taken || '-'}</div>
                                    <div>{data.person_responsible || '-'}</div>
                                    <div>{moment(data.due_date).format("DD-MMM-YYYY") || '-'}</div>
                                </div>
                            )
                        })}
                    </div> */}


                    <div className="">
                        <table style={{ width: "100%", fontSize: "13px" }}>
                            <thead>
                                <tr className="TableBorder">
                                    <th>Surana Case No. </th>
                                    <th>Court No.   </th>
                                    <th>Court  </th>
                                    <th>Our Client vs Other Party  </th>
                                    <th>Last Heard </th>
                                    <th>Counsel </th>
                                    <th>Day's Outcome  </th>
                                    <th>Next Hearing     </th>
                                    <th>Action to be Taken  </th>
                                    <th>Person Responsible </th>
                                    <th>Due Date </th>

                                </tr>
                            </thead>
                            {this.state.productDetails.map((data) => {
                                return (
                                    <>
                                        {/* <tbody> */}
                                        <tr className="TableBorder">
                                            <td>{data.surana_case_no || '-'}</td>
                                            <td>{data.court_no || '-'}</td>
                                            <td>{data.court || '-'}</td>
                                            <td>{data.our_client_vs_other_party || '-'}</td>
                                            <td>{moment(data.hearing_date).format("DD-MMM-YYYY") || '-'}</td>
                                            <td>{data.counsel || '-'}</td>
                                            <td>{data.hearing_outcome || '-'}</td>
                                            <td>{data.next_hearing_date || '-'}</td>
                                            <td>{data.action_to_be_taken || '-'}</td>
                                            <td>{data.person_responsible || '-'}</td>
                                            <td>{data.due_date&&moment(data.due_date).format("DD-MMM-YYYY") || '-'}</td>

                                        </tr>

                                    </>
                                )

                            })}

                        </table>


                    </div>
                </div>
                {/* <div>Convenience fee : Rs.10</div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div>.</div> */}
                {/* </div> */}

            </div >

        );
    }
}