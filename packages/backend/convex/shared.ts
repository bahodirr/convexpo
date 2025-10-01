import { type Infer, v } from "convex/values";

export const vPostsStatus = v.union(
	v.literal("start"),
	v.literal("middle"),
	v.literal("end"),
);
export type PostsStatus = Infer<typeof vPostsStatus>;
