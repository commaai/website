#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd $DIR

VIDEO=${1:-~/Downloads/testvideo2_trash.MP4}
VIDEO_NAME=${2:-hero}
ENCODE_MODE=${3:-hw}
case "$ENCODE_MODE" in
  hw|HW) ENCODE_MODE=hw ;;
  sw|SW|cpu) ENCODE_MODE=sw ;;
  *)
    echo "Unknown encode mode '$ENCODE_MODE' (use 'hw' or 'sw')" >&2
    exit 1
    ;;
esac

if [[ "$ENCODE_MODE" == "hw" ]]; then
  CODEC_ARGS=(-c:v h264_nvenc -preset p5 -tune hq -rc cbr_hq -b:v 5M -maxrate 5M -bufsize 10M)
else
  CODEC_ARGS=(-c:v libx264 -preset veryslow -crf 21 -profile:v high -level 4.1 -maxrate 5M -bufsize 10M -x264-params "nal-hrd=vbr")
fi

START_OFFSET=2
END_OFFSET=5
UUID=$(uuidgen | tr '[:upper:]' '[:lower:]' | cut -c1-8)
duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$VIDEO" | tr -d '\r')
if [[ -z "$duration" ]]; then
  echo "Unable to determine duration for $VIDEO" >&2
  exit 1
fi

trim_duration=$(awk -v d="$duration" -v s="$START_OFFSET" -v e="$END_OFFSET" 'BEGIN {printf "%.6f", d - s - e}')

if (( $(echo "$trim_duration <= 0" | bc -l) )); then
  echo "Video must be longer than start+end offsets (needs > $((START_OFFSET+END_OFFSET))s)" >&2
  exit 1
fi

out=$DIR/static/videos/$VIDEO_NAME/
rm -rf $out
mkdir -p $out

# Extract first frame as poster image for instant display
echo "Extracting poster image..."
ffmpeg -y -ss $START_OFFSET -i $VIDEO -vf "scale=-2:1080" -frames:v 1 $out/poster.jpg

# Encode video segments
echo "Encoding video segments..."
ffmpeg -y -ss $START_OFFSET -i $VIDEO -t $trim_duration \
  -vf "scale=-2:1080" -pix_fmt yuv420p \
  "${CODEC_ARGS[@]}" \
  -g 60 -keyint_min 60 -sc_threshold 0 -force_key_frames "expr:gte(t,n_forced*2)" -an \
  -f stream_segment -segment_format mpegts \
  -segment_list $out/${VIDEO_NAME}.m3u8 -segment_list_type m3u8 \
  -segment_time 2 \
  -reset_timestamps 1 \
  -bf 3 -b_ref_mode middle -spatial_aq 1 -aq-strength 8 -temporal_aq 1 -rc-lookahead 20 \
  $out/part_${UUID}_%03d.ts

printf '\n\n'
echo "took $SECONDS seconds"
du -hs $out/*.ts | sort -h
