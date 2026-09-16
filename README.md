# Capacity Connect

## Supabase setup

1. Create a Supabase project.
2. Run `supabase-schema.sql` in the Supabase SQL Editor.
3. Copy `supabase-config.example.js` to `supabase-config.js`.
4. Add the project URL and anon key from Supabase Project Settings > API.
5. Enable Realtime for the `courses` and `announcements` tables.
6. Open `index.html` through a local web server.

`supabase-config.js` is ignored by Git so project credentials are not uploaded.
