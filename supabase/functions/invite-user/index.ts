import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { corsHeaders } from "../shared/cors.ts";
import { supabase } from "../shared/client.ts";

serve(async req => {
    if (req.method === "OPTIONS") {
        return new Response("OK", { headers: corsHeaders });
    }
    try {
        const { email, role, redirectURi } = await req.json();
        const { data, error } = await supabase.auth.api.inviteUserByEmail(
            email,
            {
                data: { role: role },
                redirectTo: redirectURi,
            }
        );
        if (error) {
            return new Response(
                JSON.stringify({
                    message: error.message,
                    status: error.status,
                }),
                {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                    status: error.status,
                }
            );
        }
        return new Response(JSON.stringify({ user: data, status: 200 }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: error.message, status: 400 }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 400,
            }
        );
    }
});
