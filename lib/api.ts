import fs from "fs";
import { join } from "path";
import { bundleMDX } from "mdx-bundler";
import imageMetadata from "./image-metadata-plugin";
import { HeadingItem } from "./lib";

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

// From Josh Comeau's blog post:
export function getHeadings(source: string): HeadingItem[] {
  // Get each line individually, and filter out anything that
  // isn't a heading.
  const headingLines = source.split("\n").filter((line) => {
    return line.match(/^###*\s/);
  });

  // Transform the string '## Some text' into an object
  // with the shape '{ text: 'Some text', level: 2 }'
  return headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, "").slice(0, -1);
    // I only care about h2 and h3.
    // If I wanted more levels, I'd need to count the
    // number of #s.
    const level = raw.slice(0, 3) === "###" ? 3 : 2;

    return { text, level };
  });
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const source = fs.readFileSync(fullPath, "utf8");

  const headingItems = getHeadings(source);
  headingItems.unshift({ text: "Introduction", level: 2 });

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
    headingItems,
  };
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug.params.slug, fields));
  return posts;
}
