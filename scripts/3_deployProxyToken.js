//this worked so I have the ERC20 on Rinkeby. I've made changes and run it multiple times.
// Contract at 0xd7E3A4765b8Dd87c11833E073faE7A630c2b8E78 already verified.
// Linking proxy 0x2A4DC52d84Fcf16CDf81aE1BbA2be755945B48e4 with implementation
// Successfully linked proxy to implementation.

const { ethers, upgrades } = require('hardhat');

async function main() {
  const Photon = await ethers.getContractFactory('Photon');
  // notice that with upgradeable you have to include the "kind". this is what is messing me up I think 
  // in the govDeploy
  const proxy = await upgrades.deployProxy(Photon, { kind: 'uups' });
  await proxy.deployed();

  console.log(proxy.address);
}

main();
