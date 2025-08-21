import * as dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";

let supabase;

try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error("❌ Missing Supabase environment variables:");
        console.error(
            "   SUPABASE_URL:",
            supabaseUrl ? "✅ Set" : "❌ Missing"
        );
        console.error(
            "   SUPABASE_ANON_ROLE_KEY:",
            supabaseAnonKey ? "✅ Set" : "❌ Missing"
        );
        console.error("   Please create a .env file with these variables");
        throw new Error("Supabase environment variables are missing");
    }

    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log("✅ Supabase client initialized successfully");
} catch (err) {
    console.error("❌ Failed to initialize Supabase client:", err.message);
}

export default supabase;
