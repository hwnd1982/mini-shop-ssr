import { ParsedUrlQuery } from "querystring";

export const getSearchParams = (params: ParsedUrlQuery, except: string[] = []) => {
  const searchParams = new URLSearchParams();
    
  for (const key in params) {
    const value = params[key] || '';

    if (!Array.isArray(value) && !except.includes(key)) {
      searchParams.append(key,  value);
    }
  }

  return searchParams;
}
