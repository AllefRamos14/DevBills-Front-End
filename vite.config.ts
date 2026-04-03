// import tailwindcss from "@tailwindcss/vite";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// // https://vite.dev/config/
// export default defineConfig({
// 	plugins: [react(), tailwindcss()],
// });

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						if (id.includes("recharts")) return "charts";
						if (id.includes("react-router")) return "router";
						if (id.includes("lucide-react")) return "icons";
						return "vendor";
					}
				},
			},
		},
	},
});
