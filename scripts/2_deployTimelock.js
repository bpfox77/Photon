// I don't believe the TimeLock needs to be upgradeable? I'm unclear on how to pass the args it needs
// in this deploy script. Every tutorial uses hardhat deploy but I'd rather not rebuild the configs for that alone.

// const { ethers, upgrades } = require('hardhat');

async function main() {
  // We get the contract to deploy
  const TimeLock = await ethers.getContractFactory('TimeLock');
  console.log('Deploying Timelock...');
  const timelock = await TimeLock.deploy();
  await timelock.deployed();
  console.log('Box deployed to:', timelock.address);
}

main();
