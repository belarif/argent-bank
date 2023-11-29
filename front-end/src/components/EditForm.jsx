import { useState } from "react";

export const EditForm = () => {
  const [displayed, setDisplayed] = useState(false);

  return displayed ? (
    <div>
      <button className="edit-button" onClick={() => setDisplayed(false)}>
        Edit Name
      </button>
      <form className="edit-user-form" style={{ display: "block" }}>
        <input type="text" placeholder="first name" />
        <input type="text" placeholder="last name" />
        <br />
        <button className="save-button">Save</button>
        <button className="cancel-button">Cancel</button>
      </form>
    </div>
  ) : (
    <button className="edit-button" onClick={() => setDisplayed(true)}>
      Edit Name
    </button>
  );
};
