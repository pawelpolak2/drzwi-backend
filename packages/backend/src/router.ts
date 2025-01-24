import { dooOpenedEndpoint } from "./endpoints/door-opened";
import { openEndpoint } from "./endpoints/open";
import { statusEndpoint } from "./endpoints/status";
import { userEndpoint } from "./endpoints/user";
import { trpc } from "./trpc";

export const appRouter = trpc.router({
  openEndpoint,
  dooOpenedEndpoint,
  statusEndpoint,
  userEndpoint,
})

export type AppRouter = typeof appRouter;