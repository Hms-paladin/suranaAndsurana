import react, { useEffect, useState } from "react";
import Axios from "axios";
import { apiurl } from "../../utils/baseUrl";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import CustomButton from "../../component/Butttons/button";
import "./addclient.scss";
import { Label } from "@material-ui/icons";
import moment from "moment";
import { notification } from "antd";
import {InsertClient} from "../../actions/AddClientAction"
import PublishIcon from '@material-ui/icons/Publish';
import { connect, useDispatch } from "react-redux";
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';




function AddClient() {
  const dispatch = useDispatch();

  const [clientName, setClientName] = useState({});

  const [stateList, setstateList] = useState({});
  const [cityList, setcityList] = useState({});
  const [Industry, setIndustry] = useState({});

  const [Addclient_Form, setAddclient_Form] = useState({
    client_name: {
      value: "",
      validation: [{ name: "required" },{ name: "custommaxLength",params:"50" },{ "name": "alphabetwithspace" }],
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
      validation: [{ name: "required" },{ name: "custommaxLength",params:"50" },{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    gender_1: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    DOB_1: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    con_ph_1: {
      value: "",
      validation: [{ name: "required" }, {name:"mobile"}],
      error: null,
      errmsg: null,
    },
    email_id_1: {
      value: "",
      valueById: "",
      validation: [{ name: "required" },{ name: "custommaxLength",params:"100" },{ "name": "email" }],
      error: null,
      errmsg: null,
    },
    postal_address: {
      value: "",
      valueById: "",
      validation: [{ name: "required" },{ name: "custommaxLength",params:"250" }],
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
      validation: [{ name: "custommaxLength",params:"50" },{ "name": "alphabetwithspace" }],
      error: null,
      errmsg: null,
    },
    gender_2: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    DOB_2: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    con_ph_2: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    emai_id_2: {
      value: "",
      validation: [{ name: "custommaxLength",params:"100" },{ "name": "email" }],
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
    poa_name: {
        value: "",
        validation:  [],
        error: null,
        errmsg: null,
      }
  });
  const [selectedFile, setselectedFile] = useState([]);

  const props = {
      name: 'file',
      // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      // headers: {
      //   authorization: 'authorization-text',
      // },
  onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log("uploading",info.file, info.fileList);
      }
      if (info.file.status === 'done') {

        message.success(`${info.file.name} file uploaded successfully`);
        setselectedFile(info.file.originFileObj);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

useEffect(() => {

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
  }, []);
  function checkValidation(data, key, multipleId) {
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

    setAddclient_Form((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
    // var filtererr = targetkeys.filter(
    //     (obj) =>
    //         Addclient_Form[obj].error == true ||
    //         Addclient_Form[obj].error == null
    // );
    // if (filtererr.length > 0) {
    //     setAddclient_Form({ error: true, errordummy: false });
    // } else {
    //     setAddclient_Form({ error: false });
    // }
  }
  const handleImagePreview = (e) => {
  
    // setselectedFile(URL.createObjectURL(e.target.files[0]))
    setselectedFile(e.target.files[0].name);
    console.log("testringhh",e.target.value)
    //let image_as_files = e.target.files[0];
    /*   this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
        }) */
  };

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
    // console.log(filtererr.length);
    if (filtererr.length > 0) {
      // setAddclient_Form({ error: true });
    } else {
        dispatch(InsertClient(Addclient_Form,selectedFile)).then((response) => {
            onStateClear()
        })
    }

    setAddclient_Form((prevState) => ({
      ...prevState,
    }));
  }

  const onStateClear = () => {
    let From_key = [
      "poa_name",
      "city",
      "state",
      "emai_id_2",
      "con_ph_2",
            "DOB_2","gender_2","cont_per_2","client_type","postal_address","email_id_1","con_ph_1",
            "DOB_1","gender_1","con_per_1","industrty","client_name"]


    From_key.map((data) => {

      try {
        Addclient_Form[data].value = "";
        console.log("mapping", Addclient_Form[data].value)
      } catch (error) {
        throw (error)
      }
    });
    setselectedFile("")
    setAddclient_Form((prevState) => ({
      ...prevState,
    }));
  };

  return (
    <div>
      <div
        style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "600" }}
      >
        Add Client
      </div>
      <div className="Container">
        <div className="leftContainer">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Labelbox
                type="text"
                placeholder={"Client Name"}
                changeData={(data) => checkValidation(data, "client_name")}
                value={Addclient_Form.client_name.value}
                error={Addclient_Form.client_name.error}
                errmsg={Addclient_Form.client_name.errmsg}
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid container spacing={2} className="dashed_div_client">
              <Grid item xs={12}>
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
                  <div className="genderDobFlex">
                    <Labelbox
                      type="select"
                      placeholder={"Gender"}
                      dropdown={[
                        { id: "M", value: "Male" },
                        { id: "F", value: "Female" },
                      ]}
                      changeData={(data) => checkValidation(data, "gender_1")}
                      value={Addclient_Form.gender_1.value}
                      error={Addclient_Form.gender_1.error}
                      errmsg={Addclient_Form.gender_1.errmsg}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="genderDobFlex">
                    <Labelbox
                      type="datepicker"
                      placeholder={"Date of Birth"}
                      disableFuture={true}
                      changeData={(data) => checkValidation(data, "DOB_1")}
                      value={Addclient_Form.DOB_1.value}
                      error={Addclient_Form.DOB_1.error}
                      errmsg={Addclient_Form.DOB_1.errmsg}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={7}>
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
              <Grid item xs={12}>
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
                    placeholder="Name of Power Attorney"
                    changeData={(data) => checkValidation(data, "poa_name")}
                    value={Addclient_Form.poa_name.value}
                    error={Addclient_Form.poa_name.error}
                    errmsg={Addclient_Form.poa_name.errmsg}
                  ></Labelbox>
                </Grid>
              </div>

              <div style={{ marginLeft: "10px" }}>
                {" "}
                {/* <input type="file" onChange={handleImagePreview} /> */}
                <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>,
                {/* <PublishIcon/> */}
              </div>
            </div>
            {/* <Grid container spacing={2} md={12}>
              <Grid md={2} style={{ color: "#023e7d" }}>
                POA{" "}
              </Grid>
              <Grid md={2} style={{ color: "#023e7d" }}>
                File Name{" "}
              </Grid>
            </Grid>

            <Grid container spacing={2} md={12}>
              <Grid md={2}>Field 1 </Grid>
              <Grid md={2}>Field 1 </Grid>
            </Grid>
            <Grid container spacing={2} md={12}>
              <Grid md={2}>Field 2 </Grid>
              <Grid md={2}>Field 2 </Grid>
            </Grid> */}
          </Grid>
        </div>
        <div className="rightContainer_client">
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                  <div className="genderDobFlex">
                    <Labelbox
                      type="select"
                      placeholder={"Gender"}
                      dropdown={[
                        { id: "M", value: "Male" },
                        { id: "F", value: "Female" },
                      ]}
                      changeData={(data) => checkValidation(data, "gender_2")}
                      value={Addclient_Form.gender_2.value}
                      error={Addclient_Form.gender_2.error}
                      errmsg={Addclient_Form.gender_2.errmsg}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="genderDobFlex">
                    <Labelbox
                      type="datepicker"
                      placeholder={"Date of Birth"}
                      disableFuture={true}
                      changeData={(data) => checkValidation(data, "DOB_2")}
                      value={Addclient_Form.DOB_2.value}
                      error={Addclient_Form.DOB_2.error}
                      errmsg={Addclient_Form.DOB_2.errmsg}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={7}>
                <Labelbox
                  type="text"
                  placeholder={"Contact Phone "}
                  changeData={(data) => checkValidation(data, "con_ph_2")}
                  value={Addclient_Form.con_ph_2.value}
                  error={Addclient_Form.con_ph_2.error}
                  errmsg={Addclient_Form.con_ph_2.errmsg}
                />
              </Grid>
              <Grid item xs={12}>
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
              <CustomButton btnName={"Cancel"}    onBtnClick={onStateClear} />
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
        // getInsertStatus: state.AddClientReducer.addClientDocumentStatus ,
    }
  );
  
  export default connect(mapStateToProps)(AddClient);
