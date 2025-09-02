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
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
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