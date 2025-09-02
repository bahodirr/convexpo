import { query } from "./_generated/server";
import * as Users from "./model/user";

export const getAllUserDataQuery = query({
	args: {},
	handler: async (ctx) => {
		const user = await Users.getAllUserData(ctx);
		return user;
	},
});
