import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyEventScheduleInterviewerQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['EventScheduleInterviewer'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.EventScheduleInterviewerWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.EventScheduleInterviewerOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.EventScheduleInterviewerWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.EventScheduleInterviewerScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventScheduleInterviewer.findMany({
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

export const findManyEventScheduleInterviewerQuery = defineQuery((t) => ({
  findManyEventScheduleInterviewer: t.prismaField(findManyEventScheduleInterviewerQueryObject(t)),
}));