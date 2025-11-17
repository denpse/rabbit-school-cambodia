"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import DonationLink from "./donation-link";

// Constants for better maintainability
const LANGUAGES = {
  en: "English",
  km: "ខ្មែរ",
} as const;

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

type Language = keyof typeof LANGUAGES;

interface NavItem {
  key: string;
  href: string;
  external?: boolean;
}

export default function Header() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  // Memoize navigation items to prevent unnecessary re-renders
  const navItems: NavItem[] = useMemo(
    () => [
      { key: "home", href: "/" },
      { key: "about", href: "/about" },
      { key: "howWeWork", href: "/we-work" },
      { key: "getInvolved", href: "/get-involved" },
      { key: "contact", href: "/contact" },
    ],
    []
  );

  // Handle scroll effect for header shadow and background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load initial language from cookie
  useEffect(() => {
    const match = document.cookie.match(/(^| )locale=([^;]+)/);
    if (match && (match[2] === "en" || match[2] === "km")) {
      setCurrentLanguage(match[2] as Language);
    }
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Memoized toggle language function
  const toggleLanguage = useCallback(
    (lang: Language) => {
      setCurrentLanguage(lang);
      document.cookie = `locale=${lang}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
      setIsMobileMenuOpen(false);
      router.refresh();
    },
    [router]
  );

  // Memoized mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Helper to check if link is active
  const isLinkActive = useCallback(
    (href: string): boolean => {
      if (href === "/") {
        return pathname === "/";
      }
      return pathname.startsWith(href) || pathname === href;
    },
    [pathname]
  );

  // Helper to get link classes with brand colors
  const getLinkClasses = useCallback((isActive: boolean, isMobile = false) => {
    const baseClasses = [
      isMobile ? "block text-base py-3" : "text-sm",
      "px-4 py-2 font-semibold transition-all duration-300 ease-in-out",
      "focus:outline-none focus:ring-2 focus:ring-[#623D3C] focus:ring-offset-2",
      isMobile ? "rounded-lg mx-2" : "rounded-full",
    ];

    const stateClasses = isActive
      ? isMobile
        ? "text-white bg-[#623D3C] border-l-4 border-[#FFD45F]"
        : "text-white bg-[#623D3C] shadow-md"
      : isMobile
      ? "text-[#623D3C] hover:text-white hover:bg-[#623D3C] hover:border-l-4 hover:border-[#FFD45F]"
      : "text-[#623D3C] hover:text-white hover:bg-[#623D3C] hover:shadow-md relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-[#FFD45F] after:transition-all after:duration-300 hover:after:w-full";

    return [...baseClasses, stateClasses].join(" ");
  }, []);

  // Reusable Language Switcher Component
  const LanguageSwitcher = ({ mobile = false }: { mobile?: boolean }) => {
    if (mobile) {
      return (
        <div className="pt-6 border-t border-[#F7F5F4] mt-4">
          <div className="px-4 py-2 text-xs font-bold text-[#623D3C] uppercase tracking-widest">
            {t("navbar.language")}
          </div>
          <div className="space-y-2 px-2">
            {Object.entries(LANGUAGES).map(([lang, label]) => (
              <button
                key={lang}
                onClick={() => toggleLanguage(lang as Language)}
                className={`w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#623D3C] ${
                  currentLanguage === lang
                    ? "bg-[#623D3C] text-white border-l-4 border-[#FFD45F] font-semibold shadow-md"
                    : "text-[#623D3C] hover:text-white hover:bg-[#623D3C] hover:shadow-md"
                }`}
                aria-pressed={currentLanguage === lang}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-white hover:bg-[#623D3C] border-[#623D3C]/20 hover:border-[#623D3C] text-[#623D3C] hover:text-white transition-all duration-300 focus:ring-2 focus:ring-[#623D3C] shadow-sm hover:shadow-md"
            aria-label={`Current language: ${LANGUAGES[currentLanguage]}`}
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-medium">
              {LANGUAGES[currentLanguage]}
            </span>
            <ChevronDown className="h-3 w-3" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-36 bg-white border border-[#623D3C]/10 shadow-lg rounded-lg overflow-hidden"
        >
          {Object.entries(LANGUAGES).map(([lang, label]) => (
            <DropdownMenuItem
              key={lang}
              onClick={() => toggleLanguage(lang as Language)}
              className={`cursor-pointer px-4 py-3 text-sm transition-colors duration-200 ${
                currentLanguage === lang
                  ? "bg-[#623D3C] text-white font-semibold"
                  : "text-[#623D3C] hover:bg-[#623D3C] hover:text-white"
              }`}
              aria-current={currentLanguage === lang ? "true" : "false"}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header
      className={`bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "shadow-lg border-[#623D3C]/20 bg-white/98"
          : "shadow-sm border-[#623D3C]/10"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center"
            aria-label="Rabbit School - Home"
          >
            <Image
              src="/logo.png"
              alt="Rabbit School Logo"
              width={220}
              height={45}
              className="w-[160px] md:w-[240px] h-auto"
              priority
              sizes="(max-width: 768px) 160px, 240px"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-2"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const isActive = isLinkActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={getLinkClasses(isActive)}
                  aria-current={isActive ? "page" : undefined}
                  {...(item.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {t(`navbar.${item.key}`)}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Desktop Language Switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Donation Link */}
            <div className="hidden sm:block">
              <DonationLink
                variant="secondary"
                size="sm"
                text={t("navbar.donate")}
              />
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-[#623D3C] hover:text-white focus:ring-2 focus:ring-[#623D3C] transition-colors duration-200"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X
                    className="h-6 w-6 text-[#623D3C] hover:text-white"
                    aria-hidden="true"
                  />
                ) : (
                  <Menu className="h-6 w-6 text-[#623D3C]" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-[#F7F5F4] bg-white/98 backdrop-blur-sm shadow-lg rounded-b-lg"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <nav className="px-2 pt-4 pb-3 space-y-1">
              {navItems.map((item) => {
                const isActive = isLinkActive(item.href);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={getLinkClasses(isActive, true)}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                    {...(item.external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    {t(`navbar.${item.key}`)}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Language Switcher */}
            <LanguageSwitcher mobile />

            {/* Mobile Donation Link */}
            <div className="px-4 pb-6 pt-4">
              <DonationLink size="sm" text={t("navbar.donate")} mobile />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
