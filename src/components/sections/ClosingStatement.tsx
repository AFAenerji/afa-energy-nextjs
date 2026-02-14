import { Locale } from '@/lib/i18n';
import fs from 'fs';
import path from 'path';

interface ClosingStatementProps {
  locale: Locale;
}

export default function ClosingStatement({ locale }: ClosingStatementProps) {
  // Load content from JSON structure - reuse hero motto as closing statement
  const contentPath = path.join(process.cwd(), 'src', 'content', locale, 'homepage.json');
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8')).hero.motto;

  return (
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl desktop:text-4xl font-bold text-primary leading-tight font-heading px-4">
            {content}
          </h2>
        </div>
      </div>
    </section>
  );
}
