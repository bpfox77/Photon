// const { ethers, upgrades } = require('hardhat');

// async function main() {
//   const Timelock = await ethers.getContractFactory('Timelock');
//   const proxy = await deploy(Timelock);
//   await proxy.deployed();

//   console.log(proxy.address);

async function main() {
  // We get the contract to deploy
  const TimeLock = await ethers.getContractFactory('TimeLock');
  console.log('Deploying Timelock...');
  const timelock = await TimeLock.deploy();
  await timelock.deployed();
  console.log('Box deployed to:', timelock.address);
}

main();
