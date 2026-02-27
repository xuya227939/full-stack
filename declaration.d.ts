declare function gtag(...args: any[]): void;

// Clarity
interface Window {
  clarity?: (action: string, ...args: any[]) => void;
}
