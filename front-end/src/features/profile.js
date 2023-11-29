export async function fetchUserProfile(token) {
  try {
    const req = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}
