import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		name: v.optional(v.string()),
	}),
	/**
	 * EXAMPLE
	 */
	feed: defineTable({
		title: v.string(),
		message: v.string(),
		status: v.union(v.literal("start"), v.literal("middle"), v.literal("end")),
	}),
	/**
	 * add your own tables here
	 */
});
