export type { BreadcrumbItem, NavItem } from './navigation';
export type { AppLayoutProps, AppVariant, AuthLayoutProps } from './ui';
export type { User, Auth } from './auth';

export interface HeroSection {
    id: number;
    eyebrow: string | null;
    title: string;
    description: string | null;
    primary_button_text: string | null;
    primary_button_url: string | null;
    secondary_button_text: string | null;
    secondary_button_url: string | null;
    background_image: string | null;
    is_active: boolean;
    slides?: HeroSlide[];
}

export interface HeroSlide {
    id: number;
    hero_section_id: number;
    image: string;
    sort_order: number;
    is_active: boolean;
}

export interface AboutSection {
    id: number;
    eyebrow: string | null;
    title: string;
    description: string | null;
    images: string[] | null;
    button_text: string | null;
    button_url: string | null;
    is_active: boolean;
}

export interface Feature {
    id: number;
    title: string;
    description: string | null;
    icon: string | null;
    sort_order: number;
    is_active: boolean;
}

export interface Package {
    id: number;
    name: string;
    slug: string;
    duration: string;
    description: string | null;
    price: string;
    image: string | null;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
    meta_title: string | null;
    meta_description: string | null;
    departure_city: string | null;
    airline: string | null;
    hotel_madinah: string | null;
    hotel_madinah_distance: string | null;
    hotel_madinah_room: string | null;
    hotel_makkah: string | null;
    hotel_makkah_distance: string | null;
    hotel_makkah_room: string | null;
    flight_notes: string | null;
    facilities?: PackageFacility[];
    itineraries?: PackageItinerary[];
    included?: PackageIncluded[];
    notIncluded?: PackageNotIncluded[];
}

export interface PackageFacility {
    id: number;
    package_id: number;
    name: string;
    description: string | null;
    icon: string | null;
    sort_order: number;
    is_active: boolean;
}

export interface PackageItinerary {
    id: number;
    package_id: number;
    day_number: number;
    title: string;
    location: string | null;
    description: string | null;
    sort_order: number;
}

export interface PackageIncluded {
    id: number;
    package_id: number;
    item: string;
    sort_order: number;
}

export interface PackageNotIncluded {
    id: number;
    package_id: number;
    item: string;
    sort_order: number;
}

export interface Destination {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
}

export interface GalleryItem {
    id: number;
    title: string;
    image: string;
    category: string;
    sort_order: number;
    is_active: boolean;
}

export interface Testimonial {
    id: number;
    name: string;
    city: string | null;
    package: string | null;
    content: string;
    avatar: string | null;
    rating: number;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
}

export interface Faq {
    id: number;
    question: string;
    answer: string;
    sort_order: number;
    is_active: boolean;
}

export interface Inquiry {
    id: number;
    name: string;
    phone: string;
    email: string | null;
    package_id: number | null;
    message: string | null;
    status: string;
    package?: Package;
    created_at: string;
}

export interface Media {
    id: number;
    filename: string;
    original_name: string;
    path: string;
    mime_type: string;
    size: number;
    alt_text: string | null;
    uploaded_by: number;
    created_at: string;
}

export interface WebsiteSetting {
    key: string;
    value: string | null;
}

export interface SiteConfig {
    brandName: string;
    tagline: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    instagram: string;
    facebook: string;
    youtube: string;
}

export interface TeamMember {
    id: number;
    name: string;
    position: string;
    bio: string | null;
    photo: string | null;
    sort_order: number;
    is_active: boolean;
}

export interface Vision {
    id: number;
    type: 'vision' | 'mission';
    title: string;
    description: string;
    sort_order: number;
    is_active: boolean;
}

export interface CompanyHistory {
    id: number;
    year: string;
    title: string;
    description: string | null;
    image: string | null;
    sort_order: number;
    is_active: boolean;
}

export interface DashboardStats {
    totalPackages: number;
    totalTestimonials: number;
    totalGallery: number;
    newInquiries: number;
    totalDestinations: number;
}
