// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SendMeTea {
    struct TeaDonation {
        address donor;
        uint amount;
        string note;
    }

    TeaDonation[] public donations;

    event TeaReceived(address indexed sender, uint amount, string note);

    function sendTea(string memory _note) public payable {
        require(msg.value > 0, "You need to send some ETH");

        donations.push(TeaDonation({
            donor: msg.sender,
            amount: msg.value,
            note: _note
        }));

        emit TeaReceived(msg.sender, msg.value, _note);
    }

    function checkBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdraw() public {
        payable(msg.sender).transfer(address(this).balance);
    }

    function getDonationCount() public view returns (uint) {
        return donations.length;
    }
}
