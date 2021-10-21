import React, { useContext, useMemo } from 'react';

const ThemeContext = React.createContext({});
const { Provider } = ThemeContext;

function ThemeProvider({ prefixes, children }) {
  const copiedPrefixes = useMemo(() => ({ ...prefixes }), [prefixes]);

  return <Provider value={copiedPrefixes}>{children}</Provider>;
}

export function useBootstrapPrefix(prefix, defaultPrefix) {
  const prefixes = useContext(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}

export default ThemeProvider;
