import { generate } from 'short-uuid';

export const createDb = <T extends {id: string}>(initial: T[]) => {
  let data = initial;

  return {
    create(item: Omit<T, 'id'>) {
      const created = {
        ...structuredClone(item), 
        id: generate() as string
      } as T;
      data = [...data, created];
      return created;
    },
    read(id: string) {
      const found = data.find(item => item.id === id);
      return found
        ? structuredClone(found)
        : null
    },
    readAll() {
      return structuredClone(data);
    },
    update(id: string, updates: Partial<Omit<T, 'id'>>) {
      const found = data.find(item => item.id === id);
      if (!found) { return null };
      const updated = structuredClone({
        ...found,
        ...updates
      })
      data = data.map(item => item.id === id ? updated : item)
      return updated;
    },
    delete(id: string) {
      data = data.filter(item => item.id !== id);
      return null;
    }
  }
}