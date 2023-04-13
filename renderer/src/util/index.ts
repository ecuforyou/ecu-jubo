export function As2DString(data?: any[][] | null) {
  return data as string[][];
}

export function log(data: any) {
  console.log(`[${new Date()}]`, data);
}
