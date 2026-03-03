let people = JSON.parse(localStorage.getItem("familyTree")) || [
  { id: 1, name: "Grandparent", parent: null }
];

function save() {
  localStorage.setItem("familyTree", JSON.stringify(people));
}

function addPerson() {
  const name = document.getElementById("nameInput").value;
  const parent = document.getElementById("parentSelect").value || null;

  if (!name) {
    alert("Enter a name");
    return;
  }

  const id = Date.now();
  people.push({ id, name, parent: parent ? Number(parent) : null });

  document.getElementById("nameInput").value = "";
  save();
  render();
}

function deletePerson(id) {
  people = people.filter(p => p.id !== id && p.parent !== id);
  save();
  render();
}

function render() {
  const treeDiv = document.getElementById("tree");
  treeDiv.innerHTML = "";
  updateParentSelect();

  function draw(parentId, container) {
    people.filter(p => p.parent === parentId).forEach(p => {
      const div = document.createElement("div");
      div.className = "person";
      div.innerHTML = `
        ${p.name}
        <button onclick="deletePerson(${p.id})">❌</button>
      `;
      container.appendChild(div);
      draw(p.id, div);
    });
  }

  draw(null, treeDiv);
}

function updateParentSelect() {
  const select = document.getElementById("parentSelect");
  select.innerHTML = `<option value="">-- No Parent (Root) --</option>`;
  people.forEach(p => {
    select.innerHTML += `<option value="${p.id}">${p.name}</option>`;
  });
}

render();
