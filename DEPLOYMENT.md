# 🚀 Deployment Guide - Phoenix Insurance Campaign System

Follow these steps to deploy your application to Vercel with a PostgreSQL database.

## Prerequisites

- ✅ Vercel account (you have this)
- ✅ GitHub account (for connecting repository)
- 📦 Database provider account (choose one below)

---

## Step 1: Set Up Database

Choose **ONE** of these options:

### Option A: Vercel Postgres (Recommended - Integrated)

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click "Storage" in the sidebar
3. Click "Create Database"
4. Select "Postgres"
5. Choose a name: `phoenix-insurance-db`
6. Click "Create"
7. **Copy the connection string** - you'll need this later

### Option B: Neon (Recommended - Free Tier)

1. Go to https://neon.tech
2. Sign in with GitHub
3. Click "Create Project"
4. Name it: `phoenix-insurance`
5. Choose region closest to you
6. Click "Create Project"
7. **Copy the connection string** - it looks like:
   ```
   postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

### Option C: Supabase (Alternative - Free Tier)

1. Go to https://supabase.com
2. Sign in with GitHub
3. Click "New Project"
4. Fill in details and create
5. Go to Settings → Database
6. **Copy the connection string** (under "Connection string" → "URI")

---

## Step 2: Deploy to Vercel

### Method 1: Via GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   # If you haven't already, create a new GitHub repository
   # Then push your code
   git remote add github https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push github claude/whatsapp-insurance-campaigns-NPsUx:main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your repository
   - Click "Import"

3. **Configure Build Settings:**
   - Framework Preset: **Next.js** (auto-detected)
   - Build Command: `prisma generate && next build` (auto-configured)
   - Output Directory: `.next` (auto-configured)

4. **Add Environment Variables** (click "Environment Variables"):
   ```env
   DATABASE_URL=postgresql://your-connection-string-here
   JWT_SECRET=generate-a-random-32-char-string-here
   TWILIO_ACCOUNT_SID=your-twilio-sid (optional for now)
   TWILIO_AUTH_TOKEN=your-twilio-token (optional for now)
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886 (optional for now)
   ```

   **Generate JWT_SECRET:**
   ```bash
   # Run this in your terminal to generate a secure random string:
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

5. **Click "Deploy"**

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

---

## Step 3: Run Database Migrations

After deployment succeeds:

### Method A: Via Vercel Dashboard

1. Go to your project in Vercel
2. Click "Settings" → "Environment Variables"
3. Make sure `DATABASE_URL` is set
4. Go to "Deployments"
5. Click the three dots on your deployment → "Redeploy"
6. Check "Use existing Build Cache" is OFF
7. Click "Redeploy"

### Method B: Via Local Terminal (with production DB)

```bash
# Set your production DATABASE_URL
export DATABASE_URL="your-production-database-url"

# Run migrations
npx prisma migrate deploy

# Seed initial data
npm run seed
```

---

## Step 4: Create Initial Admin User

You have two options:

### Option A: Using Seed Script (Recommended)

```bash
# Set environment variables
export DATABASE_URL="your-production-database-url"
export ADMIN_PHONE="+972501234567"  # Your admin phone number
export AGENCY_PHONE="+972527654321" # Sample agency (optional)

# Run seed
npm run seed
```

This creates:
- ✅ Admin user with your phone number
- ✅ Sample campaign for 2024
- ✅ Sample agency user (for testing)

### Option B: Manual via SQL

Connect to your database and run:

```sql
-- Create admin user
INSERT INTO users (id, mobile_number, role, agency_name, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  '+972501234567',  -- YOUR PHONE NUMBER
  'ADMIN',
  'Phoenix Admin',
  NOW(),
  NOW()
);

-- Create a campaign
INSERT INTO campaigns (id, name, description, start_date, end_date, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'קמפיין 2024',
  'קמפיין פיצויים לסוכנויות ביטוח',
  '2024-01-01',
  '2024-12-31',
  true,
  NOW(),
  NOW()
);
```

---

## Step 5: Test Your Deployment

1. **Visit your deployed URL:** `https://your-project.vercel.app`

2. **Test Login:**
   - Enter your admin phone number
   - Check the Vercel logs for OTP code:
     - Go to Vercel Dashboard → Your Project → Deployments → Latest → Functions
     - Look for: `[DEV MODE] OTP for +972xxx: 123456`

3. **Access Admin Dashboard:**
   - After login, you should see the admin dashboard
   - Upload an Excel file to test

---

## Step 6: Set Up Twilio (Optional - For Real WhatsApp OTP)

### Get Twilio WhatsApp Access:

1. Go to https://www.twilio.com/console
2. Sign up or log in
3. Get a Twilio phone number with WhatsApp enabled
4. Copy your:
   - Account SID
   - Auth Token
   - WhatsApp number (format: `whatsapp:+14155238886`)

### Add to Vercel:

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add:
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your-auth-token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   ```
4. Redeploy the application

---

## Troubleshooting

### Build Fails with Prisma Error

**Solution:** Make sure `DATABASE_URL` is set in environment variables

### Can't Connect to Database

**Solution:** Check your connection string includes `?sslmode=require` for Neon/Supabase

### OTP Not Sending

**Solution:**
- Without Twilio: Check Vercel function logs for OTP code
- With Twilio: Verify your credentials and WhatsApp number setup

### "User not found" Error

**Solution:** Run the seed script or create an admin user manually

---

## Quick Reference

**Your Deployment URL:** Check Vercel dashboard

**Admin Login:** Your phone number (set during seed)

**View Logs:** Vercel Dashboard → Deployments → Latest → Functions

**Database Management:**
```bash
export DATABASE_URL="your-production-url"
npx prisma studio
```

---

## Post-Deployment Checklist

- [ ] Database is set up and accessible
- [ ] Environment variables are configured
- [ ] Database migrations have run successfully
- [ ] Admin user is created
- [ ] At least one campaign exists
- [ ] Can login successfully
- [ ] Admin dashboard is accessible
- [ ] Excel upload works
- [ ] Agency dashboard displays correctly

---

## Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Neon Docs:** https://neon.tech/docs
- **Twilio Docs:** https://www.twilio.com/docs/whatsapp

---

**🎉 Congratulations! Your Phoenix Insurance Campaign System is now live!**
