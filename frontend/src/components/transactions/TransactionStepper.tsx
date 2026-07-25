interface TransactionStepperProps {
  steps: string[];
  currentStep: number;
}

export default function TransactionStepper({
  steps,
  currentStep,
}: TransactionStepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const completed = index < currentStep;
          const active = index === currentStep;

          return (
            <div key={step} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-full
                    border-2
                    text-sm
                    font-bold
                    transition-all
                    duration-300

                    ${
                      completed
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : active
                          ? "border-indigo-600 bg-indigo-600 text-white scale-110"
                          : "border-slate-300 bg-white text-slate-500"
                    }
                  `}
                >
                  {completed ? "✓" : index + 1}
                </div>

                <p
                  className={`
                    mt-3
                    text-sm
                    font-medium
                    transition

                    ${
                      active
                        ? "text-indigo-600"
                        : completed
                          ? "text-emerald-600"
                          : "text-slate-400"
                    }
                  `}
                >
                  {step}
                </p>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`
                    mx-3
                    h-1
                    flex-1
                    rounded-full
                    transition-all
                    duration-500

                    ${completed ? "bg-emerald-500" : "bg-slate-200"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
