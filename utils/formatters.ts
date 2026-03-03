import { format, parseISO, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const formatUrlToDomain = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname.replace("www.", "");
  } catch (error) {
    return url;
  }
};

export function timeAgo(isoDate: string): string {
  const date = parseISO(isoDate);
  return formatDistanceToNow(date, { addSuffix: true, locale: es });
}
