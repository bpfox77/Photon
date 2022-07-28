// I have put together a number of attempts from around the internet.
// it'll run the through the first logs and then the last one is where nothing I've tried works.
// npx hardhat run scripts/2_govDeploy.js --network rinkeby

const { ethers, upgrades } = require('hardhat');

async function main() {
  const Photon = await ethers.getContractFactory('Photon');
  const photon = await upgrades.deployProxy(Photon, { kind: 'uups' });
  //const proxy = await upgrades.deployProxy(Photon);
  await photon.deployed();

  // deploy timelock contract
  const minDelay = 6;
  const executors = ['0x9ea9d6216924d2d76800ade7bb82dddd8adf40ce'];
  const proposers = ['0x9ea9d6216924d2d76800ade7bb82dddd8adf40ce'];

  const Timelock = await ethers.getContractFactory('TimeLock');
  const timelock = await Timelock.deploy(minDelay, executors, proposers);
  await timelock.deployed();
  // we get the token address.
  // const PhotonAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
  // const Photon = await ethers.getContractFactory(
  //   'contracts/PhotonV1.sol:Photon',
  // )
  // const photon = await Photon.attach(PhotonAddress)
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
  const proxy = await upgrades.deployProxy(
    Nowdao,
    [photon.address, timelock.address],
    {
      kind: 'uups',
    }
  );

  await proxy.deployed();
  console.log('NowDao deployed to:', proxy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
