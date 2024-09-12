import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {
    sensorId: v.float64(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("sensors").filter((q) => q.eq(q.field("sensor_id"), args.sensorId)).collect();
  },
});

export const getAllReactors = query({
  handler: async (ctx) => {
    return await ctx.db.query("sensors").filter((q) => q.lt(q.field("sensor_id"), 8)).collect();
  },
});

export const countNumInState = query({
  handler: async (ctx) => {
    const userPurchases = await ctx.db.query("sensors").collect();

    return userPurchases.reduce(
      (counts, { state }) => ({
        ...counts,
        [state]: counts[state] ? counts[state] + 1 : 1,
      }),
      {} as Record<string, number>,
    );
  },
});

export const updateState = mutation({
  args: {
    sensorId: v.float64(),
    newState: v.float64(),
  },
  handler: async (ctx, args) => {
    const reactor = await ctx.db.query("sensors").filter((q) => q.eq(q.field("sensor_id"), args.sensorId)).first();
    if (reactor != undefined) {
      await ctx.db.patch(reactor._id, { state: args.newState });
    }
  },
});

export const getAsInput = query({
  args: {
    sensorId: v.float64(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("pipes").filter((q) => q.eq(q.field("input"), args.sensorId)).collect();
  },
});

export const getAsOuput = query({
  args: {
    sensorId: v.float64(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("pipes").filter((q) => q.eq(q.field("output"), args.sensorId)).collect();
  },
});

export const getAllPipes = query({
  handler: async (ctx) => {
    return await ctx.db.query("pipes").collect();
  },
});