import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import * as Users from "./model/user";
import { vPostsStatus } from "./shared";

export const createPost = mutation({
	args: {
		title: v.string(),
		status: vPostsStatus,
	},
	handler: async (ctx, args) => {
		const userData = await Users.getUserAndProfileOrThrow(ctx);
		await ctx.db.insert("post", {
			title: args.title,
			status: args.status,
			creatorId: userData.profile._id,
		});
	},
});

export const getPosts = query({
	handler: async (ctx) => {
		return await ctx.db.query("post").collect();
	},
});

export const getPostsAndUsers = query({
	handler: async (ctx) => {
		// Get all jobs
		const posts = await ctx.db.query("post").collect();
		// & get creator of job
		const postsWithCreator = await Promise.all(
			posts.map(async (post) => {
				const creator = await ctx.db.get(post.creatorId);
				return {
					post,
					creator: creator,
				};
			}),
		);
		return postsWithCreator;
	},
});
