import react, { useEffect, useState } from "react";
import Axios from "axios";
import { apiurl } from "../../utils/baseUrl";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import CustomButton from "../../component/Butttons/button";
import { Label } from "@material-ui/icons";
import moment from "moment";
import { notification } from "antd";
import { InsertClient, getClientNameCheck } from "../../actions/AddClientAction"
import PublishIcon from '@material-ui/icons/Publish';
import { connect, useDispatch } from "react-redux";
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import "./addclient.scss";
import PlusIcon from "../../images/plusIcon.svg";
import { getDesignationList } from '../../actions/MasterDropdowns'

function AddClient(props) {
  const dispatch = useDispatch();
  const [clientName, setClientName] = useState({});
  const [fileupload, setFileupload] = useState([]);
  const [stateList, setstateList] = useState({});
  const [cityList, setcityList] = useState({});
  const [Industry, setIndustry] = useState({});
  const [selectedFile, setselectedFile] = useState([]);
  const [getdata, setgetData] = useState([])
  const [test, setTest] = useState([]);
  const [clientExists, setClientExists] = useState(1)

  const [Addclient_Form, setAddclient_Form] = useState({
    client_name: {
      value: "",
      validation: [{ name: "required" }, { name: "custommaxLength", params: "50" }, { "name": "alphaspecialwithwhitespace" }],
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
      validation: [{ name: "required" }],
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
      view_file: null
    },
    gst_no: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    pan_no: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
  });

  useEffect(() => {
    console.log(props.getInsertStatus, "getInsertStatus")
  }, [props.getInsertStatus])


  useEffect(() => {
    dispatch(getDesignationList());
    // Client
    Axios({
      method: "GET",
      url: apiurl + "get_client_type",
    }).then((response) => {
      console.log("response", response);
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
      console.log("response", response);
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
      console.log("response", response);
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
      console.log("response", response);
      let stateData = [];
      response.data.data.map((data) =>
        stateData.push({ id: data.state_id, value: data.state })
      );
      setstateList({ stateData });
    });

    // city
    Axios({
      method: "GET",
      url: apiurl + "get_s_tbl_m_city",
    }).then((response) => {
      console.log("response", response);
      let cityData = [];
      response.data.data.map((data) =>
        cityData.push({ id: data.city_id, value: data.state })
      );
      setcityList({ cityData });
    });

  }, [setClientName, setAddclient_Form]);

  useEffect(() => {
    let Designation = [];
    props.getDesignationList.map((data, index) =>
      Designation.push({ id: data.designation_id, value: data.designation })
    );
    setgetData({ Designation });
  }, [props.getDesignationList]);

  const handleChange = (info, uploadName) => {
    console.log(info, 'sdfjdfsjklkl')


    if (info.status !== 'error' && info.status !== "uploading") {

      let fileList = [...info.fileList];

      // fileList = fileList.slice(-1);

      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      setselectedFile(fileList);

    }
  };

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
      // console.log(dynObj.valueById,"id")
    }
    // (end)


// console.log(data,"gggggggggggggggggggggggggggg")


    if (key === "client_name" && data) {


      Axios({
        method: "POST",
        url: apiurl + "get_client_name_check",
        data: {
          "client_name": data,
        },
      }).then((response) => {
        console.log(response.data.status, "response.data.status")
        if (response.data.status === 0) {
          let dynObj = {
            value: data,
            error: true,
            errmsg: "Client Name Already Exits",
            validation: Addclient_Form[key].validation,
          };

          setAddclient_Form((prevState) => ({
            ...prevState,
            ['client_name']: dynObj,
          }));
          return Promise.resolve();
        }

      });

    }

    setAddclient_Form((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  }

  // console.log(Addclient_Form,"Addclient_Form")
  function onSubmit() {
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
      dispatch(InsertClient(Addclient_Form, fileupload)).then((response) => {
        onStateClear()
        setselectedFile([])


      })
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
      setFileupload((prevState) => (
        [...prevState, {
          document_upload_name: Addclient_Form.document_upload_name.value,
          selectedFile: Addclient_Form.upload.value,
        }]

      ));

      // From_key.map((data) => {

      //   try {
      //     data!=='upload'?(Addclient_Form[data].value = ""):(Addclient_Form[data].value = []);
      //     console.log("mapping", Addclient_Form[data].value)
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


  console.log(fileupload, "filetest");

  const onStateClear = () => {
    let From_key = [
      "document_upload_name",
      "city",
      "state",
      "emai_id_2",
      "con_ph_2",
      "designation_id_2", "cont_per_2", "client_type", "postal_address", "email_id_1", "con_ph_1",
      "designation_id_1", "con_per_1", "industrty", "client_name", "gst_no", "pan_no"]


    From_key.map((data) => {

      try {
        Addclient_Form[data].value = "";
        console.log("mapping", Addclient_Form[data].value)
      } catch (error) {
        throw (error)
      }
    });
    setselectedFile([])
    setFileupload([])
    setAddclient_Form((prevState) => ({
      ...prevState,
    }));
  };




  return (
    <div>
      {console.log(Addclient_Form.client_name, "Addclient_Form.client_name")}
      <div
        style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "600" }}
      >
        Add Client
      </div>
      <div className="Container">
        <div className="leftContainer">
          <Grid container spacing={2}>
            <Grid item xs={12} container direction="row" alignItems="center" >
              <Grid item xs={6}>
                <div className="AddClientHead">Client Name</div>
                <div className="genderDobFlex">
                  <Labelbox
                    type="text"
                    placeholder={"Client Name"}
                    changeData={(data) => checkValidation(data, "client_name")}
                    value={Addclient_Form.client_name.value}
                    error={Addclient_Form.client_name.error}
                    errmsg={Addclient_Form.client_name.errmsg}
                  /></div>
              </Grid>

              <Grid item xs={6}>
                <div className="AddClientHead">Industry</div>
                <Labelbox
                  type="select"
                  placeholder={"Industry"}
                  dropdown={Industry.industryData}
                  // dropdown={resumeGetList.candidateList}
                  changeData={(data) => checkValidation(data, "industrty")}
                  value={Addclient_Form.industrty.value}
                  error={Addclient_Form.industrty.error}
                  errmsg={Addclient_Form.industrty.errmsg}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container direction="row" alignItems="center" >
              <Grid item xs={6}>
                <div className="AddClientHead">GST No.</div>
                <div className="genderDobFlex">
                  <Labelbox
                    type="text"
                    placeholder={"GST No."}
                    changeData={(data) => checkValidation(data, "gst_no")}
                    value={Addclient_Form.gst_no.value}
                    error={Addclient_Form.gst_no.error}
                    errmsg={Addclient_Form.gst_no.errmsg}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="AddClientHead">PAN No.</div>
                <Labelbox
                  type="text"
                  placeholder={"PAN No."}
                  changeData={(data) => checkValidation(data, "pan_no")}
                  value={Addclient_Form.pan_no.value}
                  error={Addclient_Form.pan_no.error}
                  errmsg={Addclient_Form.pan_no.errmsg}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="dashed_div_client">
              <Grid item xs={12}>
                <div className="AddClientHead">Contact Person 1</div>
                <Labelbox
                  type="text"
                  placeholder={"Contact Person 1"}
                  // dropdown={resumeGetList.qualificationList}
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
                      type="select"
                      placeholder={"Designation"}
                      dropdown={getdata.Designation}
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
                    placeholder={"Contact Phone"}
                    // dropdown={resumeGetList.qualificationList}
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
                  placeholder={"Email ID"}
                  // dropdown={resumeGetList.qualificationList}
                  changeData={(data) => checkValidation(data, "email_id_1")}
                  value={Addclient_Form.email_id_1.value}
                  error={Addclient_Form.email_id_1.error}
                  errmsg={Addclient_Form.email_id_1.errmsg}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} className="textarea_height">
              <div className="AddClientHead">Postal Address</div>
              <Labelbox
                type="textarea"
                placeholder={"Postal Address"}
                changeData={(data) => checkValidation(data, "postal_address")}
                value={Addclient_Form.postal_address.value}
                error={Addclient_Form.postal_address.error}
                errmsg={Addclient_Form.postal_address.errmsg}
              />
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
                  // remove_file={() => (setAddclient_Form(prevState => ({
                  //   ...prevState,
                  //   upload: {
                  //     value: [], error: Addclient_Form.upload.error, errmsg: Addclient_Form.upload.errmsg, disabled: Addclient_Form.upload.disabled, view_file: null
                  //   },
                  // })))}
                  value={Addclient_Form.upload.value}
                  error={Addclient_Form.upload.error}
                  errmsg={Addclient_Form.upload.errmsg}
                  disabled={Addclient_Form.upload.disabled}
                />

              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 15 }} >

                <img src={PlusIcon} style={{ cursor: 'pointer', width: 19, marginTop: -23 }} onClick={onfileupload} />
              </div>

            </div>
            <div className="doc_upload_div"><div style={{ width: '50%' }}>Document Name</div>  <div>File Name</div></div>
            {fileupload.map((data) => {
              return (<>

                <div className="doc_upload_items">
                  <div style={{ width: '50%' }}>{data.document_upload_name}</div>
                  <div>{data.selectedFile.name}</div>
                </div></>
              )
            })}

          </Grid>
        </div>
        <div className="rightContainer_client">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="AddClientHead">Client Type</div>
              <Labelbox
                type="select"
                placeholder={"Client Type"}
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
                  placeholder={"Contact Person 2"}
                  // dropdown={resumeGetList.certificateList}
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
                      type="select"
                      placeholder={"Designation"}
                      dropdown={getdata.Designation}
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
                    placeholder={"Contact Phone "}
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
                  placeholder={"Email ID"}
                  changeData={(data) => checkValidation(data, "emai_id_2")}
                  value={Addclient_Form.emai_id_2.value}
                  error={Addclient_Form.emai_id_2.error}
                  errmsg={Addclient_Form.emai_id_2.errmsg}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div className="AddClientHead">State</div>
              <Labelbox
                type="select"
                placeholder={"State"}
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
                placeholder={"City"}
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
                btnName={"Save"}
                btnCustomColor="customPrimary"
                onBtnClick={onSubmit}
              />
              <CustomButton btnName={"Cancel"} onBtnClick={onStateClear} />
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
    getDesignationList: state.getOptions.getDesignationList || [],
    getInsertStatus: state.AddClientReducer.InsertClient,
    clientNameCheck: state.AddClientReducer.clientNameCheck
  }
);

export default connect(mapStateToProps)(AddClient);
