"use client";
import { cva } from "class-variance-authority";
import {
	MouseEvent,
	ReactNode,
	useEffect,
	useRef,
	useState,
	useTransition,
} from "react";

interface PlayPauseProps {
	playing?: boolean;
	// should change when playing boolean changes
	"aria-label": string;
	delay?: number;
	onPlayingChange?: () => void;
	children: ReactNode;
}

const childVariants = cva(
	"rounded-round bg-black/70 p-6 text-current opacity-0 transition",
	{
		variants: {
			visible: {
				true: ["opacity-100 scale-150"],
			},
		},
	},
);

const PlayPause = ({
	playing,
	"aria-label": ariaLabel,
	onPlayingChange,
	delay = 1000,
	children,
}: PlayPauseProps) => {
	const [_isPending, startTransition] = useTransition();
	const [visible, setVisible] = useState(false);

	const childVariantClassName = childVariants({ visible });

	const timeoutRef = useRef<NodeJS.Timeout>();

	const onTogglePlayPause = (e: MouseEvent) => {
		e.stopPropagation();
		if (!onPlayingChange) {
			return;
		}
		onPlayingChange();
	};

	useEffect(() => {
		startTransition(() => {
			setVisible(true);
		});
		if (timeoutRef.current !== undefined) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = undefined;
		}
		timeoutRef.current = setTimeout(() => {
			startTransition(() => {
				setVisible(false);
			});
		}, delay);
	}, [delay, playing]);

	return (
		<button
			aria-label={ariaLabel}
			className="absolute inset-0 z-1 m-0 inline-flex items-center justify-center border-none bg-none p-0 text-current focus-visible:bg-black/70 focus-visible:outline-none"
			onClick={onTogglePlayPause}
		>
			<div className={childVariantClassName}>{children}</div>
		</button>
	);
};

export default PlayPause;
