import { ArrowRight, BookOpen, Calendar, Eye, Heart } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getRecentPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        status: 'PUBLISHED'
      },
      take: 3,
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

export default async function HomePage() {
  const recentPosts = await getRecentPosts()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Welcome to My
              <span className="text-primary"> Personal Blog</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Sharing thoughts, experiences, and insights on technology, life, and everything in between. 
              Join me on this journey of discovery and learning.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/blog"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                Start Reading <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
              >
                Learn more about me <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Latest Posts
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover the most recent articles and insights
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow"
                >
                  {post.featuredImage && (
                    <div className="flex-shrink-0">
                      <img
                        className="h-48 w-full object-cover"
                        src={post.featuredImage}
                        alt={post.title}
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        {post.categories.map((postCategory) => (
                          <span
                            key={postCategory.category.id}
                            className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                          >
                            {postCategory.category.name}
                          </span>
                        ))}
                      </div>
                      <Link href={`/blog/${post.slug}`} className="block">
                        <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="mt-3 text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          5 min read
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
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">No posts yet</h3>
                <p className="mt-2 text-muted-foreground">
                  Check back later for new content!
                </p>
              </div>
            )}
          </div>
          
          {recentPosts.length > 0 && (
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm hover:bg-muted transition-colors"
              >
                View All Posts <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/30 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Join the Community
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Be part of a growing community of readers and learners
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 sm:max-w-none sm:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <dt className="mt-4 text-sm font-medium text-muted-foreground">Total Views</dt>
              <dd className="mt-1 text-3xl font-bold tracking-tight text-foreground">10,000+</dd>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <dt className="mt-4 text-sm font-medium text-muted-foreground">Articles Published</dt>
              <dd className="mt-1 text-3xl font-bold tracking-tight text-foreground">50+</dd>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <dt className="mt-4 text-sm font-medium text-muted-foreground">Happy Readers</dt>
              <dd className="mt-1 text-3xl font-bold tracking-tight text-foreground">1,000+</dd>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
