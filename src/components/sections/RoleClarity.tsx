import { Locale } from '@/lib/i18n';
import fs from 'fs';
import path from 'path';

interface RoleClarityProps {
  locale: Locale;
}

export default function RoleClarity({ locale }: RoleClarityProps) {
  // Load content from JSON structure
  const contentPath = path.join(process.cwd(), 'src', 'content', locale, 'homepage.json');
  const roleData = JSON.parse(fs.readFileSync(contentPath, 'utf-8')).roleClarity;

  const currentContent = {
    title: roleData.roleTitle,
    does: {
      title: "AFA YAPAR",
      items: roleData.does
    },
    doesnt: {
      title: "AFA YAPMAZ", 
      items: roleData.doesNot
    },
    conclusion: roleData.boundaryNote
  };

  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-dark font-heading">
          {currentContent.title}
        </h2>

        {/* Two-Column Matrix */}
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8 mb-12">
          {/* AFA Does Column */}
          <div className="bg-[#E8F5F5] border-l-4 border-l-primary rounded-[12px] p-6">
            <h3 className="text-xl font-bold mb-6 text-dark font-heading">
              {currentContent.does.title}
            </h3>
            <ul className="space-y-3">
              {currentContent.does.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AFA Doesn't Column */}
          <div className="bg-[#FFF5E8] border-l-4 border-l-[#F25F5C] rounded-[12px] p-6">
            <h3 className="text-xl font-bold mb-6 text-dark font-heading">
              {currentContent.doesnt.title}
            </h3>
            <ul className="space-y-3">
              {currentContent.doesnt.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-600 font-bold text-lg">✗</span>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-muted border-l-4 border-l-accent p-5 max-w-[800px] mx-auto">
          <p className="text-gray-700 italic leading-relaxed">
            {currentContent.conclusion}
          </p>
        </div>
      </div>
    </section>
  );
}
