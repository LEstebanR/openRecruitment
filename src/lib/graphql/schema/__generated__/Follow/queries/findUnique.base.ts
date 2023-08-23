import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueFollowQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.FollowWhereUniqueInput, required: true }) }))

export const findUniqueFollowQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Follow',
    nullable: true,
    args: findUniqueFollowQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.follow.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueFollowQuery = defineQuery((t) => ({
  findUniqueFollow: t.prismaField(findUniqueFollowQueryObject(t)),
}));
