import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import CustomButton from '../../component/Butttons/button';


function AddClient(){
    const [resumeGetList, setGetList] = useState({})

    const [Addclient_Form, setAddclient_Form] = useState({
        type_resource: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        industrty: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        con_per_1: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        gender_1: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        DOB_1: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        con_ph_1: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        email_id_1: {
            value: "",
            valueById: "",
            validation:  [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        mail_add_1: {
            value: "",
            valueById: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        comp_name: {
            value: "",
            valueById: "",
            validation:  [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        client_type: {
            value: "",
            valueById: "",
            validation:  [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        cont_per_2: {
            value: "",
            valueById: "",
            validation:  [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        gender_2: {
            value: "",
            validation:  [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        DOB_2:{
            value: "",
            validation: [],
            error: null,
            errmsg: null,

        },
        con_ph_2:{
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        emai_id_2: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        state_domecile: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        city: {
            value: "",
            validation: [{ "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
    })

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Addclient_Form[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Addclient_Form[key].validation
        }

        // only for multi select (start)

        let multipleIdList = []

        if (multipleId) {
            multipleId.map((item) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i] === item.value) {
                        multipleIdList.push(item.id)
                    }
                }
            })
            dynObj.valueById = multipleIdList.toString()
        }
        // (end)

        setAddclient_Form(prevState => ({
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
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setAddclient_Form({ error: true });
        } else {
            // setAddclient_Form({ error: false });
          
        }

        setAddclient_Form(prevState => ({
            ...prevState
        }));
    };


    return(
        <div>
             <div style={{marginBottom:"10px",fontSize:'16px',fontWeight:"600"}}>Add Client</div>
             <div className="Container">
                <div className="leftContainer">
                    <Grid container spacing={2}>
                      
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                placeholder={"Type Of Resource"}
                                changeData={(data) => checkValidation(data, "type_resource")}
                                value={Addclient_Form.type_resource.value}
                                error={Addclient_Form.type_resource.error}
                                errmsg={Addclient_Form.type_resource.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Labelbox type="select"
                                placeholder={"Industry"}
                                // dropdown={resumeGetList.candidateList}
                                changeData={(data) => checkValidation(data, "industrty")}
                                value={Addclient_Form.industrty.value}
                                error={Addclient_Form.industrty.error}
                                errmsg={Addclient_Form.industrty.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="text"
                                placeholder={"Contact Person 1"}
                                // dropdown={resumeGetList.qualificationList}
                                changeData={(data) => checkValidation(data, "con_per_1")}
                                value={Addclient_Form.con_per_1.value}
                                error={Addclient_Form.con_per_1.error}
                                errmsg={Addclient_Form.con_per_1.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}
                            container
                            direction="row"
                            alignItems="center" >
                            <Grid item xs={6} >
                                <div className="genderDobFlex">
                                    <Labelbox type="select"
                                        placeholder={"Gender"}
                                        dropdown={[{ id: "1", value: "Male" }, { id: "2", value: "Female" }]}
                                        changeData={(data) => checkValidation(data, "gender_1")}
                                        value={Addclient_Form.gender_1.value}
                                        error={Addclient_Form.gender_1.error}
                                        errmsg={Addclient_Form.gender_1.errmsg}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6} >
                                <div className="genderDobFlex">
                                    <Labelbox type="datepicker"
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
                            <Labelbox type="text"
                                placeholder={"Contact Phone"}
                                // dropdown={resumeGetList.qualificationList}
                                changeData={(data) => checkValidation(data, "con_ph_1")}
                                value={Addclient_Form.con_ph_1.value}
                                error={Addclient_Form.con_ph_1.error}
                                errmsg={Addclient_Form.con_ph_1.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="text"
                                placeholder={"Email ID"}
                                // dropdown={resumeGetList.qualificationList}
                                changeData={(data) => checkValidation(data, "email_id_1")}
                                value={Addclient_Form.email_id_1.value}
                                error={Addclient_Form.email_id_1.error}
                                errmsg={Addclient_Form.email_id_1.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} className="textarea_height">
                            <Labelbox type="textarea"
                                placeholder={"Mail Address"}
                                // dropdown={resumeGetList.institutionList}
                                changeData={(data) => checkValidation(data, "mail_add_1")}
                                value={Addclient_Form.mail_add_1.value}
                                error={Addclient_Form.mail_add_1.error}
                                errmsg={Addclient_Form.mail_add_1.errmsg}
                            />
                        </Grid>           

                    </Grid>
                </div>
                <div className="rightContainer">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Labelbox type="text"
                                placeholder={"Company Name"}
                                // dropdown={resumeGetList.skillsList}
                                changeData={(data) => checkValidation(data, "comp_name")}
                                value={Addclient_Form.comp_name.value}
                                error={Addclient_Form.comp_name.error}
                                errmsg={Addclient_Form.comp_name.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                placeholder={"Client Type"}
                                // dropdown={resumeGetList.traitsList}
                                changeData={(data) => checkValidation(data, "client_type")}
                                value={Addclient_Form.client_type.value}
                                error={Addclient_Form.client_type.error}
                                errmsg={Addclient_Form.client_type.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="text"
                                placeholder={"Contact Person 2"}
                                // dropdown={resumeGetList.certificateList}
                                changeData={(data) => checkValidation(data, "cont_per_2")}
                                value={Addclient_Form.cont_per_2.value}
                                error={Addclient_Form.cont_per_2.error}
                                errmsg={Addclient_Form.cont_per_2.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}
                            container
                            direction="row"
                            alignItems="center" >
                            <Grid item xs={6} >
                                <div className="genderDobFlex">
                                    <Labelbox type="select"
                                        placeholder={"Gender"}
                                        dropdown={[{ id: "1", value: "Male" }, { id: "2", value: "Female" }]}
                                        changeData={(data) => checkValidation(data, "gender_2")}
                                        value={Addclient_Form.gender_2.value}
                                        error={Addclient_Form.gender_2.error}
                                        errmsg={Addclient_Form.gender_2.errmsg}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6} >
                                <div className="genderDobFlex">
                                    <Labelbox type="datepicker"
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
                            <Labelbox type="text"                            
                                placeholder={"Contact Phone "}
                                changeData={(data) => checkValidation(data, "con_ph_2")}
                                value={Addclient_Form.con_ph_2.value}
                                error={Addclient_Form.con_ph_2.error}
                                errmsg={Addclient_Form.con_ph_2.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="text"
                                placeholder={"Email ID"}
                                changeData={(data) => checkValidation(data, "emai_id_2")}
                                value={Addclient_Form.emai_id_2.value}
                                error={Addclient_Form.emai_id_2.error}
                                errmsg={Addclient_Form.emai_id_2.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                placeholder={"State of Domecile"}
                                changeData={(data) => checkValidation(data, "state_domecile")}
                                value={Addclient_Form.state_domecile.value}
                                error={Addclient_Form.state_domecile.error}
                                errmsg={Addclient_Form.state_domecile.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                placeholder={"City"}
                                changeData={(data) => checkValidation(data, "city")}
                                value={Addclient_Form.city.value}
                                error={Addclient_Form.city.error}
                                errmsg={Addclient_Form.city.errmsg}
                            />
                        </Grid>
                    
                     
                        <Grid item xs={12}
                            container
                            direction="row"
                            alignItems="center"
                            className="resumeBtnContainer"
                        >
                            <CustomButton btnName={"Save"} btnCustomColor="customPrimary" onBtnClick={onSubmit}  />
                            <CustomButton btnName={"Cancel"}/>
                        </Grid>
                    </Grid>

                </div>
            </div>

        </div>
    )
}
export default AddClient;