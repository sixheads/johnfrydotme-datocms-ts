import { Suspense } from 'react';
import { performRequest } from '../lib/datocms';
import WorkGallery from '@/components/WorkGallery';
import PageIntro from '@/components/PageIntro';

const PAGE_CONTENT_QUERY = `query Home {
  homePage {
    id
    title
    pageIntro(markdown: true)
  }
}`;

export default async function Home() {
  const pageContent = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: { limit: 10 },
  });

  const { pageIntro } = pageContent.homePage;

  return (
    <>
      <PageIntro>
        <div dangerouslySetInnerHTML={{ __html: pageIntro }} />
      </PageIntro>
      <Suspense fallback={<p>Loading directories...</p>}>
        <WorkGallery />
      </Suspense>
    </>
  );
}
