import type { NameScope } from "https://kure.sh/lib/spec@0.1/mod.ts";

/**
 * The properties which uniquely identify a resource within a Kubernetes
 * cluster; a {@link NamespacedName namespaced name} for namespaced resources or
 * just a {@link Named name} for cluster-wide resources.
 */
export type Identifier<S extends NameScope = "namespace"> =
  S extends "namespace" ? NamespacedName : Named;

/** Any object with a `name` property, like `ObjectMeta`. */
export interface Named {
  name: string;
}

/** Any object with a `namespaced` property, like `ObjectMeta` for namespaced resources. */
export interface Namespaced {
  namespace: string;
}

/**
 * Any object with `name` and `namespace` properties, like `ObjectMeta` for
 * namespaced resources.
 */
export interface NamespacedName extends Namespaced, Named {}
