import { router, publicProcedure } from "./trpc";
import { z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
  doen: z.boolean().optional(),
});

const appRouter = router({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const username = opts.ctx.username;
      const email = opts.input.email;
      const password = opts.input.password;

      // do db stuff here

      const token = "12345";

      return {
        token,
      };
    }),
  createTodo: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async (opts) => {
      console.log(opts.ctx.username);
      return {
        id: "1",
      };
    }),
});

const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeader = opts.req.headers["authorization"];
    console.log(authHeader);

    // jwt.varify()

    return {
      username: "username",
    };
  },
});

server.listen(3000);

export type AppRouter = typeof appRouter;
