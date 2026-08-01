import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon — the VT monogram in the accent colour. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0b",
          color: "#25d3bd",
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          borderRadius: 7,
        }}
      >
        VT
      </div>
    ),
    size,
  );
}
