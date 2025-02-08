import path from "path";
import fs from "fs";
// Ensure 'uploads' directory exists

const setupUploads = () => {
  const uploadDir = path.join(process.cwd(), "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

export default setupUploads;
