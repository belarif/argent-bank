export async function fetchUserProfile(token) {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const userProfile = await response.json();
    return userProfile;
  } catch (error) {
    console.log(error);
  }
}
