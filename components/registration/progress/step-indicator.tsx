'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RegistrationStep } from '@/lib/types';

interface StepIndicatorProps {
  step: RegistrationStep;
  isActive: boolean;
  isCompleted: boolean;
}

export function StepIndicator({ step, isActive, isCompleted }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center relative">
      {/* Step Circle */}
      <div
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center border-2 bg-background transition-all duration-200',
          isCompleted && 'bg-primary border-primary',
          isActive && 'border-primary',
          !isCompleted && !isActive && 'border-muted'
        )}
      >
        {isCompleted ? (
          <Check className="h-4 w-4 text-primary-foreground" />
        ) : (
          <span
            className={cn(
              'text-sm font-medium',
              isActive ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {step.id}
          </span>
        )}
      </div>

      {/* Step Text */}
      <div className="mt-2 text-center">
        <span
          className={cn(
            'text-sm font-medium block',
            isActive && 'text-primary',
            isCompleted && 'text-primary',
            !isActive && !isCompleted && 'text-muted-foreground'
          )}
        >
          {step.title}
        </span>
        <span className="text-xs text-muted-foreground block">
          {step.description}
        </span>
      </div>
    </div>
  );
}