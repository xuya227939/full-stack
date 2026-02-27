import { Moon, Sun } from 'lucide-react';
import { useTheme } from './provider';

export function ThemeToggle() {
    const { antualTheme, setTheme } = useTheme();

    return (
        <button
            aria-label="Toggle theme mode"
            type="button"
            className="text-foreground hover:bg-muted cursor-pointer rounded-md transition-colors"
            onClick={() => setTheme(antualTheme === 'light' ? 'dark' : 'light')}
        >
            {antualTheme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
        </button>
    );
}
