import type { NitroFetchRequest } from 'nitropack'

export type WithId = { id: number }
export type WithOptionalId = Partial<WithId>

export type ResourceParseFunction<TResponse, TInternal> = (response: TResponse[]) => TInternal[] | Promise<TInternal[]>
export type ResourceWriteFunction<TInternal, TRequest> = (internal: TInternal[]) => TRequest[] | Promise<TRequest[]>

export type ResourceClient<TInternal extends WithOptionalId, TResponse extends WithId, TRequest extends WithOptionalId> = {
  route: NitroFetchRequest
  parse: ResourceParseFunction<TResponse, TInternal>
  write: ResourceWriteFunction<TInternal, TRequest>
}
