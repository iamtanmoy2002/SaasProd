import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black w-full flex flex-col items-center justify-center min-h-[60vh]">
      {/* Animated dark background with orange hint */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-900 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-800 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-96 h-96 bg-orange-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-20 gap-12">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-8">
            Join<br />
            The Ultimate<br />
            <span className="text-orange-500">Music Community</span>
          </h1>
          <Link
            href="/sign-up"
            className="inline-block px-6 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-all duration-300 text-base font-semibold shadow-md hover:shadow-lg"
          >
            Sign Up
          </Link>
        </div>
        {/* Right: Placeholder for future image */}
        {/* <div className="flex-1 flex items-center justify-center"></div> */}
      </div>
    </section>
  );
}
