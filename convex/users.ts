import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get user by their Clerk ID (token identifier)
 */
export const getUserByToken = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();
    
    if (!user) {
      return null;
    }
    
    return {
      ...user,
      tokenIdentifier: user._id,
      email: user.email
    };
  },
});

/**
 * Create or update a user based on their Clerk authentication
 */
export const createOrUpdateUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();
    
    if (existingUser) {
      // Update existing user if needed
      return await ctx.db.patch(existingUser._id, {
        email: args.email,
        name: args.name,
      });
    }
    
    // Create new user if doesn't exist
    const userId = await ctx.db.insert("users", {
      userId: args.userId,
      email: args.email,
      name: args.name,
      createdAt: Date.now(),
      alreadyOnboarded: false,
    });

    return await ctx.db.get(userId);
  },
});

/**
 * Get user by their Convex ID
 */
export const getUserById = query({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});