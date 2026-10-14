# Portfolio files

Every file button on the site opens a popup: **View on this site** (in-site viewer)
or **Send it to my email** (handled by `api/send-file.js`).

Files are listed in `src/config/files.json`. To replace one, overwrite the file here
with the same name. To add one, add it here and add an entry to `files.json`.

| File | Entry in files.json |
| --- | --- |
| `Sarthak-Anand-Resume.pdf` | `resume` |
| `ironbend-blind-teaser.pdf` | `teaser` |
| `ironbend-cim.pdf` | `cim` |
| `ironbend-financial-model.xlsx` | `model` (opens in the Office online viewer) |
| `ironbend-buyer-tracker.xlsx` | `tracker` (opens in the Office online viewer) |
