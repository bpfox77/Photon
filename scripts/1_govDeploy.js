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

  console.log('Getting Photon:', photon.address);

  // We get the contract to deploy
  const Nowdao = await ethers.getContractFactory('Nowdao');
  console.log('Deploying Nowdao');

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
