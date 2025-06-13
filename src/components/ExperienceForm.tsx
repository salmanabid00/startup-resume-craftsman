
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Briefcase, Code } from 'lucide-react';
import { Experience, Project } from '@/types/FormData';

interface ExperienceFormProps {
  data: Experience[];
  projects: Project[];
  onChange: (experience: Experience[], projects: Project[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, projects, onChange }) => {
  const [activeTab, setActiveTab] = useState('experience');

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      achievements: [''],
      technologies: []
    };
    onChange([...data, newExperience], projects);
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      achievements: ['']
    };
    onChange(data, [...projects, newProject]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const updated = data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange(updated, projects);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    const updated = projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    onChange(data, updated);
  };

  const deleteExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id), projects);
  };

  const deleteProject = (id: string) => {
    onChange(data, projects.filter(proj => proj.id !== id));
  };

  const addAchievement = (type: 'experience' | 'project', id: string) => {
    if (type === 'experience') {
      const updated = data.map(exp => 
        exp.id === id ? { ...exp, achievements: [...exp.achievements, ''] } : exp
      );
      onChange(updated, projects);
    } else {
      const updated = projects.map(proj => 
        proj.id === id ? { ...proj, achievements: [...proj.achievements, ''] } : proj
      );
      onChange(data, updated);
    }
  };

  const updateAchievement = (type: 'experience' | 'project', id: string, index: number, value: string) => {
    if (type === 'experience') {
      const updated = data.map(exp => {
        if (exp.id === id) {
          const newAchievements = [...exp.achievements];
          newAchievements[index] = value;
          return { ...exp, achievements: newAchievements };
        }
        return exp;
      });
      onChange(updated, projects);
    } else {
      const updated = projects.map(proj => {
        if (proj.id === id) {
          const newAchievements = [...proj.achievements];
          newAchievements[index] = value;
          return { ...proj, achievements: newAchievements };
        }
        return proj;
      });
      onChange(data, updated);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2 bg-slate-100/80">
        <TabsTrigger value="experience" className="flex items-center space-x-2">
          <Briefcase className="h-4 w-4" />
          <span>Work Experience</span>
        </TabsTrigger>
        <TabsTrigger value="projects" className="flex items-center space-x-2">
          <Code className="h-4 w-4" />
          <span>Projects</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="experience" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-800">Work Experience</h3>
          <Button onClick={addExperience} size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>

        {data.map((experience) => (
          <Card key={experience.id} className="border border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-700">Experience Entry</CardTitle>
                <Button
                  onClick={() => deleteExperience(experience.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">Company *</Label>
                  <Input
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    placeholder="Google, Meta, Apple..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Position *</Label>
                  <Input
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                    placeholder="Senior Software Engineer"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">Start Date *</Label>
                  <Input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">End Date</Label>
                  <Input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    disabled={experience.current}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700">Technologies Used</Label>
                <Input
                  value={experience.technologies.join(', ')}
                  onChange={(e) => updateExperience(experience.id, 'technologies', e.target.value.split(', ').filter(Boolean))}
                  placeholder="React, TypeScript, Node.js, AWS..."
                  className="mt-1"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-slate-700">Key Achievements *</Label>
                  <Button
                    onClick={() => addAchievement('experience', experience.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                {experience.achievements.map((achievement, index) => (
                  <Textarea
                    key={index}
                    value={achievement}
                    onChange={(e) => updateAchievement('experience', experience.id, index, e.target.value)}
                    placeholder="• Developed and deployed scalable microservices that improved system performance by 40%"
                    className="mt-2 min-h-[60px]"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="projects" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-800">Featured Projects</h3>
          <Button onClick={addProject} size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        {projects.map((project) => (
          <Card key={project.id} className="border border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-700">Project Entry</CardTitle>
                <Button
                  onClick={() => deleteProject(project.id)}
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
                <Label className="text-sm font-medium text-slate-700">Project Name *</Label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  placeholder="E-commerce Platform, Task Management App..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700">Description *</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Brief description of what the project does and its impact..."
                  className="mt-1 min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">GitHub URL</Label>
                  <Input
                    value={project.githubUrl || ''}
                    onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Live Demo URL</Label>
                  <Input
                    value={project.liveUrl || ''}
                    onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                    placeholder="https://project.com"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700">Technologies Used *</Label>
                <Input
                  value={project.technologies.join(', ')}
                  onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(', ').filter(Boolean))}
                  placeholder="React, TypeScript, Node.js, MongoDB..."
                  className="mt-1"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-slate-700">Key Features & Achievements</Label>
                  <Button
                    onClick={() => addAchievement('project', project.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                {project.achievements.map((achievement, index) => (
                  <Textarea
                    key={index}
                    value={achievement}
                    onChange={(e) => updateAchievement('project', project.id, index, e.target.value)}
                    placeholder="• Implemented real-time chat feature serving 10,000+ concurrent users"
                    className="mt-2 min-h-[60px]"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default ExperienceForm;
