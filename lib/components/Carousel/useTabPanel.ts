import { useCallback } from "react";

const useTabPanel = (opacities: number[]) => {
	const getTabPanel = useCallback(
		(index: number) => ({
			"aria-hidden": opacities[index] === 0,
			role: "tabpanel",
			"aria-labelledby": `tab-${index}`,
		}),
		[opacities],
	);

	return getTabPanel;
};

export default useTabPanel;
