import { query } from "./_generated/server";
import * as Users from "./model/user";

/**
 * this will return
 * user public table -- if being used
 * user meta data from better auth component
 */
export const getAllUserDataQuery = query({
  args: {},
  handler: async (ctx) => {
    const user = await Users.getAllUserData(ctx);
    return user;
  },
});
