import type { KeenSliderHooks, KeenSliderInstance } from "keen-slider/react";

export type CustomKeenSliderHooks =
	| KeenSliderHooks
	| "in"
	| "out"
	| "stopped"
	| "resumed";

const keenSliderCarousel =
	(delay: number) =>
	(slider: KeenSliderInstance<unknown, unknown, CustomKeenSliderHooks>) => {
		let timeout: ReturnType<typeof setTimeout>;
		let busy = false;

		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (entry.isIntersecting) {
				return slider.emit("in");
			}
			slider.emit("out");
		});

		const clearNextTimeout = () => {
			clearTimeout(timeout);
		};

		const nextTimeout = () => {
			clearTimeout(timeout);
			if (busy) return;
			timeout = setTimeout(() => {
				slider.next();
			}, delay);
		};

		const onMouseOver = () => {
			busy = true;
			clearNextTimeout();
		};

		const onMouseOut = () => {
			busy = false;
			nextTimeout();
		};

		const onFocusIn = () => {
			busy = true;
			clearNextTimeout();
		};

		const onFocusOut = () => {
			busy = false;
			clearNextTimeout();
		};

		const onCreated = (instance: KeenSliderInstance) => {
			observer.observe(instance.container);
		};

		const onIn = (instance: KeenSliderInstance) => {
			instance.container.addEventListener("focusin", onFocusIn);
			instance.container.addEventListener("focusout", onFocusOut);
			instance.container.addEventListener("mouseover", onMouseOver);
			instance.container.addEventListener("mouseout", onMouseOut);
			instance.on("animationEnded", nextTimeout);
			nextTimeout();
		};

		const onOut = (instance: KeenSliderInstance) => {
			instance.container.removeEventListener("focusin", onFocusIn);
			instance.container.removeEventListener("focusout", onFocusOut);
			instance.container.removeEventListener("mouseover", onMouseOver);
			instance.container.removeEventListener("mouseout", onMouseOut);
			instance.on("animationEnded", nextTimeout, true);
			clearNextTimeout();
		};

		const onResume = (instance: KeenSliderInstance) => {
			onIn(instance);
			observer.observe(instance.container);
		};

		const onStop = (instance: KeenSliderInstance) => {
			onOut(instance);
			observer.unobserve(slider.container);
		};

		slider.on("created", onCreated);
		slider.on("destroyed", onStop);
		slider.on("in", onIn);
		slider.on("out", onOut);
		slider.on("stopped", onStop);
		slider.on("resumed", onResume);
	};

export default keenSliderCarousel;
