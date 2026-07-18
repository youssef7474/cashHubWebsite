import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Parent folder has another package-lock.json; without this, Turbopack
  // treats C:\Users\admin as root and fails to register [dynamic] routes.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
