export function getDataOrNA(data: any) {
  if (data) {
    return data;
  }
  return "N/A";
}