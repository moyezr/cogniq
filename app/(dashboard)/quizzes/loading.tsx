import { Navbar } from "@/components/navbar"
import { Skeleton } from "@/components/ui/skeleton"

export default function QuizzesLoading() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Quizzes Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="w-64 h-10 mb-2" />
          <Skeleton className="w-96 h-6" />
        </div>
        
        {/* Search and Filter Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <Skeleton className="w-full md:w-80 h-10 rounded-md" />
          <div className="flex space-x-3">
            <Skeleton className="w-28 h-10 rounded-md" />
            <Skeleton className="w-28 h-10 rounded-md" />
          </div>
        </div>
        
        {/* Quiz List Skeleton */}
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-slate-900 p-5 rounded-lg border border-slate-800 flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <Skeleton className="w-3/4 h-7 mb-2" />
                <Skeleton className="w-1/2 h-5 mb-4" />
                <div className="flex space-x-3">
                  <Skeleton className="w-24 h-6 rounded-full" />
                  <Skeleton className="w-24 h-6 rounded-full" />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="text-center">
                  <Skeleton className="w-16 h-16 rounded-full mx-auto mb-1" />
                  <Skeleton className="w-20 h-5" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-28 h-9 rounded-md" />
                  <Skeleton className="w-28 h-9 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
