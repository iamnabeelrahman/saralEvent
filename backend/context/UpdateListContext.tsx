// src/app/_context/UpdateListContext.tsx
'use client';

import { createContext, useContext } from 'react';

// Define the context and types
export const UpdateListContext = createContext({
  updateList: false,
  setUpdateList: (update: boolean) => {},
});

export function useUpdateList() {
  return useContext(UpdateListContext);
}
