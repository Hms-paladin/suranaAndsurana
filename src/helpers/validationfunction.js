

import React, { Component } from 'react';

class ValidationLibrary extends Component {
  checkValidation(textValue, validatorsArray) {
    for (var valid in validatorsArray) {//check validations through array
      console.log("mystextvalue", validatorsArray[valid].name);
      console.log("RAN", validatorsArray[valid].rangeID);
      if (textValue == "") {//check value is empty
        if (validatorsArray[valid].name == 'required') {
          return { msg: "Field required", state: false };//validation occurs break the loop & throw the error
        }
      }
      else if (validatorsArray[valid].name == 'checkNameExists') {
        if (validatorsArray[valid].params === 0) {
          return { msg: "Name Already Exist", state: false };//validation occurs break the loop & throw the error
        }
      }
      else if (validatorsArray[valid].name == 'checkOption') {
        const splitArray = validatorsArray[valid].params.split(",")
        var check = splitArray.includes(textValue)
        if (!check) {
          return { msg: "Answers should be  from Options", state: false };//validation occurs break the loop & throw the error
        }
      }
      else if (validatorsArray[valid].name == 'email') {
        var re = /^(?!.{101})(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (re.test(textValue) == false) {
          return { msg: "Email is invalid", state: false };//validation occurs break the loop & throw the error
        }
      } else if (validatorsArray[valid].name == 'minLength') {
        if (textValue.length > parseInt(validatorsArray[valid].params)) {
          return { msg: "Length should not exceed " + validatorsArray[valid].params + " characters", state: false };//validation occurs break the loop & throw the error
        }
      } else if (validatorsArray[valid].name == 'custommaxLength') {
        if (textValue.length > parseInt(validatorsArray[valid].params)) {
          return { msg: "Length should not exceed " + validatorsArray[valid].params + " characters", state: false };//validation occurs break the loop & throw the error
        }
      }
      else if (validatorsArray[valid].name == 'custommaxValue') {
        console.log("validation", validatorsArray[valid].params)
        if (parseInt(textValue) > parseInt(validatorsArray[valid].params)) {
          return { msg: "Value should not greater than " + validatorsArray[valid].params, state: false };//validation occurs break the loop & throw the error
        }
      }
      else if (validatorsArray[valid].name == 'customminValue') {
        console.log("validation", validatorsArray[valid].params)
        if (parseInt(textValue) < parseInt(validatorsArray[valid].params)) {
          return { msg: "Value should  greater than " + validatorsArray[valid].params, state: false };//validation occurs break the loop & throw the error
        }
      }
      else if (validatorsArray[valid].name == 'mobile') {
        //var re = /^(0|[1-9][0-9]{9,15})$/;
        var re = /^([0-9][0-9]{9,14})$/;
        if (re.test(textValue) == false) {
          return { msg: "Please Enter 10 to 15 digit Mobile Number", state: false };
        }
      }
      else if (validatorsArray[valid].name == 'since') {
        //var re = /^(0|[1-9][0-9]{9,15})$/;
        var re = /^([0-9][0-9]{3})$/;
        if (re.test(textValue) == false) {
          return { msg: "Please Enter 4 digit Number", state: false };
        }
      }

      else if (validatorsArray[valid].name == 'mobileSurana') { // 8 Digit Only
        var re = /^([0-9][0-9]{9})$/;
        if (re.test(textValue) == false) {
          return { msg: "Please Enter 10 digit Mobile Number", state: false };
        }
      }
      else if (validatorsArray[valid].name == "regex") {
        // var re = /^(0|[1-9][0-9]*){10}$/;
        if (new RegExp(validatorsArray[valid].params).test(textValue) == false) {
          return { msg: validatorsArray[valid].msg, state: false };
        }
      } else if (validatorsArray[valid].name == "allowNumaricOnly1") {
        var re = /^[0-9]*\.?[0-9]*$/;
        if (re.test(textValue) == false || Number(textValue) == "00") {
          return { msg: "Please Enter Numeric Value only", state: false };
        }
      } else if (validatorsArray[valid].name == "webUrl") {
        var re = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
        if (re.test(textValue) == false) {
          return { msg: "Url is invalid", state: false };
        }
      } else if (validatorsArray[valid].name == "address") {
        // var re =/^.{1,500}$/;
        var re = /^[a-zA-Z0-9\s,'-]*$/;
        if (re.test(textValue) == false) {
          return { msg: "Invalid Address", state: false };
        }
      } else if (validatorsArray[valid].name == "zipcode") {
        var re = /(^\d{5}$)|(^\d{5}-\d{5}$)/;
        if (re.test(textValue) == false) {
          return { msg: "zipcode should only be 5 digits", state: false };
        }
      } else if (validatorsArray[valid].name == "pasword") {
        var re = /^[a-z0-9_-]{4,16}$/;
        if (re.test(textValue) == false) {
          return { msg: "Password length (Min-4,Max-16)", state: false };
        }
      } else if (validatorsArray[valid].name == "alphaNumaricOnly") {
        var re = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
        if (re.test(textValue) == false) {
          return { msg: "Please Enter Alpha Numeric only", state: false };
        }
      } else if (validatorsArray[valid].name == "allowNumaricOnly") {
        var re = /^(?=.*?[1-9])[0-9()-]+$/;
        if (re.test(textValue) == false) {
          return { msg: "Please Enter Numeric Value only", state: false };
        }
      }
      else if (validatorsArray[valid].name == "allowNumaricOnlyWithZero") {
        var re = /^(0+|[1-9]\d*)$/;
        if (re.test(textValue) == false) {
          return { msg: "Please Enter Numeric Value only", state: false };
        }
      } else if (validatorsArray[valid].name == "alphabetsOnly") {
        var re = /^[A-Za-z]+$/;
        if (re.test(textValue) == false) {
          return { msg: "Please Enter Alphabets only", state: false };
        }
      } else if (validatorsArray[valid].name == "alphabetwithspace") {
        var re = /^[a-zA-Z ]*$/;
        if (re.test(textValue) == false) {
          return { msg: "Please Enter Alphabets only", state: false };
        }
      } else if (validatorsArray[valid].name == "nowhitespace") {
        var re = /^\S.*$/;
        if (re.test(textValue) == false) {
          return { msg: "First Letter not accept white space ", state: false };
        }
      } else if (validatorsArray[valid].name == "negativevaluerestrict") {
        var re = /^\d*\.?\d+$/;
        if (re.test(textValue) == false) {
          return { msg: "Negative values not accept", state: false };
        }
      } else if (validatorsArray[valid].name == "maxLength") {
        var re = /^.{1,30}$/;
        if (re.test(textValue) == false) {
          return { msg: "Maximum 10 Characters only", state: false };
        }
      } else if (validatorsArray[valid].name == "futureDate") {
        var currentDate = new Date();
        var convert_Date_mill_sec = currentDate.getTime();
        var secondDate = new Date(textValue);
        if (secondDate != "Invalid Date") {
          var convert_second_date_mill_sec = secondDate.getTime();
          if (convert_second_date_mill_sec <= convert_Date_mill_sec) {
            return { msg: "Please Enter Future Date", state: false };
          }
        }
      }
      else if (validatorsArray[valid].name == "numericanddot") {
        var re = /^[0-9]*\.?[0-9]*$/;
        if (re.test(textValue) == false) {
          return { msg: "Please Enter Numeric and dot only", state: false };
        }
      }
      else if (validatorsArray[valid].name == "PercentageCGPA") {
        var re = /	^100$|^\d{0,2}(\.\d{1,2})? *%?$/;
        if (re.test(textValue) == false || Number(textValue) == "00") {
          return { msg: "Please Enter Percentage/CGPA only", state: false };
        }
      } else if (validatorsArray[valid].name == "50Char") {
        var re = /^.{1,51}$/;
        if (re.test(textValue) == false) {
          return { msg: "Input data exceeds the limit", state: false };
        }
      } else if (validatorsArray[valid].name == "100Char") {
        var re = /^.{1,101}$/;
        if (re.test(textValue) == false) {
          return { msg: "Input data exceeds the limit", state: false };
        }
      } else if (validatorsArray[valid].name == "200Char") {
        var re = /^.{1,251}$/;
        if (re.test(textValue) == false) {
          return { msg: "Input data exceeds the limit", state: false };
        }
      } else if (validatorsArray[valid].name == "alphabetsandSpecialChar") {
        var re = /^[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        if (re.test(textValue) == false) {
          return { msg: " Invalid Input ", state: false };
        }
      } else if (validatorsArray[valid].name == "alphaspecialwithwhitespace") {
        var re = /^[a-zA-Z !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        if (re.test(textValue) == false) {
          return { msg: " Invalid Input ", state: false };
        }
      } else if (validatorsArray[valid].name == "allowtwodigit") {
        var re = /^\S[0-9]{0,1}$/;
        if (re.test(textValue) == false) {
          return { msg: " Value allow only two digit ", state: false };
        }
      }
      //  else if (validatorsArray[valid].name == "allownumspace") {
      //   var re = /^[1-9][0-9]{9,14}$/;
      //   if (re.test(textValue) == false) {
      //     return { msg: " 10-15 space ", state: false };
      //   }
      // }
      else if (validatorsArray[valid].name == "Allow numeric and special characters") {
        var re = /^[0-9-+()]*$/;
        if (!re.test(textValue) == false) {
          return { msg: " Value allow only two digit ", state: false };
        }
      }
    }
    return { msg: "", state: true };//if no error throw empty message
  }
}
export default new ValidationLibrary();
