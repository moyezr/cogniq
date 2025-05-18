import { Navbar } from "@/components/navbar"
import { Skeleton } from "@/components/ui/skeleton"

export default function PlayQuizLoading() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Quiz Title Skeleton */}
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="w-80 h-10" />
          <Skeleton className="w-24 h-8 rounded-md" />
        </div>
        
        {/* Quiz Progress Skeleton */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <Skeleton className="w-48 h-6" />
            <Skeleton className="w-24 h-6" />
          </div>
          <Skeleton className="w-full h-2 rounded-full" />
        </div>
        
        {/* Question Card Skeleton */}
        <div className="bg-slate-900 p-6 rounded-lg shadow-lg mb-6 border border-slate-800">
          <Skeleton className="w-full h-8 mb-4" />
          <Skeleton className="w-full h-24 mb-6 rounded-md" />
          
          {/* Options Skeleton */}
          <div className="space-y-4 mt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center p-3 border border-slate-700 rounded-md">
                <Skeleton className="w-6 h-6 rounded-full mr-3" />
                <Skeleton className="w-full h-6" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Actions Skeleton */}
        <div className="flex justify-between items-center">
          <Skeleton className="w-28 h-10 rounded-md" />
          <Skeleton className="w-28 h-10 rounded-md" />
        </div>
      </div>
    </div>
  )
}
