export function handleError(errorResponse, status, isNetWorkError = false) {
  if (isNetWorkError) {
    return {
      code: "NETWORK_ERROR",
      message:
        "Imposible conectar con el servidor. Revisa tu conexión a internet.",
    };
  }

  if (status === 401 || status === 403) {
    return {
      code: "AUTH_REQUIRED",
      message: "Tu sesión ha expirado o no tienes permiso.",
    };
  }

  if (status >= 400 && errorResponse && errorResponse.message) {
    return {
      code: "VALIDATION_ERROR",
      message: `Datos inválidos: ${errorResponse.message}`,
    };
  }

  if (status >= 500) {
    return {
      code: "SERVER_FAULT",
      message:
        "Error interno del servidor. Nuestros ingenieros ya están avisados.",
    };
  }

  return { code: "UNKNOWN_ERROR", message: "Ha ocurrido un error inesperado." };
}
