import { z } from "zod";

const serverSchema = z.object({
  NEXT_SERVER_ALCHEMY_API_KEY: z.string(),
});

type ServerEnv = z.infer<typeof serverSchema>;

const getServerEnv = () => {
  const parsed = serverSchema.safeParse({
    NEXT_SERVER_ALCHEMY_API_KEY: process.env.NEXT_SERVER_ALCHEMY_API_KEY,
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((e) => e.message).join("\n"));
  }
  return parsed.data;
};

const serverEnv = getServerEnv();

export { serverEnv, getServerEnv, type ServerEnv };
