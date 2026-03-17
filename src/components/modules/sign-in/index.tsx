import { Logo } from "@/components/layout/logo";
import {
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from "@/components/shared/typography";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import Link from "next/link";
import SignInForm from "./sign-in-form";

interface SignInParams {
  redirectPath?: string;
}

export default function SignIn({ redirectPath }: SignInParams) {
  return (
    <div className="relative w-full overflow-y-auto overflow-x-hidden px-4 md:h-screen">
      <div className="relative mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center border-x *:px-6">
        <div className="flex flex-col space-y-6">
          <Logo />
          <div className="space-y-1">
            <TypographyH4>Hey, welcome!</TypographyH4>
            <TypographyP className="text-muted-foreground not-first:mt-0">
              Enter your credentials to sign in.
            </TypographyP>
          </div>
        </div>
        <div className="relative my-6 flex size-full flex-col gap-4 py-8">
          <FullWidthDivider position="top" />
          <SignInForm redirectPath={redirectPath} />
          <TypographyMuted className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="/sign-up"
            >
              Sign up
            </Link>
          </TypographyMuted>
          <FullWidthDivider position="bottom" />
        </div>
      </div>
    </div>
  );
}
