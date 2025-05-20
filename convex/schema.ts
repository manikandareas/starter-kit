import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Defines the database schema for the application.
 * This includes definitions for 'tasks' and 'users' tables.
 */
export default defineSchema({
	tasks: defineTable({
		text: v.string(),
		isCompleted: v.boolean(),
	}),
	users: defineTable({
		username: v.string(),
		email: v.string(),
		userId: v.string(),
		createdAt: v.number(),
		// role: v.union(v.literal("admin"), v.literal("user")),
		profileImage: v.optional(v.string()),
		alreadyOnboarded: v.boolean(),
	}).index("by_user_id", ["userId"]),
});
