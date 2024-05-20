import Donations from "@/components/Donations";
import Form from "@/components/Form";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  return (
    <div className='flex flex-col justify-center items-center'>
      {!isConnected && (
        <>
          <div className='text-4xl font-sans mb-4'>Send Tea</div>
          <div className='text-xl font-sans mb-4'>
            Connect your wallet to send tea.
          </div>
          <Image src='/tea.png' width={400} height={400} alt='Tea' />
        </>
      )}
      {isConnected && (
        <>
          <Form />
          <Donations />
        </>
      )}
    </div>
  );
}
