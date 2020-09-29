// Caesar Cipher 1;
export function CC1(p: string, key: string): string {
  p = p.toLowerCase();
  p = addPaddings(p, key);
  const K1 = key.length;
  const C = [];
  for (let i = 0; i < p.length; i++) {
    if (
      p.charCodeAt(i) >= "a".charCodeAt(0) &&
      p.charCodeAt(i) <= "z".charCodeAt(0)
    )
      C.push(
        String.fromCharCode(
          ((p.charCodeAt(i) - "a".charCodeAt(0) + K1) % 26) + "a".charCodeAt(0)
        )
      );
    else C.push(p[i]);
  }
  return C.join("");
}

// Columnar Transposition Cipher
export function CTC(C: string, key: string): string {
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
      array[transKey[i]].push(C[transKey.length * j + i]);
    }
  }
  C = "";
  for (let i = 0; i < transKey.length; i++) {
    for (let j = 0; j < size; j++) {
      C += array[i][j];
    }
  }
  return C;
}

// Caesar Cipher 2
export function CC2(C: string, key: string): string {
  const K2 = key.charCodeAt(0) - "A".charCodeAt(0);
  let tmp = "";
  for (let i = 0; i < C.length; i++) {
    if (
      i % 2 == 0 &&
      C.charCodeAt(i) >= "a".charCodeAt(0) &&
      C.charCodeAt(i) <= "z".charCodeAt(0)
    ) {
      tmp += String.fromCharCode(
        ((C.charCodeAt(i) - "a".charCodeAt(0) + K2) % 26) + "a".charCodeAt(0)
      );
    } else tmp += C[i];
  }
  C = tmp;
  return C;
}

// Caesar Cipher 3
export function CC3(C: string, key: string): string {
  const K3 = key.charCodeAt(key.length - 1) - "A".charCodeAt(0);
  let tmp = "";
  for (let i = 0; i < C.length; i++) {
    if (
      i % 2 == 1 &&
      C.charCodeAt(i) >= "a".charCodeAt(0) &&
      C.charCodeAt(i) <= "z".charCodeAt(0)
    ) {
      tmp += String.fromCharCode(
        ((C.charCodeAt(i) - "a".charCodeAt(0) + K3) % 26) + "a".charCodeAt(0)
      );
    } else tmp += C[i];
  }
  C = tmp;
  return C.toUpperCase();
}

function addPaddings(p: string, key: string): string {
  while (p.length % key.length != 0) p += "x";
  return p;
}
