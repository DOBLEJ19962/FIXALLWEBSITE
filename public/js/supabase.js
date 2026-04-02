// js/supabase.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const supabase = createClient(
    "https://ytbvgwipnhadodeemvdx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0YnZnd2lwbmhhZG9kZWVtdmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNDIwMjksImV4cCI6MjA5MDcxODAyOX0.HKBQFoSO-m8KmADAW-g_CcTIRmpUQdHl6gVsph1qFRU"
);
