const imageFiles = import.meta.glob("../assets/generated/beginner-articles/*.webp", {
  eager: true,
  import: "default",
});

export function getBeginnerArticleImages(slug) {
  const findImage = (kind) => {
    const entry = Object.entries(imageFiles).find(([path]) => path.endsWith(`/${slug}-${kind}.webp`));
    return entry?.[1] || "";
  };

  return {
    header: findImage("header"),
    explain: findImage("explain"),
  };
}
