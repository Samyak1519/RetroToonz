import React from 'react';
import { Film, Tv, Sparkles, Heart, Instagram, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const logoSrc = "/media/extras/retrotoonz_full_image.png";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#020617] text-[#e2e8f0] font-sans selection:bg-[#3b82f6] selection:text-[#ffffff]">

            {/* --- Navigation --- */}
            <nav className="w-full py-6 px-4 md:px-12 flex justify-between items-center border-b border-[#1e293b]/50 bg-[#020617]/50 backdrop-blur-md sticky top-0 z-50">
                <Link to="/">
                    {/* Metallic Silver-Blue Gradient Text */}
                    <div className="text-2xl md:text-4xl font-royal font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8f84c0] via-[#eba550] to-[#b7ce88] hover:opacity-80 transition-opacity">
                        RetroToonz
                    </div>
                </Link>
                <div className="hidden md:flex gap-8 text-sm font-medium tracking-[0.2em] uppercase opacity-90">
                    <p className="text-[#bfdbfe] font-body font-bold text-sm md:text-base  pb-1">About Us</p>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            {/* CHANGED: Reduced top padding from 'py-16 md:pt-20' to 'pt-10 md:pt-6' to remove empty space */}
            <section className="relative w-full pt-10 pb-16 md:pt-6 md:pb-32 flex flex-col items-center text-center overflow-hidden">

                {/* 1. Base Background Color (Deep Blue) */}
                <div className="absolute inset-0 bg-[#020617]"></div>

                {/* 2. THE RETRO GRID PATTERN */}
                <div
                    className="absolute inset-0 z-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                ></div>

                {/* 3. Radial Vignette */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)] pointer-events-none"></div>

                {/* 4. Central Spotlight Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#15419f] rounded-full blur-[200px] opacity-25 z-0"></div>

                {/* Main Logo */}
                {/* You can also add '-mt-4' here if you want it even higher */}
                <div className="relative z-10 mb-12 transform hover:scale-[1.02] transition-transform duration-1000 ease-out w-full md:w-auto">
                    <img
                        src={logoSrc}
                        alt="RetroToonz Emblem"
                        className="w-full md:w-[500px] md:rounded-2xl mx-auto drop-shadow-[0_25px_50px_rgba(29,78,216,0.35)] cursor-pointer"
                    />
                </div>

                {/* Headline */}
                <h1 className="relative z-10 text-3xl md:text-4xl font-royal font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] to-[#d4af37] mb-8 drop-shadow-xl leading-tight">
                    RESTORING <br />
                    <span className="text-transparent text-4xl md:text-5xl bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#f5eea4] to-[#bf953f] drop-shadow-[0_2px_2px_rgba(191,149,63,0.4)]">
                        The Golden Age
                    </span>
                </h1>

                <p className="relative z-10 max-w-2xl px-8 text-base md:text-lg leading-relaxed text-slate-400 font-body font-medium tracking-wide">
                    We don't just preserve the past; we remix it. <br className="hidden md:block" />
                    Welcome to the home of nostalgia, vintage animation, and digital art reimagined.
                </p>
            </section>

            {/* --- The Story Section --- */}
            <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-16 md:gap-24 items-center relative">

                {/* Text Content */}
                <div className="space-y-8 relative z-10">
                    <div className="flex items-center gap-4 text-[#60a5fa] font-royal text-lg tracking-widest uppercase font-bold">
                        <div className="h-[1px] w-12 bg-[#60a5fa]/50"></div>
                        <span>Who We Are</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-royal font-bold leading-tight text-white">
                        CLASSIC VIBES. <br />
                        <span className="text-[#93c5fd] italic">MODERN SOUL.</span>
                    </h2>

                    <div className="space-y-6 font-body text-lg text-[#cbd5e1] leading-relaxed font-light">
                        <p>
                            RetroToonz was born from a love of Saturday morning cartoons, 8-bit adventures, and the vibrant ink-and-paint aesthetic of the 20th century. We exist to keep that spirit alive.
                        </p>
                        <p>
                            Whether it’s through original artwork, apparel, or digital content, RetroToonz bridges the gap between the cherished memories of your childhood and the style of today.
                        </p>
                    </div>
                </div>

                {/* Decorative Graphic Side - SYMMETRICAL GRID */}
                {/* CHANGES:
                 1. Removed 'mt-8' from the second column to align it perfectly with the top.
                 2. Set ALL cards to 'h-48'. This ensures the Top of both columns (and the bottom) are equal height.
                 3. Reduced container padding to 'p-3' for a tighter fit without cutting corners.
                */}
                <div className="relative border border-[#334155]/30 bg-[#0f172a]/30 backdrop-blur-sm p-3 rounded-tr-3xl rounded-bl-3xl shadow-[0_0_60px_-15px_rgba(30,58,138,0.2)]">

                    {/* Inner Grid */}
                    <div className="grid grid-cols-2 gap-3 relative z-10">

                        {/* COLUMN 1 */}
                        <div className="flex flex-col gap-3">
                            {/* Vintage Style - TOP LEFT */}
                            <div className="bg-[#0b1121] hover:bg-[#111827] border border-[#1e293b] hover:border-[#60a5fa]/40 rounded-2xl flex flex-col items-center justify-center text-center gap-4 h-48 transition-all duration-500 group cursor-pointer shadow-lg">
                                <Film strokeWidth={1.5} size={40} className="text-[#64748b] group-hover:text-[#93c5fd] group-hover:scale-110 transition-all duration-500" />
                                <span className="font-royal text-lg text-[#cbd5e1] group-hover:text-white tracking-widest">VINTAGE</span>
                            </div>

                            {/* Remix - BOTTOM LEFT */}
                            <div className="bg-[#0b1121] hover:bg-[#111827] border border-[#1e293b] hover:border-[#60a5fa]/40 rounded-2xl flex flex-col items-center justify-center text-center gap-4 h-48 transition-all duration-500 group cursor-pointer shadow-lg">
                                <Sparkles strokeWidth={1.5} size={34} className="text-[#64748b] group-hover:text-[#93c5fd] group-hover:scale-110 transition-all duration-500" />
                                <span className="font-royal text-lg text-[#cbd5e1] group-hover:text-white tracking-widest">REMIX</span>
                            </div>
                        </div>

                        {/* COLUMN 2 */}
                        {/* REMOVED 'mt-8' here. Now it starts at the top. */}
                        <div className="flex flex-col gap-3">
                            {/* Toonz - TOP RIGHT */}
                            {/* Changed height to h-48 to match the left side */}
                            <div className="bg-[#0b1121] hover:bg-[#111827] border border-[#1e293b] hover:border-[#60a5fa]/40 rounded-2xl flex flex-col items-center justify-center text-center gap-4 h-48 transition-all duration-500 group cursor-pointer shadow-lg">
                                <Tv strokeWidth={1.5} size={34} className="text-[#64748b] group-hover:text-[#93c5fd] group-hover:scale-110 transition-all duration-500" />
                                <span className="font-royal text-lg text-[#cbd5e1] group-hover:text-white tracking-widest">TOONZ</span>
                            </div>

                            {/* Nostalgia - BOTTOM RIGHT */}
                            {/* Changed height to h-48 to match the left side */}
                            <div className="bg-[#0b1121] hover:bg-[#111827] border border-[#1e293b] hover:border-[#60a5fa]/40 rounded-2xl flex flex-col items-center justify-center text-center gap-4 h-48 transition-all duration-500 group cursor-pointer shadow-lg">
                                <Heart strokeWidth={1.5} size={40} className="text-[#64748b] group-hover:text-[#93c5fd] group-hover:scale-110 transition-all duration-500" />
                                <span className="font-royal text-lg text-[#cbd5e1] group-hover:text-white tracking-widest">NOSTALGIA</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- Footer --- */}
            <footer className="w-full mt-20 border-t border-[#1e293b] bg-[#020617] py-16 relative overflow-hidden">
                {/* Footer Glow Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#1d4ed8] to-transparent opacity-50"></div>

                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">

                    <div className="text-center md:text-left">
                        <h5 className="text-2xl font-royal font-bold text-[#f8fafc] tracking-widest">RetroToonz</h5>
                        <p className="text-sm font-body text-[#64748b] mt-3 tracking-wide">© 2025 RetroToonz. All Rights Reserved.</p>
                    </div>

                    <div className="flex gap-6">
                        {/* Elegant Social Buttons */}
                        {[Instagram, Twitter, Mail].map((Icon, i) => (
                            <a key={i} href="#" className="p-3 bg-[#0f172a] border border-[#1e293b] rounded-full hover:border-[#60a5fa] hover:text-[#93c5fd] hover:shadow-[0_0_20px_rgba(96,165,250,0.3)] transition-all duration-300 text-[#64748b]">
                                <Icon size={20} strokeWidth={1.5} />
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutPage;