import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://lrrdkjmnbloyohhtrjzh.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxycmRram1uYmxveW9oaHRyanpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxOTk5MDIsImV4cCI6MjA3MTc3NTkwMn0.9oHC49KPoKI-9m2EX1KbRfy4rWm2uNIrE9AZOI18mec";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
