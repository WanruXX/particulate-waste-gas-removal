"use client"

import { SvgProps } from "./svg-interface";

export const SvgDollar = ({
    fill,
    className,
}: SvgProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
            className={className}
        >
            <circle cx={12} cy={12} r={10} stroke={fill} strokeWidth={2} />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 9.947C14.5 9.3 13.8 8.5 12 8.5S9 9.514 9 9.947c0 .434.068.98 1 1.553.752.462 2.668.544 3.5 1 1.179.647 1.35 1.32 1.35 1.552 0 .632-1.432 1.433-2.85 1.448-1.464.015-2.5-.8-3-1.448"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 7v10"
            />
        </svg>
    );
}
