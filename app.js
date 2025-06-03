
const root = document.getElementById("root");
const daysInJune = 30;
const checklistItems = [
  "吃叶酸",
  "吃水果（约200–400克）",
  "喝牛奶（约300–500毫升）",
  "喝水（约1500–2000毫升）",
  "散步（约30–60分钟）",
  "晒太阳（约10–20分钟）",
  "休息午睡（约20–30分钟）"
];

const data = JSON.parse(localStorage.getItem("pregnancy-checklist") || "{}");

function toggleCheck(day, item) {
  const key = `${day}-${item}`;
  data[key] = !data[key];
  localStorage.setItem("pregnancy-checklist", JSON.stringify(data));
  render();
}

function render() {
  root.innerHTML = `
    <h1>2025年6月 怀孕每日清单</h1>
    <div class="tip">温馨提示：天气炎热时，建议选择清晨或傍晚散步，避免中午高温时段，也可以在室内进行轻度活动（如走动、拉伸），保持水分摄入，量力而行。</div>
  `;

  for (let day = 1; day <= daysInJune; day++) {
    const card = document.createElement("div");
    card.className = "card";
    const title = document.createElement("h2");
    title.textContent = `6月${day}日`;
    card.appendChild(title);

    checklistItems.forEach((item) => {
      const label = document.createElement("label");
      label.style.display = "flex";
      label.style.alignItems = "center";
      label.style.gap = "6px";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      const key = `${day}-${item}`;
      checkbox.checked = !!data[key];
      checkbox.addEventListener("change", () => toggleCheck(day, item));
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(item));
      card.appendChild(label);
    });

    const remark = document.createElement("div");
    remark.className = "remark";
    remark.textContent = "备注：________________________";
    card.appendChild(remark);

    root.appendChild(card);
  }
}

render();
