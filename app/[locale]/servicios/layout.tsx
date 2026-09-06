import type { Metadata } from 'next';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {};
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}