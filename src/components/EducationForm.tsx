
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Education } from '@/types/FormData';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      achievements: ['']
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const updated = data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange(updated);
  };

  const deleteEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  const addAchievement = (id: string) => {
    const updated = data.map(edu => 
      edu.id === id ? { ...edu, achievements: [...edu.achievements, ''] } : edu
    );
    onChange(updated);
  };

  const updateAchievement = (id: string, index: number, value: string) => {
    const updated = data.map(edu => {
      if (edu.id === id) {
        const newAchievements = [...edu.achievements];
        newAchievements[index] = value;
        return { ...edu, achievements: newAchievements };
      }
      return edu;
    });
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-slate-800">Education</h3>
        <Button onClick={addEducation} size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {data.map((education) => (
        <Card key={education.id} className="border border-slate-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-700">Education Entry</CardTitle>
              <Button
                onClick={() => deleteEducation(education.id)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">Institution *</Label>
              <Input
                value={education.institution}
                onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                placeholder="Stanford University, MIT, UC Berkeley..."
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">Degree *</Label>
                <Input
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                  placeholder="Bachelor's, Master's, PhD..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">Field of Study *</Label>
                <Input
                  value={education.field}
                  onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                  placeholder="Computer Science, Software Engineering..."
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">Start Date *</Label>
                <Input
                  type="month"
                  value={education.startDate}
                  onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">End Date *</Label>
                <Input
                  type="month"
                  value={education.endDate}
                  onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">GPA (Optional)</Label>
                <Input
                  value={education.gpa || ''}
                  onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-slate-700">Achievements & Coursework</Label>
                <Button
                  onClick={() => addAchievement(education.id)}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              {education.achievements.map((achievement, index) => (
                <Textarea
                  key={index}
                  value={achievement}
                  onChange={(e) => updateAchievement(education.id, index, e.target.value)}
                  placeholder="• Graduated Magna Cum Laude, Dean's List, relevant coursework..."
                  className="mt-2 min-h-[60px]"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EducationForm;
