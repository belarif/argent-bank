import React from "react";
import { useState } from "react";
import { updateUser } from "../features/user";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginSelector } from "../utils/selectors";

export const EditForm = () => {
  const [displayed, setDisplayed] = useState(false);
  const dispatch = useDispatch();
  const credentials = useSelector(loginSelector).credentials;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser(
        credentials.email,
        credentials.password,
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
        <input type="text" placeholder="First name" name="firstName" />
        <input type="text" placeholder="Last name" name="lastName" />
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
