import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyEventInterviewerMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.EventInterviewerWhereInput, required: false }),
      data: t.arg({ type: Inputs.EventInterviewerUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventInterviewer.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyEventInterviewerMutation = defineMutation((t) => ({
  updateManyEventInterviewer: t.field(updateManyEventInterviewerMutationObject(t)),
}));