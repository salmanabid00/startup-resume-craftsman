
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TargetRole } from '@/types/FormData';

interface JobTargetFormProps {
  data: TargetRole;
  onChange: (data: TargetRole) => void;
}

const JobTargetForm: React.FC<JobTargetFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof TargetRole, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <Card className="border border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-slate-800">Target Role Information</CardTitle>
        <p className="text-sm text-slate-600">
          Provide details about the specific role you're applying for to generate a tailored cover letter
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="position" className="text-sm font-medium text-slate-700">
            Target Position *
          </Label>
          <Input
            id="position"
            value={data.position}
            onChange={(e) => handleChange('position', e.target.value)}
            placeholder="Senior Frontend Developer, Full Stack Engineer, Software Architect..."
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="company" className="text-sm font-medium text-slate-700">
            Target Company *
          </Label>
          <Input
            id="company"
            value={data.company}
            onChange={(e) => handleChange('company', e.target.value)}
            placeholder="Stripe, Airbnb, Notion, Linear..."
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="jobDescription" className="text-sm font-medium text-slate-700">
            Job Description (Optional but Recommended)
          </Label>
          <Textarea
            id="jobDescription"
            value={data.jobDescription}
            onChange={(e) => handleChange('jobDescription', e.target.value)}
            placeholder="Paste the job description here to generate a highly tailored cover letter that matches the specific requirements..."
            className="mt-1 min-h-[120px]"
          />
          <p className="text-xs text-slate-500 mt-1">
            Adding the job description will help generate a cover letter that specifically addresses the role's requirements
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobTargetForm;
