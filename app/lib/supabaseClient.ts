import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://utmmpjrwhtkddfauwnme.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0bW1wanJ3aHRrZGRmYXV3bm1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODM0MDcsImV4cCI6MjA2NjM1OTQwN30.Rc7U_nAL88IGsI47Rjllq2Q_5Z3TJVBG5Fg6DOUQaIA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
