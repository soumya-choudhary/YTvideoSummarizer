import { Button } from "../../../ui/button";
export const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title,
}) => (
    <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        title={title}
        type="button"
        aria-pressed={isActive}
        className={`h-9 w-9 p-0 ${isActive
            ? "bg-muted text-black dark:text-white"
            : "text-muted-foreground"
            }`}
    >
        {children}
    </Button>
);