'use client'

import { cn } from "@/lib/utils";
import { useRef } from "react";

export const GlareCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const isPointerInside = useRef(false);
  const refElement = useRef<HTMLDivElement>(null);
  const state = useRef({
    glare: {
      x: 50,
      y: 50,
    },
    background: {
      x: 50,
      y: 50,
    },
    rotate: {
      x: 0,
      y: 0,
    },
  });
  const containerStyle = {
    "--m-x": "50%",
    "--m-y": "50%",
    "--r-x": "0deg",
    "--r-y": "0deg",
    "--bg-x": "50%",
    "--bg-y": "50%",
    "--duration": "300ms",
    "--foil-size": "100%",
    "--opacity": "0",
    "--radius": "30px",
    "--easing": "ease",
    "--transition": "var(--duration) var(--easing)",
  } as any;

  const backgroundStyle = {
    "--step": "5%",
    "--foil-svg": `none`,
    "--pattern": "transparent",
    "--rainbow":
      "linear-gradient(135deg, rgba(106, 20, 255, 0.6) 0%, rgba(36, 113, 255, 0.6) 50%, rgba(106, 20, 255, 0.6) 100%) 50% 50%/200% 200% no-repeat",
    "--diagonal":
      "repeating-linear-gradient( 45deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.03) 2%, rgba(255,255,255,0.01) 4%, transparent 6%, transparent 8% ) var(--bg-x) var(--bg-y)/500% no-repeat",
    "--shade":
      "radial-gradient( circle 150px at var(--m-x) var(--m-y), rgba(106, 20, 255, 0.4) 0%, rgba(36, 113, 255, 0.3) 25%, rgba(106, 20, 255, 0.2) 50%, transparent 70% ) var(--bg-x) var(--bg-y)/100% 100% no-repeat",
          backgroundBlendMode: "overlay, soft-light, normal",
  };

  const updateStyles = () => {
    if (refElement.current) {
      console.log(state.current);
      const { background, rotate, glare } = state.current;
      refElement.current?.style.setProperty("--m-x", `${glare.x}%`);
      refElement.current?.style.setProperty("--m-y", `${glare.y}%`);
      refElement.current?.style.setProperty("--r-x", `${rotate.x}deg`);
      refElement.current?.style.setProperty("--r-y", `${rotate.y}deg`);
      refElement.current?.style.setProperty("--bg-x", `${background.x}%`);
      refElement.current?.style.setProperty("--bg-y", `${background.y}%`);
    }
  };
  return (
    <div
      style={containerStyle}
      className="relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-&lsqb;var(--duration)&rsqb; ease-&lsqb;var(--easing)&rsqb; delay-&lsqb;var(--delay)&rsqb; will-change-transform w-full h-full"
      ref={refElement}
      onPointerMove={(event) => {
        const rotateFactor = 0.4;
        const rect = event.currentTarget.getBoundingClientRect();
        const position = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        const percentage = {
          x: (100 / rect.width) * position.x,
          y: (100 / rect.height) * position.y,
        };
        const delta = {
          x: percentage.x - 50,
          y: percentage.y - 50,
        };

        const { background, rotate, glare } = state.current;
        background.x = 50 + percentage.x / 4 - 12.5;
        background.y = 50 + percentage.y / 3 - 16.67;
        rotate.x = -(delta.x / 3.5);
        rotate.y = delta.y / 2;
        rotate.x *= rotateFactor;
        rotate.y *= rotateFactor;
        glare.x = percentage.x;
        glare.y = percentage.y;

        updateStyles();
      }}
      onPointerEnter={() => {
        isPointerInside.current = true;
        if (refElement.current) {
          setTimeout(() => {
            if (isPointerInside.current) {
              refElement.current?.style.setProperty("--duration", "0s");
            }
          }, 300);
        }
      }}
      onPointerLeave={() => {
        isPointerInside.current = false;
        if (refElement.current) {
          refElement.current.style.removeProperty("--duration");
          refElement.current?.style.setProperty("--r-x", `0deg`);
          refElement.current?.style.setProperty("--r-y", `0deg`);
        }
      }}
    >
      <div className="h-full grid will-change-transform origin-center transition-transform duration-&lsqb;var(--duration)&rsqb; ease-&lsqb;var(--easing)&rsqb; delay-&lsqb;var(--delay)&rsqb; [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] rounded-[var(--radius)] border border-slate-800 hover:[--opacity:0.6] hover:[--duration:250ms] hover:[--easing:ease-out] hover:filter-none overflow-hidden">
        <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))]">
                      <div className={cn("h-full w-full bg-[#1A0540]", className)}>
            {children}
          </div>
        </div>
        <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_1px_0_round_var(--radius))] opacity-[var(--opacity)] transition-opacity transition-background duration-&lsqb;var(--duration)&rsqb; ease-&lsqb;var(--easing)&rsqb; delay-&lsqb;var(--delay)&rsqb; will-change-background [background:radial-gradient(farthest-corner_circle_at_var(--m-x)_var(--m-y),_rgba(255,255,255,0.8)_10%,_rgba(255,255,255,0.65)_20%,_rgba(255,255,255,0)_90%)]" />
        <div
                      className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light opacity-[var(--opacity)] will-change-background transition-opacity [clip-path:inset(0_0_1px_0_round_var(--radius))] [background-blend-mode:overlay_soft-light_normal] [background:var(--rainbow),_var(--diagonal),_var(--shade)]"
          style={{ ...backgroundStyle }}
        />
      </div>
    </div>
  );
};
