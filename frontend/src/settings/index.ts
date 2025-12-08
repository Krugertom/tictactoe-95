// Note: Had issues with envarna on vite, so I moved to a basic settings wrapper
export const settings = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/',
};
