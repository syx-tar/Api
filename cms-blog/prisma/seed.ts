import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create categories
  const categories = [
    { name: 'Technology', slug: 'technology', description: 'Latest tech trends and insights' },
    { name: 'Programming', slug: 'programming', description: 'Code tutorials and best practices' },
    { name: 'Web Development', slug: 'web-development', description: 'Frontend and backend development' },
    { name: 'React', slug: 'react', description: 'React.js tutorials and tips' },
    { name: 'Next.js', slug: 'nextjs', description: 'Next.js framework guides' },
    { name: 'Personal', slug: 'personal', description: 'Personal thoughts and experiences' },
  ]

  const createdCategories = []
  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
    createdCategories.push(createdCategory)
  }

  console.log('✅ Categories created:', createdCategories.length)

  // Create sample posts
  const posts = [
    {
      title: 'Getting Started with Next.js 14',
      slug: 'getting-started-with-nextjs-14',
      content: `# Getting Started with Next.js 14

Next.js 14 brings exciting new features and improvements that make building React applications even better. In this comprehensive guide, we'll explore the latest features and how to get started.

## What's New in Next.js 14

### App Router Improvements
The App Router has been refined with better performance and new features:
- Improved loading states
- Better error handling
- Enhanced routing capabilities

### Server Components
Server Components are now more powerful:
- Better performance optimization
- Improved data fetching
- Enhanced SEO capabilities

### Turbopack
The new bundler brings significant improvements:
- Faster build times
- Better development experience
- Improved hot reloading

## Getting Started

To create a new Next.js 14 project:

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
\`\`\`

This command creates a new project with:
- TypeScript support
- Tailwind CSS
- ESLint configuration
- App Router by default

## Project Structure

Your new Next.js 14 project will have this structure:

\`\`\`
my-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── lib/
├── public/
└── package.json
\`\`\`

## Building Your First Page

Create a new page in the app directory:

\`\`\`tsx
// app/about/page.tsx
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Welcome to our amazing website!</p>
    </div>
  )
}
\`\`\`

## Conclusion

Next.js 14 is a powerful framework that makes building modern React applications easier and more efficient. With its new features and improvements, it's the perfect choice for your next project.

Start building today and experience the power of Next.js 14!`,
      excerpt: 'Discover the latest features and improvements in Next.js 14, from App Router enhancements to Turbopack integration.',
      status: 'PUBLISHED',
      publishedAt: new Date('2024-01-15'),
      categories: ['technology', 'web-development', 'nextjs']
    },
    {
      title: 'Building a Modern Blog with React and TypeScript',
      slug: 'building-modern-blog-react-typescript',
      content: `# Building a Modern Blog with React and TypeScript

Creating a blog has never been easier with modern tools like React and TypeScript. In this tutorial, we'll build a complete blog system from scratch.

## Why React and TypeScript?

### React Benefits
- Component-based architecture
- Virtual DOM for performance
- Rich ecosystem
- Great developer experience

### TypeScript Benefits
- Static type checking
- Better IDE support
- Improved code quality
- Enhanced refactoring capabilities

## Setting Up the Project

First, let's create a new React project with TypeScript:

\`\`\`bash
npx create-react-app my-blog --template typescript
cd my-blog
npm install
\`\`\`

## Project Architecture

We'll structure our blog with these main components:

### Components Structure
\`\`\`
src/
├── components/
│   ├── Header/
│   ├── PostList/
│   ├── PostCard/
│   ├── PostDetail/
│   └── Footer/
├── types/
├── utils/
└── App.tsx
\`\`\`

## Creating the Post Interface

First, let's define our post type:

\`\`\`typescript
// types/Post.ts
export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  publishedAt: Date
  tags: string[]
  featuredImage?: string
}
\`\`\`

## Building the Components

### PostCard Component
\`\`\`tsx
// components/PostCard/PostCard.tsx
import React from 'react'
import { Post } from '../../types/Post'

interface PostCardProps {
  post: Post
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="post-card">
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <div className="meta">
        <span>By {post.author}</span>
        <span>{post.publishedAt.toLocaleDateString()}</span>
      </div>
    </article>
  )
}
\`\`\`

## Styling with CSS Modules

Use CSS Modules for component-scoped styling:

\`\`\`css
/* components/PostCard/PostCard.module.css */
.postCard {
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.2s ease;
}

.postCard:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
\`\`\`

## Adding State Management

For simple blogs, React's built-in state is sufficient:

\`\`\`tsx
// App.tsx
import React, { useState, useEffect } from 'react'
import { Post } from './types/Post'
import { PostList } from './components/PostList/PostList'

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      // Fetch posts from API
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <header>
        <h1>My Blog</h1>
      </header>
      <main>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <PostList posts={posts} />
        )}
      </main>
    </div>
  )
}

export default App
\`\`\`

## Performance Optimization

### Code Splitting
Use React.lazy for route-based code splitting:

\`\`\`tsx
import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Home = React.lazy(() => import('./pages/Home'))
const PostDetail = React.lazy(() => import('./pages/PostDetail'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
\`\`\`

### Memoization
Use React.memo and useMemo for expensive computations:

\`\`\`tsx
import React, { memo, useMemo } from 'react'

const PostCard = memo(({ post }: { post: Post }) => {
  const formattedDate = useMemo(
    () => post.publishedAt.toLocaleDateString(),
    [post.publishedAt]
  )

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <span>{formattedDate}</span>
    </article>
  )
})
\`\`\`

## Testing

Write tests for your components:

\`\`\`tsx
// components/PostCard/PostCard.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { PostCard } from './PostCard'

const mockPost = {
  id: '1',
  title: 'Test Post',
  content: 'Test content',
  excerpt: 'Test excerpt',
  author: 'Test Author',
  publishedAt: new Date(),
  tags: ['test']
}

test('renders post card correctly', () => {
  render(<PostCard post={mockPost} />)
  
  expect(screen.getByText('Test Post')).toBeInTheDocument()
  expect(screen.getByText('Test excerpt')).toBeInTheDocument()
  expect(screen.getByText('By Test Author')).toBeInTheDocument()
})
\`\`\`

## Deployment

Deploy your blog to platforms like Vercel or Netlify:

\`\`\`bash
# Build the project
npm run build

# Deploy to Vercel
npm install -g vercel
vercel

# Or deploy to Netlify
npm install -g netlify-cli
netlify deploy
\`\`\`

## Conclusion

Building a modern blog with React and TypeScript provides a great foundation for a scalable, maintainable web application. The combination of React's component architecture and TypeScript's type safety makes development more efficient and less error-prone.

Key takeaways:
- TypeScript improves code quality and developer experience
- Component-based architecture promotes reusability
- Performance optimization is crucial for user experience
- Testing ensures reliability and maintainability

Start building your blog today and explore the endless possibilities with React and TypeScript!`,
      excerpt: 'Learn how to build a modern, scalable blog using React and TypeScript with best practices for performance and maintainability.',
      status: 'PUBLISHED',
      publishedAt: new Date('2024-01-10'),
      categories: ['programming', 'web-development', 'react']
    },
    {
      title: 'The Future of Web Development: Trends to Watch in 2024',
      slug: 'future-web-development-trends-2024',
      content: `# The Future of Web Development: Trends to Watch in 2024

As we progress through 2024, the web development landscape continues to evolve at a rapid pace. Let's explore the key trends that are shaping the future of web development.

## 1. AI-Powered Development Tools

### GitHub Copilot and Beyond
AI coding assistants are becoming indispensable:
- Code completion and generation
- Bug detection and fixes
- Documentation generation
- Code review assistance

### Impact on Developers
- Increased productivity
- Reduced development time
- Better code quality
- Learning acceleration for new developers

## 2. WebAssembly (WASM) Growth

### Performance Benefits
WebAssembly is revolutionizing web performance:
- Near-native performance in browsers
- Support for multiple languages
- Better resource utilization
- Enhanced security

### Use Cases
- High-performance web applications
- Games and multimedia applications
- Scientific computing
- Legacy code migration

## 3. Micro-Frontend Architecture

### Why Micro-Frontends?
- Independent deployment
- Technology diversity
- Team scalability
- Reduced complexity

### Implementation Approaches
- Module Federation
- Single-SPA framework
- Web Components
- Server-side composition

## 4. Edge Computing and CDN Evolution

### Edge-First Development
- Reduced latency
- Better performance
- Geographic distribution
- Enhanced user experience

### Popular Edge Platforms
- Cloudflare Workers
- Vercel Edge Functions
- AWS Lambda@Edge
- Deno Deploy

## 5. Progressive Web Apps (PWAs) 2.0

### Enhanced Capabilities
- Better offline functionality
- Native-like experiences
- Push notifications
- Background sync

### New APIs
- File System API
- Web Share API
- Payment Request API
- Geolocation API enhancements

## 6. TypeScript Dominance

### Why TypeScript is Winning
- Better IDE support
- Improved refactoring
- Enhanced collaboration
- Reduced runtime errors

### Adoption Statistics
- 87% of developers use TypeScript
- Major frameworks adopting TypeScript
- Growing ecosystem support

## 7. Jamstack Evolution

### Modern Jamstack
- Dynamic capabilities
- Server-side rendering
- Edge functions
- Real-time features

### Popular Jamstack Frameworks
- Next.js
- Nuxt.js
- Gatsby
- SvelteKit

## 8. Web3 and Blockchain Integration

### Decentralized Applications (dApps)
- Wallet integration
- Smart contract interaction
- NFT marketplaces
- DeFi applications

### Challenges and Opportunities
- User experience improvements
- Gas fee optimization
- Cross-chain compatibility
- Mainstream adoption

## 9. Sustainability in Web Development

### Green Web Development
- Carbon footprint reduction
- Optimized performance
- Efficient hosting
- Sustainable practices

### Tools and Metrics
- Website Carbon Calculator
- Core Web Vitals
- Performance budgets
- Green hosting providers

## 10. No-Code/Low-Code Platforms

### Democratizing Development
- Visual development tools
- Drag-and-drop interfaces
- Pre-built components
- Rapid prototyping

### Professional Integration
- Custom component libraries
- API integrations
- Advanced workflows
- Enterprise features

## Development Practices for 2024

### 1. Performance-First Approach
- Core Web Vitals optimization
- Image optimization
- Code splitting
- Lazy loading

### 2. Accessibility by Design
- WCAG compliance
- Screen reader support
- Keyboard navigation
- Color contrast

### 3. Security-First Development
- Supply chain security
- Regular dependency updates
- Secure coding practices
- Penetration testing

### 4. DevOps Integration
- CI/CD pipelines
- Infrastructure as Code
- Monitoring and logging
- Automated testing

## Skills to Develop in 2024

### Technical Skills
- TypeScript proficiency
- Cloud platform knowledge
- Performance optimization
- Security best practices

### Soft Skills
- Problem-solving
- Communication
- Continuous learning
- Team collaboration

## Tools and Technologies to Learn

### Frontend
- React/Vue/Svelte
- Next.js/Nuxt.js
- Tailwind CSS
- Headless CMS

### Backend
- Node.js/Deno
- Serverless functions
- GraphQL
- Database technologies

### DevOps
- Docker/Kubernetes
- AWS/Azure/GCP
- CI/CD tools
- Monitoring solutions

## Conclusion

The web development landscape in 2024 is more exciting than ever. From AI-powered tools to edge computing and sustainable development practices, developers have unprecedented opportunities to create amazing experiences.

Key takeaways for success:
- Stay updated with emerging technologies
- Focus on performance and user experience
- Prioritize security and accessibility
- Embrace continuous learning
- Build sustainable and scalable solutions

The future of web development is bright, and those who adapt to these trends will lead the industry forward. Start exploring these technologies today and prepare for an exciting journey ahead!`,
      excerpt: 'Explore the key trends shaping web development in 2024, from AI-powered tools to edge computing and sustainable development practices.',
      status: 'PUBLISHED',
      publishedAt: new Date('2024-01-05'),
      categories: ['technology', 'web-development']
    },
    {
      title: 'My Journey into Programming: From Beginner to Professional',
      slug: 'my-programming-journey-beginner-to-professional',
      content: `# My Journey into Programming: From Beginner to Professional

Programming has been one of the most rewarding journeys of my life. Looking back, I want to share my story of how I went from knowing nothing about code to becoming a professional developer.

## The Beginning: Complete Beginner

### First Encounter
My first encounter with programming was in college during a basic computer science course. I remember staring at the screen, completely confused by the syntax and logic. It seemed like a foreign language.

### The Spark
What changed everything was building my first "Hello, World!" program. That moment when the computer followed my instructions and displayed my message was magical. I was hooked.

## Early Struggles and Breakthroughs

### The Confusion Phase
- Syntax errors everywhere
- Logical thinking challenges
- Imposter syndrome
- Overwhelming amount of information

### First Breakthrough
My first real breakthrough came when I built a simple calculator. It took me weeks, but when it finally worked, I felt like I could conquer the world.

## Learning Path and Resources

### Online Courses
- Codecademy for interactive learning
- freeCodeCamp for comprehensive curriculum
- Coursera for structured university courses
- YouTube tutorials for specific problems

### Books That Shaped My Journey
- "Clean Code" by Robert C. Martin
- "The Pragmatic Programmer" by Hunt & Thomas
- "You Don't Know JS" by Kyle Simpson
- "Cracking the Coding Interview" by McDowell

### Practice Platforms
- LeetCode for algorithms
- HackerRank for problem-solving
- GitHub for version control
- CodePen for frontend experiments

## Building My First Projects

### Project 1: Personal Website
- HTML, CSS, and basic JavaScript
- Learned about responsive design
- Deployed using GitHub Pages
- First taste of real-world development

### Project 2: Todo Application
- Introduced to frameworks (React)
- State management concepts
- API integration
- Local storage implementation

### Project 3: E-commerce Site
- Full-stack development
- Database design
- User authentication
- Payment integration

## Professional Development

### First Job Search
- Building a portfolio
- Preparing for technical interviews
- Networking with other developers
- Contributing to open source

### Landing My First Job
The interview process was nerve-wracking, but all the practice paid off. I landed a junior developer position at a startup.

### On-the-Job Learning
- Working with senior developers
- Code reviews and feedback
- Agile development practices
- Production environment experience

## Key Lessons Learned

### 1. Consistency is Key
Programming is a skill that requires consistent practice. Even 30 minutes a day can make a huge difference over time.

### 2. Embrace the Struggle
Every developer faces challenges. The key is to embrace them as learning opportunities rather than obstacles.

### 3. Build Real Projects
Tutorials are great, but building real projects teaches you to solve actual problems and deal with unexpected issues.

### 4. Learn from Others
- Join developer communities
- Attend meetups and conferences
- Follow experienced developers on social media
- Participate in open source projects

### 5. Stay Curious
Technology evolves rapidly. Staying curious and continuously learning new things is essential for long-term success.

## Common Mistakes I Made

### 1. Tutorial Hell
I spent too much time watching tutorials without actually building anything. Practice is more important than passive consumption.

### 2. Not Learning Fundamentals
I jumped to frameworks too quickly without understanding the underlying concepts. This came back to haunt me later.

### 3. Comparing Myself to Others
Everyone learns at their own pace. Comparing yourself to others only leads to discouragement.

### 4. Not Asking for Help
I was afraid to ask questions, thinking it would make me look incompetent. In reality, asking good questions is a sign of wisdom.

## Advice for Aspiring Developers

### For Complete Beginners
1. Start with the basics (HTML, CSS, JavaScript)
2. Build simple projects
3. Don't rush through tutorials
4. Join a supportive community
5. Be patient with yourself

### For Intermediate Developers
1. Focus on one technology stack
2. Contribute to open source
3. Build a portfolio of projects
4. Practice algorithm problems
5. Start networking

### For Job Seekers
1. Build a strong portfolio
2. Practice technical interviews
3. Contribute to open source
4. Network with other developers
5. Be persistent and patient

## The Continuous Journey

### Current Focus Areas
- System design principles
- DevOps and cloud technologies
- Machine learning applications
- Leadership and mentoring

### Future Goals
- Contribute to major open source projects
- Speak at conferences
- Mentor junior developers
- Build products that make a difference

## Conclusion

My programming journey has been challenging, rewarding, and transformative. From struggling with basic syntax to building complex applications, every step has taught me something valuable.

The most important lesson I've learned is that programming is not just about writing code—it's about solving problems, continuous learning, and building things that matter.

If you're just starting your programming journey, remember:
- Everyone starts somewhere
- Progress is more important than perfection
- The community is incredibly supportive
- Your unique perspective is valuable

The programming world needs more diverse voices and creative solutions. Your journey might be different from mine, but the destination—becoming a skilled, confident developer—is absolutely achievable.

Keep coding, keep learning, and most importantly, keep building. The world needs what you have to offer!`,
      excerpt: 'A personal story of transformation from a complete programming beginner to a professional developer, sharing struggles, breakthroughs, and lessons learned.',
      status: 'PUBLISHED',
      publishedAt: new Date('2024-01-01'),
      categories: ['personal', 'programming']
    },
    {
      title: 'Advanced React Patterns for Scalable Applications',
      slug: 'advanced-react-patterns-scalable-applications',
      content: `# Advanced React Patterns for Scalable Applications

As React applications grow in complexity, it becomes crucial to implement advanced patterns that promote maintainability, reusability, and scalability. In this comprehensive guide, we'll explore essential React patterns that every developer should know.

## 1. Compound Components Pattern

### What are Compound Components?
Compound components work together to form a cohesive UI element, similar to HTML's \`<select>\` and \`<option>\` elements.

### Implementation Example
\`\`\`tsx
// Toggle compound component
const Toggle = ({ children, ...props }) => {
  const [on, setOn] = useState(false)
  
  return (
    <ToggleContext.Provider value={{ on, toggle: () => setOn(!on) }}>
      <div {...props}>{children}</div>
    </ToggleContext.Provider>
  )
}

const ToggleButton = ({ children, ...props }) => {
  const { on, toggle } = useContext(ToggleContext)
  return (
    <button onClick={toggle} {...props}>
      {children}
    </button>
  )
}

const ToggleContent = ({ children, ...props }) => {
  const { on } = useContext(ToggleContext)
  return on ? <div {...props}>{children}</div> : null
}

// Usage
<Toggle>
  <ToggleButton>Show/Hide</ToggleButton>
  <ToggleContent>
    <p>This content is toggleable!</p>
  </ToggleContent>
</Toggle>
\`\`\`

### Benefits
- Flexible and composable
- Clear separation of concerns
- Easy to extend and customize

## 2. Render Props Pattern

### Concept
Render props is a technique for sharing code between React components using a prop whose value is a function.

### Implementation
\`\`\`tsx
interface MouseTrackerProps {
  render: (mouse: { x: number; y: number }) => React.ReactNode
}

const MouseTracker: React.FC<MouseTrackerProps> = ({ render }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return <div>{render(mouse)}</div>
}

// Usage
<MouseTracker
  render={({ x, y }) => (
    <div>
      Mouse position: ({x}, {y})
    </div>
  )}
/>
\`\`\`

### When to Use
- When you need flexible component composition
- For cross-cutting concerns like data fetching
- When hooks aren't sufficient

## 3. Higher-Order Components (HOCs)

### Definition
HOCs are functions that take a component and return a new component with additional props or behavior.

### Implementation
\`\`\`tsx
interface WithLoadingProps {
  loading: boolean
}

function withLoading<T extends object>(
  Component: React.ComponentType<T>
): React.ComponentType<T & WithLoadingProps> {
  return function WithLoadingComponent(props: T & WithLoadingProps) {
    const { loading, ...restProps } = props
    
    if (loading) {
      return <div>Loading...</div>
    }
    
    return <Component {...(restProps as T)} />
  }
}

// Usage
const UserProfile = ({ user }: { user: User }) => (
  <div>{user.name}</div>
)

const UserProfileWithLoading = withLoading(UserProfile)

// In component
<UserProfileWithLoading user={user} loading={isLoading} />
\`\`\`

### Best Practices
- Use HOCs for cross-cutting concerns
- Prefer hooks for simple state logic
- Always forward refs when necessary
- Don't mutate the original component

## 4. Custom Hooks Pattern

### Creating Reusable Logic
Custom hooks allow you to extract component logic into reusable functions.

### Example: useLocalStorage Hook
\`\`\`tsx
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [storedValue, setValue]
}

// Usage
const [name, setName] = useLocalStorage('name', '')
\`\`\`

### Example: useAPI Hook
\`\`\`tsx
interface UseAPIResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

function useAPI<T>(url: string): UseAPIResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(url)
      if (!response.ok) throw new Error('Network response was not ok')
      const result = await response.json()
      setData(result)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

// Usage
const { data, loading, error, refetch } = useAPI<User[]>('/api/users')
\`\`\`

## 5. State Reducer Pattern

### Advanced State Management
The state reducer pattern provides more control over state updates, especially for complex state logic.

### Implementation
\`\`\`tsx
interface CounterState {
  count: number
  step: number
}

type CounterAction = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set_step'; step: number }
  | { type: 'reset' }

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step }
    case 'decrement':
      return { ...state, count: state.count - state.step }
    case 'set_step':
      return { ...state, step: action.step }
    case 'reset':
      return { count: 0, step: 1 }
    default:
      return state
  }
}

function useCounter(initialCount = 0) {
  const [state, dispatch] = useReducer(counterReducer, {
    count: initialCount,
    step: 1
  })

  const increment = () => dispatch({ type: 'increment' })
  const decrement = () => dispatch({ type: 'decrement' })
  const setStep = (step: number) => dispatch({ type: 'set_step', step })
  const reset = () => dispatch({ type: 'reset' })

  return { ...state, increment, decrement, setStep, reset }
}

// Usage
const { count, step, increment, decrement, setStep, reset } = useCounter(0)
\`\`\`

## 6. Context Provider Pattern

### Efficient State Sharing
Context providers allow sharing state across component trees without prop drilling.

### Implementation
\`\`\`tsx
interface User {
  id: string
  name: string
  email: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const logout = useCallback(() => {
    setUser(null)
    // Additional logout logic
  }, [])

  const value = useMemo(() => ({
    user,
    setUser,
    logout
  }), [user, logout])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
\`\`\`

### Optimization Tips
- Split contexts by concern
- Use multiple small contexts instead of one large one
- Memoize context values
- Consider using React Query or SWR for server state

## 7. Error Boundary Pattern

### Graceful Error Handling
Error boundaries catch JavaScript errors anywhere in their child component tree.

### Implementation
\`\`\`tsx
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Usage
<ErrorBoundary>
  <SomeComponent />
</ErrorBoundary>
\`\`\`

## 8. Controlled vs Uncontrolled Components

### Controlled Components
Components where React controls the form data.

\`\`\`tsx
const ControlledInput = () => {
  const [value, setValue] = useState('')

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
\`\`\`

### Uncontrolled Components
Components that maintain their own internal state.

\`\`\`tsx
const UncontrolledInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    console.log(inputRef.current?.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="Initial value" />
      <button type="submit">Submit</button>
    </form>
  )
}
\`\`\`

## Performance Optimization Patterns

### 1. Memoization
\`\`\`tsx
const ExpensiveComponent = React.memo<{ data: any[] }>(({ data }) => {
  const processedData = useMemo(() => {
    return data.filter(item => item.active).map(item => ({
      ...item,
      computed: heavyComputation(item)
    }))
  }, [data])

  return <div>{/* render processedData */}</div>
})
\`\`\`

### 2. Code Splitting
\`\`\`tsx
const LazyComponent = React.lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  )
}
\`\`\`

## Best Practices Summary

### 1. Choose the Right Pattern
- Use hooks for simple state logic
- Use HOCs for cross-cutting concerns
- Use render props for flexible composition
- Use context for global state

### 2. Performance Considerations
- Avoid unnecessary re-renders
- Use memoization wisely
- Split large components
- Implement code splitting

### 3. Code Organization
- Keep components focused and single-purpose
- Extract custom hooks for reusable logic
- Use TypeScript for better type safety
- Maintain consistent naming conventions

### 4. Testing
- Write unit tests for custom hooks
- Test component integration
- Mock external dependencies
- Use testing utilities like React Testing Library

## Conclusion

Advanced React patterns are essential tools for building scalable, maintainable applications. By understanding and applying these patterns appropriately, you can:

- Create more reusable components
- Improve code organization
- Enhance performance
- Simplify complex state management
- Build better developer experiences

Remember that not every pattern is suitable for every situation. Choose the right pattern based on your specific needs, team expertise, and project requirements. The goal is to write code that is not only functional but also maintainable and scalable for the long term.

Start implementing these patterns in your projects today, and you'll see immediate improvements in code quality and development experience!`,
      excerpt: 'Explore advanced React patterns including compound components, render props, HOCs, and custom hooks to build scalable applications.',
      status: 'DRAFT',
      publishedAt: null,
      categories: ['programming', 'react', 'web-development']
    }
  ]

  // Create posts with categories
  for (const postData of posts) {
    const { categories: categoryNames, ...post } = postData
    
    const createdPost = await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        ...post,
        authorId: admin.id,
      },
    })

    // Connect categories
    for (const categoryName of categoryNames) {
      const category = createdCategories.find(c => c.slug === categoryName)
      if (category) {
        await prisma.postCategory.upsert({
          where: {
            postId_categoryId: {
              postId: createdPost.id,
              categoryId: category.id
            }
          },
          update: {},
          create: {
            postId: createdPost.id,
            categoryId: category.id,
          },
        })
      }
    }
  }

  console.log('✅ Posts created:', posts.length)
  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })