
import React from 'react';
import { FormData } from '@/types/FormData';
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from 'lucide-react';

interface ResumePreviewProps {
  data: FormData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto text-sm leading-relaxed">
      {/* Header */}
      <header className="border-b-2 border-slate-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-slate-600">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              <span>{data.personalInfo.github}</span>
            </div>
          )}
          {data.personalInfo.linkedIn && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <span>{data.personalInfo.linkedIn}</span>
            </div>
          )}
          {data.personalInfo.portfolio && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>{data.personalInfo.portfolio}</span>
            </div>
          )}
        </div>
      </header>

      {/* Technical Skills */}
      {(data.technicalSkills.programmingLanguages.length > 0 || 
        data.technicalSkills.frameworks.length > 0 || 
        data.technicalSkills.tools.length > 0) && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3 border-b border-slate-300 pb-1">
            TECHNICAL SKILLS
          </h2>
          <div className="space-y-2">
            {data.technicalSkills.programmingLanguages.length > 0 && (
              <div>
                <span className="font-semibold">Programming Languages: </span>
                <span>{data.technicalSkills.programmingLanguages.join(', ')}</span>
              </div>
            )}
            {data.technicalSkills.frameworks.length > 0 && (
              <div>
                <span className="font-semibold">Frameworks & Libraries: </span>
                <span>{data.technicalSkills.frameworks.join(', ')}</span>
              </div>
            )}
            {data.technicalSkills.tools.length > 0 && (
              <div>
                <span className="font-semibold">Development Tools: </span>
                <span>{data.technicalSkills.tools.join(', ')}</span>
              </div>
            )}
            {data.technicalSkills.databases.length > 0 && (
              <div>
                <span className="font-semibold">Databases: </span>
                <span>{data.technicalSkills.databases.join(', ')}</span>
              </div>
            )}
            {data.technicalSkills.cloudPlatforms.length > 0 && (
              <div>
                <span className="font-semibold">Cloud Platforms: </span>
                <span>{data.technicalSkills.cloudPlatforms.join(', ')}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3 border-b border-slate-300 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold text-slate-800">{exp.position}</h3>
                  <h4 className="font-semibold text-slate-700">{exp.company}</h4>
                </div>
                <div className="text-slate-600 text-right">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </div>
              </div>
              {exp.technologies.length > 0 && (
                <div className="text-slate-600 mb-2 italic">
                  Technologies: {exp.technologies.join(', ')}
                </div>
              )}
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {exp.achievements.filter(Boolean).map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3 border-b border-slate-300 pb-1">
            FEATURED PROJECTS
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-slate-800">{project.name}</h3>
                <div className="text-slate-600 text-sm">
                  {project.githubUrl && (
                    <span className="mr-3">GitHub: {project.githubUrl}</span>
                  )}
                  {project.liveUrl && (
                    <span>Live: {project.liveUrl}</span>
                  )}
                </div>
              </div>
              {project.description && (
                <p className="text-slate-700 mb-2">{project.description}</p>
              )}
              {project.technologies.length > 0 && (
                <div className="text-slate-600 mb-2 italic">
                  Technologies: {project.technologies.join(', ')}
                </div>
              )}
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {project.achievements.filter(Boolean).map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3 border-b border-slate-300 pb-1">
            EDUCATION
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold text-slate-800">
                    {edu.degree} in {edu.field}
                  </h3>
                  <h4 className="font-semibold text-slate-700">{edu.institution}</h4>
                  {edu.gpa && (
                    <div className="text-slate-600">GPA: {edu.gpa}</div>
                  )}
                </div>
                <div className="text-slate-600 text-right">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
              </div>
              {edu.achievements.filter(Boolean).length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {edu.achievements.filter(Boolean).map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Soft Skills */}
      {data.softSkills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-3 border-b border-slate-300 pb-1">
            CORE COMPETENCIES
          </h2>
          <div className="text-slate-700">
            {data.softSkills.join(' • ')}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
