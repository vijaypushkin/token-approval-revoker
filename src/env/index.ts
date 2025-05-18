import { z } from "zod";

const envSchema = z.object({
  NEXT_SERVER_ALCHEMY_API_KEY: z.string(),
});

type Env = z.infer<typeof envSchema>;

const getEnv = () => {
  const parsed = envSchema.safeParse({
    NEXT_SERVER_ALCHEMY_API_KEY: process.env.NEXT_SERVER_ALCHEMY_API_KEY,
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((e) => e.message).join("\n"));
  }
  return parsed.data;
};

const env = getEnv();

export { env, getEnv, type Env };
