'use client';

import { m } from 'framer-motion';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
    className?: string;
    viewportFraction?: number; // How much of the element must be visible to trigger
}

export default function FadeIn({
    children,
    delay = 0,
    direction = 'up',
    duration = 0.5,
    className = '',
    viewportFraction = 0.3,
}: FadeInProps) {
    const directionOffset = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { y: 0, x: 40 },
        right: { y: 0, x: -40 },
        none: { y: 0, x: 0 },
    };

    return (
        <m.div
            initial={{
                opacity: 0,
                x: directionOffset[direction].x,
                y: directionOffset[direction].y
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            transition={{
                duration: duration,
                delay: delay,
                ease: "easeOut"
            }}
            viewport={{ once: true, amount: viewportFraction }}
            className={className}
        >
            {children}
        </m.div>
    );
}
