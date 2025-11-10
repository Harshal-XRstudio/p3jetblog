import { fetchGraphQL } from "./contentful";

export async function getBlogDetails({ slug, preview = true }) {
  const blogDetailsData = await fetchGraphQL(
    `query {
      harshalCollection(where: { slug: "${slug}" }, preview: ${preview ? "true" : "false"}, limit: 1) {
        items {
            _id
            heroTitle
            category
            heroImage {
              url
            }
            publishedBy
            heroDescription {
                json
                        links {
          assets {
            block {
              sys { id }
              url
              title
              description
              contentType
            }
          }
        }

            }
        }
    }
}`,
    preview
  );
  return blogDetailsData?.data?.harshalCollection?.items[0];
}
