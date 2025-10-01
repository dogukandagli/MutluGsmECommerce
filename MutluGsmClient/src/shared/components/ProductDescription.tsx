export default function ProductDescription({ html }: { html?: string }) {
  if (!html) return null;

  return (
    <div
      // (İstersen ek stiller)
      style={{ lineHeight: 1.6, wordBreak: "break-word" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
