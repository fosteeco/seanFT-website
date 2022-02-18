const clickSpans = document.querySelectorAll(".copy-click");

clickSpans.forEach((clickSpan) => {
  clickSpan.addEventListener("click", () => {
    // find toolip and popperInstance
    const myPopperInstance = popperInstances.filter((popperInstance) => {
      const popperText = popperInstance.state.elements.reference.innerText;
      const spanText = clickSpan.innerText;
      return popperText === spanText;
    })[0];
    const tooltip = clickSpan.nextElementSibling;
    copyToClipboard(clickSpan.innerText, tooltip, myPopperInstance);
  });
});
function copyToClipboard(text, tooltip, popperInstance) {
  tooltip.classList.toggle("d-none");
  popperInstance.update();
  setTimeout(() => {
    tooltip.classList.toggle("d-none");
  }, 1000);

  var selected = false;
  var el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  if (document.getSelection().rangeCount > 0) {
    selected = document.getSelection().getRangeAt(0);
  }
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}

const toolTips = document.querySelectorAll(".tooltip");
const popperInstances = [];
toolTips.forEach((tooltip) => {
  const clickSpan = tooltip.previousElementSibling;
  const popperInstance = Popper.createPopper(clickSpan, tooltip, {
    placement: "top-start",
  });
  popperInstances.push(popperInstance);
  console.log(
    "popperInstance :",
    popperInstance.state.elements.reference.innerText
  );
});

console.log(popperInstances);
