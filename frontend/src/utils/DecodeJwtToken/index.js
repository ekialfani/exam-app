import { jwtDecode } from "jwt-decode";

const DecodeJwtToken = (token) => {
  if (token) return jwtDecode(token)

  return null
}

export default DecodeJwtToken;
