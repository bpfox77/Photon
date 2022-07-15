// i can't remember where I found this, but it seems the correct order to tie things together?
// i don't have a TimeLock deploy yet

async function main() {
  const PhotonAddress = '0x63Be7EC1710323Ec48e5521C752a7d77b6E70d9A';
  const Photon = await ethers.getContractFactory(
    'contracts/PhotonV1.sol:Photon'
  );
  const photon = await Photon.attach(PhotonAddress);

  // can't deploy Timelock to get a real address
  const TimelockAddress = '0x36A373B51CB42eA098A2e63Bae5D6Fd8c8A7E211';
  const TimelockController = await ethers.getContractFactory(
    'contracts/TimelockController.sol:TimelockController'
  );
  //const timelockController = await TimelockController.attach(TimelockAddress);

  // We get the contract to deploy
  const NowDao = await ethers.getContractFactory('NowDao');
  console.log('Deploying NowDao');
  const nowdao = await NowDao.deploy('0x63Be...', '0x36A...'); // second address no good
  const deployedNowDao = await nowdao.deployed();
  console.log('NowDao deployed to:', nowdao.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
