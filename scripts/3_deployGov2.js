// Should I deploy the contracts one by one?

const { ethers, upgrades } = require('hardhat');

async function main() {
  // Deploying
  const NowDao = await ethers.getContractFactory('NowDao');
  const instance = await upgrades.deployProxy(NowDao, { kind: 'uups' });
  await instance.deployed();
  console.log(instance.address);
}

main();
