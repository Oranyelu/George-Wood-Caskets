import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Uploads a file to a Supabase storage bucket and returns its public URL.
 * @param {File} file - The file object to upload
 * @param {string} bucket - The bucket name (e.g. 'products', 'memorials', 'projects')
 * @returns {Promise<string>} - Public URL of the uploaded asset
 */
export const uploadToSupabase = async (file, bucket) => {
  if (!file) return '';
  const path = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error(`Error uploading to Supabase storage bucket ${bucket}:`, error);
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return publicUrl;
};
