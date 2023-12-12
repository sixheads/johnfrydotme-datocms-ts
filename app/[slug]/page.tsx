import PageContent from '@/components/PageContent';
import PageIntro from '@/components/PageIntro';
import { performRequest } from '@/lib/datocms';

interface PageData {
  id: string;
  title: string;
  pageIntro: string;
  content: {
    blocks: string[];
    links: string[];
    value: string;
  };
  flexibleContent: {
    sectionTitle: string;
    sectionContent: {
      blocks: string[];
      links: string[];
      value: string;
    };
    id: string;
  }[];
}

interface AllPagesData {
  slug: string;
}

interface PageParams {
  slug: string;
}

export async function generateStaticParams(): Promise<string[]> {
  const { allPages } = await performRequest({
    query: `{ allPages { slug } }`,
  });

  return allPages.map(({ slug }: { slug: string }) => slug);
}

const PAGE_CONTENT_QUERY = `query PageBySlug($slug: String) {
  page(filter: {slug: {eq: $slug}}) {
    id
    title
    pageIntro(markdown: true)
    content {
      blocks
      links
      value
    }
    flexibleContent {
      sectionTitle
      sectionContent {
        blocks
        links
        value
      }
      id
    }
  }
  allPages {
    slug
  }
}`;

function getPageRequest(slug: string) {
  return { query: PAGE_CONTENT_QUERY, variables: { slug } };
}

export default async function Page({
  params,
}: {
  params: PageParams;
}) {
  const pageRequest = getPageRequest(params.slug);
  const data = await performRequest(pageRequest); // Add this line

  return (
    <>
      <PageIntro>
        <div
          dangerouslySetInnerHTML={{ __html: data.page.pageIntro }}
        />
      </PageIntro>
      <PageContent data={data} />
    </>
  );
}
