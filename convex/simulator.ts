import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const updatePipeState = mutation({
  args: {
    input: v.float64(),
    output: v.float64(),
    newT: v.float64(),
    newP: v.float64(),
  },
  handler: async (ctx, args) => {
    const pipe = await ctx.db.query("pipes").filter((q) => q.eq(q.field("input"), args.input)).filter((q) => q.eq(q.field("output"), args.output)).first();
    if (pipe != undefined) {
      await ctx.db.patch(pipe._id, { t: args.newT, pressure: args.newP });
    }
  },
});

export const updatePipeThresh = mutation({
  args: {
    input: v.float64(),
    output: v.float64(),
    newT: v.float64(),
    newP: v.float64(),
  },
  handler: async (ctx, args) => {
    const pipe = await ctx.db.query("pipes").filter((q) => q.eq(q.field("input"), args.input) && q.eq(q.field("output"), args.output)).first();
    if (pipe != undefined) {
      await ctx.db.patch(pipe._id, { max_t: args.newT, min_p: args.newP });
    }
  },
});

export const updateSystem = mutation({
  args: {
    new_capacity: v.float64(),
    new_handled: v.float64(),
    new_profit: v.float64(),
  },
  handler: async (ctx, args) => {
    const pipe = await ctx.db.query("system").first();
    if (pipe != undefined) {
      await ctx.db.patch(pipe._id, { capacity: args.new_capacity, handled: args.new_handled, profit: args.new_profit });
    }
  },
});
