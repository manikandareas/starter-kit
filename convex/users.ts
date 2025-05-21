import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";
import { type MutationCtx, mutation, query } from "./_generated/server";

/**
 * Retrieves the currently authenticated user.
 *
 * @returns A promise that resolves to the user document or null if not authenticated or not found.
 */
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
 * Retrieves a user by their ID (subject from identity).
 *
 * @param userId - The ID of the user to retrieve.
 * @returns A promise that resolves to the user document with an added tokenIdentifier, or null if not found.
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

/**
 * Creates a new user or updates an existing one.
 *
 * @param ctx - The mutation context.
 * @param userSubject - The user's subject identifier.
 * @param args - Partial user document containing data for creation or update.
 * @returns A promise that resolves to the created or updated user document, or the result of the patch operation.
 */
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
		alreadyOnboarded: args.alreadyOnboarded as boolean,
	});

	return await ctx.db.get(userId);
};

/**
 * Updates the username of the currently authenticated user.
 *
 * @param username - The new username.
 * @returns A promise that resolves to the updated user document or null if not authenticated or user not found.
 */
export const updateUsername = mutation({
	args: {
		username: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}

		const user = await ctx.db
			.query("users")
			.withIndex("by_user_id", (q) => q.eq("userId", identity.subject))
			.first();

		if (!user) {
			return null;
		}

		await ctx.db.patch(user._id, {
			username: args.username,
		});

		return await ctx.db.get(user._id);
	},
});

/**
 * Removes the profile image of the currently authenticated user.
 *
 * @throws Error if the user is not authenticated or not found.
 */
export const removeUserImage = mutation({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return;
		}

		const user = await ctx.db
			.query("users")
			.withIndex("by_user_id", (q) => q.eq("userId", identity.subject))
			.first();

		if (!user) {
			throw new Error("User not found");
		}

		ctx.db.patch(user._id, { profileImage: undefined });
	},
});

/**
 * Updates the profile image of the currently authenticated user.
 *
 * @param imageUrl - The URL of the new profile image.
 * @throws Error if the user is not authenticated or not found.
 */
export const updateUserImage = mutation({
	args: {
		imageUrl: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return;
		}

		const user = await ctx.db
			.query("users")
			.withIndex("by_user_id", (q) => q.eq("userId", identity.subject))
			.first();

		if (!user) {
			throw new Error("User not found");
		}

		await ctx.db.patch(user._id, { profileImage: args.imageUrl });
	},
});
