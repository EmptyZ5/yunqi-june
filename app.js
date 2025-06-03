
const checklistItems = [
  "吃叶酸",
  "吃水果（约200–400克）",
  "喝牛奶（约300–500毫升）",
  "喝水（约1500–2000毫升）",
  "散步（约30–60分钟）",
  "晒太阳（约10–20分钟）",
  "休息午睡（约20–30分钟）"
];

const checklist = document.getElementById("checklist");

for (let day = 1; day <= 30; day++) {
  const card = document.createElement("div");
  card.className = "day-card";

  const title = document.createElement("h2");
  title.textContent = `🗓️ 6月${day}日`;
  card.appendChild(title);

  checklistItems.forEach(item => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const key = `${day}-${item}`;
    checkbox.checked = localStorage.getItem(key) === "true";
    checkbox.addEventListener("change", () => {
      localStorage.setItem(key, checkbox.checked);
    });
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(item));
    card.appendChild(label);
  });

  const remark = document.createElement("input");
  remark.type = "text";
  remark.placeholder = "备注：可以填写备注或当天的感想";
  remark.value = localStorage.getItem(`remark-${day}`) || "";
  remark.addEventListener("input", () => {
    localStorage.setItem(`remark-${day}`, remark.value);
  });
  card.appendChild(remark);

  checklist.appendChild(card);
}
