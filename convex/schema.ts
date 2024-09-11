import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sensors: defineTable({
    description: v.string(),
    sensor_id: v.float64(),
    state: v.float64(),
    status: v.float64(),
  })
    .index("by_sensor_id", ["sensor_id"]),
  pipes: defineTable({
    input: v.float64(),
    max_t: v.float64(),
    min_p: v.float64(),
    output: v.float64(),
    pressure: v.float64(),
    rate: v.float64(),
    t: v.float64(),
  }),

});