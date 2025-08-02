async function takeScreenshot(el) {
  const modalContent = document.querySelector(el === "mood" ? "#moodModal > div" : "#characterModal > div");
  const closeBtn = document.getElementById(el === "mood" ? "closeMoodModal" : "closeModal");
  const modalFtr = document.getElementById(el === "mood" ? "moodFooter": "modalFooter");

  if (!modalContent || !modalContent.offsetParent) {
    alert("A character must be selected first!");
    return;
  }

  // Step 1: Hide the close button and force white background
  closeBtn.style.display = "none";
  modalFtr.style.display = "none";
  const originalBackground = modalContent.style.backgroundColor;
  const computedBackground = getComputedStyle(modalContent).backgroundColor;
  modalContent.style.backgroundColor = computedBackground;

  try {
    const canvas = await html2canvas(modalContent, {
      backgroundColor: computedBackground,
      scale: 2
    });
    canvas.toBlob(blob => {
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]).then(() => {
        alert("Screenshot copied to clipboard!");
      });
    }, 'image/png');
  } catch (e) {
    console.error("Screenshot failed!", e);
    alert("Screenshot failed!");
  } finally {
    // Step 2: Restore the original state
    closeBtn.style.display = "block";
    modalFtr.style.display = "block";
    modalContent.style.backgroundColor = originalBackground;
  }
}

document.getElementById("screenshotMainBtn").addEventListener("click", async () => {
  const mainSection = document.querySelector("main");
  if (!mainSection) {
    alert("Main section not found!");
    return;
  }

  try {
    const originalBg = mainSection.style.backgroundColor;
    const computedBg = getComputedStyle(document.body).backgroundColor;
    mainSection.style.backgroundColor = computedBg;

    const canvas = await html2canvas(mainSection, {
      backgroundColor: computedBg,
      scale: 2
    });

    canvas.toBlob(blob => {
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]).then(() => {
        alert("Screenshot of all characters copied to clipboard!");
      });
    }, 'image/png');

    // Restore background color
    mainSection.style.backgroundColor = originalBg;

  } catch (e) {
    console.error("Screenshot failed!", e);
    alert("Screenshot failed!");
  }
});