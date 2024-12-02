'use client';

import { StepIndicator } from './progress/step-indicator';
import type { RegistrationStep } from '@/lib/types';

interface ProgressTrackerProps {
  currentStep: number;
  steps: RegistrationStep[];
}

export function ProgressTracker({ currentStep, steps }: ProgressTrackerProps) {
  return (
    <div className="w-full mb-8">
      <div className="relative flex justify-between">
        {/* Progress Line */}
        <div className="absolute top-4 left-0 right-0 h-[2px] bg-muted -z-1" />
        <div 
          className="absolute top-4 left-0 h-[2px] bg-primary transition-all duration-300 -z-1"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* Step Indicators */}
        {steps.map((step) => (
          <StepIndicator
            key={step.id}
            step={step}
            isActive={currentStep === step.id}
            isCompleted={currentStep > step.id}
          />
        ))}
      </div>
    </div>
  );
}