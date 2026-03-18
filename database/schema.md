# Database Schema

## Table: `reservations`

Stores all table booking requests submitted through the Reservations modal on the website.

| Column | Type | Required | Default | Notes |
|---|---|---|---|---|
| `id` | UUID | auto | `gen_random_uuid()` | Primary key, auto-generated |
| `created_at` | Timestamptz | auto | `NOW()` | Set automatically on insert |
| `name` | Text | Yes | — | Guest's full name |
| `email` | Text | Yes | — | Guest's email address |
| `phone` | Text | No | null | Guest's phone number |
| `date` | Date | Yes | — | Requested reservation date |
| `time` | Time | No | null | Requested reservation time |
| `guests` | Integer | No | null | Party size (1–20) |
| `special_requests` | Text | No | null | Dietary needs, occasion notes, etc. |
| `status` | Text | auto | `'pending'` | One of: `pending`, `confirmed`, `cancelled` |

### Status Workflow
```
pending → confirmed
pending → cancelled
```

---

## Table: `event_inquiries`

Stores all private dining and event inquiries submitted through the "Plan Your Gathering" modal.

| Column | Type | Required | Default | Notes |
|---|---|---|---|---|
| `id` | UUID | auto | `gen_random_uuid()` | Primary key, auto-generated |
| `created_at` | Timestamptz | auto | `NOW()` | Set automatically on insert |
| `name` | Text | Yes | — | Contact's full name |
| `email` | Text | Yes | — | Contact's email address |
| `phone` | Text | No | null | Contact's phone number |
| `event_type` | Text | Yes | — | One of: `private_dining`, `birthday`, `corporate`, `wedding`, `anniversary`, `other` |
| `event_date` | Date | No | null | Preferred event date |
| `guest_count` | Integer | No | null | Estimated number of guests |
| `message` | Text | Yes | — | Free-text vision/requirements |
| `status` | Text | auto | `'new'` | One of: `new`, `in_review`, `responded`, `closed` |

### Status Workflow
```
new → in_review → responded → closed
```

---

## Row Level Security Policies

Both tables have RLS enabled with the following policies:

| Table | Operation | Role | Rule |
|---|---|---|---|
| `reservations` | INSERT | anon | Always allowed (public form submission) |
| `event_inquiries` | INSERT | anon | Always allowed (public form submission) |

No SELECT, UPDATE, or DELETE policies exist for anonymous users — those operations are only available to authenticated admin users via the Supabase dashboard.
