import { Logo } from "@/components/layout/logo";
import {
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from "@/components/shared/typography";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import Link from "next/link";
import SignUpForm from "./sign-up-form";

interface SignUpParams {
  referralCode?: string;
}

export default function SignUp({ referralCode }: SignUpParams) {
  return (
    <div className="relative w-full overflow-y-auto overflow-x-hidden px-4 md:h-screen">
      <div className="relative mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center border-x *:px-6">
        <div className="flex flex-col space-y-6">
          <Logo />
          <div className="space-y-1">
            <TypographyH4>Join Now!</TypographyH4>
            <TypographyP className="text-muted-foreground not-first:mt-0">
              Fill in the form below to create your account.
            </TypographyP>
          </div>
        </div>
        <div className="relative my-6 flex size-full flex-col gap-4 py-8">
          <FullWidthDivider position="top" />
          <SignUpForm referralCode={referralCode} />
          <TypographyMuted className="text-center">
            Already have an account?{" "}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="/sign-in"
            >
              Sign in
            </Link>
          </TypographyMuted>
          <FullWidthDivider position="bottom" />
        </div>
        <TypographyMuted className="text-center">
          By clicking continue, you agree to our
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="/terms-of-service"
          >
            Terms of Service
          </Link>{" "}
          apply.
        </TypographyMuted>
      </div>
    </div>
  );
}
