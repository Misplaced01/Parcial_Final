var express = require('express');
var router = express.Router();
var teamController = require('../controllers/TeamsController');

/* GET teams listing. */
router.get('/:name', teamController.getOne);
router.get('/', teamController.getAll);

router.post('/',teamController.register);
router.put('/:name', teamController.update);
router.delete('/:name',teamController.delete);

module.exports = router;