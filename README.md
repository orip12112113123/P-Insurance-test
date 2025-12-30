# Phoenix Insurance Campaign Management System
# מערכת ניהול קמפיינים - פניקס ביטוח

A WhatsApp OTP-based authentication system for managing insurance agency compensation campaigns.

מערכת אימות מבוססת WhatsApp OTP לניהול קמפיינים לפיצוי סוכנויות ביטוח.

## Features / תכונות

### For Agencies / לסוכנויות
- 🔐 Login via WhatsApp OTP / התחברות באמצעות קוד אימות בוואטסאפ
- 📊 Personal dashboard showing campaign progress / לוח בקרה אישי המציג התקדמות בקמפיין
- ⏰ Remaining days counter / מונה ימים נותרים
- 🎯 Phase tracking / מעקב אחר שלבים
- 💰 Compensation amount display / הצגת סכום פיצוי
- ✈️ Dream vacation goal / יעד חופשת חלומות

### For Admin / למנהלי מערכת
- 👥 Overview of all agencies / סקירה של כל הסוכנויות
- 📈 Campaign statistics / סטטיסטיקות קמפיין
- 📤 Excel upload for bulk data import / העלאת אקסל לייבוא נתונים המוני
- 🔍 Detailed agency progress tracking / מעקב מפורט אחר התקדמות סוכנויות

## Tech Stack / סטאק טכנולוגי

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with HTTP-only cookies
- **OTP**: Twilio WhatsApp API
- **Excel**: xlsx library

## Prerequisites / דרישות מקדימות

- Node.js 18+
- PostgreSQL database
- Twilio account with WhatsApp enabled (optional for development)

## Installation / התקנה

### 1. Clone the repository / שכפל את המאגר
```bash
git clone <repository-url>
cd P-Insurance-test
```

### 2. Install dependencies / התקן תלויות
```bash
npm install
```

### 3. Set up environment variables / הגדר משתני סביבה

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/phoenix_insurance"

# JWT Secret (generate a random string)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Twilio WhatsApp Configuration
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_WHATSAPP_NUMBER="whatsapp:+14155238886"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Set up database / הגדר את מסד הנתונים

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Open Prisma Studio (optional) to manage data
npm run prisma:studio
```

### 5. Seed initial data (optional) / זרע נתונים ראשוניים

You can manually create users and campaigns using Prisma Studio, or create a seed script.

Example admin user:
```sql
INSERT INTO users (id, mobile_number, role, agency_name, created_at, updated_at)
VALUES (gen_random_uuid(), '+972501234567', 'ADMIN', 'Phoenix Admin', NOW(), NOW());
```

Example campaign:
```sql
INSERT INTO campaigns (id, name, description, start_date, end_date, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'קמפיין 2024',
  'קמפיין שנתי לסוכנויות ביטוח',
  '2024-01-01',
  '2024-12-31',
  true,
  NOW(),
  NOW()
);
```

### 6. Run the development server / הרץ את שרת הפיתוח

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage / שימוש

### Login / התחברות

1. Go to `/login`
2. Enter your mobile number (Israeli format: 050-123-4567)
3. Receive OTP code via WhatsApp
4. Enter the 6-digit code
5. You'll be redirected to:
   - `/dashboard` for agencies
   - `/admin` for admins

### Agency Dashboard / לוח בקרה לסוכנויות

View your campaign data:
- Days remaining
- Current phase
- Progress percentage
- Compensation amount
- Dream vacation goal

### Admin Dashboard / לוח בקרה למנהלים

Manage all campaigns:
- Upload Excel files with agency data
- View all agencies' progress
- Track campaign statistics
- Monitor overall performance

## Excel File Format / פורמט קובץ Excel

The Excel file should have the following columns:

| Hebrew | English | Type | Required |
|--------|---------|------|----------|
| מספר טלפון | Mobile | Text | Yes |
| שם סוכנות | Agency Name | Text | Yes |
| שלב | Phase | Text | Yes |
| יעד | Target | Number | Yes |
| התקדמות נוכחית | Progress | Number | Yes |
| פיצוי | Compensation | Number | Yes |
| חופשת חלומות | Dream Vacation | Text | No |
| הערות | Notes | Text | No |

**Phase values**: שלב 1, שלב 2, שלב 3, הושלם (or PHASE_1, PHASE_2, PHASE_3, COMPLETED)

## API Endpoints / נקודות API

### Authentication
- `POST /api/auth/send-otp` - Send OTP via WhatsApp
- `POST /api/auth/verify-otp` - Verify OTP and login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Agency
- `GET /api/agency/dashboard` - Get agency campaign data

### Admin
- `GET /api/admin/dashboard` - Get all campaigns and agencies
- `POST /api/admin/upload-excel` - Upload Excel file with agency data

## Development Notes / הערות פיתוח

### WhatsApp OTP in Development

If Twilio credentials are not configured, OTP codes will be logged to the console:
```
[DEV MODE] OTP for +972501234567: 123456
```

### Database Management

Use Prisma Studio to manage data:
```bash
npm run prisma:studio
```

### Generate Prisma Client

After schema changes:
```bash
npm run prisma:generate
npm run prisma:migrate
```

## Production Deployment / פריסה לייצור

### Environment Variables

Make sure to set all environment variables in your production environment:
- `DATABASE_URL` - Production PostgreSQL connection string
- `JWT_SECRET` - Strong random secret
- `TWILIO_ACCOUNT_SID` - Your Twilio SID
- `TWILIO_AUTH_TOKEN` - Your Twilio auth token
- `TWILIO_WHATSAPP_NUMBER` - Your Twilio WhatsApp number

### Build

```bash
npm run build
npm start
```

### Security Checklist

- ✅ Use HTTPS in production
- ✅ Set strong JWT_SECRET
- ✅ Configure CORS properly
- ✅ Use production database with strong password
- ✅ Enable rate limiting for OTP endpoints
- ✅ Set secure cookie flags
- ✅ Keep dependencies updated

## License

ISC

## Support / תמיכה

For issues or questions, please contact the Phoenix Insurance IT team.

---

Made with ❤️ for Phoenix Insurance Israel
