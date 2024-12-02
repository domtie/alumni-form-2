'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { InvolvementType } from '@/lib/types';
import { Building2, GraduationCap, School, Users } from 'lucide-react';

interface InvolvementTypeStepProps {
  onNext: (type: InvolvementType) => void;
  onBack: () => void;
  defaultValue?: InvolvementType;
}

const involvementTypes = [
  {
    id: 'uk' as const,
    label: 'üK',
    icon: School,
    description: 'Überbetriebliche Kurse',
  },
  {
    id: 'basislehrjahr' as const,
    label: 'Basislehrjahr',
    icon: GraduationCap,
    description: 'Grundausbildung im ersten Lehrjahr',
  },
  {
    id: 'lehrling' as const,
    label: 'Lehrling (eigener)',
    icon: Users,
    description: 'Betriebliche Ausbildung',
  },
  {
    id: 'angestellter' as const,
    label: 'Angestellter',
    icon: Building2,
    description: 'Festangestellter Mitarbeiter',
  },
];

export function InvolvementTypeStep({
  onNext,
  onBack,
  defaultValue,
}: InvolvementTypeStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {involvementTypes.map((type) => (
          <Card
            key={type.id}
            className={cn(
              'p-6 cursor-pointer transition-all hover:scale-105',
              defaultValue === type.id && 'ring-2 ring-primary'
            )}
            onClick={() => onNext(type.id)}
          >
            <div className="flex items-center space-x-4">
              <type.icon className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">{type.label}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-start">
        <Button variant="outline" onClick={onBack}>
          Zurück
        </Button>
      </div>
    </div>
  );
}