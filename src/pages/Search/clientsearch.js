import React, { useState, useEffect } from "react";
import EnhancedTable from '../../component/DynTable/table';
import { useDispatch, connect } from "react-redux";
import { getClientDetails } from "../../actions/MasterDropdowns";
import CustomButton from "../../component/Butttons/button";
import './search.scss'
import Edit from "../../images/editable.svg";
import { Redirect, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Client from "../AddClient/addclient.js";
import DynModel from "../../component/Model/model";

const headCells = [
    { id: 's_no', label: 'S.No' },
    { id: 'name', label: 'Name' },
    { id: 'client_type', label: 'Client Type' },
    { id: 'gender', label: 'Gender' },
    { id: 'email', label: ' Email' },
    { id: 'state', label: 'State ' },
    { id: "edit", label: "Edit" },

];

function Clientsearch(props) {
    let history = useHistory();
    const dispatch = useDispatch();
    const [updateList, setUpdatelist] = useState([])
    const [ClientModel, setClientModel] = useState(false)
    const [EditClientData, setEditClientData] = useState([])

    const handleEdit = (data) => {
        setEditClientData([data])
        setClientModel(true)
    }
    useEffect(() => {
        dispatch(getClientDetails())
    }, [])
    useEffect(() => {
        let updatelist = []
        var listarray;
        props.getClientDetails?.map((data, index) => {
            listarray = {
                s_no: (index + 1),
                name: data.client,
                client_type: data.client_type,
                gender: data.gender,
                email_id: data.email_id,
                state: data.state,
                action: (
                    <>
                        <img src={Edit} className="editImage" onClick={() => handleEdit(data)} style={{ cursor: 'pointer' }} />{" "}
                    </>
                ),
            };
            updatelist.push(listarray);
        })
        setUpdatelist({ updatelist });

    }, [props.getClientDetails])

    /////////////
    return (
        <div>
            <div>

                <div className="resume_searchtable">
                    <EnhancedTable headCells={headCells} rows={updateList.length == 0 ? updateList : updateList.updatelist} hideSortIcon={false} />
                </div>
                <div className="searchinterviewbtn">
                    <CustomButton btnName={"Create Client "} btnCustomColor="customPrimary" onBtnClick={() => (setEditClientData([]), setClientModel(true))} />
                </div>
                <DynModel
                    modelTitle={""}
                    handleChangeModel={ClientModel}

                    handleChangeCloseModel={(bln) => setClientModel(bln)}
                    content={<Client EditClientData={EditClientData.length > 0 ? EditClientData : undefined} model_close={() => setClientModel(false)} />} width={1300} />
            </div>

        </div>


    )
}
const mapStateToProps = state => ({
    getClientDetails: state.getOptions.getClientDetails,
})

export default connect(mapStateToProps)(Clientsearch);