export type MimeType = string;

export function detectMime(filePath: string): MimeType {
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  if (filePath.endsWith(".gif")) return "image/gif";
  if (filePath.endsWith(".webp")) return "image/webp";
  if (filePath.endsWith(".pdf")) return "application/pdf";
  return "application/octet-stream";
}

export const MEDIA_EXTENSIONS = {
  image: [".png", ".jpg", ".jpeg", ".gif", ".webp"],
  document: [".pdf"],
  audio: [".mp3", ".wav", ".m4a"],
  video: [".mp4", ".mov", ".webm"],
};
