// Company logos from Drew's Portfolio folder, recolored to one tone so they sit
// quietly on any ground: marks take currentColor, and white knockouts (shapes cut
// into a colored mark) take var(--logo-knock), which the host sets to its ground.

const files = import.meta.glob('../assets/logos/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Some source artboards carry extra padding; crop them to the artwork.
const viewBoxes: Record<string, string> = {
  athlinks: '28 36 162.5 35.5',
  denver_logo: '0 63 424 117',
};

/** Project slug to logo file, for the work cards. */
export const projectLogo: Record<string, string> = {
  'sams-club': 'sams',
  tinder: 'tinder',
  'the-north-face': 'tnf',
  jumpcloud: 'jumpcloud',
};

/** Knockouts inside a logo take its card's darkest color (where the text sits) */
export const logoKnock: Record<string, string> = {
  'sams-club': '#00578a',
  tinder: '#c0145a',
  'the-north-face': '#2a2b2d',
  jumpcloud: '#0a5e5a',
};

const isWhite = (v: string) => /^(#fff|#ffffff|white)$/i.test(v.trim());

export function logoSvg(file: string): string | null {
  const key = Object.keys(files).find((k) => k.endsWith(`/${file}.svg`));
  if (!key) return null;
  const svg = files[key];
  const slug = file.replace(/_/g, '-');
  const viewBox = viewBoxes[file];
  const fills = [...svg.matchAll(/fill\s*[:=]\s*"?\s*(#[0-9a-f]{3,6}|white|black)/gi)].map((m) => m[1]);
  const onlyWhite = fills.length > 0 && fills.every(isWhite);
  const tone = (v: string) => (isWhite(v) && !onlyWhite ? 'var(--logo-knock)' : 'currentColor');
  return svg
    .replace(/<\?xml[^>]*>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<svg([^>]*)>/, (_m, attrs: string) => {
      let a = attrs.replace(/\s(width|height)="[^"]*"/g, '');
      if (viewBox) a = a.replace(/viewBox="[^"]*"/, `viewBox="${viewBox}"`);
      return `<svg${a}>`;
    })
    .replace(/\bst(\d+)\b/g, `${slug}-st$1`)
    .replace(/(fill\s*:\s*)(#[0-9a-f]{3,6}|white|black)/gi, (_m, p, v) => p + tone(v))
    .replace(/(fill\s*=\s*")(#[0-9a-f]{3,6}|white|black)(")/gi, (_m, p, v, q) => p + tone(v) + q)
    .replace('<svg', '<svg aria-hidden="true" focusable="false" preserveAspectRatio="xMinYMid meet"');
}
