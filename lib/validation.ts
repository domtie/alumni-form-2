import * as z from 'zod';

export const basicInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

export const involvementTypeSchema = z.object({
  involvementType: z.enum(['uk', 'basislehrjahr', 'lehrling', 'angestellter']),
});

export const conditionalInfoSchema = z.object({
  location: z.enum(['Zürich', 'Zug']),
  ukCourses: z.array(z.enum(['üK 100', 'üK 101', 'üK 102', 'üK 103'])).optional(),
  ukStartDate: z.date().optional(),
  ukEndDate: z.date().optional(),
  startYear: z.number().min(2014).max(2028).optional(),
  endYear: z.number().min(2014).max(2028).optional(),
  apprenticeship: z
    .enum(['Software Engineer', 'Graphic Design', 'Platform Engineer'])
    .optional(),
  specialization: z.enum(['Cyber Security', 'None']).optional(),
});