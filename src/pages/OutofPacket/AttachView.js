import React, { useState} from "react";
import {NavLink} from 'react-router-dom'
import {Row,Col} from 'antd';
import './AttachView.scss'
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import File from '../../images/attachfile.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CustomButton from '../../component/Butttons/button'
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


function AttachView (props) {
 

  return (
    <div className="carosal_root">
        <div style={{textAlign:"end"}}>
           <CustomButton btnName={"Download"} custombtnCSS={"attch_btn_css"} onBtnClick={""} btnCustomColor="customPrimary"/>
        </div>
          <Carousel {...settings} arrows draggable={true}>
        
                <div>
                    <img src={File} />
                </div>
                <div>
                    <img src={File} />
                </div>
                <div>
                    <img src={File} />
                </div>
                <div>
                    <img src={File} />
                </div>
                <div>
                    <img src={File} />
                </div>
                <div>
                    <img src={File} />
                </div>
                <div>
                    <img src={File} />
                </div>
                <div>
                    <img src={File} />
                </div>
          </Carousel>
      
    </div>
  )
}

export default AttachView;