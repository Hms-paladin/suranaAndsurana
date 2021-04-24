import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import '../Project IP1/Patent/Patent.scss'
import CustomButton from '../../component/Butttons/button';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Upload } from 'antd';
import PublishIcon from '@material-ui/icons/Publish';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import { insertCopyright,getCopyRight,updateCopyright } from "../../actions/copyrightAction";



  const CopyRight = (props) => {

    const dispatch = useDispatch()
    const [IdDetails, setIdDetails] = useState({});
    const [fileupload, setFileupload] = useState("");
    const [copy_Right, setCopy_Right] = useState({

        title: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        type_of_work: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        reference: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        status: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
  
    })
    useEffect(() => {
        setIdDetails(props.id_Props)
        dispatch(getCopyRight(props?.id_Props?.project_id))
      }, [props.id_Props])
     
    useEffect(() => {

    console.log(props.getCopyRightData,"getCopyRightData")
    
    if(props.getCopyRightData.length>0){
    let CopyRightData = props.getCopyRightData
 
    // props.getCopyRightData.map((data) => CopyRightData.push({
    //     title: data.title,
    //     type_of_work: data.type_of_work,
    //     upload_images: data.upload_images,
    // }));
        copy_Right["title"].value =CopyRightData[0].title || ""
        copy_Right["type_of_work"].value = CopyRightData[0].type_of_work|| ""
        copy_Right["reference"].value =CopyRightData[0].reference || ""
        copy_Right["status"].value = CopyRightData[0].status|| ""
        setFileupload(CopyRightData[0].upload_images)
    }
    
    setCopy_Right((prevState) => ({
        ...prevState,
      }));
    // copy_Right["reference"].value = copyright.reference|| ""
  
    // console.log(props.getCopyRightData.length ,"ss")
    // console.log(CopyRightData,"api data");
    }, [props.getCopyRightData])
 


    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(copy_Right);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                copy_Right[targetkeys[i]].value,
                copy_Right[targetkeys[i]].validation
            );
            copy_Right[targetkeys[i]].error = !errorcheck.state;
            copy_Right[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = copy_Right[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => copy_Right[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setCopy_Right({ error: true });
        } else {
            // setCopy_Right({ error: false });
            if(props.getCopyRightData.length>0){
                var copy_right_id=props.getCopyRightData[0].copy_right_id
                console.log(copy_right_id)
                dispatch(updateCopyright(copy_Right,IdDetails,fileupload,copy_right_id)).then(() => {
                    handleCancel()
                })
            }else{
                dispatch(insertCopyright(copy_Right,IdDetails,fileupload)).then(() => {
                    handleCancel()
            
             })
            }
            
        }

        setCopy_Right(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "type_of_work","status","reference","title"
        ]

        ResumeFrom_key.map((data) => {
            copy_Right[data].value = ""
        })
        setCopy_Right(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            copy_Right[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: copy_Right[key].validation
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

        setCopy_Right(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };


    return (
        <div >
            <div className="copyright_div">
                <Labelbox type="text" placeholder={"Title"}
                    changeData={(data) => checkValidation(data, "title")}
                    value={copy_Right.title.value}
                    error={copy_Right.title.error}
                    errmsg={copy_Right.title.errmsg} />

                <Labelbox type="text" placeholder={"Type of work"}
                    changeData={(data) => checkValidation(data, "type_of_work")}
                    value={copy_Right.type_of_work.value}
                    error={copy_Right.type_of_work.error}
                    errmsg={copy_Right.type_of_work.errmsg} />

                <div className="uploadbox_div"  >
                    <div>
                        <Upload {...props} className="uploadbox_tag"
                            // action='https://www.mocky.io/v2/5cc8019d300000980a055e76' 
                            // onChange={(e)=>onFileChange()}
                            >
                                
                            <div className="upload_file_inside" ><label style={{whiteSpace:'nowrap'}}>Upload Image</label><PublishIcon /></div>
                        </Upload>
                        
                    </div>
                </div>
                </div>
                <div className="copyright_div">
                <Labelbox type="text" placeholder={"Reference"}
                    changeData={(data) => checkValidation(data, "reference")}
                    value={copy_Right.reference.value}
                    error={copy_Right.reference.error}
                    errmsg={copy_Right.reference.errmsg} />

                <Labelbox type="text" placeholder={"Status"}
                    changeData={(data) => checkValidation(data, "status")}
                    value={copy_Right.status.value}
                    error={copy_Right.status.error}
                    errmsg={copy_Right.status.errmsg} />
            </div>
            <Grid item xs={12} container justify="flex-end" className="patent_btns">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save"  onBtnClick={onSubmit}/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
            </Grid>
        </div>
    );
}

const mapStateToProps = (state) => (
    {
        getCopyRightData: state.copyrightReducer.getCopyRight,
        // getCopyRightStatus: state.copyrightReducer.insertCopyright,
    }
);

export default connect(mapStateToProps)(CopyRight);
