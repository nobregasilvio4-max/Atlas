/*
# [SECURITY] Set explicit search_path for functions
This migration enhances security by explicitly setting the `search_path` for existing database functions. This prevents potential function hijacking attacks by ensuring that functions resolve objects (tables, types, etc.) from expected schemas (`public`) and not from schemas that a user might temporarily create.

## Query Description:
This operation alters two functions: `handle_new_user` and `update_updated_at_column`. It sets their `search_path` configuration parameter to `public`. This is a non-destructive, safe operation that improves the security posture of the database without affecting data or function logic.

## Metadata:
- Schema-Category: "Safe"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (by altering the function to reset the search_path)

## Structure Details:
- Functions affected:
  - `public.handle_new_user()`
  - `public.update_updated_at_column()`

## Security Implications:
- RLS Status: Not affected.
- Policy Changes: No.
- Auth Requirements: No.
- Mitigates: Function search path hijacking (CWE-647).

## Performance Impact:
- Indexes: None.
- Triggers: None.
- Estimated Impact: Negligible. This change has no noticeable impact on performance.
*/

ALTER FUNCTION public.handle_new_user()
SET search_path = 'public';

ALTER FUNCTION public.update_updated_at_column()
SET search_path = 'public';
