export function backendDomain() {
  const schema = process.env.NEXT_PUBLIC_BACKEND_SCHEMA;
  const host = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const port = process.env.NEXT_PUBLIC_BACKEND_PORT;
  return `${schema}://${host}:${port}`;
}
