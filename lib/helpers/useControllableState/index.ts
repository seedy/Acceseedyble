import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

type SetStateFn<T> = (prevState?: T) => T;

// TODO : ensure defaultState not undefined forces return value not undefined
// https://github.com/radix-ui/primitives/blob/main/packages/react/use-controllable-state/src/useControllableState.tsx#L12
// https://github.com/radix-ui/primitives/blob/main/packages/react/collapsible/src/Collapsible.tsx

interface useControllableStateParams<T> {
	state?: T;
	defaultState?: T;
	onChange?: (value: T) => void;
}
const useControllableState = <T>({
	state,
	defaultState,
	onChange,
}: useControllableStateParams<T>) => {
	const [uncontrolledState, setUncontrolledState] = useState(defaultState);
	const isControlled = state !== undefined;
	const value = isControlled ? state : uncontrolledState;
	const onChangeRef = useRef(onChange);

	useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);

	useEffect(() => {}, []);

	const setValue = useCallback<Dispatch<SetStateAction<T | undefined>>>(
		(nextValue) => {
			if (!isControlled) {
				setUncontrolledState((prev) => {
					const setter = nextValue as SetStateFn<T>;
					const settedNextValue =
						typeof setter === "function" ? setter(prev) : nextValue;
					if (settedNextValue !== prev) {
						onChangeRef.current?.(settedNextValue as T);
					}
					return settedNextValue as T;
				});
			} else {
				const setter = nextValue as SetStateFn<T>;
				const settedNextValue =
					typeof setter === "function" ? setter(value) : nextValue;
				if (settedNextValue !== value)
					onChangeRef.current?.(settedNextValue as T);
			}
		},
		[isControlled, value, onChangeRef, setUncontrolledState],
	);

	return [value, setValue] as const;
};

export default useControllableState;
