import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi } from "../abi";

interface Donation {
  donor: string;
  amount: string;
  note: string;
}

const contractAddress = "0xbDCF0eD058D57380445F3b76aF061b9542d93940";

export default function Donations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      setProvider(web3Provider);
    }
  }, []);

  const fetchDonations = async () => {
    if (!provider) return;
    const contract = new ethers.Contract(
      contractAddress,
      abi,
      provider.getSigner()
    );
    const donationCount: number = await contract.getDonationCount();
    const donationList: Donation[] = [];

    for (let i = 0; i < donationCount; i++) {
      const donation = await contract.donations(i);
      donationList.push({
        donor: donation.donor,
        amount: ethers.utils.formatEther(donation.amount),
        note: donation.note,
      });
    }

    setDonations(donationList);
  };

  useEffect(() => {
    if (provider) {
      fetchDonations();
    }
  }, [provider]);

  return (
    <div className='p-5'>
      <h1 className='text-xl font-bold text-center mb-4'>Donation List</h1>
      <ul>
        {donations.map((donation, index) => (
          <li key={index} className='mb-2 p-2 shadow border rounded'>
            <p>
              <strong>Donor:</strong> {donation.donor}
            </p>
            <p>
              <strong>Amount:</strong> {donation.amount} ETH
            </p>
            <p>
              <strong>Note:</strong> {donation.note}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
