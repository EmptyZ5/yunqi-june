
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

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

function PregnancyChecklistApp() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("pregnancy-checklist");
    return saved ? JSON.parse(saved) : {};
  });

  const toggleCheck = (day, item) => {
    const key = `${day}-${item}`;
    const updated = { ...data, [key]: !data[key] };
    setData(updated);
    localStorage.setItem("pregnancy-checklist", JSON.stringify(updated));
  };

  const handleRemarkChange = (day, value) => {
    const key = `remark-${day}`;
    const updated = { ...data, [key]: value };
    setData(updated);
    localStorage.setItem("pregnancy-checklist", JSON.stringify(updated));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">2025年6月 怀孕每日待办清单</h1>
      <div className="bg-yellow-100 border-l-4 border-yellow-400 text-sm p-2 mb-4">
        温馨提示：天气炎热时，建议选择清晨或傍晚散步，避免中午高温时段，也可以在室内进行轻度活动（如走动、拉伸），保持水分摄入，量力而行。
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(daysInJune)].map((_, i) => {
          const day = i + 1;
          return (
            <div key={day} className="border rounded-xl p-3 shadow">
              <h2 className="font-semibold mb-2">6月{day}日</h2>
              <ul className="space-y-1 mb-2">
                {checklistItems.map((item) => {
                  const key = `${day}-${item}`;
                  return (
                    <li key={key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!!data[key]}
                        onChange={() => toggleCheck(day, item)}
                      />
                      <span>{item}</span>
                    </li>
                  );
                })}
              </ul>
              <div>
                <label className="text-sm mr-2">备注：</label>
                <input
                  type="text"
                  value={data[`remark-${day}`] || ""}
                  onChange={(e) => handleRemarkChange(day, e.target.value)}
                  className="border px-2 py-1 rounded w-full text-sm"
                  placeholder="可以填写备注或当天的感想"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<PregnancyChecklistApp />);
