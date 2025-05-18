import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
    users: defineTable({
    name: v.string(),
    email: v.string(),
    userId: v.string(),
    createdAt: v.number(),
    // Field to track available image credits for the one-time payment model
    alreadyOnboarded: v.boolean(),
  }).index("by_user_id", ["userId"]),
});