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

      const amountInWei = ethers.utils.parseEther(amount);

      const tx = await contract.sendTea(message, { value: amountInWei });
      await tx.wait();
      alert("Tea sent successfully!");
    } catch (error) {
      console.error("Error sending tea:", error);
      alert("Failed to send tea.");
    }
  };

  return (
    <div className='max-w-lg mx-auto p-4 shadow-lg rounded-lg my-5'>
      <h1 className='text-2xl font-bold text-center mb-4'>Spill the Tea</h1>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Enter amount in ETH'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
        />
      </div>
      <div className='mb-4'>
        <textarea
          placeholder="What's the tea?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md h-32 resize-none'
        />
      </div>
      <button
        onClick={handleSendGossip}
        className='w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors'
      >
        Send Gossip
      </button>
    </div>
  );
}
