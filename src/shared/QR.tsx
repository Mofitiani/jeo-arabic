import { useEffect, useState } from "react";
import QRCode from "qrcode";

// Room QR code (black on white), as an image
export function QR({ text, size, className }: { text: string; size: number; className?: string }) {
  const [src, setSrc] = useState("");
  useEffect(() => { QRCode.toDataURL(text, { width: size, margin: 0, color: { dark: "#111111", light: "#FFFFFF" }, errorCorrectionLevel: "M" }).then(setSrc).catch(() => setSrc("")); }, [text, size]);
  return src ? <img className={className} src={src} alt="QR" /> : null;
}
