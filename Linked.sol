pragma solidity 0.4.21;

contract Linked {
    // User profile
    struct User {
        bytes32 name;
        bytes32 occupation;
        string bio;
    }

    // The structure of a message
    struct Message {
        string content;
        address writtenBy;
        uint256 timestamp;
    }

    // Each address is linked to a user with name, occupation and bio
    mapping(address => User) public userInfo;

    // Each address is linked to several follower addresses
    mapping(address => address[]) public userFollowers;

    // The messages that each address has written
    mapping(address => Message[]) public userMessages;

    // All the messages ever written
    Message[] public messages;
}
