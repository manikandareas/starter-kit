import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { createOrUpdateUser } from "./users";

export const completeOnboarding = mutation({
	args: {
		username: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("User not authenticated");
		}

		const user = await createOrUpdateUser(ctx, identity.subject, {
			username: args.username,
			email: identity.email as string,
			alreadyOnboarded: true,
			profileImage: identity.pictureUrl || "",
			userId: identity.subject,
			createdAt: Date.now(),
		});

		if (!user) {
			throw new Error("Failed to create user");
		}

		return user;
	},
});
