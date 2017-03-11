var User = use('#User');
module.exports = {
	name: 'User',
	methods: {
		get: function(req, res){
			User.find({}).exec(function(err, users){
				res.json({
					users
				})
			})
		},
		create: function(req, res){
			var user = new User({
				name: 'John'
			});
			user.save(function(err){
				if(err){
					return console.log(err)
				}
				res.json({
					user
				})
			})
		}
	}
}