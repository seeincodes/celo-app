// scripts/deploy.js

async function main() {
  // We get the contract to deploy
  const SendMeTea = await ethers.getContractFactory("SendMeTea");
  const sendMeTea = await SendMeTea.deploy();

  await sendMeTea.deployed();

  console.log("SendMeTea deployed to:", sendMeTea.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
