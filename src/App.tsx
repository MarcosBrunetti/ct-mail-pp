import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "./contexts/AuthContext"
import { Routes } from "./routes"

const queryClient = new QueryClient()

export function App(){
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
     </AuthProvider>
    </QueryClientProvider>
  )
}