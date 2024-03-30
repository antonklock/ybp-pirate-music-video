import { supabase } from '$lib/supabase/supabaseClient';

export async function getVidUrlFromSupabase(bucket: string, name: string) {
    return supabase.storage.from(bucket).getPublicUrl(name).data.publicUrl
}