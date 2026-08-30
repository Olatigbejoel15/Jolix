import { ImageResponse } from "next/og";

// These two exports are how Next.js knows this file produces an Open
// Graph image, and at what size — same "special filename" convention
// as icon.svg for the favicon, just for a different purpose.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0c1b33",
        }}
      >
        {/* The van — same shapes as DeliveryScene and icon.svg, scaled up */}
        <svg width="140" height="76" viewBox="0 0 52 28">
          <rect x="2" y="4" width="30" height="16" rx="2" fill="white" />
          <path d="M32 8 H44 L48 14 V20 H32 Z" fill="#ff6a3d" />
          <path d="M34 10 H41 L44 14 H34 Z" fill="#0c1b33" />
          <circle cx="12" cy="22" r="4" fill="#0c1b33" stroke="white" strokeWidth="1.5" />
          <circle cx="38" cy="22" r="4" fill="#0c1b33" stroke="white" strokeWidth="1.5" />
        </svg>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 32,
            fontSize: 64,
            fontWeight: 700,
            color: "white",
          }}
        >
          Jolix
        </div>

        <div style={{ marginTop: 12, fontSize: 26, color: "#ff6a3d" }}>
          Track every delivery, live.
        </div>
      </div>
    ),
    { ...size }
  );
}