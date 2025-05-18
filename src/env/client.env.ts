import { z } from "zod";

const clientSchema = z.object({
  NEXT_PUBLIC_WC_PROJECT_ID: z.string(),
});

type ServerEnv = z.infer<typeof clientSchema>;

const getClientEnv = () => {
  const parsed = clientSchema.safeParse({
    NEXT_PUBLIC_WC_PROJECT_ID: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((e) => e.message).join("\n"));
  }
  return parsed.data;
};

const clientEnv = getClientEnv();

export { clientEnv, getClientEnv, type ServerEnv };
