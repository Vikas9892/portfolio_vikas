import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon — the same VT monogram, sized for iOS. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0b 0%, #10201f 100%)",
          color: "#25d3bd",
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        VT
      </div>
    ),
    size,
  );
}
