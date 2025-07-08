import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Home/Home";

export const router = createBrowserRouter([
    {
        path: '/', 
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    }
])