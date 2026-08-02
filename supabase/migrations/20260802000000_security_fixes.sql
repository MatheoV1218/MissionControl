-- ============================================================
-- Fix 1 (CRITICAL): privilege escalation via user_profiles insert
-- Today "Users insert own user profile" only checks auth.uid() = id.
-- It does NOT check the `role` value, so any authenticated user can
-- call supabase.from('user_profiles').insert({ id, email, role: 'admin' })
-- directly (bypassing the app's hardcoded role:"user") and become an admin.
-- Fix: force role to 'user' on self-insert, regardless of payload.
-- ============================================================
drop policy if exists "Users insert own user profile" on public.user_profiles;

create policy "Users insert own user profile"
on public.user_profiles
for insert
with check (auth.uid() = id and role = 'user');

-- ============================================================
-- Fix 2: profile_requests insert doesn't bind account_email to the caller.
-- Today "Users Submit Requests" only checks auth.role() = 'authenticated',
-- so a user can submit a request using someone else's account_email
-- (impersonation / squatting on the one-pending-request-per-type unique index
-- to block a real user from submitting their own request).
-- Fix: require account_email to match the caller's authenticated email.
-- ============================================================
drop policy if exists "Users Submit Requests" on public.profile_requests;

create policy "Users Submit Requests"
on public.profile_requests
for insert
with check (
  auth.role() = 'authenticated'
  and account_email = (auth.jwt() ->> 'email')
);

-- ============================================================
-- Fix 3: profile-images storage bucket has no size/type limits, so any
-- authenticated user can upload arbitrarily large files or any MIME type
-- (executables, HTML, etc.) into a publicly-readable bucket.
-- Fix: cap at 5MB and restrict to common image types.
-- ============================================================
update storage.buckets
set file_size_limit = 5242880, -- 5MB
    allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif']
where id = 'profile-images';

-- ============================================================
-- Cleanup: two UPDATE policies on public_profiles have identical
-- qual/with_check ("Owners can update own profiles" and "Users update own
-- profile images and availability") -- harmless but redundant, drop one.
-- ============================================================
drop policy if exists "Users update own profile images and availability" on public.public_profiles;
