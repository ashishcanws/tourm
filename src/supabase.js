import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mmahaxrbelqmwlywxsbn.supabase.co'
const supabaseKey = 'sb_publishable_e-wlkCLlkJUZSimwj2UdCA__FJWVc8m'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)