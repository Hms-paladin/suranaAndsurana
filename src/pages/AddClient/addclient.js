import { useEffect, useState } from "react";
import Axios from "axios";
import { apiurl } from "../../utils/baseUrl";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import CustomButton from "../../component/Buttons/button";
import { InsertClient } from "../../actions/AddClientAction"
import { connect, useDispatch } from "react-redux";
import "./addclient.scss";
import PlusIcon from "../../images/plusIcon.svg";
import { getDesignationListByDept, getCity_By_Id, } from '../../actions/MasterDropdowns'
import Edit from "../../images/eyes.svg";

function AddClient(props) {
  const dispatch = useDispatch();
  const [clientName, setClientName] = useState({});
  const [fileupload, setFileupload] = useState([]);
  const [stateList, setstateList] = useState({});
  const [clientNameDropDown, setClientNameDropDown] = useState([]);
  const [cityList, setcityList] = useState({});
  const [Industry, setIndustry] = useState({});
  const [selectedFile, setselectedFile] = useState([]);
  const [getdata, setgetData] = useState([])
  const [SaveButton, setSaveButton] = useState(true);
  const [Addclient_Form, setAddclient_Form] = useState({
    client_id: {
      value: "0",
    },
    client_name: {
      value: "",
      validation: [{ name: "required" }, { name: "custommaxLength", params: "70" }, { "name": "alphaspecialwithwhitespace" }],
      error: null,
      errmsg: null,
    },
    industrty: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    con_per_1: {
      value: "",
      validation: [{ name: "required" }, { name: "custommaxLength", params: "50" }, { name: "alphaspecialwithwhitespace" }],
      error: null,
      errmsg: null,
    },
    designation_id_1: {
      value: "",
      error: null,
      errmsg: null,
    },
    con_ph_1: {
      value: "",
      validation: [{ name: "required" }, { name: "mobile" }],
      error: null,
      errmsg: null,
    },
    email_id_1: {
      value: "",
      valueById: "",
      validation: [{ name: "required" }, { name: "custommaxLength", params: "100" }, { "name": "email" }],
      error: null,
      errmsg: null,
    },
    postal_address: {
      value: "",
      valueById: "",
      validation: [{ name: "required" }, { name: "custommaxLength", params: "250" }],
      error: null,
      errmsg: null,
    },
    ct_address: {
      value: "",
      valueById: "",
      validation: [{ name: "custommaxLength", params: "250" }],
      error: null,
      errmsg: null,
    },
    client_type: {
      value: "",
      valueById: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    cont_per_2: {
      value: "",
      valueById: "",
      validation: [{ name: "custommaxLength", params: "50" }, { name: "alphaspecialwithwhitespace" }],
      error: null,
      errmsg: null,
    },
    designation_id_2: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    con_ph_2: {
      value: "",
      validation: [{ name: "mobile" }],
      error: null,
      errmsg: null,
    },
    emai_id_2: {
      value: "",
      validation: [{ name: "custommaxLength", params: "100" }, { "name": "email" }],
      error: null,
      errmsg: null,
    },
    state: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    city: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    document_upload_name: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    upload: {
      value: null,
      validation: [],
      error: null,
      errmsg: null,
      disabled: false,
      view_file: null,
      empty: false,
    },
    gst_no: {
      value: "",
      validation: [{ name: "required" }, { name: "gst" }],
      error: null,
      errmsg: null,
    },
    pan_no: {
      value: "",
      validation: [{ name: "required" }, { name: "pan" }],
      error: null,
      errmsg: null,
    },
    state_code: {
      value: "",
      error: null,
      errmsg: null,
    },
  });
  let myWindow;
  function onViewFile(url) {
    myWindow?.close();
    myWindow = window.open(`${url}`, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")
  }
  useEffect(() => {
    dispatch(getDesignationListByDept());
    // Client
    Axios({
      method: "GET",
      url: apiurl + "get_client_type",
    }).then((response) => {
      let clientData = [];
      response.data.data.map((data) =>
        clientData.push({ id: data.client_type_id, value: data.client_type })
      );
      setClientName({ clientData });
    });

    // Industry
    Axios({
      method: "GET",
      url: apiurl + "get_s_tbl_m_industry",
    }).then((response) => {
      let industryData = [];
      response.data.data.map((data) =>
        industryData.push({ id: data.industry_id, value: data.industry })
      );
      setIndustry({ industryData });
    });


    // Client  type
    Axios({
      method: "GET",
      url: apiurl + "get_client_type",
    }).then((response) => {
      let clientData = [];
      response.data.data.map((data) =>
        clientData.push({ id: data.client_type_id, value: data.client_type })
      );
      setClientName({ clientData });
    });

    // state
    Axios({
      method: "GET",
      url: apiurl + "get_s_tbl_m_state",
    }).then((response) => {
      let stateData = [];
      response.data.data.map((data) =>
        stateData.push({ id: data.state_id, value: data.state })
      );
      setstateList({ stateData });
    });
  }, [setClientName, setAddclient_Form]);

  useEffect(() => {
    let Designation = [];
    props.getDesignationListByDept.map((data, index) =>
      Designation.push({ id: data.designation_id, value: data.designation })
    );
    setgetData({ Designation });
    if (Addclient_Form.state.value != "") {
      let cityData = [];
      props.getCity.map((data, index) => {
        cityData.push({ value: data.state, id: data.city_id });
      });
      setcityList({ cityData });
    }

  }, [props.getDesignationListByDept, props.getCity]);

  useEffect(() => {
    if (Number(Addclient_Form.client_type.value) === 16) {
      Addclient_Form['gst_no'].validation = [];
      Addclient_Form['pan_no'].validation = [];
    } else {
      Addclient_Form['gst_no'].validation = [{ name: "required" }, { name: "gst" }];
      Addclient_Form['pan_no'].validation = [{ name: "required" }, { name: "pan" }];
    }
    setAddclient_Form((prevState) => ({
      ...prevState,
    }));
  }, [Addclient_Form.client_type.value])

  async function checkValidation(data, key, multipleId) {
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      Addclient_Form[key].validation
    );

    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: Addclient_Form[key].validation,
    };

    // only for multi select (start)

    let multipleIdList = [];

    if (multipleId) {
      multipleId.map((item) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i] === item.value) {
            multipleIdList.push(item.id);
          }
        }
      });
      dynObj.valueById = multipleIdList.toString();
    }
    // (end)

    if (key === "client_name" && data) {
      Axios({
        method: "POST",
        url: apiurl + "get_client_name_search",
        data: {
          "client_name": data,
        },
      }).then((response) => {
        if (response.data.status === 1) {
          setClientNameDropDown(response.data.data)
          // let dynObj = {
          //   value: data,
          //   error: true,
          //   errmsg: "Client Name Already Exits",
          //   validation: Addclient_Form[key].validation,
          // };

          // setAddclient_Form((prevState) => ({
          //   ...prevState,
          //   ['client_name']: dynObj,
          // }));
          return Promise.resolve();
        } else {
          setClientNameDropDown([])
        }

      });

    }
    if (key === "state") {
      dispatch(getCity_By_Id(data))
    }
    setAddclient_Form((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  }

  async function onSubmit() {
    var mainvalue = {};
    var targetkeys = Object.keys(Addclient_Form);

    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        Addclient_Form[targetkeys[i]].value,
        Addclient_Form[targetkeys[i]].validation
      );
      Addclient_Form[targetkeys[i]].error = !errorcheck.state;
      Addclient_Form[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = Addclient_Form[targetkeys[i]].value;
    }

    var filtererr = targetkeys.filter(
      (obj) => Addclient_Form[obj].error == true
    );
    if (filtererr.length > 0) {
    } else {
      setSaveButton(false)
      await dispatch(InsertClient(Addclient_Form, fileupload))
      //  .then(() => {
      onHandleCancel()
      setSaveButton(true)
      // })
    }

    setAddclient_Form((prevState) => ({
      ...prevState,
    }));


  }

  async function onfileupload() {
    const From_key = ['document_upload_name', 'upload'];

    if (!Addclient_Form.upload.value || Addclient_Form.upload.value === '' || Addclient_Form.document_upload_name.value === '') {
      From_key.map((data) => {
        if (!Addclient_Form[data].value || Addclient_Form[data].value === '') {
          let dynObj = {
            value: Addclient_Form[data].value,
            error: true,
            errmsg: "Field required",
            validation: [{ "name": "required" }],
          };
          setAddclient_Form((prevState) => ({
            ...prevState,
            [data]: dynObj,
          }));
        }
      });

    } else {

      var sss = {
        document_upload_name: Addclient_Form.document_upload_name.value,
        selectedFile: Addclient_Form.upload.value
      }
      setFileupload((prevState) => ([
        ...prevState, sss
      ]));
      Addclient_Form['document_upload_name'].value = '';
      Addclient_Form.upload.empty = true;
      // Addclient_Form.upload.value = '';
      // From_key.map((data) => {

      //   try {
      //     data!=='upload'?(Addclient_Form[data].value = ""):(Addclient_Form[data].value = []);
      //   } catch (error) {
      //     throw (error)
      //   }
      // });
      // Addclient_Form.upload.value=null;
      // Addclient_Form.document_upload_name.value='';
      setAddclient_Form((prevState) => ({
        ...prevState,
      }));

    }


  }

  useEffect(() => {
    if (Addclient_Form.gst_no.value && Addclient_Form.gst_no.value != "" && !Addclient_Form.gst_no.error) {
      Addclient_Form.state_code.value = Addclient_Form.gst_no.value.substring(0, 2)
    } else {
      Addclient_Form.state_code.value = ""
    }
    setAddclient_Form((prevState) => ({
      ...prevState,
    }));
  }, [Addclient_Form.gst_no.value])

  const onStateClear = () => {
    let From_key = [
      "document_upload_name",
      "city",
      "state",
      "emai_id_2",
      "con_ph_2",
      "designation_id_2", "cont_per_2", "client_type", "postal_address", "email_id_1", "con_ph_1",
      "designation_id_1", "con_per_1", "industrty", "client_name", "client_id", "gst_no", "pan_no", "ct_address", "upload"]


    From_key.map((data) => {

      try {
        Addclient_Form[data].value = "";
        Addclient_Form[data].error = false;
        Addclient_Form[data].errmsg = null;
      } catch (error) {
        throw (error)
      }
    });
    setselectedFile([])
    setFileupload([])
    setSaveButton(true)
    setAddclient_Form((prevState) => ({
      ...prevState,
    }));

  };
  const onHandleCancel = () => {
    onStateClear()
    props.model_close && props.model_close()
  }
  useEffect(() => {
    onStateClear()
    if (props.EditClientData) {
      let CreateClient_key = [
        "city",
        "state",
        "emai_id_2",
        "con_ph_2",
        "designation_id_2", "cont_per_2", "client_type", "postal_address", "email_id_1", "con_ph_1",
        "designation_id_1", "con_per_1", "industrty", "client_name", "client_id", "gst_no", "pan_no", "document_upload_name", "ct_address"]


      let CreateClient_value = [
        "city_id",
        "state_id",
        "ct_email_id",
        "ct_contact_no",
        "designation_id_2", "contact_person_2", "client_type_id", "address", "email_id", "contact_no",
        "designation_id_1", "contact_person_1", "industry_id", "client", "client_id", "gst_no", "pan_no", "document_upload_name", "ct_address"];

      CreateClient_key.map((data, index) => {
        if (data === "document_upload_name") {
          setFileupload(props.EditClientData[0]['documents']);
          return
        }
        if (data === "state") {
          dispatch(getCity_By_Id(props.EditClientData[0][CreateClient_value[index]]))
        }

        Addclient_Form[data].value = props.EditClientData[0][CreateClient_value[index]] === '0' ? '' : props.EditClientData[0][CreateClient_value[index]];
        return true;
      });
      setAddclient_Form((prevState) => ({
        ...prevState,
      }));
    }
  }, [props.EditClientData])
  console.log(clientNameDropDown, 'clientNameDropDown')
  return (
    <div>
      <div
        style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "600" }}
      >
        {props.EditClientData ? 'Edit' : 'Add'} Client
      </div>
      <div className="Container">
        <div className="leftContainer">
          <Grid container spacing={2}>
            <Grid item xs={12} container direction="row" alignItems="center" >
              <Grid item xs={12}>
                <div className="AddClientHead">Client Name</div>
                <Labelbox
                  type="autoComplete"
                  changeData={(data) => checkValidation(data, "client_name")}
                  value={Addclient_Form.client_name.value}
                  error={Addclient_Form.client_name.error}
                  errmsg={Addclient_Form.client_name.errmsg}
                  dropdown={clientNameDropDown}
                />
              </Grid>


            </Grid>
            <Grid item xs={12} container direction="row" alignItems="center" >
              <Grid item xs={6}>
                <div className="AddClientHead">GST No.</div>
                <div className="genderDobFlex">
                  <Labelbox
                    type="text"
                    changeData={(data) => checkValidation(data, "gst_no")}
                    value={Addclient_Form.gst_no.value}
                    error={Addclient_Form.gst_no.error}
                    errmsg={Addclient_Form.gst_no.errmsg}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="AddClientHead">PAN No.</div>
                <div className="genderDobFlex">
                  <Labelbox
                    type="text"
                    changeData={(data) => checkValidation(data, "pan_no")}
                    value={Addclient_Form.pan_no.value}
                    error={Addclient_Form.pan_no.error}
                    errmsg={Addclient_Form.pan_no.errmsg}
                  />
                </div>
              </Grid>
              <Grid item xs={2}>
                <div className="AddClientHead">State Code</div>
                <div className="genderDobFlex">
                  <Labelbox
                    type="text"
                    disabled
                    changeData={(data) => checkValidation(data, "state_code")}
                    value={Addclient_Form.state_code.value}
                    error={Addclient_Form.state_code.error}
                    errmsg={Addclient_Form.state_code.errmsg}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="dashed_div_client">
              <Grid item xs={12}>
                <div className="AddClientHead">Contact Person 1</div>
                <Labelbox
                  type="text"
                  changeData={(data) => checkValidation(data, "con_per_1")}
                  value={Addclient_Form.con_per_1.value}
                  error={Addclient_Form.con_per_1.error}
                  errmsg={Addclient_Form.con_per_1.errmsg}
                />
              </Grid>
              <Grid item xs={12} container direction="row" alignItems="center">
                <Grid item xs={6}>
                  <div className="AddClientHead">Designation</div>
                  <div className="genderDobFlex">
                    <Labelbox
                      type="text"
                      changeData={(data) => checkValidation(data, "designation_id_1")}
                      value={Addclient_Form.designation_id_1.value}
                      error={Addclient_Form.designation_id_1.error}
                      errmsg={Addclient_Form.designation_id_1.errmsg}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="AddClientHead">Contact Phone</div>
                  <Labelbox
                    type="text"
                    changeData={(data) => checkValidation(data, "con_ph_1")}
                    value={Addclient_Form.con_ph_1.value}
                    error={Addclient_Form.con_ph_1.error}
                    errmsg={Addclient_Form.con_ph_1.errmsg}
                  />
                </Grid>
              </Grid>


              <Grid item xs={12}>
                <div className="AddClientHead">Email ID</div>
                <Labelbox
                  type="text"
                  changeData={(data) => checkValidation(data, "email_id_1")}
                  value={Addclient_Form.email_id_1.value}
                  error={Addclient_Form.email_id_1.error}
                  errmsg={Addclient_Form.email_id_1.errmsg}
                />
              </Grid>
              <Grid item xs={12} className="textarea_height">
                <div className="AddClientHead">Postal Address</div>
                <Labelbox
                  type="textarea"
                  changeData={(data) => checkValidation(data, "postal_address")}
                  value={Addclient_Form.postal_address.value}
                  error={Addclient_Form.postal_address.error}
                  errmsg={Addclient_Form.postal_address.errmsg}
                />
              </Grid>
            </Grid>

            <div style={{ display: "flex" }}>
              <div>
                <Grid md={12}>
                  <Labelbox
                    type="text"
                    placeholder="Document Upload"
                    changeData={(data) => checkValidation(data, "document_upload_name")}
                    value={Addclient_Form.document_upload_name.value}
                    error={Addclient_Form.document_upload_name.error}
                    errmsg={Addclient_Form.document_upload_name.errmsg}
                  ></Labelbox>
                </Grid>
              </div>

              <div className="uploadfileSpace">
                {" "}

                <Labelbox type="upload"
                  changeData={(data) => checkValidation(data, "upload")}
                  view_file={Addclient_Form.upload.view_file}
                  value={Addclient_Form.upload.value}
                  error={Addclient_Form.upload.error}
                  errmsg={Addclient_Form.upload.errmsg}
                  empty={Addclient_Form.upload.empty}
                  disabled={Addclient_Form.upload.disabled}
                />

              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 15 }} >

                <img src={PlusIcon} style={{ cursor: 'pointer', width: 19, marginTop: -23 }} onClick={onfileupload} />
              </div>

            </div>
            <div className="doc_upload_div">
              <div style={{ width: '50%' }}>Document Title</div>
              <div style={{ width: '40%' }}>File Name </div>
              {props.EditClientData && <div style={{ width: '10%' }}>View</div>}</div>
            {fileupload.map((data) => {
              return (<>

                <div className="doc_upload_items">
                  <div style={{ width: '50%' }}>{data.document_upload_name || data.document_name}</div>
                  <div style={{ width: '40%' }}>{((data?.selectedFile?.name) ? data.selectedFile.name.substr(data.selectedFile.name, 20) + '..' : '') || (data?.url?.length > 0 ? data.url.substr(35, 15) + '..' : '')}</div>
                  {props.EditClientData && <div style={{ width: '10%' }}>{data.url && <img src={Edit} className="editImage" style={{ cursor: 'pointer' }} onClick={() => (onViewFile(data.url))} ></img>}</div>}
                </div></>
              )
            })}

          </Grid>
        </div>
        <div className="rightContainer_client">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="AddClientHead">Industry</div>
              <Labelbox
                type="select"
                dropdown={Industry.industryData}
                changeData={(data) => checkValidation(data, "industrty")}
                value={Addclient_Form.industrty.value}
                error={Addclient_Form.industrty.error}
                errmsg={Addclient_Form.industrty.errmsg}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="AddClientHead">Client Type</div>
              <Labelbox
                type="select"
                dropdown={clientName.clientData}
                changeData={(data) => checkValidation(data, "client_type")}
                value={Addclient_Form.client_type.value}
                error={Addclient_Form.client_type.error}
                errmsg={Addclient_Form.client_type.errmsg}
              />
            </Grid>
            <Grid container spacing={2} className="dashed_div_client">
              <Grid item xs={12}>
                <div className="AddClientHead">Contact Person 2</div>
                <Labelbox
                  type="text"
                  changeData={(data) => checkValidation(data, "cont_per_2")}
                  value={Addclient_Form.cont_per_2.value}
                  error={Addclient_Form.cont_per_2.error}
                  errmsg={Addclient_Form.cont_per_2.errmsg}
                />
              </Grid>
              <Grid item xs={12} container direction="row" alignItems="center">
                <Grid item xs={6}>
                  <div className="AddClientHead">Designation</div>
                  <div className="genderDobFlex">
                    <Labelbox
                      type="text"
                      changeData={(data) => checkValidation(data, "designation_id_2")}
                      value={Addclient_Form.designation_id_2.value}
                      error={Addclient_Form.designation_id_2.error}
                      errmsg={Addclient_Form.designation_id_2.errmsg}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="AddClientHead">Contact Phone</div>
                  <Labelbox
                    type="text"
                    changeData={(data) => checkValidation(data, "con_ph_2")}
                    value={Addclient_Form.con_ph_2.value}
                    error={Addclient_Form.con_ph_2.error}
                    errmsg={Addclient_Form.con_ph_2.errmsg}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <div className="AddClientHead">Email ID</div>
                <Labelbox
                  type="text"
                  changeData={(data) => checkValidation(data, "emai_id_2")}
                  value={Addclient_Form.emai_id_2.value}
                  error={Addclient_Form.emai_id_2.error}
                  errmsg={Addclient_Form.emai_id_2.errmsg}
                />
              </Grid>
              <Grid item xs={12} className="textarea_height">
                <div className="AddClientHead">Postal Address</div>
                <Labelbox
                  type="textarea"
                  changeData={(data) => checkValidation(data, "ct_address")}
                  value={Addclient_Form.ct_address.value}
                  error={Addclient_Form.ct_address.error}
                  errmsg={Addclient_Form.ct_address.errmsg}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div className="AddClientHead">State</div>
              <Labelbox
                type="select"
                dropdown={stateList.stateData}
                changeData={(data) => checkValidation(data, "state")}
                value={Addclient_Form.state.value}
                error={Addclient_Form.state.error}
                errmsg={Addclient_Form.state.errmsg}
              />
            </Grid>

            <Grid item xs={12}>
              <div className="AddClientHead">City</div>
              <Labelbox
                type="select"
                dropdown={cityList.cityData}
                changeData={(data) => checkValidation(data, "city")}
                value={Addclient_Form.city.value}
                error={Addclient_Form.city.error}
                errmsg={Addclient_Form.city.errmsg}
              />
            </Grid>

            <Grid
              item
              xs={12}
              container
              direction="row"
              alignItems="center"
              className="resumeBtnContainer"
            >
              <CustomButton
                btnDisable={!SaveButton}
                btnName={"Save"}
                btnCustomColor="customPrimary"
                onBtnClick={onSubmit}
              />
              <CustomButton btnName={"Cancel"} onBtnClick={onHandleCancel} />
            </Grid>
          </Grid>
        </div>
      </div>
      <div></div>
    </div>
  );
}


const mapStateToProps = (state) => (
  {
    // getTableData: state.variableRateMaster.getVariableRateTableData || [],
    getDesignationListByDept: state.getOptions.getDesignationListByDept || [],
    getInsertStatus: state.AddClientReducer.InsertClient,
    clientNameCheck: state.AddClientReducer.clientNameCheck,
    getCity: state.getOptions.getCity_By_Id || []
  }
);

export default connect(mapStateToProps)(AddClient);
