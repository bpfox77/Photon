//this worked so I have the ERC20 on Rinkeby
// Contract at 0x63Be7EC1710323Ec48e5521C752a7d77b6E70d9A already verified.
// Linking proxy 0x63Be7EC1710323Ec48e5521C752a7d77b6E70d9A with implementation
// Successfully linked proxy to implementation.

const { ethers, upgrades } = require('hardhat');

async function main() {
  const Photon = await ethers.getContractFactory('Photon');
  const proxy = await upgrades.deployProxy(Photon, { kind: 'uups' });
  //const proxy = await upgrades.deployProxy(Photon);
  await proxy.deployed();

  console.log(proxy.address);
}

main();
