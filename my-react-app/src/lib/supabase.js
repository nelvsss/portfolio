import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sidlbjhqvbobwdpagkcd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpZGxiamhxdmJvYndkcGFna2NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNTkzNDUsImV4cCI6MjA4NzczNTM0NX0.NxNnADRs-l4W7RZ9lFCDjVuazt4VsipsN9JyKM7jbos'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
