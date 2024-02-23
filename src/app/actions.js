"use server";

import { revalidateTag } from "next/cache";
import { cookies } from 'next/headers';

export async function postsRevalidateAction() {
  revalidateTag("posts");
};

export async function setUserCookieAction(user) {
  cookies().set("user", user);
};

export async function removeUserCookieAction() {
  cookies().delete("user");
};

export async function setTokenCookieAction(token) {
  cookies().set("token", token);
};

export async function removeTokenCookieAction() {
  cookies().delete("token");
};

export async function getUserCookieAction() {
  return cookies().get("user");
};

export async function getTokenCookieAction() {
  return cookies().get("token");
};