import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

type MenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
};

export type BubbleMenuProps = {
  /** Optional. When omitted, no logo bubble is rendered — use this when the
   * page already has a header carrying the brand. */
  logo?: ReactNode | string;
  onMenuClick?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
  menuAriaLabel?: string;
  /** Overrides the themed surface colour. Leave unset to follow light/dark. */
  menuBg?: string;
  /** Overrides the themed text colour. Leave unset to follow light/dark. */
  menuContentColor?: string;
  useFixedPosition?: boolean;
  /**
   * "top" spans the viewport top (original full-nav behaviour).
   * "bottom-right" docks the toggle as a floating action, so it can sit
   * alongside a conventional header without competing with it.
   */
  placement?: "top" | "bottom-right";
  items?: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
};

const DEFAULT_ITEMS: MenuItem[] = [
  {
    label: "home",
    href: "#",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" },
  },
  {
    label: "about",
    href: "#",
    ariaLabel: "About",
    rotation: 8,
    hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" },
  },
  {
    label: "projects",
    href: "#",
    ariaLabel: "Documentation",
    rotation: 8,
    hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" },
  },
  {
    label: "blog",
    href: "#",
    ariaLabel: "Blog",
    rotation: 8,
    hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" },
  },
  {
    label: "contact",
    href: "#",
    ariaLabel: "Contact",
    rotation: -8,
    hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
  },
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = "Toggle menu",
  menuBg,
  menuContentColor,
  useFixedPosition = false,
  placement = "top",
  items,
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.12,
}: BubbleMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLAnchorElement[]>([]);
  const labelRefs = useRef<HTMLSpanElement[]>([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;

  const containerClassName = [
    "bubble-menu",
    useFixedPosition ? "fixed" : "absolute",
    placement === "bottom-right"
      ? "bottom-6 right-6 flex items-center justify-end gap-4"
      : "left-0 right-0 top-8 flex items-center justify-between gap-4 px-8",
    "pointer-events-none",
    "z-[1001]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  /** Themed surface, overridable per-instance. */
  const surfaceStyle: CSSProperties = {
    background: menuBg ?? "var(--background)",
    color: menuContentColor ?? "var(--foreground)",
  };
  const lineColor = menuContentColor ?? "currentColor";

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setShowOverlay(false);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: "power3.out",
            },
            "-=" + animationDuration * 0.9
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power3.in",
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          setShowOverlay(false);
        },
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  // Escape closes the overlay — without this the only way out is the toggle.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        onMenuClick?.(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen, onMenuClick]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;
        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? item.rotation ?? 0 : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, menuItems]);

  return (
    <>
      {/* Workaround for silly Tailwind capabilities */}
      <style>{`
        .bubble-menu .menu-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):nth-last-child(2) {
          margin-left: calc(100% / 6);
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):last-child {
          margin-left: calc(100% / 3);
        }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-link {
            transform: rotate(var(--item-rot));
          }
          .bubble-menu-items .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.06);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
          .bubble-menu-items .pill-link:active {
            transform: rotate(var(--item-rot)) scale(.94);
          }
        }
        @media (max-width: 899px) {
          .bubble-menu-items {
            padding-top: 120px;
            align-items: flex-start;
          }
          .bubble-menu-items .pill-list {
            row-gap: 16px;
          }
          .bubble-menu-items .pill-list .pill-col {
            flex: 0 0 100% !important;
            margin-left: 0 !important;
            overflow: visible;
          }
          .bubble-menu-items .pill-link {
            font-size: clamp(1.2rem, 3vw, 4rem);
            padding: clamp(1rem, 2vw, 2rem) 0;
            min-height: 80px !important;
          }
          .bubble-menu-items .pill-link:hover {
            transform: scale(1.06);
            background: var(--hover-bg);
            color: var(--hover-color);
          }
          .bubble-menu-items .pill-link:active {
            transform: scale(.94);
          }
        }
      `}</style>

      <nav
        className={containerClassName}
        style={style}
        aria-label="Quick navigation"
      >
        {logo ? (
          <Link
            to="/"
            className={[
              "bubble logo-bubble",
              "inline-flex items-center justify-center",
              "rounded-full border",
              "shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
              "pointer-events-auto",
              "h-12 md:h-14",
              "px-4 md:px-8",
              "gap-2",
              "will-change-transform",
              "no-underline",
            ].join(" ")}
            aria-label="Logo - Go to home"
            style={{
              ...surfaceStyle,
              minHeight: "48px",
              borderRadius: "9999px",
            }}
          >
            <span
              className={[
                "logo-content",
                "inline-flex items-center justify-center",
                "w-[120px] h-full",
              ].join(" ")}
              style={
                {
                  ["--logo-max-height"]: "60%",
                  ["--logo-max-width"]: "100%",
                } as CSSProperties
              }
            >
              {typeof logo === "string" ? (
                <img
                  src={logo}
                  alt="Logo"
                  className="bubble-logo max-h-[60%] max-w-full object-contain block"
                />
              ) : (
                logo
              )}
            </span>
          </Link>
        ) : null}

        <button
          type="button"
          className={[
            "bubble toggle-bubble menu-btn",
            isMenuOpen ? "open" : "",
            "inline-flex flex-col items-center justify-center",
            "rounded-full border",
            "shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
            "pointer-events-auto",
            "w-12 h-12 md:w-14 md:h-14",
            "cursor-pointer p-0",
            "will-change-transform",
          ].join(" ")}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-expanded={isMenuOpen}
          style={surfaceStyle}
        >
          <span
            className="menu-line block mx-auto rounded-[2px]"
            style={{
              width: 26,
              height: 2,
              background: lineColor,
              transform: isMenuOpen ? "translateY(4px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="menu-line short block mx-auto rounded-[2px]"
            style={{
              marginTop: "6px",
              width: 26,
              height: 2,
              background: lineColor,
              transform: isMenuOpen
                ? "translateY(-4px) rotate(-45deg)"
                : "none",
            }}
          />
        </button>
      </nav>

      {showOverlay && (
        <div
          ref={overlayRef}
          className={[
            "bubble-menu-items",
            useFixedPosition ? "fixed" : "absolute",
            "inset-0",
            "flex items-center justify-center",
            "bg-background/85 backdrop-blur-sm",
            "pointer-events-none",
            "z-[1000]",
          ].join(" ")}
          aria-hidden={!isMenuOpen}
        >
          <ul
            className={[
              "pill-list",
              "list-none m-0 px-6",
              "w-full max-w-[1600px] mx-auto",
              "flex flex-wrap",
              "gap-x-0 gap-y-1",
              "pointer-events-auto",
            ].join(" ")}
            role="menu"
            aria-label="Menu links"
          >
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                role="none"
                className={[
                  "pill-col",
                  "flex justify-center items-stretch",
                  "[flex:0_0_calc(100%/3)]",
                  "box-border",
                ].join(" ")}
              >
                <Link
                  role="menuitem"
                  to={item.href}
                  onClick={handleLinkClick}
                  aria-label={item.ariaLabel || item.label}
                  className={[
                    "pill-link",
                    "w-full",
                    "rounded-[999px] border",
                    "no-underline",
                    "text-inherit",
                    "shadow-[0_4px_14px_rgba(0,0,0,0.10)]",
                    "flex items-center justify-center",
                    "relative",
                    "transition-[background,color] duration-300 ease-in-out",
                    "box-border",
                    "whitespace-nowrap overflow-hidden",
                  ].join(" ")}
                  style={
                    {
                      ["--item-rot"]: `${item.rotation ?? 0}deg`,
                      ["--pill-bg"]: menuBg ?? "var(--card)",
                      ["--pill-color"]: menuContentColor ?? "var(--foreground)",
                      ["--hover-bg"]:
                        item.hoverStyles?.bgColor || "var(--accent)",
                      ["--hover-color"]:
                        item.hoverStyles?.textColor ??
                        menuContentColor ??
                        "var(--foreground)",
                      background: "var(--pill-bg)",
                      color: "var(--pill-color)",
                      minHeight: "var(--pill-min-h, 160px)",
                      padding: "clamp(1.5rem, 3vw, 8rem) 0",
                      fontSize: "clamp(1.5rem, 4vw, 4rem)",
                      fontWeight: 400,
                      lineHeight: 0,
                      willChange: "transform",
                      height: 10,
                    } as CSSProperties
                  }
                  ref={(el) => {
                    if (el) bubblesRef.current[idx] = el;
                  }}
                >
                  <span
                    className="pill-label inline-block"
                    style={{
                      willChange: "transform, opacity",
                      height: "1.2em",
                      lineHeight: 1.2,
                    }}
                    ref={(el) => {
                      if (el) labelRefs.current[idx] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
