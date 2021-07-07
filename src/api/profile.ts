// import Http from "./http";
import * as gqlBuilder from "gql-query-builder";
import GraphQl from "./graphQl";

namespace ProfileAPI {
  export interface Info {
    accessToken?: string;
    refreshToken?: string;
    firstName: string | null;
    lastName: string | null;
    country: string | null;
    id: number | null;
    phoneNumber: string | null;
    roleID: number | null;
  }

  export async function getProfile(data: { user_id: number }) {
    // TODO: Test getProfile graphQl exchange
    const { query } = gqlBuilder.query({
      operation: "profile",
      variables: data,
      fields: [
        "id",
        "email",
        "first_name",
        "last_name",
        "country",
        "phone_number",
        "subscribe",
      ],
    });
    const response = await GraphQl.query(query, data);

    return response.data;
  }

  // TODO: fake request add real when it will be available
  export async function changeName(data: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 500);
    });
  }

  // TODO: fake request add real when it will be available
  export function changePassword(data: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 500);
    });
  }

  // TODO: fake request add real when it will be available
  export function changeEmail(data: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 500);
    });
  }

  // TODO: fake request add real when it will be available
  export function logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("logout");
      }, 500);
    });
  }

  // TODO: fake request add real when it will be available
  export function deleteAccount() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("deleteAccount");
      }, 500);
    });
  }
}

export default ProfileAPI;
