"use client"

import { SvgProps } from "./svg-interface";

export const SvgBottle = ({
    fill,
    className,
}: SvgProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={800}
            height={800}
            viewBox="-3.79 0 33.564 33.564"
            fill={fill}
            className={className}
        >
            <path d="M12.978 33.564A12.976 12.976 0 0 1 7.815 8.682l.789 1.838a11 11 0 1 0 7.782-.364l.613-1.9a12.971 12.971 0 0 1-4.021 25.312Z" />
            <path d="M8.216 10.597a1 1 0 0 1-1-1v-9.6h10.486v9.2a1 1 0 0 1-2 0v-7.2H9.216v7.6a1 1 0 0 1-1 1ZM2.269 24.284.58 23.212c.159-.251 3.989-6.123 13.419-4.129 8.031 1.7 10.357.191 10.379.177l1.225 1.58c-.276.222-2.959 2.12-12.018.2-8.015-1.704-11.186 3.041-11.316 3.244Z" />
        </svg>
    );
}
