/**
 * Visually hidden text announcing that a link opens in a new tab.
 * Prefer embedding this inside the link, or fold into aria-label for icon-only links.
 */
export function NewTabHint() {
  return <span className="visually-hidden"> (opens in a new tab)</span>;
}

export default function ExternalLink({
  href,
  children,
  className,
  'aria-label': ariaLabel,
  ...props
}) {
  const label = ariaLabel
    ? `${ariaLabel} (opens in a new tab)`
    : undefined;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
      aria-label={label}
    >
      {children}
      {!ariaLabel ? <NewTabHint /> : null}
    </a>
  );
}
