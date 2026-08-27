'use client';

import { PopUp } from '@/components/motion';

interface TeamMember {
    id: number;
    name: string;
    position: string;
    bio?: string;
    photo: string;
}

interface TeamSectionProps {
    members: TeamMember[];
}

export function TeamSection({ members }: TeamSectionProps) {
    if (members.length === 0) {
        return null;
    }

    return (
        <section className="py-16 lg:py-24 bg-brand-secondary/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-medium uppercase tracking-wider text-brand-gold">
                        Tim Kami
                    </p>
                    <h2 className="mt-2 font-heading text-3xl font-bold text-brand-foreground lg:text-4xl">
                        Bertemu dengan Tim Kami
                    </h2>
                </div>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {members.map((member, i) => (
                        <PopUp key={member.id} delay={i * 0.1}>
                            <div className="text-center">
                                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-brand-emerald/20 bg-brand-secondary">
                                    {member.photo ? (
                                        <img
                                            src={member.photo}
                                            alt={member.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-brand-muted">
                                            {member.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <h3 className="mt-4 font-heading text-lg font-bold text-brand-foreground">
                                    {member.name}
                                </h3>
                                <p className="text-sm font-medium text-brand-emerald">
                                    {member.position}
                                </p>
                                {member.bio && (
                                    <p className="mt-2 text-xs text-brand-muted line-clamp-3 leading-relaxed">
                                        {member.bio}
                                    </p>
                                )}
                            </div>
                        </PopUp>
                    ))}
                </div>
            </div>
        </section>
    );
}
