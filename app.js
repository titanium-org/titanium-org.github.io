"use strict";
const appVersion = 2;
Date.prototype.getMonthLength = function () {
  let m = this.getMonth(), y = this.getFullYear();
  let ml = (m % 2 == 0)? 31: 30;
  if (m == 1) ml = 28;
  if (m == 1 && y % 4 == 0) ml = 29
  return ml;
};
Array.prototype.removeAt = function (index) {
  let l = this.length;
  for (let i = index; i < l - 1; i++)
    this[i] = structuredClone(this[i+1]);
  this.pop()
};

function adjustHeight() {
  let main = document.getElementById("main");
  main.style.setProperty("height", window.visualViewport.height - 100 + "px", "important");
  main.style.setProperty("width", screen.width + "px", "important");
}
adjustHeight();
window.visualViewport.addEventListener("resize", adjustHeight);
let DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// Enabling the functionality of .date-selector
let dSelectors = document.querySelectorAll(".date-selector");
dSelectors.forEach((selector) => {
  let children = selector.children;
  let input = children[0], icon = children[1], output = children[2];
  selector.setAttribute("selected-date", input.value);
  let date = new Date(input.value);
  output.textContent = DAYS[date.getDay()] + " " + date.getDate() + " " + MONTHS[date.getMonth()] + " " + date.getFullYear();
  output.onclick = () => { input.click(); }
  icon.onclick = () => { input.click(); }
  input.onchange = function () {
    selector.setAttribute("selected-date", input.value);
    let date = new Date(input.value);
    output.textContent = DAYS[date.getDay()] + " " + date.getDate() + " " + MONTHS[date.getMonth()] + " " + date.getFullYear()
  }
});
// Enabling functionality of .month-selector
let mSelectors = document.querySelectorAll(".month-selector");
mSelectors.forEach((selector) => {
  let children = selector.children;
  let input = children[0], icon = children[1], output = children[2];
  selector.setAttribute("selected-value", input.value);
  let date = new Date(input.value);
  output.textContent = MONTHS[date.getMonth()] + " " + date.getFullYear();
  output.onclick = () => { input.click(); }
  icon.onclick = () => { input.click(); }
  input.onchange = function () {
    selector.setAttribute("selected-value", input.value);
    let date = new Date(input.value);
    output.textContent = MONTHS[date.getMonth()] + " " + date.getFullYear();
  }
});

let main = document.getElementById("main");
let emx = document.getElementById("emx"); emx.zIndex = 2;
let tdx = document.getElementById("tdx"); tdx.zIndex = 4;
let hom = document.getElementById("hom"); hom.zIndex = 5;
let atx = document.getElementById("atx"); atx.zIndex = 3;
let xtx = document.getElementById("xtx"); xtx.zIndex = 1;
let fcpx = document.getElementById("fcp"); // 6th element is the floating control panel.

let nav = document.getElementById("nav");

let nem = document.getElementById("nem"); nem.section = emx; nem.active = false;
let ntd = document.getElementById("ntd"); ntd.section = tdx; ntd.active = false;
let nho = document.getElementById("nho"); nho.section = hom; nho.active = true;
let nat = document.getElementById("nat"); nat.section = atx; nat.active = false;
let nxt = document.getElementById("nxt"); nxt.section = xtx; nxt.active = false;
let navi = [nem, ntd, nho, nat, nxt];

let atxsm = document.getElementById("atxsm");
let atxsr = document.getElementById("atxsr");
let atmr = document.getElementById("atmr");

let configButton = document.getElementById("configButton");
let atmlic = document.getElementById("atmlic");
// initial values of attendance tracker sections.
let d = new Date();
let atmdsi = document.getElementById("atmdsi");
atmdsi.value = d.getFullYear().toString().padStart(4,"0") + "-" + (d.getMonth() + 1).toString().padStart(2, "0") + "-" + d.getDate().toString().padStart(2, "0");
atmdsi.dispatchEvent(new Event("change"));
let atrmsi = document.getElementById("atrmsi");
atrmsi.value = d.getFullYear().toString().padStart(4,"0") + "-" + (d.getMonth() + 1).toString().padStart(2, "0");
atrmsi.dispatchEvent(new Event("change"));

let db = {
  amx: []
};
db.sortAmx = function () {
  db.amx.sort((a, b) => (a.date < b.date)? -1: (a.date > b.date)? 1: 0);
};
let cfg = {
  subs: ["ClickOn", "Top-leftIcon", "ToAdd", "OrDelete", "Subjects"]
};
nat.initialLayout = function () {
  atmr.style.setProperty("left", "0%");
  console.log("$");
};
navi.forEach(function (nico) {
  nico.addEventListener("click", function () {
    if (this.active) {
      this.initialLayout();
    }
    else {
      let nicp = nem.active? nem : ntd.active? ntd : nho.active? nho : nat.active? nat : nxt;
      let pas = nicp.section;
      let nas = this.section;
      let z = nas.zIndex;
      nas.zIndex = pas.zIndex;
      pas.zIndex = z;
      
      pas.style.setProperty("visibility", "hidden");
      pas.style.setProperty("z-index", pas.zIndex);
      pas.style.setProperty("opacity", "0");
      nicp.active = false;
      nicp.classList.remove("active");
      
      nas.style.setProperty("visibility", "visible");
      nas.style.setProperty("z-index", nas.zIndex);
      nas.style.setProperty("opacity", "1");
      this.active = true;
      this.classList.add("active");
    }
  });
});

// Making the switch calender-events functional.
let emxsc = document.getElementById("emxsc");
let emxse = document.getElementById("emxse");
let emce  = document.getElementById("emce");

emxsc.active = true;

emxse.onclick = function () {
  if (emxse.active) return;
  emce.style.setProperty("left", "-100%");
  emxse.active = true;
  emxse.classList.add("active");
  emxsc.active = false;
  emxsc.classList.remove("active");
};
emxsc.onclick = function () {
  if (emxsc.active) return;
  emce.style.setProperty("left", "0");
  emxsc.active = true;
  emxsc.classList.add("active");
  emxse.active = false;
  emxse.classList.remove("active");
};
// Making the switch mark-register functional
atxsm.active = true;

atxsr.onclick = function () {
  if (atxsr.active) return;
  atmr.style.setProperty("left", "-100%");
  atxsr.active = true;
  atxsr.classList.add("active");
  atxsm.active = false;
  atxsm.classList.remove("active");
};
atxsm.onclick = function () {
  if (atxsm.active) return;
  atmr.style.setProperty("left", "0");
  atxsm.active = true;
  atxsm.classList.add("active");
  atxsr.active = false;
  atxsr.classList.remove("active");
};

function editSubjects() {
  let cur = cfg.subs.join(", ");
  let str = "";
  while (!(/(\w+)/.test(str))) {
    str = prompt("Enter the subjects separated by comma: ", (cur)? cur: "");
    let x = new Set(str.split(/,+\s*/));
    cfg.subs = Array.from(x).filter(x => x != "");
  }
}
if (cfg.subs.length == 0) editSubjects();
configButton.onclick = editSubjects; 
const createAttendance = (date, sub, pre, abs, timeStamp) => ({date: date, sub: sub, pre: pre, abs: abs, timeStamp: timeStamp});

function displayAttendanceRegister() {
  let month = atrmsi.value;
  let monthData = db.amx.filter(att => att.date.startsWith(month));
  let subs = new Set();
  monthData.forEach(att => { subs.add(att.sub); });
  subs = Array.from(subs.values());
  let table = document.getElementById("atr-table");
  
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  
  if (monthData.length == 0) return;
  let elems = {
    div: document.createElement("div"),
    span: document.createElement("span"),
    row: document.createElement("div")
  };
  elems.row.className = "row";
  let thead = elems.div.cloneNode(false);
  thead.classList.add("thead", "row");
  let dateLabel= elems.div.cloneNode(false);
  dateLabel.textContent = "Date";
  thead.appendChild(dateLabel);
  let atTotal = {};
  for (let i = 0, cell; i < subs.length; i++) {
    cell = elems.div.cloneNode(false);
    cell.textContent = subs[i];
    thead.appendChild(cell);
    atTotal[subs[i]] = {pre: 0, abs: 0};
  }
  thead.style.setProperty("width", (subs.length + 1) * 8 + "ch");
  table.appendChild(thead);
  
  let lastDate = Number(monthData[monthData.length - 1].date.split("-")[2]);
  let i = 1, j, row, dateData, cell, subData, pre, abs, x, y;
  for (i = 1; i <= lastDate; i++) {
    dateData = monthData.filter((att) => att.date == month + "-" + i.toString().padStart(2, "0"));
    if (dateData.length == 0) continue;
    row = elems.row.cloneNode(false);
    cell = elems.div.cloneNode(false);
    cell.textContent = i.toString();
    row.appendChild(cell);
    for (j = 0; j < subs.length; j++) {
      cell = elems.div.cloneNode(false);
      pre = elems.span.cloneNode(false);
      abs = elems.span.cloneNode(false);
      subData = dateData.find(att => att.sub == subs[j]);
      if (subData) {
        pre.className = "pre";
        pre.textContent = subData.pre;
        x = atTotal[subs[j]].pre;
        atTotal[subs[j]].pre += subData.pre;
        abs.className = "abs";
        abs.textContent = subData.abs;
        x = atTotal[subs[j]].abs;
        atTotal[subs[j]].abs += subData.abs;
      }
      else {
        pre.textContent = "-";
        abs.textContent = "-";
      }
      cell.appendChild(pre);
      cell.appendChild(document.createTextNode(" | "));
      cell.appendChild(abs);
      row.appendChild(cell);
    }
    row.style.setProperty("width", (subs.length + 1) * 8 + "ch");
    table.appendChild(row);
  }
  let tfoot = elems.div.cloneNode(false);
  tfoot.className = "tfoot";
  row = elems.row.cloneNode(false);
  cell = elems.div.cloneNode(false);
  cell.textContent = "Present";
  row.appendChild(cell);
  row.style.setProperty("width", (subs.length + 1) * 8 + "ch");
  for (i = 0; i < subs.length; i++) {
    cell = elems.div.cloneNode(false);
    cell.textContent = atTotal[subs[i]].pre;
    row.appendChild(cell);
  }
  tfoot.appendChild(row);
  row = elems.row.cloneNode(false);
  cell = elems.div.cloneNode(false);
  cell.textContent = "Absent";
  row.appendChild(cell);
  row.style.setProperty("width", (subs.length + 1) * 8 + "ch");
  for (i = 0; i < subs.length; i++) {
    cell = elems.div.cloneNode(false);
    cell.textContent = atTotal[subs[i]].abs;
    row.appendChild(cell);
  }
  tfoot.appendChild(row);
  table.appendChild(tfoot);
  updateDataAmx();
}
displayAttendanceRegister();
atrmsi.addEventListener("change", displayAttendanceRegister);

// Making the attendance mark list functional.
function displayAttendanceMark() {
  while (atmlic.firstChild) atmlic.removeChild(atmlic.firstChild);
  cfg.subs.forEach(sub => {
    let date = atmdsi.value;
    let atmli = document.createElement("div");
    let div = document.createElement("div");
    let pre = document.createElement("div");
    let abs = document.createElement("div");
    div.textContent = sub;
    let entry = db.amx.find(att => (att.date == date && att.sub == sub));
    pre.textContent = entry? entry.pre : 0;
    abs.textContent = entry? entry.abs : 0;
    atmli.className = "atmli";
    atmli.append(div, pre, abs);
    atmlic.appendChild(atmli);
    pre.addEventListener("click", function () {
      let entry = db.amx.find(att => (att.date == date && att.sub == sub));
      if (!entry) {
        entry = createAttendance(date, sub, 1, 0, Date.now());
        db.amx.push(entry);
        db.sortAmx();
      }
      else
        entry.pre++;
      this.textContent = entry.pre;
      displayAttendanceRegister();
    });
    abs.addEventListener("click", function () {
      let entry = db.amx.find(att => (att.date == date && att.sub == sub));
      if (!entry) {
        entry = createAttendance(date, sub, 0, 1, Date.now());
        db.amx.push(entry);
        db.sortAmx();
      }
      else
        entry.abs++;
      this.textContent = entry.abs;
      displayAttendanceRegister();
    });
    pre.addEventListener("contextmenu", function () {
      let entry = db.amx.find(att => (att.date == date && att.sub == sub));
      if (!entry) return;
      entry.pre = 0;
      this.textContent = 0;
      if (entry.pre == 0 && entry.abs == 0)
        db.amx.removeAt(db.amx.findIndex(e => (e.date == date && e.sub == sub)));
      displayAttendanceRegister();
    });
    abs.addEventListener("contextmenu", function () {
      let entry = db.amx.find(att => (att.date == date && att.sub == sub));
      if (!entry) return;
      entry.abs = 0;
      this.textContent = 0;
      if (entry.pre == 0 && entry.abs == 0)
        db.amx.removeAt(db.amx.findIndex(e => (e.date == date && e.sub == sub)));
      displayAttendanceRegister();
    });
  });
  updateConfigSubs();
}
displayAttendanceMark();
atmdsi.addEventListener("change", displayAttendanceMark);

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {

    try {
      let reg = navigator.serviceWorker.register("/sw.js");
      if (reg.installing) cosnole.log("Service Worker Installing");
      if (reg.waiting) console.log("Servicr Worker Installed and waitingbto be activated");
      if (reg.active) console.log("Service Worker is Installed and Active");
    }
    catch (err) {
     console.error(err);
    }
  }
};
registerServiceWorker();
window.onload = function (e) {
  const openRequest = indexedDB.open("v2", 2);
  openRequest.onsuccess = function (e) {
    let database = openRequest.result;
    let transaction = database.transaction(["data"], "readonly");
    let data = transaction.objectStore("data");
    let requestDataAmx = data.get("dataAmx");
    requestDataAmx.onsuccess = function () {
      db.amx = requestDataAmx.result || [];
      displayAttendanceRegister();
    };
    requestDataAmx.onerror = function (e) {
      console.log(e);
    };
    let requestConfigSubs = data.get("configSubs");
    requestConfigSubs.onsuccess = function () {
      cfg.subs = requestConfigSubs.result || ["ClickOn", "Top-leftIcon", "ToAdd", "OrDelete", "Subjects"];
      displayAttendanceMark();
    };
    requestConfigSubs.onerror = function (e) {
      cfg.subs = [];
    };
  };
  openRequest.onupgradeneeded = function (e) {
    let database = openRequest.result;
    if (!database.objectStoreNames.contains("data")) {
      let request = database.createObjectStore("data");
    }
    if (!database.objectStoreNames.contains("config")) {
      let request = database.createObjectStore("config");
    }
  };
  openRequest.onerror = function (e) {
    console.log(e);
  };
};
function updateDataAmx() {
  const openRequest = indexedDB.open("v2", 2);
  openRequest.onsuccess = function (e) {
    let database = openRequest.result;
    let transaction = database.transaction(["data"], "readwrite");
    let data = transaction.objectStore("data");
    let request = data.put(db.amx, "dataAmx");
    request.onsuccess = function (e) {
      console.log(e.target.result);
    };
    request.onerror = function (e) {
      console.log(e);
    };
  };
  openRequest.onerror = function (e) {
    console.log(e);
  };
}
function updateConfigurationSubs() {
  const openRequest = indexedDB.open("v2", 2);
  openRequest.onsuccess = function (e) {
    let database = openRequest.result;
    let transaction = database.transaction(["config"], "readwrite");
    let data = transaction.objectStore("config");
    let request = data.put(cfg.subs, "configSubs");
    request.onsuccess = function (e) {
      console.log(e.target.result);
    };
    request.onerror = function (e) {
      console.log(e);
    };
  };
  openRequest.onerror = function (e) {
    console.log(e);
  };
}