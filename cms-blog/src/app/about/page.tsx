import { User, MapPin, Calendar, Code, Heart, Briefcase } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
            <User className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Hi, I'm Alex
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Full-stack developer passionate about creating beautiful, functional web applications 
            and sharing knowledge with the developer community.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-lg border bg-card">
            <Code className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">5+ Years</h3>
            <p className="text-muted-foreground">Development Experience</p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <Briefcase className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">50+ Projects</h3>
            <p className="text-muted-foreground">Completed Successfully</p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">10K+ Readers</h3>
            <p className="text-muted-foreground">Blog Followers</p>
          </div>
        </div>

        {/* About Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <h2>My Story</h2>
            <p>
              My journey into programming began during my college years when I first encountered 
              the magic of turning ideas into interactive digital experiences. What started as 
              curiosity quickly became a passion that has shaped my career and life.
            </p>
            
            <p>
              Over the past five years, I've had the privilege of working with amazing teams 
              and clients, building everything from simple landing pages to complex web applications. 
              My expertise spans across modern JavaScript frameworks, cloud technologies, and 
              everything in between.
            </p>

            <h2>What I Do</h2>
            <p>
              As a full-stack developer, I specialize in:
            </p>
            <ul>
              <li><strong>Frontend Development:</strong> React, Next.js, TypeScript, Tailwind CSS</li>
              <li><strong>Backend Development:</strong> Node.js, Express, PostgreSQL, MySQL</li>
              <li><strong>Cloud & DevOps:</strong> AWS, Vercel, Docker, CI/CD</li>
              <li><strong>Mobile Development:</strong> React Native, Progressive Web Apps</li>
            </ul>

            <h2>Why I Blog</h2>
            <p>
              Writing has become an integral part of my learning process. Through this blog, 
              I share insights, tutorials, and lessons learned from real-world projects. 
              My goal is to help other developers avoid common pitfalls and accelerate 
              their learning journey.
            </p>

            <p>
              Whether you're a beginner taking your first steps in programming or an 
              experienced developer looking to stay updated with the latest trends, 
              I hope you'll find something valuable in my articles.
            </p>

            <h2>Beyond Code</h2>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing 
              to open source projects, or enjoying outdoor activities. I believe in maintaining 
              a healthy work-life balance and continuous learning.
            </p>

            <p>
              I'm always excited to connect with fellow developers and discuss interesting 
              projects or ideas. Feel free to reach out if you'd like to collaborate or 
              just chat about technology!
            </p>
          </div>

          {/* Contact Info */}
          <div className="mt-16 p-8 rounded-lg border bg-card">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Let's Connect
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Available for freelance work</span>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a 
                href="mailto:alex@example.com"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get in Touch
              </a>
              <a 
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors"
              >
                Contact Form
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}