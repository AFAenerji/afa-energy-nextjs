import { Locale } from '@/lib/i18n';
import fs from 'fs';
import path from 'path';

interface IntroductoryStatementProps {
  locale: Locale;
}

export default function IntroductoryStatement({ locale }: IntroductoryStatementProps) {
  // Load content from JSON structure
  const contentPath = path.join(process.cwd(), 'src', 'content', locale, 'homepage.json');
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8')).introStatement.text;

  return (
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-muted border-l-3 border-border max-w-[600px] mx-auto">
          <div className="p-4">
            <p className="text-[15px] font-normal leading-[1.7] text-gray-600">
              {content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
