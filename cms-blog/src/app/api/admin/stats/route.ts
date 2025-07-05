import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch dashboard statistics
    const [totalPosts, publishedPosts, draftPosts, totalCategories] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: 'PUBLISHED' } }),
      prisma.post.count({ where: { status: 'DRAFT' } }),
      prisma.category.count(),
    ])

    const stats = {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalCategories,
      totalViews: Math.floor(Math.random() * 10000) + 1000, // Mock data for now
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}