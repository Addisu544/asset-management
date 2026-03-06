import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  nameid: string;
  emailaddress: string;
  role: string;
}

export const decodeToken = (token: string) => {
  const decoded: any = jwtDecode(token);

  return {
    userId:
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ],
    email:
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ],
    role: decoded[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ],
  };
};
