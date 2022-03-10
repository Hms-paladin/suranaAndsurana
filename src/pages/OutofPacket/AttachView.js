import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import { Row, Col } from 'antd';
import './AttachView.scss'
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import File from '../../images/attachfile.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CustomButton from '../../component/Buttons/button'
function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    )
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    )
}

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
}


function AttachView(props) {
    const download = (file) => {

        // const url = window.URL.createObjectURL(new Blob([file]));
        const link = document.createElement("a");
        link.href = file;
        link.setAttribute("download", file); //or any other extension
        document.body.appendChild(link);
        link.click();

    }

    return (
        <div className="carosal_root">

            {/* <Carousel {...settings} arrows draggable={true}>
        
                <div>
                    <img src={File} />
                </div>
                
          </Carousel> */}
            <div><img src={props.ViewData} style={{ width: "100%", height: "100%" }} /></div>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
                <CustomButton btnName={"Download"} custombtnCSS={"attch_btn_css"} onBtnClick={() => download(props.ViewData)} btnCustomColor="customPrimary" />
            </div>

        </div>
    )
}

export default AttachView;