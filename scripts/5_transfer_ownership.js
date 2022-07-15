// scripts/transfer_ownership.js
// $ npx hardhat run scripts/transfer_ownership.js --network rinkeby
// this is not working. apparently with upgradeable scripts there's no .admin and you're supposed to use

async function main() {
  const gnosisSafe = '0x08f0982764c45755c15Ae8Ee3EC2eB5c79bC76a8';

  console.log('Transferring ownership of ProxyAdmin...');
  // The owner of the ProxyAdmin can upgrade contracts like so in non-upgradeable versions
  await upgrades.admin.transferProxyAdminOwnership(gnosisSafe);

  // UUPS and beacon proxies do not use admin addresses. UUPS proxies rely on an _authorizeUpgrade function
  // to be overridden to include access restriction to the upgrade mechanism

  // I've tried to solve the instance issue with these attempts
  //const instance = await instance.transferOwnership(gnosisSafe)
  // await upgrades.instance.transferOwnership(gnosisSafe, { kind: 'uups' });

  console.log('Transferred ownership of ProxyAdmin to:', gnosisSafe);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
