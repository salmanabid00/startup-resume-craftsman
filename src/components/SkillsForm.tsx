
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { TechnicalSkills } from '@/types/FormData';

interface SkillsFormProps {
  technicalSkills: TechnicalSkills;
  softSkills: string[];
  onChange: (technical: TechnicalSkills, soft: string[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ technicalSkills, softSkills, onChange }) => {
  const handleTechnicalSkillChange = (category: keyof TechnicalSkills, value: string) => {
    const skills = value.split(',').map(skill => skill.trim()).filter(Boolean);
    onChange({
      ...technicalSkills,
      [category]: skills
    }, softSkills);
  };

  const handleSoftSkillChange = (value: string) => {
    const skills = value.split(',').map(skill => skill.trim()).filter(Boolean);
    onChange(technicalSkills, skills);
  };

  const removeSkill = (category: keyof TechnicalSkills, skillToRemove: string) => {
    const updatedSkills = technicalSkills[category].filter(skill => skill !== skillToRemove);
    onChange({
      ...technicalSkills,
      [category]: updatedSkills
    }, softSkills);
  };

  const removeSoftSkill = (skillToRemove: string) => {
    const updatedSkills = softSkills.filter(skill => skill !== skillToRemove);
    onChange(technicalSkills, updatedSkills);
  };

  const skillCategories = [
    {
      key: 'programmingLanguages' as keyof TechnicalSkills,
      label: 'Programming Languages',
      placeholder: 'JavaScript, TypeScript, Python, Java, Go, Rust...'
    },
    {
      key: 'frameworks' as keyof TechnicalSkills,
      label: 'Frameworks & Libraries',
      placeholder: 'React, Vue, Angular, Node.js, Express, Django...'
    },
    {
      key: 'tools' as keyof TechnicalSkills,
      label: 'Development Tools',
      placeholder: 'Git, Docker, Kubernetes, Jenkins, Webpack...'
    },
    {
      key: 'databases' as keyof TechnicalSkills,
      label: 'Databases',
      placeholder: 'PostgreSQL, MongoDB, Redis, MySQL, DynamoDB...'
    },
    {
      key: 'cloudPlatforms' as keyof TechnicalSkills,
      label: 'Cloud Platforms',
      placeholder: 'AWS, Google Cloud, Azure, Vercel, Netlify...'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-800">Technical Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {skillCategories.map(({ key, label, placeholder }) => (
            <div key={key}>
              <Label className="text-sm font-medium text-slate-700">{label} *</Label>
              <Input
                value={technicalSkills[key].join(', ')}
                onChange={(e) => handleTechnicalSkillChange(key, e.target.value)}
                placeholder={placeholder}
                className="mt-1"
              />
              {technicalSkills[key].length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {technicalSkills[key].map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-800">
                      {skill}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-2 hover:bg-transparent"
                        onClick={() => removeSkill(key, skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-800">Soft Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label className="text-sm font-medium text-slate-700">Soft Skills *</Label>
            <Input
              value={softSkills.join(', ')}
              onChange={(e) => handleSoftSkillChange(e.target.value)}
              placeholder="Leadership, Communication, Problem Solving, Adaptability, Team Collaboration..."
              className="mt-1"
            />
            {softSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {softSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-green-100 text-green-800">
                    {skill}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-2 hover:bg-transparent"
                      onClick={() => removeSoftSkill(skill)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsForm;
