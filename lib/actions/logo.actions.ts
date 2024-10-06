/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Logo from "../database/models/logo.models";
import { redirect } from "next/navigation";

const populateUser = (query: any) => query.populate({
  path: 'author',
  model: User,
  select: '_id firstName lastName clerkId'
})

// ADD LOGO
export async function addLogo({ logo, userId, path }: AddLogoParams) {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);

    if (!author) {
      throw new Error("User not found");
    }

    const newLogo = await Logo.create({
      ...logo,
      author: author._id,
    })

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newLogo));
  } catch (error) {
    handleError(error)
  }
}

// UPDATE LOGO
export async function updateLogo({ logo, userId, path }: UpdateLogoParams) {
  try {
    await connectToDatabase();

    const logoToUpdate = await Logo.findById(logo._id);

    if (!logoToUpdate || logoToUpdate.author.toHexString() !== userId) {
      throw new Error("Unauthorized or logo not found");
    }

    const updatedLogo = await Logo.findByIdAndUpdate(
      logoToUpdate._id,
      logo,
      { new: true }
    )

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedLogo));
  } catch (error) {
    handleError(error)
  }
}

// DELETE LOGO
export async function deleteLogo(logoId: string) {
  try {
    await connectToDatabase();

    await Logo.findByIdAndDelete(logoId);
  } catch (error) {
    handleError(error)
  } finally {
    redirect('/')
  }
}

// GET LOGO
export async function getLogoById(logoId: string) {
  try {
    await connectToDatabase();

    const logo = await populateUser(Logo.findById(logoId));

    if (!logo) throw new Error("Logo not found");

    return JSON.parse(JSON.stringify(logo));
  } catch (error) {
    handleError(error)
  }
}

// GET LOGOS
export async function getAllLogos({ limit = 6, page = 1, searchQuery = '' }: {
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

    const logos = await populateUser(Logo.find(query))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    const totalLogos = await Logo.find(query).countDocuments();

    return {
      data: JSON.parse(JSON.stringify(logos)),
      totalPage: Math.ceil(totalLogos / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

// GET LOGOS BY USER
export async function getUserLogos({
  limit = 6,
  page = 1,
  userId,
}: {
  limit?: number;
  page: number;
  userId: string;
}) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;

    const logos = await populateUser(Logo.find({ author: userId }))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    const totalLogos = await Logo.find({ author: userId }).countDocuments();

    return {
      data: JSON.parse(JSON.stringify(logos)),
      totalPages: Math.ceil(totalLogos / limit),
    };
  } catch (error) {
    handleError(error);
  }
}