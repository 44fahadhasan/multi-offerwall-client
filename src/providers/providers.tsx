import { ThemeProvider } from "next-themes";
import ReactQueryProviders from "./react-query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider enableSystem attribute="class" defaultTheme="system">
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </ThemeProvider>
    </>
  );
}
