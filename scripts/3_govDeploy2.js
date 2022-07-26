// Should I deploy the contracts one by one?

const { ethers, upgrades } = require('hardhat');

async function main() {
  // Deploying
  const Nowdao = await ethers.getContractFactory('Nowdao');
  const instance = await upgrades.deployProxy(Nowdao, { kind: 'uups' });
  await instance.deployed();
  console.log(instance.address);
}

main();
