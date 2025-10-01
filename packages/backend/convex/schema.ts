import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	profile: defineTable({
		name: v.optional(v.string()),
	}),
	post: defineTable({
		title: v.string(),
		status: v.union(v.literal("start"), v.literal("middle"), v.literal("end")),
		creatorId: v.id("profile"),
	}),
});
