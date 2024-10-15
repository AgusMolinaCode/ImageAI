/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import UserImage from "../database/models/userImage.models";
import { redirect } from "next/navigation";

const populateUser = (query: any) => query.populate({
  path: 'author',
  model: User,
  select: '_id firstName lastName clerkId'
})

// ADD USER IMAGE
export async function addUserImage({ image, userId, path }: AddUserImageParams) {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);

    if (!author) {
      throw new Error("User not found");
    }

    const newUserImage = await UserImage.create({
      ...image,
      author: author._id,
    })

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newUserImage));
  } catch (error) {
    handleError(error)
  }
}

// UPDATE USER IMAGE
export async function updateUserImage({ image, userId, path }: UpdateUserImageParams) {
  try {
    await connectToDatabase();

    const imageToUpdate = await UserImage.findById(image._id);

    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
      throw new Error("Unauthorized or image not found");
    }

    const updatedUserImage = await UserImage.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      { new: true }
    )

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedUserImage));
  } catch (error) {
    handleError(error)
  }
}

// DELETE USER IMAGE
export async function deleteUserImage(imageId: string) {
  try {
    await connectToDatabase();

    await UserImage.findByIdAndDelete(imageId);
  } catch (error) {
    handleError(error)
  } finally {
    redirect('/')
  }
}

// GET USER IMAGE
export async function getUserImageById(imageId: string) {
  try {
    await connectToDatabase();

    const image = await populateUser(UserImage.findById(imageId));

    if (!image) throw new Error("Image not found");

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error)
  }
}

// GET USER IMAGES
export async function getAllUserImages({ limit = 6, page = 1, searchQuery = '' }: {
  limit?: number;
  page: number;
  searchQuery?: string;
}) {
  try {
    await connectToDatabase();

    let query = {};

    if (searchQuery) {
      query = {
        title: {
          $regex: searchQuery,
          $options: 'i'
        }
      }
    }

    const skipAmount = (Number(page) - 1) * limit;

    const images = await populateUser(UserImage.find(query))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    const totalImages = await UserImage.find(query).countDocuments();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPage: Math.ceil(totalImages / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

// GET USER IMAGES BY USER
export async function getUserImages({ userId }: { userId: string }) {
  try {
    await connectToDatabase();

    const images = await populateUser(UserImage.find({ author: userId }))
      .sort({ updatedAt: -1 })
      .select('_id title publicId secureURL width height author createdAt updatedAt __v');

    return {
      data: JSON.parse(JSON.stringify(images)),
    };
  } catch (error) {
    handleError(error);
  }
}