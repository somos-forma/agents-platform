import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("user-token");
  const { pathname } = req.nextUrl;

  // 🧩 Si no hay cookie → usuario no autenticado
  if (!cookie) {
    // solo puede acceder al login ("/")
    if (pathname !== "/") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // 🧠 Intentar parsear la cookie
  let user: any = null;
  try {
    user = JSON.parse(cookie.value);
  } catch {
    // si la cookie está dañada, eliminarla y mandar al login
    const res = NextResponse.redirect(new URL("/", req.url));
    res.cookies.delete("user-token");
    return res;
  }

  // 🚪 Si ya está logueado y entra a "/", lo mandamos a su área
  if (pathname === "/") {
    if (user.rol === "user") {
      return NextResponse.redirect(new URL("/chat", req.url));
    }
    if (user.rol === "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // 🔐 Si intenta acceder a una sección que no le corresponde
  if (user.rol === "user" && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  if (user.rol === "admin" && pathname.startsWith("/chat")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Middleware se aplica a las rutas principales
export const config = {
  matcher: ["/", "/chat/:path*", "/dashboard/:path*"],
};
