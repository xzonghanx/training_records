import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
localStorage.debug = "pern:*";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>
);
