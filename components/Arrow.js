export default function Arrow({ dir = "right", size = 14, className = "" }) {
  const paths = {
    right: "M5 12h14M13 6l6 6-6 6",
    left: "M19 12H5M11 18l-6-6 6-6",
    chevron: "M9 6l6 6-6 6",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d={paths[dir] || paths.right} />
    </svg>
  );
}
