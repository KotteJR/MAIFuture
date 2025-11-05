"use client";

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Allow either NEXT_PUBLIC_* or server-style names for convenience during setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchRisk(job_id: string): Promise<{ lifestylerisk: number | null; error?: string }>
{
  try {
    if (!job_id) return { lifestylerisk: null, error: 'missing_job_id' }
    const { data, error } = await supabase
      .from('lung_risk_minimal')
      .select('lifestylerisk')
      .eq('job_id', job_id)
      .order('inserted_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) return { lifestylerisk: null, error: error.message }
    if (!data || typeof data.lifestylerisk === 'undefined' || data.lifestylerisk === null) {
      return { lifestylerisk: null, error: 'not_found' }
    }
    return { lifestylerisk: Number(data.lifestylerisk) }
  } catch (e: any) {
    return { lifestylerisk: null, error: e?.message || 'unknown_error' }
  }
}


