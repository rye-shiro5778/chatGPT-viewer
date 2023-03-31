import path from "path";

export const iconPath = path.resolve(
  __dirname,
  "icons",
  `icon16.${process.platform === "win32" ? "ico" : "png"}`
);

export const sourceUrl = "https://github.com/rye-shiro5778/";
