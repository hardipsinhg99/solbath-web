export function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function productMatchesOption(candidates: string[], option: string) {
  const normalizedOption = normalize(option);
  return candidates.some((c) => normalize(c).includes(normalizedOption));
}
