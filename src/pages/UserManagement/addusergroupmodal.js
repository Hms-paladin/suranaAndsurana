import react, { useState, useEffect } from "react";
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import "./usermanagement.scss";
import { connect, useDispatch } from "react-redux";
import {
  InsertUsergroup,
  updateGroupName,
} from "../../actions/UserGroupAction";
import { PropertySafetyFilled } from "@ant-design/icons";

function UserGroupModal(props) {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState();
  const [UserGroup, setUserGroup] = useState({
    groupname: {
      value: "",
      validation: [
        { name: "required" },
        { name: "alphabetwithspace" },
        { name: "alphabetsandSpecialChar" },
      ],
      error: null,
      errmsg: null,
    },
    groupid: {
      value: "",
    },
  });

  // useEffect(() => {
  //     handleCancel()
  // }, [props.nullFieldValue])

  function checkValidation(data, key) {

    var errorcheck = ValidationLibrary.checkValidation(
      data,
      UserGroup[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: UserGroup[key].validation,
    };

    setGroupName(data);
    setUserGroup((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));

    // variable popup==>
  }

  function onsubmit() {
    var mainvalue = {};
    var targetkeys = Object.keys(UserGroup);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        UserGroup[targetkeys[i]].value,
        UserGroup[targetkeys[i]].validation
      );
      UserGroup[targetkeys[i]].error = !errorcheck.state;
      UserGroup[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = UserGroup[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter((obj) => UserGroup[obj].error == true);

    if (filtererr.length >= 0) {
    } else {
      if (props.editbtn) {
        dispatch(updateGroupName(UserGroup)).then((response) => {
          handleCancel();
          props.handleChangeCloseModel();
        });
      } else {
        dispatch(InsertUsergroup(UserGroup)).then((response) => {
          handleCancel();
          props.handleChangeCloseModel();
        });
        UserGroup.groupname.value = "";
      }
    }
    setUserGroup((prevState) => ({
      ...prevState,
    }));
  }

  useEffect(() => {
    const Groupname = props.editGrouplist[0]?.group_name;
    const Groupid = props.editGrouplist[0]?.id;

    UserGroup.groupname.value = Groupname;
    UserGroup.groupid.value = Groupid;

    setUserGroup((prevState) => ({
      ...prevState,
    }));
  }, [props.editGrouplist]);

  const handleCancel = () => {
    let From_key = ["groupname"];

    From_key.map((data) => {
      try {
        UserGroup[data].value = "";

      } catch (error) {
        throw error;
      }
    });

    setUserGroup((prevState) => ({
      ...prevState,
    }));
  };

  return (
    <div>
      <div className="groupame">
        <Grid item xs={12} container direction="column" spacing={4}>
          <div className="inputModeltitle">Group Name</div>
          <Labelbox
            type="text"
            changeData={(data) => checkValidation(data, "groupname")}
            value={UserGroup.groupname.value}
            error={UserGroup.groupname.error}
            errmsg={UserGroup.groupname.errmsg}
          />
        </Grid>
      </div>
      <div className="groupbtn">
        <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
        <CustomButton
          btnName={props.editbtn ? "Update" : "Create"}
          custombtnCSS="custom_cancel"
          btnCustomColor="customPrimary"
          onBtnClick={onsubmit}
        />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  UserGroupName: state.UserGroupReducer.getGroupName || [],
  UpdateGroupName: state.UserGroupReducer.updateGroupName || [],
});

export default connect(mapStateToProps)(UserGroupModal);
