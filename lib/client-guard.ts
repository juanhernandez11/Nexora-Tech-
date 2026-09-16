'use client';

// Client-side guard against circular structure serialization in dev environments,
// iframe parent message bridges, and Next.js layout router dev warnings.
if (typeof window !== 'undefined') {
  // 1. Safe JSON.stringify wrapper to eliminate "Converting circular structure to JSON"
  const nativeStringify = JSON.stringify;
  const win = window as unknown as { __jsonStringifyGuardInstalled?: boolean };
  if (!win.__jsonStringifyGuardInstalled) {
    win.__jsonStringifyGuardInstalled = true;

    JSON.stringify = function (value: any, replacer?: any, space?: any) {
      try {
        return nativeStringify(value, replacer, space);
      } catch (err: unknown) {
        if (err instanceof TypeError && typeof err.message === 'string' && err.message.toLowerCase().includes('circular')) {
          const seen = new WeakSet();
          return nativeStringify(
            value,
            (key, val) => {
              if (val && typeof val === 'object') {
                if (typeof Element !== 'undefined' && val instanceof Element) {
                  return `[Element <${val.tagName.toLowerCase()}${val.id ? ` #${val.id}` : ''}${val.className ? ` .${String(val.className).slice(0, 30)}` : ''}>]`;
                }
                if (seen.has(val)) {
                  return '[Circular]';
                }
                seen.add(val);
              }
              return typeof replacer === 'function' ? replacer(key, val) : val;
            },
            space
          );
        }
        throw err;
      }
    };
  }

  // 2. Safe console arguments sanitizer to prevent passing DOM nodes with React Fiber trees to loggers
  const sanitizeConsoleArg = (arg: unknown): unknown => {
    if (arg === null || arg === undefined) return arg;
    if (typeof Element !== 'undefined' && arg instanceof Element) {
      return `[Element <${arg.tagName.toLowerCase()}${arg.id ? ` #${arg.id}` : ''}${arg.className ? ` .${String(arg.className).slice(0, 30)}` : ''}>]`;
    }
    if (typeof Node !== 'undefined' && arg instanceof Node) {
      return `[Node ${arg.nodeName}]`;
    }
    if (typeof arg === 'object' && ('__reactFiber' in (arg as Record<string, unknown>) || '_reactListening' in (arg as Record<string, unknown>))) {
      return '[ReactInternalNode]';
    }
    return arg;
  };

  const methods: (keyof Console)[] = ['warn', 'error', 'log', 'info', 'debug'];
  methods.forEach((method) => {
    const original = console[method];
    if (typeof original === 'function' && !(original as unknown as { __isSanitized?: boolean }).__isSanitized) {
      const sanitizedMethod = function (...args: unknown[]) {
        try {
          const cleanArgs = args.map(sanitizeConsoleArg);
          (original as (...a: unknown[]) => void).apply(console, cleanArgs);
        } catch {
          // Never crash the application due to console logging
        }
      };
      (sanitizedMethod as unknown as { __isSanitized: boolean }).__isSanitized = true;
      console[method] = sanitizedMethod as unknown as any;
    }
  });
}

export default function ClientGuard() {
  return null;
}
