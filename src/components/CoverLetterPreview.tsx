
import React from 'react';
import { FormData } from '@/types/FormData';

interface CoverLetterPreviewProps {
  data: FormData;
}

const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({ data }) => {
  const generateCoverLetter = () => {
    const { personalInfo, experience, targetRole, technicalSkills, projects } = data;
    
    // Extract key technologies and experiences for personalization
    const primaryTechnologies = [
      ...technicalSkills.programmingLanguages.slice(0, 3),
      ...technicalSkills.frameworks.slice(0, 2)
    ].join(', ');

    const yearsOfExperience = experience.length > 0 ? experience.length : 'several';
    const latestRole = experience[0] || { position: 'Software Engineer', company: 'Previous Company' };
    const keyProject = projects[0] || { name: 'Notable Project', technologies: ['React', 'Node.js'] };

    return {
      introduction: `I am writing to express my strong interest in the ${targetRole.position || 'Software Engineer'} position at ${targetRole.company || 'your innovative company'}. As a passionate software engineer with ${yearsOfExperience} years of experience building scalable applications and leading technical initiatives, I am excited about the opportunity to contribute to your team's mission of delivering cutting-edge technology solutions.`,
      
      technical: `Throughout my career, I have developed expertise in ${primaryTechnologies || 'modern web technologies'}, consistently delivering high-impact solutions that drive business growth. ${experience.length > 0 ? `In my most recent role as ${latestRole.position} at ${latestRole.company}, I ${latestRole.achievements?.[0] || 'led key technical initiatives that improved system performance and user experience'}.` : 'I have worked on various projects that demonstrate my ability to solve complex technical challenges.'}`,
      
      innovation: `What particularly excites me about ${targetRole.company || 'your company'} is your commitment to innovation and technical excellence. ${projects.length > 0 ? `I recently developed ${keyProject.name}, a ${keyProject.description || 'innovative application'} using ${keyProject.technologies.slice(0, 3).join(', ')}, which ${keyProject.achievements?.[0] || 'demonstrated my ability to build scalable, user-focused solutions'}.` : 'My experience building modern applications aligns perfectly with your technical stack and engineering culture.'} This experience has strengthened my ability to work in fast-paced startup environments where adaptability and rapid iteration are crucial.`,
      
      value: `${targetRole.jobDescription ? 'Based on the job description, I am particularly drawn to the opportunity to ' + (targetRole.jobDescription.toLowerCase().includes('react') || targetRole.jobDescription.toLowerCase().includes('frontend') ? 'work on frontend architecture and user experience optimization' : targetRole.jobDescription.toLowerCase().includes('backend') || targetRole.jobDescription.toLowerCase().includes('api') ? 'design robust backend systems and APIs' : targetRole.jobDescription.toLowerCase().includes('full stack') ? 'contribute across the entire technology stack' : 'tackle the technical challenges outlined in your requirements') + '. ' : ''}I thrive in collaborative environments where I can mentor junior developers, contribute to technical decision-making, and help shape the engineering culture. My experience with ${technicalSkills.cloudPlatforms.slice(0, 2).join(' and ') || 'cloud technologies'} and modern development practices positions me well to contribute immediately to your team's success.`,
      
      closing: `I would welcome the opportunity to discuss how my technical expertise, passion for innovation, and startup experience can contribute to ${targetRole.company || 'your company'}'s continued growth. Thank you for considering my application, and I look forward to hearing from you soon.`
    };
  };

  const coverLetter = generateCoverLetter();
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto text-sm leading-relaxed">
      {/* Header */}
      <header className="mb-8">
        <div className="text-right mb-8">
          <div className="font-semibold">{data.personalInfo.fullName || 'Your Name'}</div>
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
        </div>
        
        <div className="mb-8">
          <div>{currentDate}</div>
        </div>

        <div className="mb-8">
          {data.targetRole.company && (
            <>
              <div>Hiring Manager</div>
              <div>{data.targetRole.company}</div>
            </>
          )}
        </div>

        <div className="mb-6">
          <strong>Re: {data.targetRole.position || 'Software Engineer Position'}</strong>
        </div>
      </header>

      {/* Body */}
      <div className="space-y-6 text-slate-700 leading-7">
        <div>
          Dear Hiring Manager,
        </div>

        <div>
          {coverLetter.introduction}
        </div>

        <div>
          {coverLetter.technical}
        </div>

        <div>
          {coverLetter.innovation}
        </div>

        <div>
          {coverLetter.value}
        </div>

        <div>
          {coverLetter.closing}
        </div>

        <div className="mt-8">
          <div>Sincerely,</div>
          <div className="mt-4 font-semibold">{data.personalInfo.fullName || 'Your Name'}</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-500">
        <div className="text-center">
          Professional cover letter generated for {data.targetRole.company || 'tech startup'} - 
          {data.targetRole.position || 'Software Engineer'} position
        </div>
      </footer>
    </div>
  );
};

export default CoverLetterPreview;
