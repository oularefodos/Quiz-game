
const hre = require("hardhat");

async function main() {
  const Miros = await hre.ethers.getContractFactory("Miros");
  const miros = await Miros.deploy();

  await miros.deployed();

  console.log("Greeter deployed to:", miros.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
