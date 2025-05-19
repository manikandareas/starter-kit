import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";
import { type MutationCtx, query } from "./_generated/server";

export const getCurrentUser = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}

		const userData = await ctx.db
			.query("users")
			.withIndex("by_user_id", (q) => q.eq("userId", identity.subject))
			.first();

		if (!userData) {
			return null;
		}

		return userData;
	},
});

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
			email: user.email,
		};
	},
});

export const createOrUpdateUser = async (
	ctx: MutationCtx,
	userSubject: string,
	args: Partial<Doc<"users">>,
) => {
	const existingUser = await ctx.db
		.query("users")
		.withIndex("by_user_id", (q) => q.eq("userId", userSubject))
		.first();

	if (existingUser) {
		return await ctx.db.patch(existingUser._id, {
			email: args.email,
			username: args.username,
			profileImage: args.profileImage,
		});
	}

	const userId = await ctx.db.insert("users", {
		userId: userSubject,
		email: args.email as string,
		username: args.username as string,
		profileImage: args.profileImage || "",
		createdAt: args.createdAt || Date.now(),
		alreadyOnboarded: args.alreadyOnboarded as boolean,
	});

	return await ctx.db.get(userId);
};
