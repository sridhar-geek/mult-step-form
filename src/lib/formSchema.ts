import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(20),
  email: z.string().email("Invalid email").min(5).max(30),
  phoneNo: z.string().length(10, "Phone number must be 10 digits"),
  plan: z.enum(["Arcade", "Advanced", "Pro"], {
    required_error: "Please select a plan.",
  }),
  addons: z.array(z.string()).min(0).optional(),
  total: z.number()
});

export type FullFormSchemaType = z.infer<typeof formSchema>