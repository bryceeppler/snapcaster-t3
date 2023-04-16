import type { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/dist/api";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImageUrl: user.profileImageUrl,
  };
};

export const userRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const user = await clerkClient.users.getUser(input.userId);
      const filteredUser = filterUserForClient(user);
      return filteredUser;
    }),

  getAll: publicProcedure.query(async () => {
    const users = await clerkClient.users.getUserList();
    const filteredUsers = users.map((user) => filterUserForClient(user));
    return filteredUsers;
  }),
});
