const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Get environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file and ensure:\n' +
    '- SUPABASE_URL is set\n' +
    '- SUPABASE_ANON_KEY is set\n' +
    '- SUPABASE_SERVICE_ROLE_KEY is set (optional, for admin operations)'
  );
}

// Create Supabase client with anon key (for regular operations)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create Supabase admin client with service role key (for admin operations)
const supabaseAdmin = supabaseServiceRoleKey 
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

module.exports = {
  supabase,
  supabaseAdmin,
  supabaseUrl
};
