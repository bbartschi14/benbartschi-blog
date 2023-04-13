export function convertHeadingToId(heading: string) {
  return heading.toLowerCase().replace(/ /g, "-");
}
