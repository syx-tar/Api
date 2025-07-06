import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import { ArrowRight, Calendar } from "lucide-react"
import { PostWithAuthor } from "@/types"

async function getPosts() {
  return await prisma.post.findMany({
    where: {
      published: true
    },
    include: {
      author: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Personal Blog</h1>
            <p className="text-slate-600">Thoughts, stories and ideas</p>
          </div>
          <Link 
            href="/admin"
            className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Admin
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">No posts yet</h2>
            <p className="text-slate-600 mb-8">Be the first to write something amazing!</p>
            <Link 
              href="/admin"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post: any) => (
              <article 
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.createdAt)}
                    </div>
                    {post.author.name && (
                      <>
                        <span>•</span>
                        <span>By {post.author.name}</span>
                      </>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors">
                    <Link href={`/posts/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  {post.excerpt && (
                    <p className="text-slate-600 mb-4 text-lg leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <Link 
                    href={`/posts/${post.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-slate-600">
          <p>&copy; 2024 Personal Blog. Built with Next.js and Prisma.</p>
        </div>
      </footer>
    </div>
  )
}
