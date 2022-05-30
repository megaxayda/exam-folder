export default function generateBreadcrumb(selectedId, data) {
  if (data.id === selectedId) {
    return [data];
  }

  if (data.children) {
    for (const e of data.children) {
      const nextPath = generateBreadcrumb(selectedId, e);
      if (nextPath) {
        return [data, ...nextPath];
      }
    }
  }

  return null;
}
