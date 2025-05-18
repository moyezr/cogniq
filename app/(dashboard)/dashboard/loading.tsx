import { Navbar } from "@/components/navbar"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="w-64 h-10 mb-2" />
          <Skeleton className="w-96 h-6" />
        </div>

        {/* Quiz Starter Section Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <Skeleton className="w-48 h-8 mb-4" />
            <Skeleton className="w-full h-6 mb-2" />
            <Skeleton className="w-3/4 h-6 mb-4" />
            <Skeleton className="w-32 h-10" />
          </div>
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
            <Skeleton className="w-48 h-8 mx-auto mb-2" />
            <Skeleton className="w-32 h-6 mx-auto" />
          </div>
        </div>

        {/* Recent Quizzes Section Skeleton */}
        <div className="mt-8">
          <Skeleton className="w-48 h-8 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <Skeleton className="w-full h-28 mb-3 rounded-md" />
                <Skeleton className="w-3/4 h-6 mb-2" />
                <Skeleton className="w-1/2 h-4 mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="w-16 h-6" />
                  <Skeleton className="w-24 h-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
