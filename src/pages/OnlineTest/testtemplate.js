import React, { useState, useEffect } from 'react'
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import PlusIcon from "../../images/plusIcon.svg";
import Edit from "../../images/editable.svg";
import Delete from '../../images/dashboard/delete.svg';
import './onlinetest.scss'
import { getCategory, getSubCategory } from '../../actions/MasterDropdowns'
import {InsertTestTemplate} from '../../actions/TestTemplateAction'
import { connect, useDispatch } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";

function TestTemplate(props) {
    const dispatch = useDispatch();
    const [categoryddl, setCategoryddl] = useState([])
    const [subcategoryddl, setSubCategoryddl] = useState([])
    const [count, setCount] = useState(0)
    const [minusCount, setMinusCount] = useState(0)
    const [list, setList] = useState([])
    const [Itemkeys, setItemKeys] = useState([])
    const [dynarr, setdynarr] = useState([])
    const [dynkey, setdynkey] = useState([])
    const [ind, setInd] = useState(0)
    const [maxques, setmaxques] = useState(0)
    const [postTemplate, setPostTemplate] = useState([])
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
            validation: [{ name: "required" }, { name: "allowNumaricOnly1" }],
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

    const dynObjs = {
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
        // sublist: [],
    }

    /*Use Effects */
    useEffect(() => {
        dispatch(getCategory());
    }, [])

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
        setdynarr([...dynarr, []])
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
        if (subcategorylist.length > 0) {
            console.log(subcategorylist, "subcat")
            dynarr[ind] = subcategorylist;
        }

    }, [props.subCategoryList])


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
    const CancelDynObjs = () => {
        let keys = ["category", "subcategory", "no_of_ques"];
        keys.map((data) => {
            try {
                dynObjs[data].value = "";
                dynObjs[data].validation = [{ name: "required" }];
                dynObjs[data].error = null;
                dynObjs[data].errmsg = null;
                template["category"].value = "";
                template["subcategory"].value = "";
                template["no_of_ques"].value = "";
            }
            catch (err) {
                throw err;
            }
        })
    }

    const Cancelfunc=()=>{
        handleCancel()
        setCount(0)
        setItemKeys(["obj0"])
        setdynarr([])
        setList({["obj0"]:dynObjs})
        setmaxques(0)
    }

    const deletecomp = (data, index) => {
        delete list[data];
        let temp = [...dynarr]
        temp.splice(index, 1)
        setdynarr(temp)
        let tempkey = Itemkeys
        var x = tempkey.filter(item => item !== data)
        setItemKeys(x)
        maxquesval()
        // setMinusCount(minusCount+1)
    }

    //Category function
    function categoryfunc(item, key, data, i) {
        setInd(i)
        dispatch((getSubCategory(item)))
        checkValidation(item, key);
        list[data]["category"].value = item
        var errorcheck = ValidationLibrary.checkValidation(
            item,
            list[data]["category"].validation
        );
        list[data]["category"].error = !errorcheck.state;
        list[data]["category"].errmsg = errorcheck.msg;
        list[data]["category"].validation = list[data]["category"].validation;
    }

    //SubCategory function
    function subcategoryfunc(item, key, data, i) {
        checkValidation(item, key);
        console.log(item, "item")
        list[data]["subcategory"].value = item;
        var errorcheck = ValidationLibrary.checkValidation(
            item,
            list[data]["subcategory"].validation
        );
        list[data]["subcategory"].error = !errorcheck.state;
        list[data]["subcategory"].errmsg = errorcheck.msg;
        list[data]["subcategory"].validation = list[data]["subcategory"].validation;
    }

    function maxquesval() {

        console.log(template.maxques.value, "template.maxques.value")
        let total = 0;
        var m = Object.keys(list)
        m.forEach(element => {
            total += parseInt(list[element]["no_of_ques"].value)
        });
        if (total > template.maxques.value) { setmaxques(1) }
        else if(total == template.maxques.value){setmaxques(2)}
        else if(total < template.maxques.value){setmaxques(3)}
        else { setmaxques(0) }

    }

    //No of Questions function
    function noq_func(item, key, data, i) {

        checkValidation(item, key);
        list[data]["no_of_ques"].value = item;
        var errorcheck = ValidationLibrary.checkValidation(
            item,
            list[data]["no_of_ques"].validation
        );
        list[data]["no_of_ques"].error = !errorcheck.state;
        list[data]["no_of_ques"].errmsg = errorcheck.msg;
        list[data]["no_of_ques"].validation = list[data]["no_of_ques"].validation;
        maxquesval()
    }


    function plusfunc() {
        // console.log(count, minusCount, list, "listData")
        // let data = "obj" + (count - minusCount);
        let o = Object.keys(list)[Object.keys(list).length - 1]      
        var m = Object.keys(list[o])
        m.forEach(element => {
            var errorcheck = ValidationLibrary.checkValidation(
                list[o][element].value,
                list[o][element].validation
            )
            list[o][element].error = !errorcheck.state
            list[o][element].errmsg = errorcheck.msg
        });
        var filtererr = m.filter((ele) => list[o][ele].error === true)
        console.log(filtererr.length, "fill")
        setList(prevState => ({
            ...prevState,
        }))
        if (filtererr.length > 0) { }
        else if (maxques == 1 || maxques==2) { }
        else {
            CancelDynObjs()
            setCount(count + 1)
        }
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
        if (key == "maxques") {
            let total = 0;
            var m = Object.keys(list)
            m.forEach(element => {
                total += parseInt(list[element]["no_of_ques"].value)
            });
            if (total >= data) { setmaxques(true) }
            else { setmaxques(false) }
        }

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
        if (filtererr.length > 0) {}
        else if(maxques==1 || maxques==3){}
        else {
            let postarr = []
            let tempname=template["tempname"].value
            let maxques=template["maxques"].value
            let duration=template["duration"].value
            Itemkeys.map((data) => {
                postarr.push(
                    {
                        quescatId: list[data]["category"].value,
                        quesubcatId: list[data]["subcategory"].value,
                        NoOfquestions: list[data]["no_of_ques"].value,
                    })
            });
            dispatch(InsertTestTemplate(tempname,postarr,maxques,duration))
            Cancelfunc()
        }
        setTemplate(prevState => ({
            ...prevState,
        }));
       
    }
    console.log("list", list)

   ///***********user permission**********/
   const [saveRights, setSaveRights] = useState([])
useEffect(() => {
    if(props.UserPermission.length>0&&props.UserPermission){
       let data_res_id = props.UserPermission.find((val) => { 
       return (
           "Test Template - Submit" == val.control 
       ) 
      })
      setSaveRights(data_res_id)
   }
  
   }, [props.UserPermission]);
  
  /////////////
    console.log(dynarr,"arr")
   

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
                        <Labelbox type="text"
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
                                <Grid item xs={3} container direction="column">
                                    <div className="TThead">Category</div>
                                    <Labelbox type="select"
                                        dropdown={categoryddl.categorylist}
                                        changeData={(item) => categoryfunc(item, "category", data, index)}
                                        value={list[data]["category"].value == "" ? template.category.value : list[data]["category"].value}
                                        error={list[data]["category"].error == null ? template.category.error : list[data]["category"].error}
                                        errmsg={list[data]["category"].errmsg == null ? template.category.errmsg : list[data]["category"].errmsg}></Labelbox>
                                </Grid>
                                <Grid item xs={4} container direction="column">
                                    <div className="TThead">Sub Category</div>
                                    <Labelbox type="select"
                                        dropdown={dynarr[index]}
                                        value={list[data]["subcategory"].value == "" ? template.subcategory.value : list[data]["subcategory"].value}
                                        changeData={(item) => subcategoryfunc(item, "subcategory", data, index)}
                                        error={list[data]["subcategory"].error == null ? template.subcategory.error : list[data]["subcategory"].error}
                                        errmsg={list[data]["subcategory"].errmsg == null ? template.subcategory.errmsg : list[data]["subcategory"].errmsg}></Labelbox>
                                </Grid>
                                <Grid item xs={3} container direction="column">
                                    <div className="TThead">No .of Questions</div>
                                    <Labelbox type="text"
                                        value={list[data]["no_of_ques"].value == "" ? template.no_of_ques.value : list[data]["no_of_ques"].value}
                                        changeData={(item) => noq_func(item, "no_of_ques", data, index)}
                                        error={list[data]["no_of_ques"].error == null ? template.no_of_ques.error : list[data]["no_of_ques"].error}
                                        errmsg={list[data]["no_of_ques"].errmsg == null ? template.no_of_ques.errmsg : list[data]["no_of_ques"].errmsg}></Labelbox>
                                </Grid>
                                <Grid item xs={2} container direction="row" justify="center" alignItems="center">
                                    {index == 0 ? <><img src={PlusIcon} className="plusicon" onClick={() => plusfunc()} />{<div style={{ fontSize: "10px", color: "red",textAlign:"center" }}>{maxques==1&&"Maximum questions exceeds"||maxques==2&&"Maximum questions reached"||maxques==3&&"Maximum questions not reached yet"}</div>}</> :
                                        <img src={Delete} className="plusicon" onClick={() => deletecomp(data, index)} />}
                                </Grid>
                            </Grid>
                        </div>
                    )
                })
                }
                
                <div id="TTbtns">
                    <CustomButton btnName={"Submit"} btnDisable={!saveRights||saveRights.display_control&&saveRights.display_control==='N'?true:false} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={onSubmit} />
                    <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick="" />
                </div>
            </div>
        </div>
    )
}
const mapStatetoProps = (state) => ({
    categoryList: state.getOptions.getCategory || [],
    subCategoryList: state.getOptions.getSubCategory || [],
    UserPermission: state.UserPermissionReducer.getUserPermission,
})
export default connect(mapStatetoProps)(TestTemplate);