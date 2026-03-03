export const login = async (email: string, password: string) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Failed to login user");
    const data = await response.json();
    if (data.status === "404") throw new Error(data.message);
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const logout = async () => {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) throw new Error("Failed to logout user");
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await fetch("/api/auth/me", {
      method: "GET",
    });

    if (!response.ok) throw new Error("Failed to fetch current user");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};
