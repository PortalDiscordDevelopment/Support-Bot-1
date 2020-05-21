export default async function authenticatedRequest(request: any) {
  const token = localStorage.getItem("token");

  if (process.env.NODE_ENV !== 'production') {
    console.log("Token: ", token);
  }

  request.set("Authorization", `Bearer ${token}`);
  return request;
}
