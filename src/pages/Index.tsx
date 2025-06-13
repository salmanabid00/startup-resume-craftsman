
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Download, User, Briefcase, GraduationCap, Code2, Target, Mail } from 'lucide-react';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import ExperienceForm from '@/components/ExperienceForm';
import EducationForm from '@/components/EducationForm';
import SkillsForm from '@/components/SkillsForm';
import JobTargetForm from '@/components/JobTargetForm';
import ResumePreview from '@/components/ResumePreview';
import CoverLetterPreview from '@/components/CoverLetterPreview';
import { FormData } from '@/types/FormData';

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      github: '',
      portfolio: ''
    },
    experience: [],
    education: [],
    technicalSkills: {
      programmingLanguages: [],
      frameworks: [],
      tools: [],
      databases: [],
      cloudPlatforms: []
    },
    softSkills: [],
    projects: [],
    targetRole: {
      position: '',
      company: '',
      jobDescription: ''
    }
  });

  const [activeTab, setActiveTab] = useState('personal');

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleDownload = (type: 'resume' | 'coverLetter') => {
    // This would integrate with a PDF generation library in a real implementation
    console.log(`Downloading ${type} for ${formData.personalInfo.fullName}`);
    // For now, we'll show a toast notification
    alert(`${type === 'resume' ? 'Resume' : 'Cover Letter'} download initiated!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  TechStartup Resume Builder
                </h1>
                <p className="text-sm text-slate-600">ATS-Optimized Documents for Software Engineers</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => handleDownload('resume')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
              <Button
                onClick={() => handleDownload('coverLetter')}
                variant="outline"
                className="border-blue-200 hover:bg-blue-50"
              >
                <Mail className="h-4 w-4 mr-2" />
                Download Cover Letter
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-slate-800">
                  Build Your Professional Profile
                </CardTitle>
                <p className="text-sm text-slate-600">
                  Create compelling documents that showcase your technical excellence and startup potential
                </p>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3 lg:grid-cols-2 gap-1 h-auto p-1 bg-slate-100/80">
                    <TabsTrigger value="personal" className="flex items-center space-x-2 py-3">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">Personal</span>
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="flex items-center space-x-2 py-3">
                      <Briefcase className="h-4 w-4" />
                      <span className="hidden sm:inline">Experience</span>
                    </TabsTrigger>
                    <TabsTrigger value="education" className="flex items-center space-x-2 py-3">
                      <GraduationCap className="h-4 w-4" />
                      <span className="hidden sm:inline">Education</span>
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="flex items-center space-x-2 py-3">
                      <Code2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Skills</span>
                    </TabsTrigger>
                    <TabsTrigger value="target" className="flex items-center space-x-2 py-3 lg:col-span-2">
                      <Target className="h-4 w-4" />
                      <span className="hidden sm:inline">Target Role</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4">
                    <PersonalInfoForm
                      data={formData.personalInfo}
                      onChange={(data) => updateFormData('personalInfo', data)}
                    />
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-4">
                    <ExperienceForm
                      data={formData.experience}
                      projects={formData.projects}
                      onChange={(experience, projects) => {
                        updateFormData('experience', experience);
                        updateFormData('projects', projects);
                      }}
                    />
                  </TabsContent>

                  <TabsContent value="education" className="space-y-4">
                    <EducationForm
                      data={formData.education}
                      onChange={(data) => updateFormData('education', data)}
                    />
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-4">
                    <SkillsForm
                      technicalSkills={formData.technicalSkills}
                      softSkills={formData.softSkills}
                      onChange={(technical, soft) => {
                        updateFormData('technicalSkills', technical);
                        updateFormData('softSkills', soft);
                      }}
                    />
                  </TabsContent>

                  <TabsContent value="target" className="space-y-4">
                    <JobTargetForm
                      data={formData.targetRole}
                      onChange={(data) => updateFormData('targetRole', data)}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-slate-800">
                    Document Preview
                  </CardTitle>
                  <Tabs defaultValue="resume" className="w-auto">
                    <TabsList className="bg-slate-100/80">
                      <TabsTrigger value="resume">Resume</TabsTrigger>
                      <TabsTrigger value="coverLetter">Cover Letter</TabsTrigger>
                    </TabsList>
                    <TabsContent value="resume" className="mt-6">
                      <ResumePreview data={formData} />
                    </TabsContent>
                    <TabsContent value="coverLetter" className="mt-6">
                      <CoverLetterPreview data={formData} />
                    </TabsContent>
                  </Tabs>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
