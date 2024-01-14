// const logo = "https://cdn-icons-png.flaticon.com/128/12829/12829322.png";
const logo = "https://cdn-icons-png.flaticon.com/128/5426/5426919.png";
const contractAddress = "0x4cFCbBbF9F5E6726aC32DaC35b62e543e6D9Faa5";
const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "enrollmentNumber",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "firstName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "lastName",
        "type": "string"
      }
    ],
    "name": "StudentRegister",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_enrollmentNumber",
        "type": "string"
      }
    ],
    "name": "getSignUpData",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "hashPassword",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_enrollmentNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_role",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_passWord",
        "type": "string"
      }
    ],
    "name": "signIn",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "role",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isLogin",
            "type": "bool"
          }
        ],
        "internalType": "struct Login.AdminStudent",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_lastName",
        "type": "string"
      },
      {
        "internalType": "uint64",
        "name": "_admissionYear",
        "type": "uint64"
      },
      {
        "internalType": "string",
        "name": "_enrollmentNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_branch",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_gender",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_setPassowrd",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_confirmPassword",
        "type": "string"
      }
    ],
    "name": "signUpStudents",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export { logo, abi, contractAddress };
