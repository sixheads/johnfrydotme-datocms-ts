// Importing the required module
import { StructuredText } from 'react-datocms';

// Defining the data type
interface DataType {
  page: {
    title: string;
    content: any;
    flexibleContent: {
      id: string;
      sectionTitle: string;
      sectionContent: any;
    }[];
  };
}

// Defining the section type
interface SectionType {
  id: string;
  sectionTitle: string;
  sectionContent: any;
}

// Defining the function with explicit data type
export default function PageContent({ data }: { data: DataType }) {
  const { page } = data;
  return (
    <>
      <h1>{page.title}</h1>
      <StructuredText data={page.content} />

      {page.flexibleContent.map((section: SectionType) => (
        <div key={section.id}>
          <h2>{section.sectionTitle}</h2>
          <StructuredText data={section.sectionContent} />
        </div>
      ))}
    </>
  );
}
