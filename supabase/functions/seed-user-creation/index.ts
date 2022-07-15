import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { corsHeaders } from "../shared/cors.ts";
import { supabase } from "../shared/client.ts";

serve(async req => {
    if (req.method === "OPTIONS") {
        return new Response("OK", { headers: corsHeaders });
    }
    try {
        const { email, password, name, companyName } = await req.json();
        const { user, error } = await supabase.auth.signUp(
            {
                email,
                password,
            },
            {
                data: {
                    name,
                    role: "SUPER_ADMIN",
                    company_name: companyName,
                },
            }
        );
        if (error) throw error;
        return new Response(JSON.stringify(user), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
