import { type AuthFunctions, createClient } from "@convex-dev/better-auth";
import { components, internal } from "../../_generated/api";
import type { DataModel, Id } from "../../_generated/dataModel";
import { isDevelopment } from "../../util";

/**
 * NOTE:
 * This authComponent is needed for integrating Convex with Better Auth,
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
				 */
				const profileId = await ctx.db.insert("profile", {
					name: authUser.name,
				});

				await authComponent.setUserId(ctx, authUser._id, profileId);
			},
			onUpdate: async (
				// ctx,
				// oldUser,
				// newUser
			) => {
				/**
				 * NOTE:
				 * Both old and new documents are available
				 */
			},
			onDelete: async (ctx, authUser) => {
				/**
				 * NOTE:
				 * The entire deleted document is available
				 * Example:
				 * Delete the user's profile data if the user is being deleted
				 */
				if (authUser.userId) {
					await ctx.db.delete(authUser.userId as Id<"profile">);
				}
			},
		},
	},
});
