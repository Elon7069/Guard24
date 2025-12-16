import { FeedbackViewer } from '@/components/feedback/FeedbackViewer'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { BackgroundScene3D } from '@/components/ui/BackgroundScene3D'

export default function Home() {
  return (
    <>
      <BackgroundScene3D />
      <main className="min-h-screen bg-background transition-theme py-8 relative z-10">
      <div className="w-full max-w-5xl mx-auto px-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <span className="px-4 py-2 bg-primary/10 text-primary text-lg font-bold rounded-lg border border-primary/20">
            Gauz24
          </span>
          <ThemeToggle />
        </div>
      </div>
      <FeedbackViewer />
    </main>
    </>
  )
}