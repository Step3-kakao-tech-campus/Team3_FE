interface Param {
  src: string;
  width: number;
  quality?: number;
}
export default function imageLoader({ src, width, quality }: Param) {
  return `${src}?w=${width}&q=${quality || 75}`;
}
