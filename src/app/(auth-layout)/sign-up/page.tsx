import SignUp from "@/components/modules/sign-up";

interface SignInParams {
  searchParams: Promise<{ referralCode?: string }>;
}

export default async function SignUpPage({ searchParams }: SignInParams) {
  const { referralCode } = await searchParams;

  return <SignUp referralCode={referralCode} />;
}
