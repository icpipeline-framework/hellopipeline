import { hellopipeline } from "../../declarations/hellopipeline";


document.getElementById("greeting").innerText = "";

document.getElementById("historyBuffer").innerText = "... Please Wait ...";
document.getElementById("historyHash").innerText = "... Please Wait ...";
document.getElementById("historyTrie").innerText = "... Please Wait ...";
document.getElementById("historyStable").innerText = "... Please Wait ...";

const loadMe = async () => {
  const historyBuffer = await hellopipeline.getHistoryBuffer();
  document.getElementById("historyBuffer").innerText = historyBuffer;

  const historyHash = await hellopipeline.getHistoryHashMap();
  document.getElementById("historyHash").innerText = historyHash;

  const historyTrie = await hellopipeline.getHistoryTrieMap();
  document.getElementById("historyTrie").innerText = historyTrie;

  const historyStable = await hellopipeline.getHistoryStable();
  document.getElementById("historyStable").innerText = historyStable;
}
const pleaseWait = async () => {
  document.getElementById("greeting").innerText = "... Please Wait ...";
  document.getElementById("historyBuffer").innerText = "... Please Wait ...";
  document.getElementById("historyHash").innerText = "... Please Wait ...";
  document.getElementById("historyTrie").innerText = "... Please Wait ...";
  document.getElementById("historyStable").innerText = "... Please Wait ...";
  
} 

loadMe ();


document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();

  pleaseWait ();


  // Interact with hellopipeline actor, calling the greet method
  const greeting = await hellopipeline.greet(name);

  document.getElementById("greeting").innerText = greeting;

  loadMe ();

});

document.getElementById("clearDataBtn").addEventListener("click", async () => {
  
  pleaseWait ();
  

  // Interact with hellopipeline actor, calling the greet method
  const icResponse = await hellopipeline.clearDataMain();
  if (icResponse == "OK")
    document.getElementById("greeting").innerText = "Successfully Cleared the Data";

  loadMe ();
});

document.getElementById("doBackupBtn").addEventListener("click", async () => {
  
  pleaseWait ();
  

  // Interact with hellopipeline actor, calling the greet method
  const icResponse = await hellopipeline.doICArchiveMain();
  const icResponseString = JSON.stringify (icResponse, (key, value) =>
    typeof value === 'bigint'
        ? Number(value)
        : value // return everything else unchanged
    , 2)
  document.getElementById("greeting").innerText = `Success - ${icResponse.archive.archiveType} (${icResponse.archive.id}): ${icResponse.archive.chunkCount} chunks`;

  loadMe ();

});

