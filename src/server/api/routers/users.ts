import type { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/dist/api";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { api } from "~/utils/api";

const filterClerkUserForClient = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImageUrl: user.profileImageUrl,
  };
};

export const userRouter = createTRPCRouter({
  getClerkUserById: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input }) => {
      const user = await clerkClient.users.getUser(input.clerkId);
      const filteredUser = filterClerkUserForClient(user);
      return filteredUser;
    }),

  getAllClerkUsers: publicProcedure.query(async () => {
    const users = await clerkClient.users.getUserList();
    const filteredUsers = users.map((user) => filterClerkUserForClient(user));
    return filteredUsers;
  }),

  getByClerkId: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.users.findUnique({
        where: { clerkId: input.clerkId },
      });
      return user;
    }),

  getAccountPage: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.users.findUnique({
        where: { clerkId: input.clerkId },
      });
      return user;
    }),
});
