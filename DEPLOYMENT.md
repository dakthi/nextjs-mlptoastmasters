# MLP Toastmasters Deployment Guide

This guide explains how to deploy the MLP Toastmasters website with proper database seeding.

## Environment Setup

1. Copy `.env.example` to `.env` and fill in your production values:
   ```bash
   cp .env.example .env
   ```

2. Update the environment variables:
   ```env
   DATABASE_URL="postgresql://username:password@your-db-host:5432/your-db-name"
   NEXTAUTH_URL="https://your-domain.com"
   NEXTAUTH_SECRET="your-secure-secret-here"
   ```

## Database Commands

### For Initial Deployment
```bash
# Deploy migrations and seed with upserts
npm run db:deploy
```

### For Development/Reset
```bash
# Reset database and seed with fresh data
npm run db:reset
```

### Manual Seeding
```bash
# Run upsert seed only (safe for production)
npm run db:seed:upsert

# Run fresh seed (development only - deletes all data first)
npm run db:seed
```

## Deployment Process

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database
```bash
# This runs migrations and seeds data
npm run db:deploy
```

### 3. Build Application
```bash
npm run build
```

### 4. Start Application
```bash
npm start
```

## Deployment Platforms

### Vercel
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Add build command: `npm run build`
4. Add postinstall script automatically runs `prisma generate`
5. For database setup, run in Vercel terminal: `npm run db:deploy`

### Railway/Render/DigitalOcean
1. Set environment variables
2. Use build command: `npm run build`
3. Use start command: `npm start`
4. Run database setup: `npm run db:deploy`

### Docker

#### Standard Dockerfile (Multi-stage)
Use the main `Dockerfile` for optimized production builds.

#### Simple Dockerfile (For debugging)
If the main Dockerfile fails, use `Dockerfile.simple`:
```bash
docker build -f Dockerfile.simple -t mlp-toastmasters .
```

#### Docker Compose (Recommended)
```yaml
version: '3.8'
services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mlptoastmasters_cms
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: "postgresql://postgres:password@db:5432/mlptoastmasters_cms"
      NEXTAUTH_URL: "http://localhost:3000"
      NEXTAUTH_SECRET: "your-secret-here"
    depends_on:
      - db
    volumes:
      - uploads:/app/uploads

volumes:
  postgres_data:
  uploads:
```

## Important Notes

- **Safe for Production**: The `db:seed:upsert` script uses upsert operations, making it safe to run multiple times
- **Admin Account**: Creates/updates admin account with email: `admin@mlptoastmasters.org` and password: `admin123`
- **Data Persistence**: Existing data is preserved and updated, not deleted
- **Automatic Generation**: `postinstall` script automatically runs `prisma generate`

## Seed Data Includes

- **Club Information**: MLP London Bridge Speakers details
- **Members**: 6 sample members with pathways
- **Educational Pathways**: All 11 Toastmasters pathways
- **Site Settings**: Contact info, meeting details
- **Resources**: Meeting templates and guides
- **FAQ Items**: Common questions and answers
- **Announcements**: Sample club announcements

## Troubleshooting

### Docker Build Issues

#### npm ci fails
```bash
# Option 1: Use simple Dockerfile
docker build -f Dockerfile.simple -t mlp-toastmasters .

# Option 2: Clean and regenerate package-lock.json
rm -f package-lock.json
npm install
docker build -t mlp-toastmasters .

# Option 3: Use npm install instead of npm ci
# Edit Dockerfile line 15: RUN npm install
```

#### Build context too large
```bash
# Check .dockerignore excludes:
echo "node_modules
.git
.next/cache" >> .dockerignore
```

#### Node.js version issues
```bash
# Use specific Node version in Dockerfile:
FROM node:18.17.0-alpine
```

### Migration Issues
```bash
# Reset migrations (development only)
npx prisma migrate reset --force
npm run db:seed:upsert
```

### Permission Issues
```bash
# Generate Prisma client
npx prisma generate
```

### Connection Issues
- Verify DATABASE_URL is correct
- Ensure database exists and is accessible
- Check firewall/security group settings

## Production Checklist

- [ ] Environment variables set
- [ ] Database accessible
- [ ] Migrations deployed: `npm run db:deploy`
- [ ] Application built: `npm run build`
- [ ] Admin account accessible
- [ ] HTTPS configured
- [ ] Domain configured
- [ ] Backup strategy in place

## Support

For deployment issues, check:
1. Database connection and permissions
2. Environment variable configuration
3. Build logs for errors
4. Network/firewall settings