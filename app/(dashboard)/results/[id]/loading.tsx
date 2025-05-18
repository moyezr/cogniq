import { Navbar } from "@/components/navbar"
import { Skeleton } from "@/components/ui/skeleton"

export default function ResultsLoading() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          {/* Results Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="w-72 h-10 mb-4" />
            <div className="flex space-x-4">
              <Skeleton className="w-32 h-9 rounded-md" />
              <Skeleton className="w-32 h-9 rounded-md" />
            </div>
          </div>
          
          {/* Results Summary Skeleton */}
          <div className="bg-slate-900 p-6 rounded-lg mb-8 border border-slate-800">
            <div className="text-center mb-6">
              <Skeleton className="w-40 h-8 mx-auto mb-2" />
              <Skeleton className="w-60 h-6 mx-auto" />
            </div>
            
            <div className="flex justify-center items-center mb-6">
              <div className="relative">
                <Skeleton className="w-36 h-36 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="w-20 h-10" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-2" />
                <Skeleton className="w-24 h-5 mx-auto" />
              </div>
              <div className="text-center">
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-2" />
                <Skeleton className="w-24 h-5 mx-auto" />
              </div>
              <div className="text-center">
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-2" />
                <Skeleton className="w-24 h-5 mx-auto" />
              </div>
            </div>
          </div>
          
          {/* Question Review Skeleton */}
          <div>
            <Skeleton className="w-64 h-8 mb-6" />
            
            {/* Questions */}
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-slate-900 p-5 rounded-lg border border-slate-800">
                  <div className="flex justify-between mb-3">
                    <Skeleton className="w-32 h-6" />
                    <Skeleton className="w-24 h-6 rounded-full" />
                  </div>
                  
                  <Skeleton className="w-full h-8 mb-4" />
                  
                  <div className="space-y-3 mt-4">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="flex items-center border border-slate-700 p-3 rounded-md">
                        <Skeleton className="w-6 h-6 rounded-full mr-3" />
                        <Skeleton className="w-full h-6" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 border border-slate-700 rounded-md">
                    <Skeleton className="w-32 h-5 mb-2" />
                    <Skeleton className="w-full h-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
