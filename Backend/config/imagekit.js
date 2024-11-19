import "dotenv/config.js";
import ImageKit from "imagekit";
import fs from "fs";

// Initialize ImageKit with API keys
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY, // Public Key (API key)
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // Private Key (used for server-side operations)
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT, // URL endpoint
});

const uploadImage = async (imagePath, imageName) => {
  try {
    const result = await imagekit.upload({
      file: fs.readFileSync(imagePath),
      fileName: imageName,
    });

    fs.unlinkSync(imagePath);
    return { fileId: result.fileId, url: result.url };
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export default uploadImage;
