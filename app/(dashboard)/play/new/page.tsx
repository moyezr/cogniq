import QuizCreationForm from "@/components/quiz-creation-form";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

export const metadata = {
  title: "Create Quiz | QuizWiz",
};
const QuizPage = async (props: Props) => {
  return (
    <main className="pt-8 flex flex-col gap-8 justify-center items-center min-h-[60vh]">
      <div className="w-full sm:w-[70%] md:w-[40%] lg:w-[40%]">
        <div className="bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-800">
          {/* Form Title Skeleton */}
          <Skeleton className="w-48 h-8 mx-auto mb-6" />

          {/* Topic Field Skeleton */}
          <div className="mb-6">
            <Skeleton className="w-24 h-5 mb-2" />
            <Skeleton className="w-full h-10 rounded-md" />
          </div>


          {/* Number of Questions Skeleton */}
          <div className="mb-6">
            <Skeleton className="w-48 h-5 mb-2" />
            <Skeleton className="w-full h-10 rounded-md" />
          </div>


          {/* Submit Button Skeleton */}
          <Skeleton className="w-full h-12 rounded-md mt-6" />
        </div>
      </div>
    </main>
  );
};

export default QuizPage;
