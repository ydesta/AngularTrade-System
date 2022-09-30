export function determineId(id: any): string {
  if (id.constructor.name === 'array' && id.length > 0) {
    return '' + id[0];
  }
  return '' + id;
}
