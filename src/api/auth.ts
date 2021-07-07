import { AxiosResponse } from "axios";
import Http from "./http";

namespace AuthAPI {
  export interface AuthState {
    token: string | null;
    isAuthorized: boolean;
    error: string | null;
  }

  export interface SignInResponse {
    accessToken: string;
    country: string;
    firstName: string;
    id: number;
    lastName: string;
    phoneNumber: string;
    refreshToken: string;
    roleID: number;
  }

  export interface Request {
    country?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    phoneNumber?: string;
    subscribe?: boolean;
  }

  export async function signIn(data: Request): Promise<SignInResponse> {
    const response = (await Http.Public.post(
      "/auth/login",
      data
    )) as AxiosResponse<SignInResponse>;

    return response.data;
  }

  export async function signUp(data: Request): Promise<string> {
    const response = (await Http.Public.post(
      "/auth/register",
      data
    )) as AxiosResponse<string>;

    return response.data;
  }

  export async function signInByToken(token: string): Promise<SignInResponse> {
    const response = (await Http.Public.get(
      `/auth/loginAsUser?token=${token}`
    )) as AxiosResponse<SignInResponse>;

    return response.data;
  }
}

export default AuthAPI;
