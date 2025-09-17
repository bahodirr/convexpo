import {
	type AuthFunctions,
	// BetterAuth,
	createClient,
	// type PublicAuthFunctions,
} from "@convex-dev/better-auth";
import { api, components, internal } from "./_generated/api";
import type { DataModel, Id } from "./_generated/dataModel";
import { isDevelopment } from "./util";

// const authFunctions: AuthFunctions = internal.auth;
const authFunctions: AuthFunctions = internal.auth;
// const publicAuthFunctions: PublicAuthFunctions = api.auth;

// export const betterAuthComponent = new BetterAuth(components.betterAuth, {
export const authComponent = createClient<DataModel>(
	// authFunctions,
	// verbose: isDevelopment(),
	components.betterAuth,
	{
		authFunctions,
		triggers: {
			user: {
				onCreate: async (ctx, authUser) => {
					// Any `onCreateUser` logic should be moved here
					const userId = await ctx.db.insert("users", {
						name: authUser.name,
						// image: authUser.image,
					});
					// Instead of returning the user id, we set it to the component
					// user table manually. This is no longer required behavior, but
					// is necessary when migrating from previous versions to avoid
					// a required database migration.
					// This helper method exists solely to facilitate this migration.
					// await authComponent.setUserId(ctx, authUser._id, userId);
				},
				onUpdate: async (ctx, oldUser, newUser) => {
					// Any `onUpdateUser` logic should be moved here
				},
				onDelete: async (ctx, authUser) => {
					await ctx.db.delete(authUser.userId as Id<"users">);
				},
			},
		},
		// publicAuthFunctions,
	},
);

export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi();

// export const { createUser, deleteUser, updateUser, createSession } =
// 	betterAuthComponent.createAuthFunctions({
// 		onCreateUser: async (ctx, user) => {
// 			/**
// 			 * function on user created
// 			 *
// 			 * copy the user's name to the
// 			 * application users table
// 			 *
// 			 * onUpdateUser to keep it synced.
// 			 */
// 			const userId = await ctx.db.insert("users", {
// 				name: user.name || "new user",
// 			});
// 			return userId;
// 		},
// 		onUpdateUser: async () => {
// 			/**
// 			 * function to update user
// 			 *
// 			 * update the name in USERS table
// 			 * update stripe data
// 			 * update resend data
// 			 */
// 		},
// 		onDeleteUser: async (ctx, userId) => {
// 			/**
// 			 * function to delete user
// 			 *
// 			 * delete the user from the
// 			 * application public users table
// 			 */
// 			await ctx.db.delete(userId as Id<"users">);
// 		},
// 	});
