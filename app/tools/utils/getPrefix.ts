export function getPrefix(name: string): string {
  return `/api/v2/${name}`;
}

export function getMCPPrefix(name: string): string {
  return `${getPrefix(name)}/mcp`;
}
