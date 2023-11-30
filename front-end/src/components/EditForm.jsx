import React from "react";
import { useState } from "react";
import { updateUser } from "../features/user";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const EditForm = ({ userProfile }) => {
  const [displayed, setDisplayed] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser(
        userProfile.email,
        userProfile.password,
        e.target.firstName.value,
        e.target.lastName.value
      )
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
          defaultValue={userProfile.firstName}
          name="firstName"
        />
        <input
          type="text"
          defaultValue={userProfile.lastName}
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
