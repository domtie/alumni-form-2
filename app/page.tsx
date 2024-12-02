'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ProgressTracker } from '@/components/registration/progress-tracker';
import { BasicInfoStep } from '@/components/registration/basic-info-step';
import { InvolvementTypeStep } from '@/components/registration/involvement-type-step';
import { ConditionalInfoStep } from '@/components/registration/conditional-info-step';
import type { InvolvementType, RegistrationData, RegistrationStep } from '@/lib/types';

const registrationSteps: RegistrationStep[] = [
  {
    id: 1,
    title: 'Basic Info',
    description: 'Your personal details',
  },
  {
    id: 2,
    title: 'Involvement',
    description: 'Type of involvement',
  },
  {
    id: 3,
    title: 'Details',
    description: 'Additional information',
  },
];

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegistrationData>>({});

  const handleBasicInfoSubmit = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleInvolvementTypeSelect = (type: InvolvementType) => {
    setFormData((prev) => ({ ...prev, involvementType: type }));
    setStep(3);
  };

  const handleFinalSubmit = (data: any) => {
    const finalData = { ...formData, ...data };
    console.log('Final form data:', finalData);
    // Here you would typically send the data to your backend
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Registration</h1>
          <p className="text-muted-foreground mt-2">
            Create your account in just a few steps
          </p>
        </div>

        <ProgressTracker currentStep={step} steps={registrationSteps} />

        {step === 1 && (
          <BasicInfoStep onNext={handleBasicInfoSubmit} defaultValues={formData} />
        )}

        {step === 2 && (
          <InvolvementTypeStep
              onNext={handleInvolvementTypeSelect}
              defaultValue={formData.involvementType ?? undefined}
              onBack={handleBack}
          />
        )}

        {step === 3 && formData.involvementType && (
          <ConditionalInfoStep
            involvementType={formData.involvementType}
            onSubmit={handleFinalSubmit}
            onBack={handleBack}
            defaultValues={formData}
          />
        )}
      </Card>
    </div>
  );
}
