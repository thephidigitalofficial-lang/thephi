import { client } from "./sanity";

/**
 * Fetches all services from Sanity using the new nested schema structure.
 * Each document of type 'service' represents a section (e.g., UI/UX Design)
 * and contains an array of 'items' within that section.
 */
export async function getServices() {
  const query = `*[_type == "service"] | order(order asc) {
    _id,
    title,
    order,
    image,
    items[] {
      id,
      title,
      icon,
      desc
    }
  }`;

  try {
    const services = await client.fetch(query);
    console.log('got services')
    console.log(services)
    return services;
  } catch (error) {
    console.error("Error fetching services from Sanity:", error);
    return [];
  }
}
