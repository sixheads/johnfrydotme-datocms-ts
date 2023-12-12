import { Image as DatoImage } from 'react-datocms';
import { performRequest } from '../lib/datocms';

const PAGE_CONTENT_QUERY = `query Home {
  allProjects {
    id
    name
    studio {
      studioLink
      studioName
    }
    technology {
      name
    }
    projectUrl
    featuredImage {
      responsiveImage(imgixParams: {fit: crop, w: "500", h: "294", auto: format}) {
        alt
        sizes
        height
        width
        src
        base64
      }
    }
  }
}`;

export default async function WorkGallery() {
  const pageContent = await performRequest({
    query: PAGE_CONTENT_QUERY,
    variables: { limit: 10 },
  });

  return (
    <div className="flex gap-40">
      <h2 className="flex-1">Work</h2>
      <div className="flex flex-wrap gap-3">
        {pageContent.allProjects.map((project: any) => (
          <div
            key={project.id}
            className="flex-1 border border-cyan-600"
          >
            <DatoImage data={project.featuredImage.responsiveImage} />
            <h3>{project.name}</h3>
            <p>
              <a
                href={project.studio.studioLink}
                className=""
                target="_blank"
              >
                {project.studio.studioName}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
