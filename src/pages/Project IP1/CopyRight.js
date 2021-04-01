import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import '../Project IP1/Patent/Patent.scss'
import CustomButton from '../../component/Butttons/button';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Upload } from 'antd';
import PublishIcon from '@material-ui/icons/Publish';


export default function CopyRight(props) {


    return (
        <div >
            <div className="copyright_div">
                <Labelbox type="text" placeholder={"Title"} />
                <Labelbox type="datepicker" placeholder={"Type of work"} />
                <div className="uploadbox_div"  >
                    <div>
                        <Upload {...props} className="uploadbox_tag"
                            action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                            <div className="upload_file_inside" ><label>Upload Image</label><PublishIcon /></div>
                        </Upload>,
                                     </div>
                </div>
                <Labelbox type="text" placeholder={"Reference"} />
                <Labelbox type="text" placeholder={"Status"} />
            </div>
            <Grid item xs={12} container justify="flex-end" className="patent_btns">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
            </Grid>
        </div>
    )
}