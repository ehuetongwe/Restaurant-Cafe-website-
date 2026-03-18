# Lumière Pâtisserie — Supabase Database Overview

## Project Details

| Field | Value |
|---|---|
| Project Name | lumiere-patisserie |
| Project ID | vzwqakkjufbvpagthtif |
| Region | us-east-1 |
| Organization | Aura Transportation (mybzuwvnrqpzycdptfmf) |
| Status | ACTIVE_HEALTHY |
| Monthly Cost | $0 (Free tier) |

## Connection

| Field | Value |
|---|---|
| Project URL | https://vzwqakkjufbvpagthtif.supabase.co |
| Publishable Key | sb_publishable_XSjWXgIpKTcrTCsHaz3wMQ_-7yPQv4r |
| Dashboard | https://supabase.com/dashboard/project/vzwqakkjufbvpagthtif |

> The anon key is safe to use in the browser. It can only INSERT into the two tables — it cannot read, update, or delete any data.

## Tables

- `reservations` — stores table booking requests from the reservation modal
- `event_inquiries` — stores private dining/event inquiries from the "Plan Your Gathering" modal

See `schema.md` for full column definitions.

## Security Model

Row Level Security (RLS) is enabled on both tables. The only allowed public operation is INSERT. No visitor can read, modify, or delete anyone else's data. Only authenticated admin users (via the Supabase dashboard) can do that.
