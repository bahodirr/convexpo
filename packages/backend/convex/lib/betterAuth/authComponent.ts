import { type AuthFunctions, createClient } from "@convex-dev/better-auth";
import { components, internal } from "../../_generated/api";
import type { DataModel, Id } from "../../_generated/dataModel";
import { isDevelopment } from "../../util";

/**
 * NOTE:
 * This authComponent is needed for integrating Convex with Better Auth,
 *
 * TODO: why is require env gone from this ??
 * .08 migration
 */

const authFunctions: AuthFunctions = internal.auth;

export const authComponent = createClient<DataModel>(components.betterAuth, {
	authFunctions,
	verbose: isDevelopment(), // NOTE: if you want this or not?
	triggers: {
		user: {
			onCreate: async (ctx, authUser) => {
				/**
				 * NOTE:
				 * The entire created document is available
				 * Example:
				 * Copy the user's name from user metadata to the application users table.
				 * TODO: do we need to do this?
				 */
				await ctx.db.insert("users", {
					name: authUser.name || "User Name",
				});
			},
			onUpdate: async (
				// ctx,
				// oldUser,
				// newUser
			) => {
				/**
				 * NOTE:
				 * Both old and new documents are available
				 * Example:
				 * Keep the user's name synced
				 * TODO:
				 * does the name update here ?? like when connected to o auth with google?
				 *
				 * const userId = newUser.userId as Id<"users">;
				 * await ctx.db.patch(userId, {
				 * email: newUser.email,
				 * });
				 */
			},
			onDelete: async (ctx, authUser) => {
				/**
				 * NOTE:
				 * The entire deleted document is available
				 * Example:
				 * Delete the user's data if the user is being deleted
				 * TODO:
				 * does this db.delete delete on its own?
				 */
				if (authUser.userId) {
					await ctx.db.delete(authUser.userId as Id<"users">);
				}
			},
		},
	},
});
