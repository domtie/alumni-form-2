'use client';

import { cn } from '@/lib/utils';

interface StepConnectorProps {
  isCompleted: boolean;
}

export function StepConnector({ isCompleted }: StepConnectorProps) {
  return (
    <div className="w-full h-full">
      <div
        className={cn(
          'h-full transition-all duration-200',
          isCompleted ? 'bg-primary' : 'bg-muted'
        )}
        style={{ transform: 'translateX(-50%)' }}
      />
    </div>
  );
}