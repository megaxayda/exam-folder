export default function getFolderData(selectedId, data) {
  if (data.id === selectedId) {
    return data;
  }

  if (data.children) {
    for (const e of data.children) {
      const nextPath = getFolderData(selectedId, e);
      if (nextPath) {
        return nextPath;
      }
    }
  }

  return null;
}
