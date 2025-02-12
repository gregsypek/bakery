import { createClient } from "@supabase/supabase-js";

// import.meta.env;

export const supabaseUrl = "https://hngltecoptpeqzscowaf.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
