// ---------- Satuan waktu (nilai dalam detik) ----------
var satuan = [
  ['Detik',1],['Menit',60],['Jam',3600],['Hari',86400],
  ['Minggu',604800],['Bulan',2592000],['Tahun',31536000]
];
var dari = document.getElementById('dari'), ke = document.getElementById('ke');
satuan.forEach(function(s,i){
  dari.add(new Option(s[0], i));
  ke.add(new Option(s[0], i));
});
dari.value = 3; ke.value = 2;

function fmt(n){
  if (!isFinite(n)) return '-';
  return Number(n.toPrecision(10)).toLocaleString('id-ID', {maximumFractionDigits:6});
}
function hitung1(){
  var v = parseFloat(document.getElementById('nilai').value);
  var a = satuan[dari.value], b = satuan[ke.value];
  if (isNaN(v)) { document.getElementById('h1').textContent = '-'; document.getElementById('h1k').textContent = ''; return; }
  document.getElementById('h1k').textContent = fmt(v) + ' ' + a[0] + ' =';
  document.getElementById('h1').textContent = fmt(v * a[1] / b[1]) + ' ' + b[0];
}
['nilai','dari','ke'].forEach(function(id){
  document.getElementById(id).addEventListener('input', hitung1);
});
document.getElementById('tukar1').onclick = function(){
  var t = dari.value; dari.value = ke.value; ke.value = t; hitung1();
};

// ---------- Zona waktu (selisih jam dari UTC) ----------
var zona = [
  ['WIB (Jakarta)',7],['WITA (Makassar)',8],['WIT (Jayapura)',9],
  ['Singapura / Kuala Lumpur',8],['Tokyo / Seoul',9],['Dubai',4],
  ['Mekah / Riyadh',3],['London (UTC)',0],['India',5.5],['Beijing',8]
];
var zd = document.getElementById('zd'), zk = document.getElementById('zk');
zona.forEach(function(z,i){ zd.add(new Option(z[0], i)); zk.add(new Option(z[0], i)); });
zd.value = 0; zk.value = 7;

function hitung2(){
  var j = document.getElementById('jam').value;
  var out = document.getElementById('h2'), ket = document.getElementById('h2k');
  if (!j) { out.textContent = '-'; ket.textContent = ''; return; }
  var p = j.split(':'), menit = (+p[0]) * 60 + (+p[1]);
  var selisih = (zona[zk.value][1] - zona[zd.value][1]) * 60;
  var total = menit + selisih, hari = '';
  if (total >= 1440) { total -= 1440; hari = ' (+1 hari)'; }
  if (total < 0) { total += 1440; hari = ' (−1 hari)'; }
  var hh = String(Math.floor(total / 60)).padStart(2,'0');
  var mm = String(Math.round(total % 60)).padStart(2,'0');
  ket.textContent = j + ' ' + zona[zd.value][0] + ' =';
  out.textContent = hh + ':' + mm + hari;
}
['jam','zd','zk'].forEach(function(id){
  document.getElementById(id).addEventListener('input', hitung2);
});
document.getElementById('tukar2').onclick = function(){
  var t = zd.value; zd.value = zk.value; zk.value = t; hitung2();
};

// ---------- Tab ----------
function tab(n){
  document.getElementById('p1').classList.toggle('hidden', n !== 1);
  document.getElementById('p2').classList.toggle('hidden', n !== 2);
  document.getElementById('t1').classList.toggle('on', n === 1);
  document.getElementById('t2').classList.toggle('on', n === 2);
}
document.getElementById('t1').onclick = function(){ tab(1); };
document.getElementById('t2').onclick = function(){ tab(2); };

hitung1(); hitung2();