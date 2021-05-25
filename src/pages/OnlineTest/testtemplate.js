import React, { useState, useEffect } from 'react'
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import PlusIcon from "../../images/plusIcon.svg";
import Edit from "../../images/editable.svg";
import Delete from '../../images/dashboard/delete.svg';
import './onlinetest.scss'
import { getCategory, getSubCategory } from '../../actions/MasterDropdowns'
import { connect, useDispatch } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";

function TestTemplate(props) {
    const dispatch = useDispatch();
    const [MultipleQuestion, setMultipleQuestion] = useState([])
    const [categoryddl, setCategoryddl] = useState([])
    const [subcategoryddl, setSubCategoryddl] = useState([])
    const [count, setCount] = useState(0)
    const [list, setList] = useState([])
    const [Itemkeys, setItemKeys] = useState([])
    const [dynarr,setdynarr]=useState([])
    const arr=[]

    const [template, setTemplate] = useState({
        tempname: {
            value: "",
            validation: [{ name: "required" }, { name: "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        maxques: {
            value: "",
            validation: [{ name: "required" }, { name: "custommaxLength", params: "2" }, { name: "allowNumaricOnly1" }],
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
            validation: [{ name: "required" }, { name: "custommaxLength", params: "2" }, { name: "allowNumaricOnly1" }],
            error: null,
            errmsg: null,
        },
    })

    const [dynObjs, setDynObjs] = useState({
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
        sublist:[],
    })

    // useEffect(() => {
    //     if (count > 0) {
    //         setMultipleQuestion([...MultipleQuestion, { index: count }])
    //     }
    // }, [count])

    /*Use Effects */
    useEffect(() => {
        dispatch(getCategory());
    }, [])

    //Called first
    useEffect(() => {
        setList(
            prevState => ({
                ...prevState,
                ["obj" + count]: dynObjs,
            })
        )
    }, [dynObjs])

    //Called Second
    useEffect(() => {
        let obj = Object.keys(list);
        setItemKeys(obj)
    }, [list])

    useEffect(() => {
        setList(
            prevState => ({
                ...prevState,
                ["obj" + count]: dynObjs,
            })
        )
    }, [count])

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

    useEffect(()=>{
        setdynarr([...dynarr,subcategoryddl.subcategorylist])
    },[categoryddl.categorylist])

     useEffect(() => {
        dispatch((getSubCategory(template.category.value)))
    }, [template.category.value])


    /*Functions */
    const handleCancel = () => {
        let keys = ["tempname", "maxques", "duration", "category", "subcategory", "no_of_ques"];
        keys.map((data) => {
            try {
                template[data].value = ""
            }
            catch (err) {
                throw err;
            }
        })
        setTemplate((prevState) => ({
            ...prevState,
        }));
    }
    const deletecomp = (index) => {
        const temp = [...Itemkeys]
        temp.splice(index, 1)
        setItemKeys(temp)
        console.log("Itemkeys", Itemkeys)
    }

    //Category function
    function categoryfunc(data,key,item){
        checkValidation(data,key)
       
        
        // console.log(item,"item")
        // list[data]["category"].value=item
        // await dispatch((getSubCategory(item)))
        // console.log(subcategoryddl.subcategorylist,"test")
    //    await list[data]["sublist"].push(subcategoryddl.subcategorylist)
    //     checkValidation(item,key);
    //     console.log(list[data]["sublist"],"sublist")
    }

    //SubCategory function
    function subcategoryfunc(data,key,item){
        console.log(item,"item")
        list[data]["subcategory"].value=item;
        list[data]["sublist"].push(subcategoryddl.subcategorylist)
        checkValidation(item,key);
    }

    //No of Questions function
    function noq_func(data,key,item){
        console.log(item,"item")
        list[data]["no_of_ques"].value=item;
        list[data]["sublist"].push(subcategoryddl.subcategorylist)
        checkValidation(item,key);
    }

    //Update dynobj
    function plusfunc(data) {
              
        let tempObj = {
            category: {
                value: template.category.value,
                validation: template.category.validation,
                error: template.category.error,
                errmsg: template.category.errmsg,
            },
            subcategory: {
                value: template.subcategory.value,
                validation: template.subcategory.validation,
                error: template.subcategory.error,
                errmsg: template.subcategory.errmsg,
            },
            no_of_ques: {
                value: template.no_of_ques.value,
                validation: template.no_of_ques.validation,
                error: template.no_of_ques.error,
                errmsg: template.no_of_ques.errmsg,
            },
            sublist:subcategoryddl.subcategorylist
            
        }
        setCount(count + 1)
        setList(
            prevState => ({
                ...prevState,
                [data]: tempObj,
            })
        )
        handleCancel()
    }

    function checkValidation(data, key) {

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
        
    }
    function onSubmit() {
        var targetkeys = Object.keys(template)
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                template[targetkeys[i]].value,
                template[targetkeys[i]].validation
            )
            template[targetkeys[i]].error = !errorcheck.state
            template[targetkeys[i]].errmsg = errorcheck.msg
        }
        var filtererr = targetkeys.filter((data) => template[data].error === true)
        if (filtererr.length > 0) { }
        else {
        }
        setTemplate(prevState => ({
            ...prevState,
        }))
        handleCancel()
    }
    console.log("list", list)
    console.log(dynarr,"arr")
   

    return (
        <div>
            <div className="AQTitle">Test Template</div>
            <div className="TTContainer">
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={4} container direction="column">
                        <div className="TThead">Template Name</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "tempname")}
                            value={template.tempname.value}
                            error={template.tempname.error}
                            errmsg={template.tempname.errmsg}></Labelbox>
                    </Grid>
                    <Grid item xs={4} container direction="column">
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

                {Itemkeys.length > 0 && Itemkeys.map((data, index) => {
                    return (
                        <div className="TTcategory">
                            <Grid item xs={12} container direction="row" spacing={2}>
                                <Grid item xs={4} container direction="column">
                                    <div className="TThead">Category</div>
                                    <Labelbox type="select"
                                        dropdown={categoryddl.categorylist}
                                        changeData={(data) =>checkValidation(data, "category")}
                                        value={list[data]["category"].value == "" ? template.category.value : list[data]["category"].value}
                                        error={template.category.error}
                                        errmsg={template.category.errmsg}></Labelbox>
                                </Grid>
                                <Grid item xs={4} container direction="column">
                                    <div className="TThead">Sub Category</div>
                                    <Labelbox type="select"
                                        dropdown={dynarr[index]&&dynarr[index]}
                                        value={list[data]["subcategory"].value == "" ? template.subcategory.value : list[data]["subcategory"].value}
                                        changeData={(data) =>checkValidation(data, "subcategory")}
                                        error={template.subcategory.error}
                                        errmsg={template.subcategory.errmsg}></Labelbox>
                                </Grid>
                                <Grid item xs={3} container direction="column">
                                    <div className="TThead">No .of Questions</div>
                                    <Labelbox type="text"
                                        value={list[data]["no_of_ques"].value == "" ? template.no_of_ques.value : list[data]["no_of_ques"].value}
                                        changeData={(data) => checkValidation(data, "no_of_ques")}
                                        error={template.no_of_ques.error}
                                        errmsg={template.no_of_ques.errmsg}></Labelbox>
                                </Grid>
                                <Grid item xs={1} container direction="row" justify="center" alignItems="center">
                                    {index == 0 ? <img src={PlusIcon} className="plusicon" onClick={() => plusfunc("obj" + count)} /> :
                                        <img src={Delete} className="plusicon" onClick={() => deletecomp(index)} />}
                                </Grid>
                            </Grid>
                        </div>
                    )
                })
                }
                
                <div id="TTbtns">
                    <CustomButton btnName={"Submit"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={onSubmit} />
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

