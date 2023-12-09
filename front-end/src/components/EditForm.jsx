import React from "react";
import { useState } from "react";
import { updateUser } from "../features/user";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectToken } from "../utils/selectors";
import PropTypes from "prop-types";

const EditForm = ({ userProfile }) => {
  const [displayed, setDisplayed] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser(e.target.firstName.value, e.target.lastName.value, token)
    );
    e.target.firstName.value = "";
    e.target.lastName.value = "";
  };

  return displayed ? (
    <div>
      <button className="edit-button" onClick={() => setDisplayed(false)}>
        Edit Name
      </button>
      <form
        className="edit-user-form"
        style={{ display: "block" }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          defaultValue={userProfile && userProfile.firstName}
          name="firstName"
        />
        <input
          type="text"
          defaultValue={userProfile && userProfile.lastName}
          name="lastName"
        />
        <br />
        <button type="submit" className="save-button">
          Save
        </button>
        <button type="reset" className="cancel-button">
          Cancel
        </button>
      </form>
    </div>
  ) : (
    <button className="edit-button" onClick={() => setDisplayed(true)}>
      Edit Name
    </button>
  );
};

EditForm.propTypes = {
  userProfile: PropTypes.object,
};

export default EditForm;
