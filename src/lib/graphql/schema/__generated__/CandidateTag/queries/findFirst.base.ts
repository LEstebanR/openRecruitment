import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstCandidateTagQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'CandidateTag',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CandidateTagWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.CandidateTagOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.CandidateTagWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.CandidateTagScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateTag.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findFirstCandidateTagQuery = defineQuery((t) => ({
  findFirstCandidateTag: t.prismaField(findFirstCandidateTagQueryObject(t)),
}));