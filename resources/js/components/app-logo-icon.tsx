import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="currentColor" />
            <path
                d="M11 10h4v10h10v-10h4v20h-4V20H15v10h-4V10z"
                fill="white"
            />
        </svg>
    );
}
