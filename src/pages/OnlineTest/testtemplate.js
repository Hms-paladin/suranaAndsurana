import React, { useState, useEffect } from 'react'
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import PlusIcon from "../../images/plusIcon.svg";
import { Redirect, Link } from "react-router-dom";
import Delete from '../../images/dashboard/delete.svg';
import './onlinetest.scss'
import { getCategory,getSubCategory } from '../../actions/MasterDropdowns'
import { connect, useDispatch } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
function TestTemplate(props) {
    const dispatch = useDispatch();
    const [pathname, setPathName] = useState(window.location.pathname)
    const [MultipleQuestion, setMultipleQuestion] = useState([0])
    const [categoryddl, setCategoryddl] = useState([])
    const [subcategoryddl, setSubCategoryddl] = useState([])
    const [count, setCount] = useState(0)
    const [template, setTemplate] = useState({
        tempname: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        maxques: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        duration: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        category: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        subcategory: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        no_of_ques: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
    })
    useEffect(() => {
        if (count > 0) {
            setMultipleQuestion([...MultipleQuestion, { index: count }])
            console.log("MultipleQuestion", MultipleQuestion)
        }
    }, [count])

    const deletecomp = (index) => {
        const temp = [...MultipleQuestion]
        temp.splice(index, 1)
        setMultipleQuestion(temp)
        console.log("MultipleQuestion", MultipleQuestion)
    }
    
    useEffect(() => {
        dispatch(getCategory());
    }, [])

    useEffect(() => {
        let categorylist = []
        props.categoryList.map((data) =>
            categorylist.push({
                value: data.QuescatName,
                id: data.QuescatId,
            })
        )
        setCategoryddl({ categorylist })

        
    }, [props.categoryList])
   
    useEffect(()=>{
        dispatch((getSubCategory(template.category.value)))
    },[template.category.value])

    useEffect(() => {
        let subcategorylist = []
        props.subCategoryList.map((data) =>
            subcategorylist.push({
                value: data.QuesubcatName,
                id: data.QuesubcatId,
            })
        )
        setSubCategoryddl({ subcategorylist })
    }, [props.subCategoryList])

    function checkValidation(data,key){
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            template[key].validation
          );
          let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: template[key].validation
          }
          setTemplate(prevState => ({
            ...prevState,
            [key]: dynObj,
          }));
        //   dispatch(getSubCategory())
    }

    return (
        <div>
            <div className="AQTitle">Test Template</div>
            <div className="TTContainer">
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={3} container direction="column">
                        <div className="TThead">Template Name</div>
                        <Labelbox type="text"
                        changeData={(data) => checkValidation(data, "tempname")}
                        value={template.tempname.value}
                        error={template.tempname.error}
                        errmsg={template.tempname.errmsg}></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div className="TThead">Maximum Questions</div>
                        <Labelbox type="text"
                        changeData={(data) => checkValidation(data, "maxques")}
                        value={template.maxques.value}
                        error={template.maxques.error}
                        errmsg={template.maxques.errmsg}></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div className="TThead">Duration (In Mins)</div>
                        <Labelbox type="select"
                        changeData={(data) => checkValidation(data, "duration")}
                        value={template.duration.value}
                        error={template.duration.error}
                        errmsg={template.duration.errmsg}></Labelbox>
                    </Grid>
                </Grid>

                {/* <div className="TTcategory">
                    <Grid item xs={12} container direction="row" spacing={2}>
                        <Grid item xs={3} container direction="column">
                            <div className="TThead">Category</div>
                            <Labelbox type="select"></Labelbox>
                        </Grid>
                        <Grid item xs={3} container direction="column">
                            <div className="TThead">Sub Category</div>
                            <Labelbox type="select"></Labelbox>
                        </Grid>
                        <Grid item xs={3} container direction="column">
                            <div className="TThead">No .of Questions</div>
                            <Labelbox type="select"></Labelbox>
                        </Grid>
                        <Grid item xs={1} container direction="row" justify="center" alignItems="center">
                            <img src={PlusIcon} className="plusicon" onClick={()=>setCount(count+1)} />
                        </Grid>
                    </Grid>
                </div> */}

                {MultipleQuestion.length > 0 && MultipleQuestion.map((data, index) => {
                    return (
                        <div className="TTcategory" key={data.index}>
                            <Grid item xs={12} container direction="row" spacing={2}>
                                <Grid item xs={3} container direction="column">
                                    <div className="TThead">Category</div>
                                    <Labelbox type="select"
                                        dropdown={categoryddl.categorylist}
                                        changeData={(data) => checkValidation(data, "category")}
                                        value={template.category.value}
                                        error={template.category.error}
                                        errmsg={template.category.errmsg}></Labelbox>
                                </Grid>
                                <Grid item xs={3} container direction="column">
                                    <div className="TThead">Sub Category</div>
                                    <Labelbox type="select"
                                    dropdown={subcategoryddl.subcategorylist}
                                    value={template.subcategory.value}
                                    changeData={(data) => checkValidation(data, "subcategory")}
                                    error={template.subcategory.error}
                                    errmsg={template.subcategory.errmsg}></Labelbox>
                                </Grid>
                                <Grid item xs={3} container direction="column">
                                    <div className="TThead">No .of Questions</div>
                                    <Labelbox type="text"
                                    value={template.no_of_ques.value}
                                    changeData={(data) => checkValidation(data, "no_of_ques")}
                                    error={template.no_of_ques.error}
                                    errmsg={template.no_of_ques.errmsg}></Labelbox>
                                </Grid>
                                <Grid item xs={1} container direction="row" justify="center" alignItems="center">
                                    {index == 0 ? <img src={PlusIcon} className="plusicon" onClick={() => setCount(count + 1)} /> :
                                        <img src={Delete} className="plusicon" onClick={() => deletecomp(index)} />}
                                </Grid>
                            </Grid>
                        </div>
                    )
                }
                )}
                <div id="TTbtns">
                    <CustomButton btnName={"Submit"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick="" />
                    <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick="" />
                </div>
            </div>
        </div>
    )
}
const mapStatetoProps = (state) => ({
    categoryList: state.getOptions.getCategory || [],
    subCategoryList: state.getOptions.getSubCategory || [],
})
export default connect(mapStatetoProps)(TestTemplate);