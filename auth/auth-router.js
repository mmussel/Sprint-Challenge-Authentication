const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./auth-model');

router.get('/', (req,res)=>{
  res.status(200).json({message: 'auth api running'})
})

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password);
  user.password = hash;
  Users.register(user)
  .then(userId => {
    Users.getUserById(userId[0])
    .then(user => {
      res.status(201).json({ message: 'user was created',user})
    })
    .catch(err => res.status(500).json({message: 'can not retrieve the user'}))
  })
  .catch(err => res.status(500).json({message: 'user not created'}))
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  Users.getUserByUsername(username)
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = generateToken(user);
      res.status(200).json({message: `welcome ${user.username}`, token})
    }else{
      res.status(401).json('invalid password try again')
    }
  })
  .catch(err => res.status(500).json({message:'can not access database'}))
});

function generateToken(user){
  payload = { userId: user.id , username : user.username }
  secret = 'keep this a secret';
  options ={ 
    expiresIn: '1h'
  }
  return jwt.sign(payload, secret , options)
} 

module.exports = router;