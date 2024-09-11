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

export const getNumInStates = query({
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
    newStatusCode: v.float64(),
  },
  handler: async (ctx, args) => {
    const sensors = await ctx.db.query("sensors").withIndex("by_sensor_id", (q) => q.eq("sensor_id", args.sensorId)).collect();
    const id = sensors?.map(({ _id }) => _id)[0];
    await ctx.db.patch(id, { status: args.newStatusCode });
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