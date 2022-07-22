pragma solidity >=0.6.0 ;
import "openzeppelin-solidity/contracts/access/AccessControl.sol";
contract News is AccessControl{

   bytes32 public constant PUBLISHER_ROLE = keccak256("PUBLISHER_ROLE");
   event NewsPublished(address publisher);
   event NewsShared(address user,address publisher);

   constructor(){
     _setupRole(DEFAULT_ADMIN_ROLE,msg.sender);
     _setRoleAdmin(PUBLISHER_ROLE, DEFAULT_ADMIN_ROLE);
   }
   string newsIpfsHash;

  function setNewsIpfs(string memory _newsHash) public onlyPublisher{
    newsIpfsHash = _newsHash;
     emit NewsPublished(msg.sender);
  }

  function getNewsIpfs() public view returns (string memory) {
    return newsIpfsHash;
  }

   modifier onlyAdmin(){
       require(isAdmin(msg.sender),"Restricted to Admins");
       _;
   }
    modifier onlyPublisher(){
        require(isPublisher(msg.sender)==true,"Must be a credible new publisher");
        _;
    }
   function isAdmin(address account) public view returns (bool)
  {
    return hasRole(DEFAULT_ADMIN_ROLE, account);
  }
    function isPublisher(address account) public view returns (bool)
  {
    return hasRole(PUBLISHER_ROLE, account);
  }
  function addPublisher(address account) public onlyAdmin
  {
    grantRole(PUBLISHER_ROLE, account);
  }

 function shareNews(address _publisher) external{
    emit NewsShared(msg.sender,_publisher);
  } 


}