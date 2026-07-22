// ────────────────────────────────────────────────────────────────
// Field schema used by the generic admin editors.
// ────────────────────────────────────────────────────────────────

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'nullable-number'
  | 'date'
  | 'boolean'
  | 'select'
  | 'icon'
  | 'lines'
  | 'color'
  | 'image';

export interface Field {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  /** Column span in the 2-col form grid (default 1). */
  wide?: boolean;
  /** Options for `select`. */
  options?: { value: string; label: string }[];
  /** Help text under the field. */
  hint?: string;
}

/** A generic editable record. */
export type Record = { [key: string]: unknown };
