import { preExecRule } from '@graphql-authz/core'
import { IContext } from '@/pages/api/graphql'

export const IsAuthenticated = preExecRule()((context: IContext) => {
  return true || !!context.session?.user
})

export const IsAuthenticated2 = preExecRule()((context: IContext) => {
  return false && context.session?.user?.userRole === 'SUPERADMIN'
})

export const IsAdminRequest = preExecRule()((context: IContext) => {
  return !!context.isAdminRequest
})