import { createContext, useCallback, useContext, useRef, useState } from 'react';
import destinations from '../data/destinations';

const DestinationContext = createContext(null);

export function DestinationProvider({ children }) {
  const [active, setActive] = useState(0);
  // DOMRect of the card the user clicked — the hero background "flows" out of it
  const originRef = useRef(null);
  // timestamp of the last *user* selection, used to pause auto-advance
  const lastUserActionRef = useRef(0);

  const select = useCallback((index, originRect = null, { user = true } = {}) => {
    originRef.current = originRect;
    if (user) lastUserActionRef.current = Date.now();
    setActive((prev) => {
      const next = ((index % destinations.length) + destinations.length) % destinations.length;
      return next === prev ? prev : next;
    });
  }, []);

  return (
    <DestinationContext.Provider value={{ active, select, originRef, lastUserActionRef }}>
      {children}
    </DestinationContext.Provider>
  );
}

export function useDestination() {
  return useContext(DestinationContext);
}
