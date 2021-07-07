import { ApolloQueryResult } from "@apollo/client";
import * as gqlBuilder from "gql-query-builder";
import GraphQl from "./graphQl";

namespace BotAPI {
  export interface IBot {
    id: number;
    user_id: number;
    name: string;
    description: string;
    avatar_link: string;
    created_at: string;
    updated_at: string;
    channels: IChannel[];
  }

  export interface IChannel {
    name: string;
    enabled: boolean;
  }

  export interface ListResponse {
    bots: IBot[];
  }

  export interface Response {
    bot: IBot;
  }

  export interface NewBot {
    user_id: number;
    name: string;
    description: string;
    avatar_link: string;
  }

  export async function getBotList(data: { use_id: number }) {
    const { query } = gqlBuilder.query({
      operation: "bots",
      variables: data,
      fields: [
        "id",
        "name",
        "description",
        "avatar_link",
        "created_at",
        "updated_at",
        {
          channels: ["name", "enabled"],
        },
      ],
    });
    const response: ApolloQueryResult<ListResponse> = await GraphQl.query(
      query,
      data
    );

    return response.data.bots;
  }

  export async function getBot(data: { id: number }) {
    const { query } = gqlBuilder.query({
      operation: "bot",
      variables: data,
      fields: [
        "id",
        "name",
        "description",
        "avatar_link",
        "created_at",
        "updated_at",
        {
          channels: ["name", "enabled"],
        },
      ],
    });
    const response: ApolloQueryResult<Response> = await GraphQl.query(
      query,
      data
    );

    return response.data.bot;
  }
}

export default BotAPI;
