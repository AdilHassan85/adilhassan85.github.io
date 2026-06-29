import { useEffect, useRef, useState } from "react";
import "./styles/Terminal.css";

interface TerminalProps {
    onComplete: (name: string) => void;
}

const LINES = [
    "Initializing  portfolio...",
    "Hi,  I'm  Adil Hasan's  digital  guide.",
    "Built   under   the  mentorship  of  Dr. Bilal Ahmad.",
];

// Saari balls ka base color ab gold/copper shades (portfolio accent theme se match)
const BASE_COLORS = [
    { r: 212, g: 175, b: 55 },   // luxury gold
    { r: 184, g: 115, b: 51 },   // burnt copper
    { r: 232, g: 199, b: 102 },  // light gold
    { r: 160, g: 90, b: 30 },    // deep copper
    { r: 240, g: 215, b: 138 },  // pale gold
];

interface Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    color: { r: number; g: number; b: number };
    flashColor: { r: number; g: number; b: number } | null;
    flash: number;
}

const mixColors = (
    a: { r: number; g: number; b: number },
    b: { r: number; g: number; b: number }
) => ({
    r: Math.round((a.r + b.r) / 2),
    g: Math.round((a.g + b.g) / 2),
    b: Math.round((a.b + b.b) / 2),
});

const Terminal = ({ onComplete }: TerminalProps) => {
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [completedLines, setCompletedLines] = useState<string[]>([]);
    const [showNamePrompt, setShowNamePrompt] = useState(false);
    const [name, setName] = useState("");
    const [welcomeText, setWelcomeText] = useState("");
    const [showSubMessage, setShowSubMessage] = useState(false);
    const [dissolving, setDissolving] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });

    // ───────── Permanent Multi-Color Balls Background ─────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        const BALL_COUNT = 34; // ⬆️ barhai gayi tadad
        const balls: Ball[] = Array.from({ length: BALL_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1.6,
            vy: (Math.random() - 0.5) * 1.6,
            r: Math.random() * 16 + 22,
            color: BASE_COLORS[Math.floor(Math.random() * BASE_COLORS.length)],
            flashColor: null,
            flash: 0,
        }));

        let animationId: number;

        const draw = () => {
            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);
            const mouse = mouseRef.current;

            for (let i = 0; i < balls.length; i++) {
                const b = balls[i];

                // Mouse avoidance
                const dxMouse = b.x - mouse.x;
                const dyMouse = b.y - mouse.y;
                const distMouse = Math.hypot(dxMouse, dyMouse);
                if (distMouse < 110 && distMouse > 0.01) {
                    const force = (110 - distMouse) / 110;
                    b.vx += (dxMouse / distMouse) * force * 0.8;
                    b.vy += (dyMouse / distMouse) * force * 0.8;
                }

                // Ball-to-ball collision + color mix (HIT EFFECT — rakha gaya hai)
                for (let j = i + 1; j < balls.length; j++) {
                    const o = balls[j];
                    const dx = b.x - o.x;
                    const dy = b.y - o.y;
                    const dist = Math.hypot(dx, dy);
                    const minDist = b.r + o.r;
                    if (dist < minDist && dist > 0.01) {
                        const angle = Math.atan2(dy, dx);
                        const overlap = minDist - dist;
                        b.x += Math.cos(angle) * overlap * 0.5;
                        b.y += Math.sin(angle) * overlap * 0.5;
                        o.x -= Math.cos(angle) * overlap * 0.5;
                        o.y -= Math.sin(angle) * overlap * 0.5;

                        const tempVx = b.vx, tempVy = b.vy;
                        b.vx = o.vx * 0.95;
                        b.vy = o.vy * 0.95;
                        o.vx = tempVx * 0.95;
                        o.vy = tempVy * 0.95;

                        const mixed = mixColors(b.color, o.color);
                        b.flashColor = mixed;
                        o.flashColor = mixed;
                        b.flash = 1;
                        o.flash = 1;
                    }
                }

                // Gentle friction + minimum speed (keep them always drifting)
                b.vx *= 0.99;
                b.vy *= 0.99;
                const speed = Math.hypot(b.vx, b.vy);
                const minSpeed = 0.3;
                const maxSpeed = 2.4;
                if (speed < minSpeed) {
                    const angle = Math.random() * Math.PI * 2;
                    b.vx += Math.cos(angle) * 0.05;
                    b.vy += Math.sin(angle) * 0.05;
                } else if (speed > maxSpeed) {
                    b.vx = (b.vx / speed) * maxSpeed;
                    b.vy = (b.vy / speed) * maxSpeed;
                }

                b.x += b.vx;
                b.y += b.vy;

                if (b.x - b.r < 0) { b.x = b.r; b.vx *= -1; }
                if (b.x + b.r > width) { b.x = width - b.r; b.vx *= -1; }
                if (b.y - b.r < 0) { b.y = b.r; b.vy *= -1; }
                if (b.y + b.r > height) { b.y = height - b.r; b.vy *= -1; }

                b.flash *= 0.95;

                const activeColor = b.flash > 0.05 && b.flashColor ? b.flashColor : b.color;
                const { r, g, b: bl } = activeColor;

                // ⬇️ FIX: Balls ab HAMESHA glow karengi (constant ambient glow),
                // collision par extra-bright flash add hota hai (effect rakha gaya hai)
                const baseGlowAlpha = 0.45;
                const flashBoost = b.flash * 0.45;
                const glowR = b.r * (2.2 + b.flash * 1.0);

                const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, glowR);
                grad.addColorStop(0, `rgba(${r}, ${g}, ${bl}, ${baseGlowAlpha + flashBoost})`);
                grad.addColorStop(0.5, `rgba(${r}, ${g}, ${bl}, ${(baseGlowAlpha + flashBoost) * 0.4})`);
                grad.addColorStop(1, `rgba(${r}, ${g}, ${bl}, 0)`);
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(b.x, b.y, glowR, 0, Math.PI * 2);
                ctx.fill();

                // Solid core
                ctx.fillStyle = `rgba(${r}, ${g}, ${bl}, 0.9)`;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();
            }
            animationId = requestAnimationFrame(draw);
        };
        draw();

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // ───────── Typewriter Effect for Intro Lines ─────────
    useEffect(() => {
        if (lineIndex >= LINES.length) {
            setShowNamePrompt(true);
            return;
        }
        const currentLine = LINES[lineIndex];

        if (charIndex < currentLine.length) {
            const timeout = setTimeout(() => setCharIndex((c) => c + 1), 30);
            return () => clearTimeout(timeout);
        } else {
            const pause = setTimeout(() => {
                setCompletedLines((prev) => [...prev, currentLine]);
                setLineIndex((l) => l + 1);
                setCharIndex(0);
            }, 450);
            return () => clearTimeout(pause);
        }
    }, [charIndex, lineIndex]);

    useEffect(() => {
        if (showNamePrompt && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showNamePrompt]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;

        const message = `Welcome, ${trimmed}!`;
        setWelcomeText("");
        let i = 0;

        const typeWelcome = () => {
            if (i <= message.length) {
                setWelcomeText(message.slice(0, i));
                i++;
                setTimeout(typeWelcome, 35);
            } else {
                setTimeout(() => {
                    setShowSubMessage(true);
                    setTimeout(() => {
                        setDissolving(true);
                        setTimeout(() => onComplete(trimmed), 900);
                    }, 1600);
                }, 400);
            }
        };
        typeWelcome();
    };

    return (
        <div className={`terminal-screen ${dissolving ? "terminal-dissolve" : ""}`}>
            <canvas ref={canvasRef} className="terminal-particles" />

            <div className="terminal-box">
                {completedLines.map((line, i) => (
                    <p key={i} className="terminal-line">
                        <span className="terminal-prompt">{">"}</span>
                        <span className="letter-fade-text">
                            {line.split("").map((ch, idx) => (
                                <span key={idx} style={{ animationDelay: `${idx * 0.015}s` }}>
                                    {ch}
                                </span>
                            ))}
                        </span>
                    </p>
                ))}

                {lineIndex < LINES.length && (
                    <p className="terminal-line">
                        <span className="terminal-prompt">{">"}</span>
                        <span className="letter-fade-text">
                            {LINES[lineIndex].slice(0, charIndex).split("").map((ch, idx) => (
                                <span key={idx} style={{ animationDelay: "0s" }}>
                                    {ch}
                                </span>
                            ))}
                        </span>
                        <span className="terminal-cursor">_</span>
                    </p>
                )}

                {showNamePrompt && !welcomeText && (
                    <form onSubmit={handleSubmit} className="terminal-name-form">
                        <p className="terminal-line">
                            <span className="terminal-prompt">{">"}</span>
                            <span className="terminal-question">What should I call you?</span>
                        </p>
                        <div className="terminal-input-wrap">
                            <span className="terminal-prompt">{">"}</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="terminal-input"
                                autoComplete="off"
                                maxLength={30}
                                placeholder="Type your name..."
                            />
                            <span className="terminal-cursor">_</span>
                        </div>
                    </form>
                )}

                {welcomeText && (
                    <>
                        <p className="terminal-line welcome-line">
                            <span className="terminal-prompt">{">"}</span>
                            <span className="letter-fade-text welcome-text">
                                {welcomeText.split("").map((ch, idx) => (
                                    <span key={idx} style={{ animationDelay: `${idx * 0.02}s` }}>
                                        {ch}
                                    </span>
                                ))}
                            </span>
                        </p>
                        {showSubMessage && (
                            <p className="terminal-line sub-message">
                                <span className="terminal-prompt">{">"}</span>
                                <span className="letter-fade-text">
                                    {"Let's explore Adil's world together.".split("").map((ch, idx) => (
                                        <span key={idx} style={{ animationDelay: `${idx * 0.02}s` }}>
                                            {ch}
                                        </span>
                                    ))}
                                </span>
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Terminal;