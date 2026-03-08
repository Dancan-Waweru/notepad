export async function inspire() {
  try {
    const res = await fetch('../javascript_files/index.json');
    const data = await res.json();
    const output = `"${data[Math.floor(Math.random() * data.length)]}"`;

    const change = document.getElementById("inspiration");
    if(change) change.textContent = output;

    return output; // can now store in dayState
  } catch(err) {
    console.error("Failed to load inspiration:", err);
  }
}