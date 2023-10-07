export const  filterParams = (params: {[key: string]: string | string[]}, except: string[] = []) => {
  const result: {[key: string]: string | string[]} = {};
  
    for(const key in params) {
      if(!except.includes(key)) {
        result[key] = params[key];
      }
    }

  return result;
}
