export default function fetchLight() {
  return new Promise((resolve, reject) => {
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        resolve("red");
        break;
      case 1:
        resolve("yellow");
        break;
      case 2:
        resolve("green");
        break;
    }
  });
}