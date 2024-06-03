# kure schema

The _schema_ library package defines common types and utilities for API
packages.

## Example

Building the example in the [spec package][spec] would generate code which uses this package:

[spec]: https://github.com/kure-sh/spec#readme

```ts
import type { ObjectMeta } from "https://kure.sh/api/@1.30/meta/v1.ts";
import { factory, type NameScope, type Resource } from "https://kure.sh/lib/schema@0.1/mod.ts";

export type APIVersion = "example.kure.sh/v1alpha1";
export const apiVersion: APIVersion = "example.kure.sh/v1alpha1";

/** Evaluate a math expression */
export interface Calculator implements Resource<APIVersion, "Calculator", "namespace", ObjectMeta> {
  spec: CalculatorSpec,
  status: CalculatorStatus,
}

export const Calculator = factory<Calculator>(apiVersion, "Calculator", "namespace");

/** Defines the input to Calculator */
export interface CalculatorSpec {
  expression: string,
}

/** Provides the output from Calculator */
export interface CalculatorStatus {
  result: number | null,

  /** If the input expression was invalid, explains the error */
  error?: string,
}
```
