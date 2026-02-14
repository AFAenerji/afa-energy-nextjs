import { Locale } from '@/lib/i18n';
import HeroSection from '@/components/sections/HeroSection';
import IntroductoryStatement from '@/components/sections/IntroductoryStatement';
import PositioningChain from '@/components/sections/PositioningChain';
import ExperienceMetrics from '@/components/sections/ExperienceMetrics';
import RoleClarity from '@/components/sections/RoleClarity';
import DecisionInterface from '@/components/sections/DecisionInterface';
import ClosingStatement from '@/components/sections/ClosingStatement';

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return (
    <main>
      {/* Section 1: Hero */}
      <HeroSection locale={locale} />

      {/* Section 2: Introductory Statement */}
      <IntroductoryStatement locale={locale} />

      {/* Section 3: Investment Readiness Chain */}
      <PositioningChain locale={locale} />

      {/* Section 4: Experience Metrics */}
      <ExperienceMetrics locale={locale} />

      {/* Section 5: Role Clarity */}
      <RoleClarity locale={locale} />

      {/* Section 6: Decision Interface */}
      <DecisionInterface locale={locale} />

      {/* Section 7: Closing Statement */}
      <ClosingStatement locale={locale} />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'tr' }, { locale: 'ro' }];
}
