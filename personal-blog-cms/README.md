# Personal Blog CMS

A modern, full-featured personal blog with content management system built with Next.js, Prisma, and NextAuth.

## Features

- 🚀 **Modern Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- 🔐 **Authentication**: Secure admin authentication with NextAuth.js
- 📝 **Rich Content Management**: Create, edit, delete, and publish blog posts
- 📱 **Responsive Design**: Beautiful, mobile-first design
- 🎨 **Markdown Support**: Write content in Markdown with rich formatting
- 🗄️ **Database**: SQLite database with Prisma ORM
- ⚡ **Fast Performance**: Optimized for speed and SEO

## Quick Start

### 1. Clone and Install Dependencies

```bash
cd personal-blog-cms
npm install
```

### 2. Set Up the Database

```bash
# Generate Prisma client and create database
npx prisma generate
npx prisma db push
```

### 3. Create Admin User

```bash
# Create the initial admin user
npm run create-admin
```

This will create an admin user with:
- Email: `admin@example.com`
- Password: `admin123`

You can customize these by setting environment variables:

```bash
ADMIN_EMAIL=your@email.com ADMIN_PASSWORD=yourpassword npm run create-admin
```

### 4. Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your blog!

## Usage

### Public Blog

- **Homepage**: View all published blog posts at `/`
- **Post Pages**: Read individual posts at `/posts/[slug]`

### Admin Panel

1. **Login**: Go to `/admin/login` and sign in with your admin credentials
2. **Dashboard**: View and manage all posts at `/admin`
3. **Create Post**: Click "New Post" to create a new blog post
4. **Edit Post**: Click the edit icon next to any post to modify it
5. **Publish/Unpublish**: Toggle post visibility with the status button
6. **Delete Post**: Remove posts with the delete button

### Writing Posts

- **Title**: Enter a compelling title for your post
- **Excerpt**: Optional short description shown on the homepage
- **Content**: Write your post content using Markdown syntax
- **Draft/Publish**: Save as draft or publish immediately

### Markdown Support

The CMS supports full Markdown syntax:

```markdown
# Heading 1
## Heading 2

**Bold text**
*Italic text*

[Links](https://example.com)

- Bullet points
- Lists

1. Numbered
2. Lists

> Blockquotes

`Code inline`

```code blocks```
```

## Project Structure

```
personal-blog-cms/
├── prisma/
│   └── schema.prisma          # Database schema
├── scripts/
│   └── create-admin.ts        # Admin user creation script
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── admin/            # Admin panel pages
│   │   ├── api/              # API routes
│   │   └── posts/            # Public blog pages
│   ├── components/           # React components
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript definitions
└── package.json
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"

# Optional: Admin user creation
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
ADMIN_NAME="Admin"
```

## Deployment

### 1. Build the Application

```bash
npm run build
```

### 2. Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy!

### 3. Production Database

For production, consider using:
- **PostgreSQL**: Update `DATABASE_URL` to PostgreSQL connection string
- **MySQL**: Change provider in `schema.prisma` to `mysql`
- **PlanetScale**: Use their connection string

## Customization

### Styling

- Modify `src/app/globals.css` for global styles
- Update Tailwind configuration in `tailwind.config.ts`
- Customize components in `src/components/`

### Features

- Add new fields to the Post model in `prisma/schema.prisma`
- Extend API routes in `src/app/api/`
- Create new pages in `src/app/`

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + Tailwind Typography
- **Database**: Prisma ORM with SQLite
- **Authentication**: NextAuth.js
- **UI Icons**: Lucide React
- **Content**: React Markdown
- **Language**: TypeScript

## License

MIT License - feel free to use this project for your personal blog!

## Support

If you encounter any issues or have questions, please check the:
- Next.js documentation
- Prisma documentation
- NextAuth.js documentation

Happy blogging! 🎉
