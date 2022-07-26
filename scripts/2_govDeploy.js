const { ethers, upgrades } = require('hardhat');

async function main() {
  const PhotonAddress = '0x63Be7EC1710323Ec48e5521C752a7d77b6E70d9A';
  const Photon = await ethers.getContractFactory(
    'contracts/PhotonV1.sol:Photon'
  );
  const photon = await Photon.attach(PhotonAddress);
  console.log('Getting Photon:', photon.address);

  // We get the contract to deploy
  const Nowdao = await ethers.getContractFactory('Nowdao');
  console.log('Deploying Nowdao');

  // const nowdao = await NowDao.deploy('0x63Be...');
  // or deployProxy
  // const nowdao = await Nowdao.deploy('0x63Be...');

  //const proxy = await upgrades.deployProxy(Photon);

  //const nowdao = await NowDao.deploy('0x63Be...', '0x36A...')

  const proxy = await upgrades.deployProxy(Nowdao, photon);

  //const proxy = await upgrades.deployProxy(Nowdao, { kind: 'uups' });
  await proxy.deployed();
  //const deployedNowdao = await nowdao.deployed();
  console.log('NowDao deployed to:', proxy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
