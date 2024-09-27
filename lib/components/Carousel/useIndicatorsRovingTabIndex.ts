import {
	useCallback,
	useRef,
	FocusEvent,
	KeyboardEvent,
	MouseEvent,
} from "react";

interface useIndicatorsRovingTabIndexParams {
	count: number;
	currentIndex: number;
	onPause?: (e: MouseEvent | KeyboardEvent | FocusEvent) => void;
	moveToIdx?: (idx: number) => void;
}

const useIndicatorsRovingTabIndex = ({
	count,
	currentIndex,
	onPause,
	moveToIdx,
}: useIndicatorsRovingTabIndexParams) => {
	const indicatorRefList = useRef<(HTMLButtonElement | null)[]>(
		Array(count).fill(null),
	);

	const getIndicatorRovingTabIndex = useCallback(
		(key: number) => {
			return {
				ref: (node: HTMLButtonElement) => {
					if (node) {
						indicatorRefList.current[key] = node;
					}
				},
				tabIndex: currentIndex === key ? 0 : -1,
				onFocus: (e: FocusEvent) => {
					onPause?.(e);
				},
				onKeyDown: (e: KeyboardEvent) => {
					if (e.key === "ArrowLeft") {
						onPause?.(e);
						const nextKey = key === 0 ? count - 1 : key - 1;
						indicatorRefList.current[nextKey]?.focus();
						return moveToIdx?.(key - 1);
					}
					if (e.key === "ArrowRight") {
						onPause?.(e);
						const nextKey = key === count - 1 ? 0 : key + 1;
						indicatorRefList.current[nextKey]?.focus();
						return moveToIdx?.(key + 1);
					}
				},
				onClick: (e: MouseEvent) => {
					onPause?.(e);
					moveToIdx?.(key);
				},
			};
		},
		[count, currentIndex, moveToIdx, onPause],
	);

	return getIndicatorRovingTabIndex;
};

export default useIndicatorsRovingTabIndex;
