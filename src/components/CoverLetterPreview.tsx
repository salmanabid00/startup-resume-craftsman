
import React from 'react';
import { FormData } from '@/types/FormData';

interface CoverLetterPreviewProps {
  data: FormData;
}

const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({ data }) => {
  const generateCoverLetter = () => {
    const { personalInfo, experience, projects, targetRole } = data;
    
    // Get most recent experience
    const latestExperience = experience.length > 0 ? experience[0] : null;
    
    // Get most notable project
    const featuredProject = projects.length > 0 ? projects[0] : null;
    
    return `Dear Hiring Manager,

I am writing to express my strong interest in the ${targetRole.position || 'Software Engineer'} position at ${targetRole.company || 'your company'}. As an experienced software engineer with a proven track record of delivering high-quality solutions, I am excited about the opportunity to contribute to your innovative team.

${latestExperience ? `In my most recent role as ${latestExperience.position} at ${latestExperience.company}, I have successfully ${latestExperience.achievements && latestExperience.achievements.length > 0 ? latestExperience.achievements[0].toLowerCase() : 'contributed to various technical projects'}. My expertise with ${latestExperience.technologies && latestExperience.technologies.length > 0 ? latestExperience.technologies.join(', ') : 'modern technologies'} has enabled me to drive significant improvements in application performance and user experience.` : 'With my software engineering background, I have consistently delivered high-quality solutions and contributed to successful project outcomes.'}

${featuredProject ? `One of my notable achievements includes developing ${featuredProject.name}, where I ${featuredProject.description || 'built a comprehensive solution'}. This project demonstrates my ability to ${featuredProject.achievements && featuredProject.achievements.length > 0 ? featuredProject.achievements[0].toLowerCase() : 'deliver innovative solutions'} using ${featuredProject.technologies.join(', ')}.` : ''}

What particularly excites me about ${targetRole.company || 'your company'} is your commitment to innovation and technical excellence. I am confident that my technical skills, problem-solving abilities, and passion for creating impactful solutions make me an ideal candidate for this role.

${targetRole.jobDescription ? 'Based on the job description, I believe my experience aligns perfectly with your requirements, and I am eager to bring my expertise to help achieve your technical goals.' : ''}

I would welcome the opportunity to discuss how my background and enthusiasm can contribute to your team's success. Thank you for considering my application.

Best regards,
${personalInfo.fullName || '[Your Name]'}`;
  };

  return (
    <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto text-sm leading-relaxed">
      <div className="whitespace-pre-line text-slate-800">
        {generateCoverLetter()}
      </div>
    </div>
  );
};

export default CoverLetterPreview;
