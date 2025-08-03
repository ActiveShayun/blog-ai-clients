import { useEffect, useState } from "react";

const AnimatedText = ({ text }) => {
    const [visibleIndices, setVisibleIndices] = useState([]);
    const [phase, setPhase] = useState("show"); // "show" -> "pause" -> "hide"

    useEffect(() => {
        let timeoutIds = [];

        const showLettersLTR = () => {
            text.split("").forEach((_, i) => {
                const id = setTimeout(() => {
                    setVisibleIndices((prev) => [...prev, i]);
                }, i * 100);
                timeoutIds.push(id);
            });

            const pauseThenHide = setTimeout(() => {
                setPhase("hide");
            }, text.length * 100 + 1000);
            timeoutIds.push(pauseThenHide);
        };

        const hideLettersRTL = () => {
            const length = text.length;
            for (let i = 0; i < length; i++) {
                const id = setTimeout(() => {
                    setVisibleIndices((prev) =>
                        prev.filter((index) => index !== length - 1 - i)
                    );
                }, i * 100);
                timeoutIds.push(id);
            }

            const pauseThenShow = setTimeout(() => {
                setPhase("show");
            }, length * 100 + 1000);
            timeoutIds.push(pauseThenShow);
        };

        if (phase === "show") {
            showLettersLTR();
        } else if (phase === "hide") {
            hideLettersRTL();
        }

        return () => {
            timeoutIds.forEach(clearTimeout);
        };
    }, [phase, text]);

    return (
        <div className="">
            <div className="flex gap-[1px]">
                {text.split("").map((char, index) => (
                    <span
                        key={index}
                        className={`transition-opacity duration-300 ${visibleIndices.includes(index) ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        {char}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default AnimatedText;
