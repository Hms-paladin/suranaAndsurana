import React, { useState, useEffect } from "react";
import EnhancedTable from '../../component/DynTable/table';
import { useDispatch, connect } from "react-redux";
import { getClientDetails } from "../../actions/MasterDropdowns";
import { getClientDetailsByName } from "../../actions/AddClientAction";
import CustomButton from "../../component/Buttons/button";
import Grid from '@material-ui/core/Grid';
import './search.scss'
import Edit from "../../images/editable.svg";
import Client from "../AddClient/addclient.js";
import DynModel from "../../component/Model/model";
import Labelbox from '../../helpers/labelbox/labelbox'
const headCells = [
    { id: 's_no', label: 'S.No' },
    { id: 'name', label: 'Name' },
    { id: 'client_type', label: 'Client Type' },
    // { id: 'gender', label: 'Gender' },
    { id: 'email', label: ' Email' },
    { id: 'state', label: 'State ' },
    { id: "edit", label: "Edit" },

];

function Clientsearch(props) {
    const dispatch = useDispatch();
    const [updateList, setUpdatelist] = useState([])
    const [ClientModel, setClientModel] = useState(false)
    const [EditClientData, setEditClientData] = useState([])
    const [clientSearch, setclientSearch] = useState('')

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
                name: <div onClick={() => handleEdit(data)} style={{ cursor: 'pointer', color: 'blue' }} >{data.client}</div>,
                client_type: data.client_type,
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

    const onViewAll = () => {
        setclientSearch('')
        dispatch(getClientDetails())
    }
    const onChange = (data) => {
        setclientSearch(data)
        dispatch(getClientDetailsByName(data))
    }
    /////////////
    return (
        <div>
            <div>
                <div className="ope_container">
                    <Grid item xs={12} spacing={2} container direction="row">

                        <Grid item xs={4} direction="column">
                            <div>Client Name Search</div>
                            <Labelbox type="text"
                                changeData={(data) => onChange(data)}
                                value={clientSearch}
                            />
                            </Grid>
                        <Grid item xs={2} direction="column">
                            <div></div>
                            <CustomButton btnName={"Create Client "} custombtnCSS='full_width' btnCustomColor="customPrimary" onBtnClick={() => (setEditClientData([]), setClientModel(true))} />
                        </Grid>
                        <Grid item xs={2} direction="column">
                            <div></div>
                            <CustomButton btnName={"View All"} custombtnCSS='full_width' btnCustomColor="customPrimary" onBtnClick={onViewAll} />
                        </Grid>
                    </Grid>
                </div>
                {/* <div className="addClientBtn">
                    <div>
                        <div>Client Name Search</div>
                        <Labelbox type="text"
                            changeData={(data) => onChange(data)}
                            value={clientSearch}
                        />
                    </div>
                    <CustomButton btnName={"Create Client "} btnCustomColor="customPrimary" onBtnClick={() => (setEditClientData([]), setClientModel(true))} />
                    <CustomButton btnName={"View All"} btnCustomColor="customPrimary" onBtnClick={onViewAll} />
                </div> */}
                <div className="resume_searchtable">
                    <EnhancedTable headCells={headCells} rows={updateList.length == 0 ? updateList : updateList.updatelist} hideSortIcon={false} />
                </div>

                <DynModel
                    modelTitle={""}
                    handleChangeModel={ClientModel}

                    handleChangeCloseModel={(bln) => setClientModel(bln)}
                    content={<Client EditClientData={EditClientData.length > 0 ? EditClientData : undefined} model_close={() => setClientModel(false)} />} width={1300} />
            </div>

        </div >


    )
}
const mapStateToProps = state => ({
    getClientDetails: state.getOptions.getClientDetails,
})

export default connect(mapStateToProps)(Clientsearch);