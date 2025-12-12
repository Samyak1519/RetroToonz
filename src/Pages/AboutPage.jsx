import React from 'react';
import { Film, Tv, Sparkles, Heart, ArrowRight, Instagram, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const logoSrc = "/public/media/extras/retrotoonz_full_image.png";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#1a0505] text-[#f4e4bc] font-sans selection:bg-[#d4af37] selection:text-[#1a0505]">

            {/* --- Navigation (Simple) --- */}
            <nav className="w-full py-6 px-4 md:px-12 flex justify-between items-center border-b border-[#d4af37]/20">

                <Link to="/">
                    <div className="text-2xl font-serif font-bold tracking-wider text-[#d4af37]">RetroToonz</div>
                </Link>
                <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase opacity-80">
                    <a href="#" className="text-[#d4af37]">About</a>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <section className="relative w-full py-10 md:py-24 flex flex-col items-center text-center overflow-hidden">
                {/* Background Decorative Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                {/* Glow effect behind logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37] rounded-full blur-[120px] opacity-10"></div>

                {/* Main Logo Image */}
                <div className="relative z-10 mb-8 transform hover:scale-105 transition-transform duration-700 ease-out">
                    <img
                        src={logoSrc}
                        alt="RetroToonz Emblem"
                        className="w-82 md:w-96 mx-auto drop-shadow-2xl cursor-pointer"
                    />
                </div>

                <h1 className="relative z-10  text-4xl md:text-6xl font-serif font-bold text-[#d4af37] mb-6 tracking-wide drop-shadow-lg">
                    Restoring the Golden Age
                </h1>
                <p className="relative z-10 max-w-2xl px-6 text-lg md:text-xl leading-relaxed text-[#f4e4bc]/80">
                    We don't just preserve the past; we remix it. Welcome to the home of
                    nostalgia, vintage animation, and digital art reimagined.
                </p>
            </section>

            {/* --- The Story Section --- */}
            <section className="w-full max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-[#d4af37] font-serif text-xl">
                        <Sparkles size={20} />
                        <span>Who We Are</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
                        Classic Vibes. <br /> Modern Soul.
                    </h2>
                    <p className="text-[#f4e4bc]/70 leading-relaxed text-lg">
                        RetroToonz was born from a love of Saturday morning cartoons, 8-bit adventures, and the vibrant ink-and-paint aesthetic of the 20th century. We exist to keep that spirit alive.
                    </p>
                    <p className="text-[#f4e4bc]/70 leading-relaxed text-lg">
                        Whether it’s through original artwork, apparel, or digital content, RetroToonz bridges the gap between the cherished memories of your childhood and the style of today.
                    </p>


                    {/*<div className="pt-4">
                        <button className="group flex items-center gap-3 px-8 py-3 bg-[#d4af37] text-[#1a0505] font-bold uppercase tracking-wider hover:bg-[#b59226] transition-all">
                            See The Gallery
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div> */}
                </div>

                {/* Decorative Graphic Side - FIXED LAYOUT */}
                <div className="relative border-4 border-[#d4af37]/30 p-4 rounded-tr-[3rem] rounded-bl-[3rem]">
                    {/* Background tint inside the border */}
                    <div className="absolute inset-0 bg-[#d4af37]/5 rounded-tr-[3rem] rounded-bl-[3rem]"></div>

                    {/* Grid with 2 Columns for true Masonry layout */}
                    <div className="grid grid-cols-2 gap-4 relative z-10">

                        {/* COLUMN 1: Vintage (Big) -> Art Remix (Small) */}
                        <div className="flex flex-col gap-4">
                            {/* Vintage Style - BIG BLOCK */}
                            <div className="bg-[#2a0a0a] rounded-lg border border-[#d4af37]/20 flex flex-col items-center justify-center text-center gap-3 h-60 hover:bg-[#3a0e0e] transition-colors group cursor-pointer">
                                <Film size={36} className="text-[#d4af37] group-hover:scale-110 transition-transform" />
                                <span className="font-serif text-lg text-[#f4e4bc] group-hover:text-[#d4af37]">Vintage Style</span>
                            </div>

                            {/* Art Remix - SMALL BLOCK */}
                            <div className="bg-[#2a0a0a] rounded-lg border border-[#d4af37]/20 flex flex-col items-center justify-center text-center gap-3 h-36 hover:bg-[#3a0e0e] transition-colors group cursor-pointer">
                                <Sparkles size={32} className="text-[#d4af37] group-hover:scale-110 transition-transform" />
                                <span className="font-serif text-lg text-[#f4e4bc] group-hover:text-[#d4af37]">Art Remix</span>
                            </div>
                        </div>

                        {/* COLUMN 2: Cartoons (Small) -> Nostalgia (Big) */}
                        <div className="flex flex-col gap-4">
                            {/* Cartoons - SMALL BLOCK */}
                            <div className="bg-[#2a0a0a] rounded-lg border border-[#d4af37]/20 flex flex-col items-center justify-center text-center gap-3 h-36 hover:bg-[#3a0e0e] transition-colors group cursor-pointer">
                                <Tv size={32} className="text-[#d4af37] group-hover:scale-110 transition-transform" />
                                <span className="font-serif text-lg text-[#f4e4bc] group-hover:text-[#d4af37]">Cartoons</span>
                            </div>

                            {/* Nostalgia - BIG BLOCK */}
                            <div className="bg-[#2a0a0a] rounded-lg border border-[#d4af37]/20 flex flex-col items-center justify-center text-center gap-3 h-60 hover:bg-[#3a0e0e] transition-colors group cursor-pointer">
                                <Heart size={36} className="text-[#d4af37] group-hover:scale-110 transition-transform" />
                                <span className="font-serif text-lg text-[#f4e4bc] group-hover:text-[#d4af37]">Nostalgia</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- Divider --- */}
            <div className="w-full flex justify-center items-center gap-4 opacity-30 py-8">
                <div className="h-[1px] w-32 bg-[#d4af37]"></div>
                <div className="text-[#d4af37] text-2xl font-serif">✦</div>
                <div className="h-[1px] w-32 bg-[#d4af37]"></div>
            </div>

            {/* --- Mission / Values --- */}
            <section className="w-full max-w-5xl mx-auto px-6 py-16 text-center">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#d4af37] mb-12">
                    "Stay Curious. Stay Adventurous."
                </h3>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "The Legacy",
                            desc: "Honoring the bold lines, wacky characters, and 'anything is possible' attitude of vintage animation."
                        },
                        {
                            title: "The Craft",
                            desc: "Blending old-school aesthetics with modern design tools to create something entirely unique."
                        },
                        {
                            title: "The Community",
                            desc: "Building a tribe of people who still believe that cartoons are cool at any age."
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-[#1f0707] p-8 border border-[#d4af37]/10 hover:border-[#d4af37]/50 transition-all duration-300 rounded-lg group">
                            <h4 className="text-xl font-serif font-bold text-[#f4e4bc] mb-4 group-hover:text-[#d4af37] transition-colors">{item.title}</h4>
                            <p className="text-[#f4e4bc]/60 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Footer --- */}
            <footer className="w-full mt-20 border-t border-[#d4af37]/20 bg-[#120303] py-12">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">

                    <div className="text-center md:text-left">
                        <h5 className="text-2xl font-serif font-bold text-[#d4af37]">RetroToonz</h5>
                        <p className="text-sm text-[#f4e4bc]/50 mt-2">© 2024 RetroToonz. All Rights Reserved.</p>
                    </div>

                    <div className="flex gap-6">
                        <a href="#" className="p-2 bg-[#d4af37]/10 rounded-full hover:bg-[#d4af37] hover:text-[#1a0505] transition-all text-[#d4af37]">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="p-2 bg-[#d4af37]/10 rounded-full hover:bg-[#d4af37] hover:text-[#1a0505] transition-all text-[#d4af37]">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="p-2 bg-[#d4af37]/10 rounded-full hover:bg-[#d4af37] hover:text-[#1a0505] transition-all text-[#d4af37]">
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutPage;