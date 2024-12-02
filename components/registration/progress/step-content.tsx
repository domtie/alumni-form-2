'use client';

import { cn } from '@/lib/utils';
import type { RegistrationStep } from '@/lib/types';

interface StepContentProps extends RegistrationStep {
  isActive: boolean;
  isCompleted: boolean;
}

export function StepContent({
  title,
  description,
  isActive,
  isCompleted,
}: StepContentProps) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={cn(
          'text-sm font-medium transition-colors text-center',
          isActive && 'text-primary',
          isCompleted && 'text-primary',
          !isActive && !isCompleted && 'text-muted-foreground'
        )}
      >
        {title}
      </span>
      <span className="text-xs text-muted-foreground text-center">{description}</span>
    </div>
  );
}