import type { Resource, ResourceBody, ResourceType } from "./resource.ts";

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
  const build = function build<R extends Resource>(body: ResourceBody<R>): R {
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

/**
 * Create a [type predicate][] for the given {@link ResourceType resource type}.
 *
 * [type predicate]: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 *
 * @example
 * ```ts
 * import { Pod, Service } from "jsr:@kure/api/core";
 * import { isResource } from "jsr:@kure/schema";
 *
 * export const isPod = isResource(Pod);
 * export const isService = isResource(Service);
 * ```
 */
export function isResource<R extends Resource>(
  type: ResourceType<R>
): (target: unknown) => target is R;
/**
 * [Check][type predicate] if a value is an instance of a
 * {@link ResourceType resource type}.
 *
 * [type predicate]: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 *
 * @example
 * ```ts
 * import { Deployment } from "jsr:@kure/api/apps";
 * import { isResource, type Resource } from "jsr:@kure/schema";
 *
 * function updateScale(replicas: number, resources: Resource[]) {
 *   for (const resource of resources) {
 *     if (isResource(Deployment, resource)) {
 *       // TypeScript now knows `resource` is a Deployment
 *       resource.spec.replicas = replicas;
 *     }
 *   }
 * }
 * ```
 */
export function isResource<R extends Resource>(
  type: ResourceType<R>,
  target: unknown
): target is R;
export function isResource<R extends Resource>(
  type: ResourceType<R>,
  target?: unknown
) {
  if (arguments.length < 2)
    return (target: unknown) => isResource(type, target);

  return (
    target != null &&
    typeof target === "object" &&
    (target as Resource).apiVersion === type.apiVersion &&
    (target as Resource).kind === type.kind
  );
}
