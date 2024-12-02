'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { conditionalInfoSchema } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { InvolvementType } from '@/lib/types';

interface ConditionalInfoStepProps {
  involvementType: InvolvementType;
  onSubmit: (data: any) => void;
  onBack: () => void;
  defaultValues?: any;
}

const ukCourses = ['üK 100', 'üK 101', 'üK 102', 'üK 103'];
const locations = ['Zürich', 'Zug'];
const apprenticeships = ['Software Engineer', 'Graphic Design', 'Platform Engineer'];
const specializations = ['Cyber Security', 'None'];

export function ConditionalInfoStep({
  involvementType,
  onSubmit,
  onBack,
  defaultValues,
}: ConditionalInfoStepProps) {
  const initialValues = {
    location: '',
    ukCourses: [],
    ukStartDate: undefined,
    ukEndDate: undefined,
    startYear: 2024,
    endYear: 2025,
    apprenticeship: '',
    specialization: 'None',
    ...defaultValues,
  };

  const form = useForm({
    resolver: zodResolver(conditionalInfoSchema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {involvementType === 'uk' && (
          <>
            <FormField
              control={form.control}
              name="ukCourses"
              render={() => (
                <FormItem>
                  <FormLabel>üK Courses</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    {ukCourses.map((course) => (
                      <FormField
                        key={course}
                        control={form.control}
                        name="ukCourses"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(course)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, course]);
                                  } else {
                                    field.onChange(
                                      value.filter((v: string) => v !== course)
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{course}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ukStartDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className="w-full">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ukEndDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className="w-full">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        {['basislehrjahr', 'lehrling', 'angestellter'].includes(involvementType) && (
          <FormItem>
            <FormLabel>Duration</FormLabel>
            <div className="space-y-4">
              <div className="px-2">
                <div className="relative pt-6">
                  <Slider
                    value={[form.watch('startYear') || 2024, form.watch('endYear') || 2025]}
                    min={2014}
                    max={2028}
                    step={1}
                    onValueChange={([start, end]) => {
                      form.setValue('startYear', start);
                      form.setValue('endYear', end);
                    }}
                    className="z-10"
                  />
                  <div className="absolute -top-2 left-0 w-full flex justify-between">
                    <div className="w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs">
                      {form.watch('startYear') || 2024}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs">
                      {form.watch('endYear') || 2025}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FormItem>
        )}

        {['basislehrjahr', 'lehrling'].includes(involvementType) && (
          <>
            <FormField
              control={form.control}
              name="apprenticeship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apprenticeship</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select apprenticeship" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {apprenticeships.map((apprenticeship) => (
                        <SelectItem key={apprenticeship} value={apprenticeship}>
                          {apprenticeship}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialization</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {specializations.map((specialization) => (
                        <SelectItem key={specialization} value={specialization}>
                          {specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="flex justify-between space-x-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Zurück
          </Button>
          <Button type="submit" className="flex-1">
            {involvementType === 'uk' ? 'Weiter' : 'Registrieren'}
          </Button>
        </div>
      </form>
    </Form>
  );
}