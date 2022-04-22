import { json as remixJson } from '@remix-run/node'
import {
  useActionData as useRemixActionData,
  useLoaderData as useRemixLoaderData,
} from '@remix-run/react'
import { serialize, deserialize } from 'superjson'
import type { SuperJSONResult } from 'superjson/dist/types'

function json<Data>(
  obj: Data,
  init?: Parameters<typeof remixJson>[1],
): ReturnType<typeof remixJson> {
  const serialized = serialize(obj)
  return remixJson(serialized, init)
}

function useLoaderData<Data>() {
  const loaderData = useRemixLoaderData<SuperJSONResult>()
  return deserialize(loaderData) as Data
}

function useActionData<Data>() {
  const actionData = useRemixActionData<SuperJSONResult>()
  return actionData ? (deserialize(actionData) as Data) : undefined
}

export { json, useLoaderData, useActionData }
