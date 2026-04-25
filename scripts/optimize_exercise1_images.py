from pathlib import Path

from PIL import Image


SOURCE_DIR = Path("assets/new_assets")
OUTPUT_VARIANTS = {
    "preview": {
        "dir": Path("assets/vessels/preview"),
        "max_size": (720, 720),
        "quality": 60,
    },
    "full": {
        "dir": Path("assets/vessels/full"),
        "max_size": None,
        "quality": 72,
    },
}
SOURCE_TO_SLUG = {
    "A S.png": "a-s",
    "Adeline G.png": "adeline-g",
    "Aurora.png": "aurora",
    "Calm Bridge.png": "calm-bridge",
    "Hafnia Kallang.png": "hafnia-kallang",
    "Koti.png": "koti",
    "Kriti State.png": "kriti-state",
    "Maturity 1.png": "maturity-one",
    "Norita.png": "norita",
    "Pars Fortune.png": "pars-fortune",
    "Samson.png": "samson",
    "Shang Yaun Bao.png": "shang-yuan-bao",
    "Sinar Ternate.png": "sinar-ternate",
    "Skylight.png": "skylight",
    "Star 18.png": "star-18",
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
    missing_sources = [name for name in SOURCE_TO_SLUG if not (SOURCE_DIR / name).exists()]
    if missing_sources:
        missing_text = ", ".join(sorted(missing_sources))
        raise SystemExit(f"Missing source images: {missing_text}")

    total_source_bytes = 0
    total_output_bytes = 0

    for source_name, slug in SOURCE_TO_SLUG.items():
        source_path = SOURCE_DIR / source_name
        total_source_bytes += source_path.stat().st_size

        for variant in OUTPUT_VARIANTS.values():
            output_path = variant["dir"] / f"{slug}.webp"
            total_output_bytes += build_variant(
                source_path=source_path,
                output_path=output_path,
                max_size=variant["max_size"],
                quality=variant["quality"],
            )

    reduction = 100 - ((total_output_bytes / total_source_bytes) * 100)
    print(f"Optimized {len(SOURCE_TO_SLUG)} images")
    print(f"Source bytes: {total_source_bytes:,}")
    print(f"Output bytes: {total_output_bytes:,}")
    print(f"Reduction: {reduction:.1f}%")


if __name__ == "__main__":
    main()
