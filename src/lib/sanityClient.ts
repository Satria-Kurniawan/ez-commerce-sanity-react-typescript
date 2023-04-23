import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "5v8c7df1",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-04-19",
  token: import.meta.env.REACT_APP_SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
