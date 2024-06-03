/**
 * A basic Kubernetes resource `metadata` type.
 *
 * These fields are available in all `meta/v1` versions.
 */
export interface ObjectMeta {
  name?: string;
  namespace?: string;

  annotations?: Record<string, string>;
  labels?: Record<string, string>;

  creationTimestamp?: string;
  deletionTimestamp?: string;

  generation?: number;
  resourceVersion?: string;
  uid?: string;

  finalizers?: Array<string>;
}

/**
 * A basic Kubernetes resource list `metadata` type.
 */
export interface ListMeta {
  continue?: string;
  remainingItemCount?: number;
  resourceVersion?: string;
}
