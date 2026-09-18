import { z } from "zod";

export const featureRequestSchema = z.object({
  title: z.string().trim().min(5).max(100),
  category: z.enum(["Moderation", "Community", "Music", "Games", "Utility", "Other"]),
  priority: z.enum(["Nice to have", "Important", "Critical"]),
  details: z.string().trim().min(20).max(2000),
  contact: z.string().trim().max(120).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type FeatureRequestInput = z.infer<typeof featureRequestSchema>;
