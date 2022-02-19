const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Miros = await ethers.getContractFactory("Miros");
    const miros = await Miros.deploy();
    await miros.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await miros.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await miros.greet()).to.equal("Hola, mundo!");
  });
});
