import { ConvexError } from "convex/values";
import type { Id } from "../_generated/dataModel";
import type { QueryCtx } from "../_generated/server";
import { betterAuthComponent } from "../auth";

/* ------------------------------ user metadata ----------------------------- */
export async function getAuthUserData(ctx: QueryCtx) {
	const userMetadata = await betterAuthComponent.getAuthUser(ctx);
	if (!userMetadata) {
		throw new ConvexError({
			code: "NOT_AUTHENTICATED",
			message: "Not authenticated",
		});
	}
	return userMetadata;
}
/* -------------------------------- user data ------------------------------- */
export async function getPublicUserData(ctx: QueryCtx, userId: Id<"users">) {
	const user = await ctx.db.get(userId as Id<"users">);
	if (!user) {
		throw new ConvexError({
			code: "USER_NOT_FOUND",
			message: "User not found",
		});
	}
	return user;
}
/* ------------------------------ all user data ------------------------------ */
export async function getAllUserData(ctx: QueryCtx) {
	const userMetaData = await getAuthUserData(ctx);
	const user = await getPublicUserData(ctx, userMetaData.userId as Id<"users">);
	return {
		user,
		userMetaData,
	};
}
/* ------------------------------- asset admin ------------------------------ */
const ADMIN_EMAILS = [
	"brian@colonystudio.xyz",
	"brian.ort02@icloud.com",
	"ortbo.02@gmail.com",
];

export async function assertAdmin(ctx: QueryCtx) {
	const userData = await getAllUserData(ctx);
	if (!ADMIN_EMAILS.includes(userData.userMetaData.email)) {
		throw new ConvexError({
			code: "NOT_ADMIN",
			message: "Not admin",
		});
	}
	return userData;
}
