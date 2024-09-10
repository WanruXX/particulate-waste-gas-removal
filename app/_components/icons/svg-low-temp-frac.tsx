"use client"

import { SvgProps } from "./svg-interface";

export const SvglowTempFrac = ({
    fill,
    className,
}: SvgProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            width={800}
            height={800}
            data-name="Layer 1"
            viewBox="0 0 24 24"
            stroke={fill}
            className={className}
        >
            <defs>
                <style>
                    {
                        ".cls-1{fill:none;stroke-miterlimit:10;stroke-width:1.2px}"
                    }
                </style>
            </defs>
            <circle cx={6.27} cy={17.73} r={0.95} className="cls-1" />
            <path
                d="M9.14 13.93V4.36A2.87 2.87 0 0 0 6.27 1.5a2.86 2.86 0 0 0-2.86 2.86v9.57a4.78 4.78 0 1 0 5.73 0ZM6.27 12v4.77M17.73 8.18v5.73M19.64 6.27l-1.91 1.91-1.91-1.91M15.82 15.82l1.91-1.91 1.91 1.91M20.59 11.05h-5.73M22.5 12.96l-1.91-1.92 1.91-1.9M12.96 9.14l1.9 1.9-1.9 1.92"
                className="cls-1"
            />
            <circle cx={17.73} cy={11.05} r={0.95} className="cls-1" />
        </svg>
    );
}
