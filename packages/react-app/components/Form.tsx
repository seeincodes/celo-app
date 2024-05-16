import { useState } from "react";
import { ethers } from "ethers";
import { abi } from "../abi";

export default function Form() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSendGossip = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to use this feature.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0xbDCF0eD058D57380445F3b76aF061b9542d93940";
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.sendTea(message);
      await tx.wait();
      alert("Tea sent successfully!");
    } catch (error) {
      console.error("Error sending tea:", error);
      alert("Failed to send tea.");
    }
  };

  return (
    <div>
      <h1>Spill the Tea</h1>
      <input
        type='text'
        placeholder="Enter recipient's address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type='text'
        placeholder='Enter amount in ETH'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <textarea
        placeholder='Enter your gossip message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendGossip}>Send Gossip</button>
    </div>
  );
}
