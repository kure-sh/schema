import type { NameScope } from "@kure/spec";

import type { ObjectMeta } from "./meta.ts";
import type { Identifier, NamespacedName } from "./identity.ts";
import type { Resource, ResourceScope } from "./resource.ts";

/**
 * A {@link Resource} which was received from a Kubernetes API server.
 *
 * The `metadata` field will definitely exist, which will definitely have a
 * `name` and `namespace` (for namespaced resource types.)
 */
export type Received<R extends Resource> = {
  [K in keyof R]: "metadata" extends K
    ? ReceivedObjectMeta<R["metadata"], ResourceScope<R>>
    : R[K];
};

/**
 * {@link ObjectMeta Resource metadata} which was received from a Kubernetes API server.
 */
export type ReceivedObjectMeta<
  T extends ObjectMeta,
  S extends NameScope
> = Identifier<S> & Omit<T, keyof NamespacedName>;
