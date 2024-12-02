import { createClient } from '@supabase/supabase-js';

// Supabase URL과 관리자 키를 사용하여 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAdminKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdminClient = createClient(supabaseUrl, supabaseAdminKey);

