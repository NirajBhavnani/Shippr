// Connect the application with sanity

import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-04-07",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

// For using sanity images
const builder = imageUrlBuilder(client);

// sanity gives us the access to the URLs where our images are stored
export const urlFor = (source) => builder.image(source);
