import { SeoHead } from '@/components/seo/SeoHead';
import { FadeIn, PopUp } from '@/components/motion';
import { VisionMissionSection } from '@/features/public/vision-section';
import { HistoryTimelineSection } from '@/features/public/history-section';
import { TeamSection } from '@/features/public/team-section';
import type { AboutSection, Vision, CompanyHistory, TeamMember } from '@/types';

interface AboutProps {
    about: AboutSection | null;
    visions: Vision[];
    histories: CompanyHistory[];
    teamMembers: TeamMember[];
    seo: { title: string; description: string };
}

export default function About({ about, visions, histories, teamMembers, seo }: AboutProps) {
    return (
        <>
            <SeoHead title={seo.title} description={seo.description} canonical="/about" />

            {/* Hero Section */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        <div>
                            {about?.images && about.images.length > 0 ? (
                                <div className="grid grid-cols-3 grid-rows-2 gap-3">
                                    {about.images.map((src, i) => (
                                        <PopUp
                                            key={src}
                                            delay={i * 0.12}
                                            className={
                                                i === 0
                                                    ? 'col-span-2 row-span-1 rounded-xl overflow-hidden aspect-[4/2]'
                                                    : 'rounded-xl overflow-hidden aspect-square'
                                            }
                                        >
                                            <div className="group relative h-full w-full">
                                                <img
                                                    src={src}
                                                    alt={`Tentang Havana Travel ${i + 1}`}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                            </div>
                                        </PopUp>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 grid-rows-2 gap-3">
                                    {[
                                        { src: '/images/gallery/makkah.jpg', alt: "Ka'bah", delay: 0, className: 'col-span-2 row-span-1 aspect-[4/2]' },
                                        { src: '/images/hero/nabawi.jpg', alt: 'Masjid Nabawi', delay: 0.15, className: 'aspect-square' },
                                        { src: '/images/gallery/jamaah.jpg', alt: 'Jamaah Umroh', delay: 0.3, className: 'aspect-square' },
                                        { src: '/images/gallery/hotel.jpg', alt: 'Hotel di Makkah', delay: 0.45, className: 'aspect-square' },
                                        { src: '/images/gallery/transportation.jpg', alt: 'Transportasi', delay: 0.6, className: 'aspect-square' },
                                    ].map((img) => (
                                        <PopUp
                                            key={img.src}
                                            delay={img.delay}
                                            className={`rounded-xl overflow-hidden ${img.className}`}
                                        >
                                            <div className="group relative h-full w-full">
                                                <img
                                                    src={img.src}
                                                    alt={img.alt}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                            </div>
                                        </PopUp>
                                    ))}
                                </div>
                            )}
                        </div>

                        <FadeIn direction="right">
                            <div>
                                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-brand-gold">
                                    {about?.eyebrow || 'Tentang Kami'}
                                </p>
                                <h1 className="font-heading text-4xl font-bold text-brand-foreground lg:text-5xl">
                                    {about?.title || 'Havana Travel'}
                                </h1>
                                <p className="mt-6 text-lg text-brand-muted leading-relaxed">
                                    {about?.description ||
                                        'Havana Travel adalah perusahaan travel umroh terpercaya yang telah melayani ribuan jamaah dalam perjalanan ibadah mereka. Dengan pengalaman lebih dari 15 tahun, kami berkomitmen memberikan pelayanan terbaik.'}
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <VisionMissionSection visions={visions} />

            {/* History Timeline */}
            <HistoryTimelineSection histories={histories} />

            {/* Team */}
            <TeamSection members={teamMembers} />
        </>
    );
}
