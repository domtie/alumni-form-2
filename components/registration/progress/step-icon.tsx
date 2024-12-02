'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIconProps {
  step: number;
  currentStep: number;
}

export function StepIcon({ step, currentStep }: StepIconProps) {
  const isCompleted = step < currentStep;
  const isCurrent = step === currentStep;

  return (
    <div
      className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-200',
        isCompleted && 'bg-primary border-primary',
        isCurrent && 'border-primary',
        !isCompleted && !isCurrent && 'border-muted'
      )}
    >
      {isCompleted ? (
        <Check className="h-4 w-4 text-primary-foreground" />
      ) : (
        <span
          className={cn(
            'text-sm font-medium',
            isCurrent ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {step}
        </span>
      )}
    </div>
  );
}