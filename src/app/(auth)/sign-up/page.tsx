"use client";

import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { signUpAction } from "@/app/actions";
import Navbar from "@/components/navbar";
import { Music } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup(props: { searchParams: Message }) {
  const searchParams = props.searchParams;
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  const handleSignUp = async (formData: FormData) => {
    setIsLoading(true);
    
    try {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const fullName = formData.get('fullName') as string;

      if (!email || !password || !fullName) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Call the server action
      const result = await signUpAction(formData);
      
      if (result.success) {
        if (result.requiresConfirmation) {
          // Show email confirmation toast
          toast({
            title: "Account Created! 🎉",
            description: "Please check your email to confirm your account. You'll be redirected to sign in shortly.",
            duration: 4000,
          });

          // Redirect to sign-in after 4 seconds
          setTimeout(() => {
            router.push('/sign-in');
          }, 4000);
        } else if (result.redirectTo) {
          // Show success toast and redirect
          toast({
            title: "Account Created! 🎉",
            description: "Redirecting to role selection...",
            duration: 2000,
          });

          setTimeout(() => {
            router.push(result.redirectTo);
          }, 2000);
        }
      }

    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <h1 className="text-3xl font-bold">
              <span className="text-orange-500">J</span><span className="text-orange-500">oin</span> <span className="text-orange-500">G</span><span className="text-orange-500">r</span><span className="text-white">oo</span><span className="text-orange-500">vyy</span>
            </h1>
            <p className="text-sm text-gray-300 mt-2">
              Create your account and start your musical journey
            </p>
          </div>

          <form className="flex flex-col space-y-6" onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            await handleSignUp(formData);
          }}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-white">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full bg-white border-gray-300 text-zinc-900 placeholder:text-zinc-500"
                />
              </div>

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
                <Label htmlFor="password" className="text-sm font-medium text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  minLength={6}
                  required
                  className="w-full bg-white border-gray-300 text-zinc-900 placeholder:text-zinc-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isLoading ? "Creating Account..." : "Sign up"}
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-300">
                Already have an account?{' '}
                <Link href="/sign-in" className="text-orange-500 hover:underline">Sign in</Link>
              </p>
            </div>

            <FormMessage message={searchParams} />
          </form>
        </div>
        <SmtpMessage />
      </div>
    </>
  );
}
