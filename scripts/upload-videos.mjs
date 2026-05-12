import { put } from "@vercel/blob"

const VIDEOS = [
  {
    name: "silverglades-the-legacy-sector-63a-gurgaon.mp4",
    sourceUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silverglades-the-legacy-sector-63a-gurgaon-8NUzvJSKzQMsRp4LaJ438aF5bBkeBH.mp4",
  },
  {
    name: "sobha-crescent-sector-63a-gurgaon.mp4",
    sourceUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sobha-crescent-sector-63a-gurgaon-cPRUFbsgs4Unfs00ikF8aIQVSOGpN9.mp4",
  },
  {
    name: "tarc-Ishva.mp4",
    sourceUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tarc-Ishva-beWJVPaUglMgzWBUKeeMzxHgmOLvFR.mp4",
  },
]

for (const video of VIDEOS) {
  console.log(`Downloading: ${video.name} ...`)
  const res = await fetch(video.sourceUrl)
  if (!res.ok) {
    throw new Error(`Failed to download ${video.name}: HTTP ${res.status}`)
  }

  console.log(`Uploading to Blob: ${video.name} ...`)
  const blob = await put(`videos/${video.name}`, res.body, {
    access: "public",
    contentType: "video/mp4",
  })

  console.log(`Done: ${blob.url}`)
}
