import "./styles.css";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import "@workspace/ui/globals.css";
import ReactDOM from "react-dom/client";
import { handleUnauthorized } from "./domains/shared/utils/handle-unauthorized";
import { getRouter } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: 1000 * 60 * 30
    }
  },
  queryCache: new QueryCache({
    onError: error => handleUnauthorized(error, router, queryClient)
  }),
  mutationCache: new MutationCache({
    onError: (error): void => handleUnauthorized(error, router, queryClient)
  })
});

const router = getRouter(queryClient);

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
