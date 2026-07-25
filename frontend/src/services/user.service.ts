import { api } from "../api/axios";

export interface Recipient {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isVerified: boolean;
}

export interface FindUserResponse {
  success: boolean;
  message: string;
  data: Recipient;
}

export const findUserByEmail = async (
  email: string,
): Promise<FindUserResponse> => {
  const response = await api.get("/users/find", {
    params: {
      email,
    },
  });

  return response.data;
};
