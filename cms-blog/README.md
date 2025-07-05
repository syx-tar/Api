# Personal Blog CMS

A modern, full-featured Content Management System for personal blogging built with Next.js 14, MySQL, and TypeScript. Features a beautiful dark mode interface, responsive design, and comprehensive admin panel.

## 🚀 Features

### Public Features
- **Modern Landing Page** - Eye-catching hero section with featured posts and statistics
- **Blog Listing** - Paginated blog posts with category filtering
- **Individual Post Pages** - Full blog post view with markdown support
- **About Page** - Personal introduction and bio
- **Contact Page** - Contact form and social links
- **Dark Mode** - Beautiful dark theme throughout the site
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Admin Features
- **Secure Authentication** - NextAuth.js with credential-based login
- **Admin Dashboard** - Overview of posts, stats, and quick actions
- **Post Management** - Create, edit, delete, and publish blog posts
- **Category Management** - Organize posts with categories
- **Draft System** - Save posts as drafts before publishing
- **Rich Text Editor** - Markdown support for content creation

### Technical Features
- **Next.js 14** - Latest features including App Router
- **TypeScript** - Type-safe development
- **MySQL Database** - Reliable data storage with Prisma ORM
- **Authentication** - Secure admin access with NextAuth.js
- **Responsive UI** - Tailwind CSS for modern styling
- **Performance Optimized** - Server-side rendering and optimization

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Database**: MySQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with dark mode support
- **Icons**: Lucide React
- **UI Components**: Custom components with modern design

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- MySQL database (local or cloud)
- npm or yarn package manager

### 1. Clone the Repository
\`\`\`bash
git clone <repository-url>
cd cms-blog
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Environment Setup
Create a \`.env\` file in the root directory:

\`\`\`env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/cms_blog"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Application
APP_NAME="Personal Blog CMS"
APP_URL="http://localhost:3000"
\`\`\`

### 4. Database Setup
\`\`\`bash
# Generate Prisma client
npx prisma generate

# Push database schema
npm run db:push

# Seed database with sample data
npm run db:seed
\`\`\`

### 5. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see your blog!

## 🗄️ Database Schema

The application uses the following main entities:

- **Users** - Admin user accounts
- **Posts** - Blog posts with content, metadata, and status
- **Categories** - Post categorization
- **Tags** - Post tagging system
- **PostCategory** - Many-to-many relationship between posts and categories
- **PostTag** - Many-to-many relationship between posts and tags

## 🔐 Admin Access

After seeding the database, you can access the admin panel:

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email**: admin@example.com
- **Password**: admin123

## 📚 Usage

### Creating Blog Posts
1. Log in to the admin panel at `/admin`
2. Click "New Post" or go to "Manage Posts"
3. Fill in the post details (title, content, excerpt)
4. Select categories and add tags
5. Choose to save as draft or publish immediately

### Managing Categories
1. Navigate to the admin dashboard
2. Click on "Categories" to manage post categories
3. Add, edit, or delete categories as needed

### Customizing the Site
- Update the About page content in \`src/app/about/page.tsx\`
- Modify the homepage in \`src/app/page.tsx\`
- Customize styling in \`src/app/globals.css\`
- Update site metadata in \`src/app/layout.tsx\`

## 🎨 Design Features

### Dark Mode
The entire site features a beautiful dark mode design with:
- Consistent color scheme throughout
- Optimized contrast for readability
- Modern UI components
- Smooth transitions and animations

### Responsive Design
- Mobile-first approach
- Responsive navigation with mobile menu
- Flexible grid layouts
- Optimized typography for all screen sizes

### Modern UI
- Clean, minimalist design
- Card-based layouts
- Subtle shadows and borders
- Professional color palette

## 📱 Pages Overview

### Public Pages
- **/** - Landing page with hero, featured posts, and stats
- **/blog** - Blog listing with category filtering
- **/blog/[slug]** - Individual blog post pages
- **/about** - About page with personal bio
- **/contact** - Contact form and information
- **/login** - Admin login page

### Admin Pages
- **/admin** - Dashboard overview
- **/admin/posts** - Posts management
- **/admin/posts/new** - Create new post
- **/admin/posts/[id]** - Edit existing post
- **/admin/categories** - Category management

## 🔧 Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm run db:push\` - Push database schema changes
- \`npm run db:seed\` - Seed database with sample data
- \`npm run db:reset\` - Reset and reseed database

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - For the beautiful styling
- [Prisma](https://prisma.io/) - Database ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Lucide React](https://lucide.dev/) - Beautiful icons

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the documentation above
2. Search existing issues
3. Create a new issue with detailed information

---

Built with ❤️ using Next.js and modern web technologies.
