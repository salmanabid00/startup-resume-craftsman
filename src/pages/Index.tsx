
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
    const element = document.createElement('a');
    const content = type === 'resume' ? generateResumeHTML() : generateCoverLetterHTML();
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    element.href = url;
    element.download = `${formData.personalInfo.fullName || 'Resume'}_${type}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
    
    console.log(`Downloading ${type} for ${formData.personalInfo.fullName}`);
  };

  const generateResumeHTML = () => {
    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${formData.personalInfo.fullName || 'Resume'}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { border-bottom: 2px solid #1e293b; padding-bottom: 15px; margin-bottom: 20px; }
        .name { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .contact { display: flex; flex-wrap: wrap; gap: 15px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 18px; font-weight: bold; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px; margin-bottom: 15px; }
        .experience-item { margin-bottom: 20px; }
        .job-header { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .job-title { font-weight: bold; }
        .company { font-weight: 600; color: #475569; }
        .date { color: #64748b; }
        .technologies { font-style: italic; color: #64748b; margin-bottom: 8px; }
        ul { margin: 8px 0; padding-left: 20px; }
        .skills-category { margin-bottom: 10px; }
        .skills-category strong { margin-right: 8px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${formData.personalInfo.fullName || 'Your Name'}</div>
        <div class="contact">
            ${formData.personalInfo.email ? `<span>📧 ${formData.personalInfo.email}</span>` : ''}
            ${formData.personalInfo.phone ? `<span>📱 ${formData.personalInfo.phone}</span>` : ''}
            ${formData.personalInfo.location ? `<span>📍 ${formData.personalInfo.location}</span>` : ''}
            ${formData.personalInfo.github ? `<span>🐙 ${formData.personalInfo.github}</span>` : ''}
            ${formData.personalInfo.linkedIn ? `<span>💼 ${formData.personalInfo.linkedIn}</span>` : ''}
            ${formData.personalInfo.portfolio ? `<span>🌐 ${formData.personalInfo.portfolio}</span>` : ''}
        </div>
    </div>

    ${(formData.technicalSkills.programmingLanguages.length > 0 || 
       formData.technicalSkills.frameworks.length > 0 || 
       formData.technicalSkills.tools.length > 0) ? `
    <div class="section">
        <div class="section-title">TECHNICAL SKILLS</div>
        ${formData.technicalSkills.programmingLanguages.length > 0 ? `
        <div class="skills-category">
            <strong>Programming Languages:</strong>${formData.technicalSkills.programmingLanguages.join(', ')}
        </div>` : ''}
        ${formData.technicalSkills.frameworks.length > 0 ? `
        <div class="skills-category">
            <strong>Frameworks & Libraries:</strong>${formData.technicalSkills.frameworks.join(', ')}
        </div>` : ''}
        ${formData.technicalSkills.tools.length > 0 ? `
        <div class="skills-category">
            <strong>Development Tools:</strong>${formData.technicalSkills.tools.join(', ')}
        </div>` : ''}
        ${formData.technicalSkills.databases.length > 0 ? `
        <div class="skills-category">
            <strong>Databases:</strong>${formData.technicalSkills.databases.join(', ')}
        </div>` : ''}
        ${formData.technicalSkills.cloudPlatforms.length > 0 ? `
        <div class="skills-category">
            <strong>Cloud Platforms:</strong>${formData.technicalSkills.cloudPlatforms.join(', ')}
        </div>` : ''}
    </div>` : ''}

    ${formData.experience.length > 0 ? `
    <div class="section">
        <div class="section-title">PROFESSIONAL EXPERIENCE</div>
        ${formData.experience.map(exp => `
        <div class="experience-item">
            <div class="job-header">
                <div>
                    <div class="job-title">${exp.position}</div>
                    <div class="company">${exp.company}</div>
                </div>
                <div class="date">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</div>
            </div>
            ${exp.technologies.length > 0 ? `<div class="technologies">Technologies: ${exp.technologies.join(', ')}</div>` : ''}
            <ul>
                ${exp.achievements.filter(Boolean).map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        </div>`).join('')}
    </div>` : ''}

    ${formData.projects.length > 0 ? `
    <div class="section">
        <div class="section-title">FEATURED PROJECTS</div>
        ${formData.projects.map(project => `
        <div class="experience-item">
            <div class="job-header">
                <div class="job-title">${project.name}</div>
                <div class="date">
                    ${project.githubUrl ? `GitHub: ${project.githubUrl}` : ''}
                    ${project.liveUrl ? ` | Live: ${project.liveUrl}` : ''}
                </div>
            </div>
            ${project.description ? `<div>${project.description}</div>` : ''}
            ${project.technologies.length > 0 ? `<div class="technologies">Technologies: ${project.technologies.join(', ')}</div>` : ''}
            <ul>
                ${project.achievements.filter(Boolean).map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        </div>`).join('')}
    </div>` : ''}

    ${formData.education.length > 0 ? `
    <div class="section">
        <div class="section-title">EDUCATION</div>
        ${formData.education.map(edu => `
        <div class="experience-item">
            <div class="job-header">
                <div>
                    <div class="job-title">${edu.degree} in ${edu.field}</div>
                    <div class="company">${edu.institution}</div>
                    ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
                </div>
                <div class="date">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</div>
            </div>
            ${edu.achievements.filter(Boolean).length > 0 ? `
            <ul>
                ${edu.achievements.filter(Boolean).map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>` : ''}
        </div>`).join('')}
    </div>` : ''}

    ${formData.softSkills.length > 0 ? `
    <div class="section">
        <div class="section-title">CORE COMPETENCIES</div>
        <div>${formData.softSkills.join(' • ')}</div>
    </div>` : ''}
</body>
</html>`;
  };

  const generateCoverLetterHTML = () => {
    const { personalInfo, experience, projects, targetRole } = formData;
    const latestExperience = experience.length > 0 ? experience[0] : null;
    const featuredProject = projects.length > 0 ? projects[0] : null;
    
    const coverLetterText = `Dear Hiring Manager,

I am writing to express my strong interest in the ${targetRole.position || 'Software Engineer'} position at ${targetRole.company || 'your company'}. As an experienced software engineer with a proven track record of delivering high-quality solutions, I am excited about the opportunity to contribute to your innovative team.

${latestExperience ? `In my most recent role as ${latestExperience.position} at ${latestExperience.company}, I have successfully ${latestExperience.achievements && latestExperience.achievements.length > 0 ? latestExperience.achievements[0].toLowerCase() : 'contributed to various technical projects'}. My expertise with ${latestExperience.technologies && latestExperience.technologies.length > 0 ? latestExperience.technologies.join(', ') : 'modern technologies'} has enabled me to drive significant improvements in application performance and user experience.` : 'With my software engineering background, I have consistently delivered high-quality solutions and contributed to successful project outcomes.'}

${featuredProject ? `One of my notable achievements includes developing ${featuredProject.name}, where I ${featuredProject.description || 'built a comprehensive solution'}. This project demonstrates my ability to ${featuredProject.achievements && featuredProject.achievements.length > 0 ? featuredProject.achievements[0].toLowerCase() : 'deliver innovative solutions'} using ${featuredProject.technologies.join(', ')}.` : ''}

What particularly excites me about ${targetRole.company || 'your company'} is your commitment to innovation and technical excellence. I am confident that my technical skills, problem-solving abilities, and passion for creating impactful solutions make me an ideal candidate for this role.

${targetRole.jobDescription ? 'Based on the job description, I believe my experience aligns perfectly with your requirements, and I am eager to bring my expertise to help achieve your technical goals.' : ''}

I would welcome the opportunity to discuss how my background and enthusiasm can contribute to your team's success. Thank you for considering my application.

Best regards,
${personalInfo.fullName || '[Your Name]'}`;

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Cover Letter - ${personalInfo.fullName || 'Your Name'}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 40px; }
        .content { white-space: pre-line; }
    </style>
</head>
<body>
    <div class="content">${coverLetterText}</div>
</body>
</html>`;
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
