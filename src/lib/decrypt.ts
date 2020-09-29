// Caesar Cipher 1
export function DCC1(C: string, key: string): string {
  const K1 = key.length;
  let p = "";
  for (let i = 0; i < C.length; i++) {
    if (
      C.charCodeAt(i) >= "a".charCodeAt(0) &&
      C.charCodeAt(i) <= "z".charCodeAt(0)
    ) {
      let x = C.charCodeAt(i) - "a".charCodeAt(0) - K1;
      if (x < 0) x += 26;
      p += String.fromCharCode(x + "a".charCodeAt(0));
    } else p += C[i];
  }
  return p.toUpperCase();
}

// Columnar Transposition Cipher
export function DCTC(C: string, key: string): string {
  let sortedKey = [];
  for (let i = 0; i < key.length; i++) {
    sortedKey.push(key[i]);
  }
  sortedKey.sort();
  let transKey = [];
  for (let i = 0; i < key.length; i++) {
    for (let j = 0; j < sortedKey.length; j++) {
      if (sortedKey[j] == key[i]) {
        transKey.push(j);
        break;
      }
    }
  }
  let array = [];
  for (let i = 0; i < transKey.length; i++) {
    array.push([]);
  }
  let size = Math.floor(C.length / transKey.length);
  if (C.length % transKey.length != 0) size++;

  for (let i = 0; i < transKey.length; i++) {
    for (let j = 0; j < size; j++) {
      array[i].push(C[i * size + j]);
    }
  }
  C = "";
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < transKey.length; j++) {
      C += array[transKey[j]][i];
    }
  }
  return C;
}

// Caesar Cipher 2
export function DCC2(C: string, key: string): string {
  const K2 = key.charCodeAt(0) - "A".charCodeAt(0);
  let tmp = "";
  for (let i = 0; i < C.length; i++) {
    if (
      i % 2 == 0 &&
      C.charCodeAt(i) >= "a".charCodeAt(0) &&
      C.charCodeAt(i) <= "z".charCodeAt(0)
    ) {
      let x = C.charCodeAt(i) - "a".charCodeAt(0) - K2;
      if (x < 0) x += 26;
      tmp += String.fromCharCode(x + "a".charCodeAt(0));
    } else tmp += C[i];
  }
  C = tmp;
  return C;
}
// Caesar Cipher 3
export function DCC3(C: string, key: string): string {
  C = C.toLowerCase();
  const K3 = key.charCodeAt(key.length - 1) - "A".charCodeAt(0);
  let tmp = "";
  for (let i = 0; i < C.length; i++) {
    if (
      i % 2 == 1 &&
      C.charCodeAt(i) >= "a".charCodeAt(0) &&
      C.charCodeAt(i) <= "z".charCodeAt(0)
    ) {
      let x = C.charCodeAt(i) - "a".charCodeAt(0) - K3;
      if (x < 0) x += 26;
      tmp += String.fromCharCode(x + "a".charCodeAt(0));
    } else tmp += C[i];
  }
  C = tmp;
  return C;
}
