from pathlib import Path

from PIL import Image


SOURCE_DIR = Path("exercise2/Bills Of Lading")
OUTPUT_VARIANTS = {
    "preview": {
        "dir": Path("exercise2/assets/bills-of-lading/preview"),
        "max_size": (700, 1000),
        "quality": 62,
    },
    "full": {
        "dir": Path("exercise2/assets/bills-of-lading/full"),
        "max_size": (1500, 2150),
        "quality": 76,
    },
}

# Explicit source-filename → case-number mapping.
# Do NOT rely on alphabetical ordering.
SOURCE_TO_CASE = {
    "Case 1 Bill of Lading.png": 1,
    "Case 2 Bill of Lading.png": 2,
    "Case 3 Bill of Lading.png": 3,
    "Case 4 Bill of Lading.png": 4,
    "Case 5 Bill of Lading.png": 5,
    "Case 6 Bill of Lading.png": 6,
    "Case 7 Bill of Lading.png": 7,
    "Case 8 Bill of Lading.png": 8,
    "Case 9 Bill of Lading.png": 9,
    "Case 10 Bill of Lading.png": 10,
    "Case 11 Bill of Lading.png": 11,
    "Case 12 Bill of Lading.png": 12,
}


def normalize_mode(image: Image.Image) -> Image.Image:
    if "A" in image.getbands():
        return image.convert("RGBA")
    return image.convert("RGB")


def build_variant(source_path: Path, output_path: Path, max_size: tuple[int, int] | None, quality: int) -> int:
    with Image.open(source_path) as raw_image:
        image = normalize_mode(raw_image)
        if max_size:
            image.thumbnail(max_size, Image.Resampling.LANCZOS)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        image.save(output_path, "WEBP", quality=quality, method=6)
    return output_path.stat().st_size


def main() -> None:
    # --- Validate: every case 1-12 has exactly one source mapping ---
    missing_cases = [n for n in range(1, 13) if n not in SOURCE_TO_CASE.values()]
    if missing_cases:
        raise SystemExit(f"Missing source mapping for case(s): {missing_cases}")

    case_counts: dict[int, list[str]] = {}
    for source_name, case_num in SOURCE_TO_CASE.items():
        case_counts.setdefault(case_num, []).append(source_name)
    ambiguous = {k: v for k, v in case_counts.items() if len(v) > 1}
    if ambiguous:
        raise SystemExit(f"Ambiguous mapping — multiple sources for the same case: {ambiguous}")

    # --- Validate: every source file exists and can be opened ---
    missing_sources = [name for name in SOURCE_TO_CASE if not (SOURCE_DIR / name).exists()]
    if missing_sources:
        missing_text = ", ".join(sorted(missing_sources))
        raise SystemExit(f"Missing source images: {missing_text}")

    for source_name in SOURCE_TO_CASE:
        source_path = SOURCE_DIR / source_name
        try:
            with Image.open(source_path) as img:
                img.verify()
        except Exception as exc:
            raise SystemExit(f"Cannot open source file '{source_name}': {exc}")

    # --- Build optimized variants ---
    total_source_bytes = 0
    total_preview_bytes = 0
    total_full_bytes = 0

    for source_name, case_num in SOURCE_TO_CASE.items():
        source_path = SOURCE_DIR / source_name
        total_source_bytes += source_path.stat().st_size
        output_slug = f"case-{case_num:02d}-bill-of-lading"

        for variant_key, variant in OUTPUT_VARIANTS.items():
            output_path = variant["dir"] / f"{output_slug}.webp"
            variant_bytes = build_variant(
                source_path=source_path,
                output_path=output_path,
                max_size=variant["max_size"],
                quality=variant["quality"],
            )
            if variant_key == "preview":
                total_preview_bytes += variant_bytes
            else:
                total_full_bytes += variant_bytes

    total_output_bytes = total_preview_bytes + total_full_bytes
    reduction = 100 - ((total_output_bytes / total_source_bytes) * 100)

    print(f"Optimized {len(SOURCE_TO_CASE)} images")
    print(f"Total raw source size:          {total_source_bytes:>12,} bytes")
    print(f"Total optimized preview size:   {total_preview_bytes:>12,} bytes")
    print(f"Total optimized full size:      {total_full_bytes:>12,} bytes")
    print(f"Total optimized output size:    {total_output_bytes:>12,} bytes")
    print(f"Size reduction:                 {reduction:.1f}%")


if __name__ == "__main__":
    main()
