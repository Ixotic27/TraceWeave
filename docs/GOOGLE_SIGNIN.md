# Google sign-in

The hosted sign-in page includes a Google button and a server-side PKCE flow.
The application keeps the Supabase access token in an HttpOnly cookie; it never
puts the token in browser storage. The button stays available, but redirects to
an explanation until the provider is configured.

Supabase requires credentials from a Google Cloud OAuth Web application. The
Supabase CLI cannot create those Google credentials. After creating them, set:

```text
TRACEWEAVE_GOOGLE_ENABLED=1
```

on Render and configure the dedicated Supabase project with the Google client ID
and secret. The provider callback URL is:

```text
https://dlyxamexvbewnniwaime.supabase.co/auth/v1/callback
```

The application redirect is the existing Auth Site URL:

```text
https://traceweave.onrender.com/
```

Supabase's official setup requires the Google Cloud client ID and secret; use the
project Auth provider settings or the Supabase Management API. The local CLI
configuration records the password minimum and local provider shape, but pushing
the hosted Auth configuration is blocked for the current CLI account with an
access-denied response, so it is not run blindly. Do not commit the Google
secret. The rest of the sign-in flow is already deployed and waits for this
provider configuration.
