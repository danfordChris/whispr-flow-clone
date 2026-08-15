/**
 * Portfolio mark.
 *
 * A rounded app tile — the silhouette every mobile platform uses — holding a
 * terminal caret and cursor. The tile speaks to the mobile/product work, the
 * `>_` to the engineering behind it, which together cover the four roles
 * without spelling any of them out.
 *
 * Built as geometry rather than a font glyph so it stays sharp at 20px in the
 * nav and at any size elsewhere.
 */
export function Mark({
  size = 28,
  dark = false,
}: {
  size?: number;
  dark?: boolean;
}) {
  const tile = dark ? "#ffffeb" : "#1a1a1a";
  const glyph = dark ? "#1a1a1a" : "#ffffeb";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="0.5" y="0.5" width="27" height="27" rx="8" fill={tile} />
      {/* caret */}
      <path
        d="M9 9.5 L14 14 L9 18.5"
        stroke={glyph}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* cursor */}
      <path
        d="M16.4 18.6 H20.6"
        stroke={glyph}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({
  dark = false,
  size = 28,
  showName = true,
  showMark = true,
}: {
  dark?: boolean;
  size?: number;
  showName?: boolean;
  showMark?: boolean;
}) {
  const ink = dark ? "#ffffeb" : "#1a1a1a";

  return (
    <span
      className="inline-flex items-center gap-[9px]"
      aria-label="Danford Chriss"
    >
      {showMark && <Mark size={size} dark={dark} />}
      {showName && (
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: size * 0.79,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: ink,
          }}
        >
          <span style={{ fontWeight: 700 }}>Danford</span>
          <span style={{ fontWeight: 500, opacity: 0.55 }}> Chriss</span>
        </span>
      )}
    </span>
  );
}
