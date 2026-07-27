/**
 * A browser window drawn in CSS — traffic lights, tab, address bar — used to
 * present the real screenshots of each case-study page. Everything here is
 * chrome, not content: it is hidden from assistive tech, and the screenshot
 * inside carries the alt text.
 */
export default function BrowserFrame({
  domain,
  title,
  children,
}: {
  domain: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bw">
      <div className="bw-bar" aria-hidden>
        <span className="bw-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="bw-tab">{title}</span>
        <span className="bw-url">
          <span className="bw-lock" />
          <span className="bw-host">
            <b>https://</b>
            {domain}
          </span>
        </span>
      </div>
      <div className="bw-view">{children}</div>
    </div>
  );
}
