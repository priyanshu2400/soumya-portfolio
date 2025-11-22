# Skills Management Setup

## Database Setup

To enable dynamic skills management in your portfolio, you need to create the `skills` table in your Supabase database.

### Steps:

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-skills-migration.sql`
4. Run the SQL query

This will:
- Create the `skills` table with proper structure
- Set up Row Level Security (RLS) policies
- Insert the default skills that are currently hardcoded

### Skills Table Structure

```sql
- id: UUID (Primary Key)
- name: TEXT (Skill name)
- category: TEXT ('core' or 'tool')
- order: INTEGER (Display order)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Admin Panel

Once the database is set up, you can manage skills through the admin panel:

1. Navigate to `/admin` (requires authentication)
2. Click on the "Skills" tab
3. You can now:
   - Add new skills (Core Skills or Tools/Software)
   - Edit existing skills (name and order)
   - Delete skills
   - Reorder skills by changing the order number

## How It Works

- **Frontend Display**: The `MobileSkills` component fetches skills from the database and displays them in two columns (Core Skills and Tools & Software)
- **Admin Management**: The `SkillsManager` component provides a full CRUD interface for managing skills
- **API Routes**: 
  - `GET /api/skills` - Fetch all skills
  - `POST /api/skills` - Create a new skill
  - `PUT /api/skills/[id]` - Update a skill
  - `DELETE /api/skills/[id]` - Delete a skill
- **Fallback Data**: If Supabase is not configured, the app will use fallback data defined in `fallback-data.ts`

## Features

- ✅ Dynamic skill management without code changes
- ✅ Separate categories for Core Skills and Tools/Software
- ✅ Custom ordering within each category
- ✅ Real-time updates on the frontend
- ✅ Consistent styling with the portfolio theme
- ✅ Secure admin-only access for modifications
