import { Headphones, Heart, Music, CheckCircle } from "lucide-react";

const features = [
  {
    icon: <Headphones size={32} className="text-orange-500 mb-4" />,
    title: "Unmatched Sound Quality",
    text: "Stream in lossless audio, always.",
  },
  {
    icon: <Heart size={32} className="text-orange-500 mb-4" />,
    title: "Direct Artist Support",
    text: "Support your favorite creators directly.",
  },
  {
    icon: <Music size={32} className="text-orange-500 mb-4" />,
    title: "Personalized Playlists",
    text: "AI-powered recommendations just for you.",
  },
  {
    icon: <CheckCircle size={32} className="text-orange-500 mb-4" />,
    title: "Ad-Free Listening",
    text: "Enjoy music without interruptions.",
  },
];

export default function WhyGroovyy() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-orange-500 text-center">Why Groovyy?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-zinc-900 rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:scale-105 hover:brightness-110 cursor-pointer border border-zinc-800"
            >
              {f.icon}
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-gray-300 text-base">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 