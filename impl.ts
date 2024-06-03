import {
  Resource,
  ResourceBody,
  ResourceSpec,
  ResourceType,
} from "./resource.ts";

export const scope = Symbol("scope");

export type ScopeKey = typeof scope;

/**
 * Declare a {@link ResourceType}, a function which constructs instances of the
 * type, and ensures type-safety.
 */
export function factory<R extends Resource>(
  apiVersion: R["apiVersion"],
  kind: R["kind"],
  scope: R[ScopeKey]
): ResourceType<R> {
  const build = function build<R extends Resource>(
    ...contents: [ResourceBody<R>] | [R["metadata"], ResourceSpec<R>]
  ): R {
    const body =
      contents.length === 2
        ? ({
            metadata: contents[0],
            spec: contents[1],
          } as unknown as ResourceBody<R>)
        : contents[0];

    return { apiVersion, kind, ...body } as R;
  } as ResourceType<R>;

  build.apiVersion = apiVersion;
  build.kind = kind;
  build.scope = scope;

  try {
    (build as { name: string }).name = kind;
  } catch {
    // ignore
  }

  return build;
}
