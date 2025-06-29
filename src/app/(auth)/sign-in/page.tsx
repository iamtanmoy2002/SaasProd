import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import Navbar from "@/components/navbar";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Music } from "lucide-react";
import AuthDebug from "@/components/auth-debug";

interface LoginProps {
  searchParams: Promise<Message>;
}

export default async function SignInPage({ searchParams }: LoginProps) {
  const message = await searchParams;

  if ("message" in message) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 py-8 pt-32 relative overflow-hidden">
        {/* Animated dark background with orange hint */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-900 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-800 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-96 h-96 bg-orange-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div className="w-full max-w-md rounded-xl bg-zinc-900 p-8 shadow-xl relative z-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Music className="h-8 w-8 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-orange-500">Welcome Back</h1>
            <p className="text-sm text-gray-300 mt-2">
              Sign in to your Groovyy account
            </p>
          </div>

          <form className="flex flex-col space-y-6" action={signInAction}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full bg-white border-gray-300 text-zinc-900 placeholder:text-zinc-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium text-white">
                    Password
                  </Label>
                  <Link
                    className="text-xs text-orange-500 hover:text-orange-600 hover:underline transition-all"
                    href="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  required
                  className="w-full bg-white border-gray-300 text-zinc-900 placeholder:text-zinc-500"
                />
              </div>
            </div>

            <SubmitButton
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              pendingText="Signing in..."
            >
              Sign in
            </SubmitButton>

            <div className="text-center">
              <p className="text-sm text-gray-300">
                Don't have an account?{" "}
                <Link
                  className="text-orange-500 font-medium hover:text-orange-600 hover:underline transition-all"
                  href="/sign-up"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <FormMessage message={message} />
          </form>
        </div>
        
        {/* Debug component - remove this after fixing issues */}
        <div className="mt-8 max-w-md">
          <AuthDebug />
        </div>
      </div>
    </>
  );
}
