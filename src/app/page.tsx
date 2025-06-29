import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { createClient } from "../../supabase/server";
import {
  Music,
  Users,
  Heart,
  Headphones,
  MessageCircle,
  DollarSign,
} from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plans, error } = await supabase.functions.invoke(
    "supabase-functions-get-plans",
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-orange-500">Everything You Need</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Groovyy brings together the best of music streaming, community
              building, and artist monetization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Headphones className="w-6 h-6 text-orange-500" />,
                title: "Ad-Free Music",
                description: "Enjoy unlimited streaming without interruptions",
              },
              {
                icon: <Users className="w-6 h-6 text-orange-500" />,
                title: "Artist Connection",
                description: "Direct messaging and exclusive fan experiences",
              },
              {
                icon: <DollarSign className="w-6 h-6 text-orange-500" />,
                title: "Support Artists",
                description: "Subscriptions, tips, and beat marketplace",
              },
              {
                icon: <Music className="w-6 h-6 text-orange-500" />,
                title: "Personalized Playlists",
                description: "AI-powered recommendations just for you",
              },
              {
                icon: <MessageCircle className="w-6 h-6 text-orange-500" />,
                title: "Community Features",
                description: "Connect with fans and discover new music",
              },
              {
                icon: <Heart className="w-6 h-6 text-orange-500" />,
                title: "Exclusive Content",
                description:
                  "Access subscriber-only tracks and behind-the-scenes",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 transition-all duration-300 group hover:scale-105 hover:brightness-110 cursor-pointer"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-orange-500">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-zinc-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 text-orange-500">10K+</div>
              <div className="text-gray-300">Active Artists</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-orange-500">100K+</div>
              <div className="text-gray-300">Music Lovers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-orange-500">1M+</div>
              <div className="text-gray-300">Songs Streamed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-black" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-orange-500">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Choose the perfect plan for your needs. No hidden fees.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            {plans?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-orange-500">Join the Music Revolution</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Whether you're an artist looking to connect with fans or a music
            lover seeking the best experience, Groovyy is your home.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-8 py-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Your Journey
            <Music className="ml-2 w-5 h-5 text-white" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
