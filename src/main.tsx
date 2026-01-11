import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// import AppRoutes from "./routes/index";

// biome-ignore lint/style/noNonNullAssertion: root sempre existe no index.html
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
