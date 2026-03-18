# Workflow Automation Opportunities

Potential automations that can be built on top of the existing Supabase + Netlify stack.

---

## Trigger-based (fire when something happens)

### 1. Confirmation emails on form submit
**Trigger:** New row inserted into `reservations` or `event_inquiries`
**Action:** Send a branded confirmation email to the guest + a staff alert email
**Tools needed:** Supabase Edge Function + Resend or SendGrid (both have free tiers)

---

### 2. Staff alert via Slack or SMS
**Trigger:** New row inserted into either table
**Action:** Post a Slack message or send an SMS to the team immediately
**Tools needed:** Slack Incoming Webhook (free) or Twilio SMS

---

### 3. Google Calendar event on confirmation
**Trigger:** Reservation `status` changes from `pending` → `confirmed`
**Action:** Create a calendar event with the guest name, party size, time, and special requests
**Tools needed:** Google Calendar API + Supabase webhook or Edge Function

---

## Scheduled (run on a timer)

### 4. Daily reservation digest
**Trigger:** Runs nightly (e.g. 8pm)
**Action:** Pull tomorrow's reservations from Supabase, format them, email to staff
**Tools needed:** Python script in `execution/` + GitHub Actions cron or Netlify Scheduled Function

---

### 5. 24-hour guest reminder
**Trigger:** Runs daily, checks for reservations with `date = tomorrow`
**Action:** Email each guest a reminder with their date, time, and any special request notes
**Tools needed:** Python script in `execution/` + Resend/SendGrid + GitHub Actions cron

---

### 6. Weekly report to Google Sheets
**Trigger:** Runs every Monday morning
**Action:** Export the previous week's reservations and inquiries to a Google Sheet for trend tracking
**Tools needed:** Python script in `execution/` (Google Sheets API already used in this project)

---

## Status-driven (react to data changes)

### 7. Auto-send confirmation when status updated
**Trigger:** Reservation `status` changes to `confirmed`
**Action:** Email guest with official confirmation
**Trigger:** Reservation `status` changes to `cancelled`
**Action:** Email guest with cancellation notice
**Tools needed:** Supabase Database Webhook + Edge Function + email provider

---

### 8. Stale inquiry nudge to staff
**Trigger:** Runs daily
**Action:** Check for `event_inquiries` where `status = 'new'` and `created_at` is older than 48 hours — send a Slack reminder to follow up
**Tools needed:** Python script in `execution/` + Slack webhook + GitHub Actions cron

---

## Implementation priority (recommended order)

| Priority | Automation | Impact | Effort |
|---|---|---|---|
| 1 | Confirmation emails (#1) | High — makes booking feel professional | Low |
| 2 | Staff alert via Slack (#2) | High — staff know instantly | Low |
| 3 | 24-hour guest reminder (#5) | High — reduces no-shows | Medium |
| 4 | Daily digest (#4) | Medium — staff planning | Medium |
| 5 | Google Calendar (#3) | Medium — team visibility | Medium |
| 6 | Weekly Sheets report (#6) | Medium — business insights | Low |
| 7 | Status-driven emails (#7) | High — professional flow | Medium |
| 8 | Stale inquiry nudge (#8) | Medium — follow-up discipline | Low |

---

## Tools Reference

| Tool | Purpose | Cost |
|---|---|---|
| Resend | Transactional email | Free up to 100 emails/day |
| SendGrid | Transactional email | Free up to 100 emails/day |
| Twilio | SMS notifications | Pay-per-message |
| Slack Webhooks | Team notifications | Free |
| Google Calendar API | Calendar events | Free |
| Google Sheets API | Reporting | Free (already in project) |
| GitHub Actions | Cron job scheduling | Free for public repos |
| Netlify Scheduled Functions | Cron job scheduling | Free tier available |
| Supabase Edge Functions | DB-triggered serverless | Free tier (500K invocations/month) |
| Supabase Webhooks | Trigger on DB events | Free |
