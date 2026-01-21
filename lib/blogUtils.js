import { client } from "./sanity";

// Get all blogs
export async function getAllBlogs() {
  const query = `*[_type in ["Blog", "blog"]] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    mainImage,
    "category": category->,
    excerpt,
    readTime,
    publishedAt,
    featured
  }`;

  const blogs = await client.fetch(query);
  return blogs;
}

// Get single blog by slug
export async function getBlogBySlug(slug) {
  const query = `*[_type in ["Blog", "blog"] && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author,
    mainImage,
    "category": category->,
    excerpt,
    content,
    readTime,
    publishedAt,
    featured
  }`;

  const blog = await client.fetch(query, { slug });
  return blog;
}

// Get blog by ID
export async function getBlogById(id) {
  const query = `*[_type in ["Blog", "blog"] && _id == $id][0] {
    _id,
    title,
    slug,
    author,
    mainImage,
    "category": category->,
    excerpt,
    content,
    readTime,
    publishedAt,
    featured
  }`;

  const blog = await client.fetch(query, { id });
  return blog;
}

// Get related blogs by category
export async function getRelatedBlogs(categoryId, currentId, limit = 4) {
  const query = `*[_type in ["Blog", "blog"] && category._ref == $categoryId && _id != $currentId] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    mainImage,
    "category": category->,
    excerpt,
    readTime,
    publishedAt
  }`;

  const blogs = await client.fetch(query, { categoryId, currentId, limit });
  return blogs;
}

// Get featured blogs
export async function getFeaturedBlogs(limit = 4) {
  const query = `*[_type in ["Blog", "blog"] && featured == true] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    mainImage,
    "category": category->,
    excerpt,
    readTime,
    publishedAt
  }`;

  const blogs = await client.fetch(query, { limit });
  return blogs;
}

// Format date helper
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Convert Sanity block content to plain text
export function toPlainText(blocks = []) {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children.map((child) => child.text).join('');
    })
    .join('\n\n');
}
