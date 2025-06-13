
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PersonalInfo } from '@/types/FormData';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">
            Full Name *
          </Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john.doe@example.com"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
            Phone Number *
          </Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="location" className="text-sm font-medium text-slate-700">
            Location *
          </Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="linkedIn" className="text-sm font-medium text-slate-700">
            LinkedIn Profile
          </Label>
          <Input
            id="linkedIn"
            value={data.linkedIn}
            onChange={(e) => handleChange('linkedIn', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="github" className="text-sm font-medium text-slate-700">
            GitHub Profile *
          </Label>
          <Input
            id="github"
            value={data.github}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="github.com/johndoe"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="portfolio" className="text-sm font-medium text-slate-700">
            Portfolio Website
          </Label>
          <Input
            id="portfolio"
            value={data.portfolio}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            placeholder="johndoe.dev"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
