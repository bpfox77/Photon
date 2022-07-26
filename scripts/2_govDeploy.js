// I have put together a number of attempts from around the internet.
// it'll run the through the first logs and then the last one is where nothing I've tried works.
// npx hardhat run scripts/2_govDeploy.js --network rinkeby

const { ethers, upgrades } = require('hardhat');

async function main() {
  // we get the token address.
  const PhotonAddress = '0x2A4DC52d84Fcf16CDf81aE1BbA2be755945B48e4';
  const Photon = await ethers.getContractFactory(
    'contracts/PhotonV1.sol:Photon'
  );
  const photon = await Photon.attach(PhotonAddress);
  console.log('Getting Photon:', photon.address);

  // We get the contract to deploy
  const Nowdao = await ethers.getContractFactory('Nowdao');
  console.log('Deploying Nowdao');

  // this would work with a separate timelock where the second string is the timelock.
  // new modules make this unnecessary
  //const nowdao = await Nowdao.deploy('0x2A4...', '0x36A...')

  // but we need deployProxy

  // it's the arguments here that I don't know. we want to:
  //        deploy the Governor,
  //        connect it to the token
  //        and we have to declare the 'kind' per my simple note in 1_deployProxy.js

  const proxy = await upgrades.deployProxy(Nowdao, photon);
  //const proxy = await upgrades.deployProxy(Nowdao, { kind: 'uups' });

  await proxy.deployed();
  console.log('NowDao deployed to:', proxy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
