#!/usr/bin/env python3
"""Convert Whisper's --output_format json (with word_timestamps) into
this project's src/captions.json format (short lines, word-level timing
for the karaoke highlight effect).

Usage:
    whisper video.mp4 --language Russian --model small \
        --word_timestamps True --output_format json

    python3 scripts/convert-whisper.py video.json src/captions.json
"""
import json
import sys

WORDS_PER_LINE = 5


def main():
	if len(sys.argv) != 3:
		print("Usage: convert-whisper.py <whisper.json> <captions.json>")
		sys.exit(1)

	with open(sys.argv[1], encoding="utf-8") as f:
		whisper_result = json.load(f)

	words = []
	for segment in whisper_result["segments"]:
		for w in segment["words"]:
			words.append(
				{
					"word": w["word"].strip(),
					"start": round(w["start"], 3),
					"end": round(w["end"], 3),
				}
			)

	lines = []
	for i in range(0, len(words), WORDS_PER_LINE):
		chunk = words[i : i + WORDS_PER_LINE]
		lines.append(
			{
				"start": chunk[0]["start"],
				"end": chunk[-1]["end"],
				"words": chunk,
			}
		)

	with open(sys.argv[2], "w", encoding="utf-8") as f:
		json.dump(lines, f, ensure_ascii=False, indent=2)

	print(f"Wrote {len(lines)} caption lines ({len(words)} words) to {sys.argv[2]}")


if __name__ == "__main__":
	main()
