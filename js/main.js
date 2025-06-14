const problems = [
  { title: "두 수의 합", level: "Lv.1" },
  { title: "K번째수", level: "Lv.1" },
  { title: "가장 큰 수", level: "Lv.2" },
  { title: "타겟 넘버", level: "Lv.2" },
  { title: "네트워크", level: "Lv.3" },
  { title: "여행경로", level: "Lv.3" },
];

const problemList = document.getElementById('problemList');
problems.forEach(problem => {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="problem-title">${problem.title}</span>
    <span class="problem-level">${problem.level}</span>
  `;
  problemList.appendChild(li);
});