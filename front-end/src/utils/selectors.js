// login state selectors
export const selectToken = (state) => state.login.token;
export const selectLoginError = (state) => state.login.error;
export const selectLoginStatus = (state) => state.login.status;

// user state selectors
export const selectUserSuccess = (state) => state.user.success;
export const selectUserData = (state) => state.user.userData;
export const selectUserStatus = (state) => state.user.status;
