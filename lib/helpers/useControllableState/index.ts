/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

type SetStateFn<T> = (prevState?: T) => T;
type NonUndefinable<T> = Exclude<T, undefined>;

function useControllableState<T>(params: {
	state?: T;
	defaultState?: never;
	onChange?: (value: NonUndefinable<T>) => void;
}): [
	NonUndefinable<T> | undefined,
	Dispatch<SetStateAction<NonUndefinable<T>>>,
];

function useControllableState<T>(params: {
	state?: never;
	defaultState: T;
	onChange?: (value: NonUndefinable<T>) => void;
}): [T, Dispatch<SetStateAction<NonUndefinable<T>>>];

function useControllableState<T, K>(params: {
	state: T;
	defaultState: K;
	onChange?: (value: NonUndefinable<T>) => void;
}): [NonUndefinable<T> | K, Dispatch<SetStateAction<NonUndefinable<T>>>];

function useControllableState<T>(params: {
	state?: never;
	defaultState?: never;
	onChange?: (value: NonUndefinable<T>) => void;
}): [undefined, Dispatch<SetStateAction<NonUndefinable<T>>>];

function useControllableState<T, K>({
	state,
	defaultState,
	onChange,
}: {
	state?: T;
	defaultState?: K;
	onChange?: (value: NonUndefinable<T>) => void;
}): [
	(T & ({} | null)) | K | undefined,
	Dispatch<SetStateAction<NonUndefinable<T>>>,
] {
	const [uncontrolledState, setUncontrolledState] = useState(defaultState);
	const isControlled = state !== undefined;
	const value = isControlled ? state : uncontrolledState;
	const onChangeRef = useRef(onChange);

	useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);

	useEffect(() => {}, []);

	const setValue = useCallback<Dispatch<SetStateAction<NonUndefinable<T>>>>(
		(nextValue) => {
			if (!isControlled) {
				setUncontrolledState((prev) => {
					const setter = nextValue as SetStateFn<K>;
					const settedNextValue =
						typeof setter === "function" ? setter(prev) : nextValue;
					if (settedNextValue !== prev && settedNextValue !== undefined) {
						onChangeRef.current?.(settedNextValue as NonUndefinable<T>);
					}
					return settedNextValue as K;
				});
			} else {
				const setter = nextValue as SetStateFn<T>;
				const settedNextValue =
					typeof setter === "function" ? setter(state) : nextValue;
				if (settedNextValue !== state) {
					onChangeRef.current?.(settedNextValue as NonUndefinable<T>);
				}
			}
		},
		[isControlled, state],
	);

	return [value, setValue] as const;
}

export default useControllableState;
