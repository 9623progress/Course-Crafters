import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (fileBuffer, folder, resourceType) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // console.log(" outside uploader");
      uploadStream.end(fileBuffer);
    });

    return result.secure_url;
  } catch (error) {
    console.log(error);
  }
};
