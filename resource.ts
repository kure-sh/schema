import type { NameScope } from "@kure/spec";

import type { scope } from "./impl.ts";
import type { ListMeta, ObjectMeta } from "./meta.ts";

/**
 * An object which follows the type convention of Kubernetes resources
 * (`apiVersion` and `kind` properties).
 */
export interface Kind<A extends string = string, K extends string = string> {
  apiVersion: A;
  kind: K;
}

/**
 * A Kubernetes resource's common fields: `apiVersion`, `kind`, and `metadata`.
 */
export interface Resource<
  A extends string = string,
  K extends string = string,
  S extends NameScope = NameScope,
  M extends ObjectMeta = ObjectMeta
> extends Kind<A, K> {
  metadata: M;
  [scope]?: S;
}

/**
 * A concrete {@link Resource} type.
 */
export interface ResourceType<R extends Resource> {
  apiVersion: R["apiVersion"];
  kind: R["kind"];
  scope: R[typeof scope];

  (body: ResourceBody<R>): R;
}

/**
 * All properties of {@link Resource} `R`, except `apiVersion` and `kind`.
 */
export type ResourceBody<R> = R extends Kind ? Omit<R, keyof Kind> : R;

/**
 * The `spec` type of {@link Resource} `R`, if `R` defines a `spec` field.
 */
export type ResourceSpec<R> = R extends { spec: infer S } ? S : never;

/**
 * The `status` type of {@link Resource} `R`, if `R` defines a `status` field.
 */
export type ResourceStatus<R> = R extends { status: infer S }
  ? S
  : R extends { status?: infer S }
  ? S
  : never;

/**
 * The {@link NameScope} of a {@link Resource}; i.e., whether the resource has
 * `cluster` or `namespace` scope.
 */
export type ResourceScope<R> = R extends { [scope]: infer S }
  ? S extends NameScope
    ? Exclude<S, undefined>
    : never
  : never;

/**
 * A list of {@link Resource resources} returned from an API server.
 */
export interface ResourceList<R extends Resource> {
  apiVersion: R["apiVersion"];
  kind: `${R["kind"]}List`;
  metadata?: ListMeta;

  items: R[];
}
