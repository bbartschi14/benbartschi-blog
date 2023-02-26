import fs from "fs";
import { join } from "path";
import { bundleMDX } from "mdx-bundler";
import imageMetadata from "./image-metadata-plugin";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).map((slug) => {
    return {
      params: {
        slug: slug.replace(/\.mdx$/, ""),
      },
    };
  });
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const source = fs.readFileSync(fullPath, "utf8");

  const { code, frontmatter } = await bundleMDX({
    source,
    cwd: postsDirectory,
    mdxOptions: (options) => {
      // Other configuration...

      // Configure the custom image metadata rehype plugin.
      options.rehypePlugins = [...(options.rehypePlugins ?? []), imageMetadata];

      return options;
    },
  });

  return {
    slug,
    frontmatter,
    code,
  };
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug.params.slug, fields));
  return posts;
}
