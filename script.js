// ===================================================================
// CPMS site — access-code gate
//
// HOW TO CONFIGURE THIS FILE
// 1. ACCESS_CODE   — the code you give out to clinics. Not case sensitive.
// 2. DOWNLOAD_URL  — the direct link to your APK.
//
//    If you're linking a Google Drive file, use this format so it
//    triggers a download page instead of just opening the file viewer:
//      https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
//    (Get YOUR_FILE_ID from the share link: drive.google.com/file/d/YOUR_FILE_ID/view)
//    Note: Drive shows an "can't scan this file for viruses" warning
//    page for larger files — that's normal, the user just clicks
//    "Download anyway".
//
// IMPORTANT: this is a soft gate only. Anyone can read this file's
// source and see the code — it just filters out casual visitors, it
// is not real security. When you're ready for a real paywall, swap
// this out for a small backend (e.g. a Cloudflare Worker or serverless
// function) that checks payment before returning the file URL.
// ===================================================================

const ACCESS_CODE = "CPMS2026";
const DOWNLOAD_URL = "https://github.com/mahendrar-dev/CPMS/releases/download/v1/app-release.apk";

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("unlock-form");
const input = document.getElementById("code-input");
const message = document.getElementById("unlock-message");
const panel = document.getElementById("download-panel");
const downloadLink = document.getElementById("download-link");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const entered = input.value.trim().toUpperCase();

  if (!entered) {
    showMessage("Enter your access code to continue.", "error");
    return;
  }

  if (entered === ACCESS_CODE.toUpperCase()) {
    downloadLink.href = DOWNLOAD_URL;
    panel.hidden = false;
    showMessage("Code accepted — your download is ready below.", "success");
    input.disabled = true;
    form.querySelector("button").disabled = true;
    panel.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    showMessage("That code isn't recognized. Check with your clinic contact.", "error");
    panel.hidden = true;
  }
});

function showMessage(text, kind) {
  message.textContent = text;
  message.className = "unlock-message " + kind;
}
