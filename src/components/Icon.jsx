const paths = {
  trophy: (
    <>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M17 5h3v2a4 4 0 0 1-4 4" />
      <path d="M7 5H4v2a4 4 0 0 0 4 4" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3v18" />
      <path d="M5 6h14" />
      <path d="m6 6-3 7h6L6 6Z" />
      <path d="m18 6-3 7h6l-3-7Z" />
      <path d="M4 21h16" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
  worker: (
    <>
      <path d="M6 10a6 6 0 0 1 12 0" />
      <path d="M4 10h16" />
      <path d="M8 10v2a4 4 0 0 0 8 0v-2" />
      <path d="M5 22a7 7 0 0 1 14 0" />
      <path d="M12 3v4" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  star: (
    <path d="m12 2 2.9 6 6.6.9-4.8 4.7 1.1 6.5L12 17l-5.8 3.1 1.1-6.5-4.8-4.7 6.6-.9L12 2Z" />
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6" />
      <path d="M12 7h.01" />
    </>
  ),
  yen: (
    <>
      <path d="m6 3 6 9 6-9" />
      <path d="M12 12v9" />
      <path d="M8 12h8" />
      <path d="M8 16h8" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 14a8 8 0 1 1 16 0" />
      <path d="M12 14 16 9" />
      <path d="M7 14h10" />
      <path d="M5 18h14" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.7 6.3a4 4 0 0 0 5 5L11 20l-4-4 8.7-8.7Z" />
      <path d="M7 16 4 19" />
    </>
  ),
};

export default function Icon({ name, size = 24, strokeWidth = 2, className = "", ...props }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {paths[name] ?? paths.info}
    </svg>
  );
}

export { paths as iconPaths };
