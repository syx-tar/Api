'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { 
  BookOpen, 
  Users, 
  Eye, 
  TrendingUp, 
  PlusCircle, 
  Edit3,
  Calendar,
  Tag
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalCategories: number
  totalViews: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/login')
      return
    }

    // Fetch dashboard stats
    fetchDashboardStats()
  }, [session, status, router])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {session.user.name || session.user.email}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your blog today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link
            href="/admin/posts/new"
            className="flex items-center justify-center p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
          >
            <div className="text-center">
              <PlusCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">New Post</p>
            </div>
          </Link>
          
          <Link
            href="/admin/posts"
            className="flex items-center justify-center p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
          >
            <div className="text-center">
              <Edit3 className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Manage Posts</p>
            </div>
          </Link>
          
          <Link
            href="/admin/categories"
            className="flex items-center justify-center p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
          >
            <div className="text-center">
              <Tag className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Categories</p>
            </div>
          </Link>
          
          <Link
            href="/blog"
            className="flex items-center justify-center p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
          >
            <div className="text-center">
              <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">View Blog</p>
            </div>
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                <p className="text-2xl font-bold text-foreground">{stats?.totalPosts || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-foreground">{stats?.publishedPosts || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center">
              <Edit3 className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold text-foreground">{stats?.draftPosts || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold text-foreground">{stats?.totalViews || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Posts</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">Getting Started with Next.js</p>
                  <p className="text-xs text-muted-foreground">Draft • 2 hours ago</p>
                </div>
                <Link
                  href="/admin/posts/1"
                  className="text-primary hover:text-primary/80 text-sm"
                >
                  Edit
                </Link>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">Building a Modern Blog</p>
                  <p className="text-xs text-muted-foreground">Published • 1 day ago</p>
                </div>
                <Link
                  href="/admin/posts/2"
                  className="text-primary hover:text-primary/80 text-sm"
                >
                  Edit
                </Link>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">CSS Grid vs Flexbox</p>
                  <p className="text-xs text-muted-foreground">Published • 3 days ago</p>
                </div>
                <Link
                  href="/admin/posts/3"
                  className="text-primary hover:text-primary/80 text-sm"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Categories</span>
                <span className="text-sm font-medium text-foreground">{stats?.totalCategories || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Month's Posts</span>
                <span className="text-sm font-medium text-foreground">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Views per Post</span>
                <span className="text-sm font-medium text-foreground">127</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Most Popular Category</span>
                <span className="text-sm font-medium text-foreground">Technology</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}