import { query } from "./_generated/server";

/**
 * Retrieves all tasks.
 *
 * @returns A promise that resolves to an array of all tasks.
 */
export const get = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("tasks").collect();
	},
});
