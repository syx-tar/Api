import { ArrowRight, BookOpen, Calendar, Tag, Search } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Suspense } from 'react'

async function getPosts(searchQuery?: string, categoryId?: string) {
  try {
    const where: any = {
      status: 'PUBLISHED'
    }

    if (searchQuery) {
      where.OR = [
        { title: { contains: searchQuery } },
        { content: { contains: searchQuery } },
        { excerpt: { contains: searchQuery } }
      ]
    }

    if (categoryId) {
      where.categories = {
        some: {
          categoryId: categoryId
        }
      }
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy: {
        publishedAt: 'desc'
      },
      include: {
        author: {
          select: {
            name: true,
            username: true
          }
        },
        categories: {
          include: {
            category: true
          }
        }
      }
    })

    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      },
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    })
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

function PostCard({ post }: { post: any }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-md transition-all duration-200">
      {post.featuredImage && (
        <div className="aspect-video overflow-hidden">
          <img
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
            src={post.featuredImage}
            alt={post.title}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 mb-3">
          {post.categories.map((postCategory: any) => (
            <span
              key={postCategory.category.id}
              className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {postCategory.category.name}
            </span>
          ))}
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="mt-3 text-muted-foreground line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {Math.ceil(post.content.length / 1000)} min read
            </div>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Read more <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  )
}

function BlogSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted h-48 rounded-t-lg"></div>
            <div className="bg-card p-6 rounded-b-lg border border-t-0">
              <div className="h-4 bg-muted rounded w-20 mb-3"></div>
              <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string }
}) {
  const posts = await getPosts(searchParams.search, searchParams.category)
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Blog Posts
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore articles about technology, programming, and personal insights
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !searchParams.category 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All Posts
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog?category=${category.id}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  searchParams.category === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category.name} ({category._count.posts})
              </Link>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <Suspense fallback={<BlogSkeleton />}>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No posts found</h3>
              <p className="mt-2 text-muted-foreground">
                {searchParams.search || searchParams.category
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Check back later for new content!'}
              </p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  )
}