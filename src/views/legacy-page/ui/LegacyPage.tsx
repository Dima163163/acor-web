interface LegacyPageProps {
  html: string;
}

export const LegacyPage = ({ html }: LegacyPageProps) => (
  <div className="route-fragment" dangerouslySetInnerHTML={{ __html: html }} />
);
