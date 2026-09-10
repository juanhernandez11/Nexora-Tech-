import type { Metadata } from 'next';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {};
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}