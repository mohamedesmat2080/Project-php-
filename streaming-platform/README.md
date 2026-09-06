# Streaming Platform

A full-stack streaming platform built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **User Authentication**: Sign up, sign in with email/password or Google OAuth
- **Subscription Plans**: Basic, Standard, and Premium plans with Stripe integration
- **Video Streaming**: Watch movies and TV shows with a built-in video player
- **User Dashboard**: Continue watching, watchlist, and watch history
- **Admin Panel**: Content management, user management, and analytics
- **Responsive Design**: Works on desktop, tablet, and mobile

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js v5 (Auth.js)
- **Payments**: Stripe
- **UI Components**: Custom components with Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd streaming-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables in `.env.local`:
   - `DATABASE_URL`: SQLite database URL
   - `NEXTAUTH_SECRET`: Secret key for NextAuth
   - `NEXTAUTH_URL`: Your application URL
   - `GOOGLE_CLIENT_ID`: Google OAuth client ID (optional)
   - `GOOGLE_CLIENT_SECRET`: Google OAuth client secret (optional)
   - `STRIPE_SECRET_KEY`: Stripe secret key
   - `STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
   - `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   └── signup/
│   │   └── ...
│   ├── auth/
│   │   ├── signin/
│   │   └── signup/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── admin/
│   │   └── page.tsx
│   ├── watch/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   ├── ui/
│   ├── video/
│   └── subscription/
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   └── utils.ts
└── hooks/
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Important Notes

- **Content Licensing**: This platform requires proper licensing agreements with content creators/distributors. You are responsible for obtaining all necessary rights and permissions for any content you distribute.
- **Video Hosting**: Use a proper video hosting solution like Mux, Cloudflare Stream, or AWS S3 with CloudFront for production.
- **Payment Processing**: Configure Stripe webhooks in production to handle subscription events.
- **Database**: For production, consider using PostgreSQL instead of SQLite for better scalability.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for educational purposes. Ensure you comply with all applicable laws and regulations regarding content distribution and copyright.

## Support

For questions or issues, please open an issue on GitHub.