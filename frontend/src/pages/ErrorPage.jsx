import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground px-4 text-center">
            <h1 className="text-6xl font-bold mb-4 text-primary">Oops!</h1>
            <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
            <p className="text-muted-foreground mb-8 text-lg">
                <i>{error?.statusText || error?.message || "Page not found"}</i>
            </p>
            <Link 
                to="/" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md font-medium transition-colors"
            >
                Go back to home
            </Link>
        </div>
    );
}
