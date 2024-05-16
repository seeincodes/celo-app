import Donations from "@/components/Donations";
import Form from "@/components/Form";
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
      {!isConnected && <div className='h1'>Send Tea</div>}
      {isConnected && (
        <>
          <Form />
          <Donations />
        </>
      )}
    </div>
  );
}
